"use client";

import { useRef, useEffect, useCallback, useState } from "react";

export interface UseOptimizedCarouselOptions {
  /**
   * Thời gian chờ giữa mỗi lần tự động cuộn (ms).
   * Mặc định: 4500ms (4.5s).
   */
  autoplayInterval?: number;
  /**
   * Thời gian nghỉ sau khi người dùng dừng thao tác vuốt/cuộn trước khi tiếp tục autoplay (ms).
   * Mặc định: 4000ms (4s).
   */
  cooldownBuffer?: number;
  /**
   * Có bật chế độ infinite loop (mảng nhân 3) không.
   * Mặc định: true.
   */
  isInfinite?: boolean;
  /**
   * Khoảng cách gap giữa các item trong container (px).
   * Mặc định: 12px.
   */
  gap?: number;
  /**
   * Bật/tắt tính năng autoplay hoàn toàn.
   * Mặc định: true.
   */
  enabled?: boolean;
}

export function useOptimizedCarousel({
  autoplayInterval = 4500,
  cooldownBuffer = 4000,
  isInfinite = true,
  gap = 12,
  enabled = true,
}: UseOptimizedCarouselOptions = {}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Interaction & Scroll State Refs (dùng Ref để không re-render không cần thiết)
  const isInteractingRef = useRef(false); // Đang chạm ngón tay hoặc giữ chuột
  const isScrollingRef = useRef(false); // Trình duyệt đang cuộn (bao gồm cả quán tính)
  const isVisibleRef = useRef(true); // Slider có đang nằm trong viewport hay không
  const isResettingRef = useRef(false); // Đang thực hiện nhảy vị trí infinite loop

  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const scrollEndTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Clear tất cả timer đang chờ
  const clearAutoplayTimer = useCallback(() => {
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  }, []);

  // Hàm cuộn sang trái/phải một khoảng bằng 1 card + gap
  const scroll = useCallback(
    (direction: "left" | "right") => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const firstChild = container.firstElementChild as HTMLElement | null;
      const cardWidth = firstChild ? firstChild.getBoundingClientRect().width : 300;
      const scrollAmount = cardWidth + gap;

      container.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    },
    [gap]
  );

  // Lên lịch autoplay lần tiếp theo
  const scheduleAutoplay = useCallback(
    (delay: number) => {
      clearAutoplayTimer();

      if (
        !enabled ||
        isInteractingRef.current ||
        isScrollingRef.current ||
        !isVisibleRef.current ||
        (typeof document !== "undefined" && document.hidden)
      ) {
        return;
      }

      autoplayTimerRef.current = setTimeout(() => {
        // Kiểm tra lại trạng thái trước khi thực sự scroll
        if (
          !isInteractingRef.current &&
          !isScrollingRef.current &&
          isVisibleRef.current &&
          !document.hidden
        ) {
          scroll("right");
          // Lên lịch tiếp theo sau khoảng autoplay chuẩn
          scheduleAutoplay(autoplayInterval);
        }
      }, delay);
    },
    [autoplayInterval, clearAutoplayTimer, enabled, scroll]
  );

  // Đặt vị trí ban đầu ở set thứ 2 (giữa) để có thể cuộn 2 chiều mượt mà
  useEffect(() => {
    if (!isInfinite || !scrollContainerRef.current) return;
    const container = scrollContainerRef.current;

    // Đợi DOM render kích thước chính xác
    const initScrollLeft = () => {
      if (container.scrollWidth > container.clientWidth) {
        const singleSetWidth = container.scrollWidth / 3;
        container.scrollLeft = singleSetWidth;
      }
    };

    // Chạy khi mount và khi window resize
    const timer = setTimeout(initScrollLeft, 50);
    window.addEventListener("resize", initScrollLeft, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", initScrollLeft);
    };
  }, [isInfinite]);

  // Xử lý Infinite Loop Reset khi cuộn đến mép mà không gây giật
  const handleInfiniteReset = useCallback(() => {
    if (!isInfinite || !scrollContainerRef.current || isResettingRef.current) return;
    const container = scrollContainerRef.current;
    const singleSetWidth = container.scrollWidth / 3;

    if (container.scrollLeft >= singleSetWidth * 2) {
      isResettingRef.current = true;
      const prevBehavior = container.style.scrollBehavior;
      container.style.scrollBehavior = "auto";
      container.scrollLeft -= singleSetWidth;

      requestAnimationFrame(() => {
        container.style.scrollBehavior = prevBehavior;
        setTimeout(() => {
          isResettingRef.current = false;
        }, 60);
      });
    } else if (container.scrollLeft <= 20) {
      isResettingRef.current = true;
      const prevBehavior = container.style.scrollBehavior;
      container.style.scrollBehavior = "auto";
      container.scrollLeft += singleSetWidth;

      requestAnimationFrame(() => {
        container.style.scrollBehavior = prevBehavior;
        setTimeout(() => {
          isResettingRef.current = false;
        }, 60);
      });
    }
  }, [isInfinite]);

  // Lắng nghe sự kiện cuộn (scroll event)
  const handleScroll = useCallback(() => {
    // 1. Tạm dừng ngay autoplay khi có chuyển động cuộn
    clearAutoplayTimer();
    isScrollingRef.current = true;

    // 2. Kiểm tra và thực hiện infinite loop reset nếu cần
    handleInfiniteReset();

    // 3. Debounce phát hiện khi nào chuyển động cuộn quán tính (momentum scroll) dừng hẳn
    if (scrollEndTimerRef.current) {
      clearTimeout(scrollEndTimerRef.current);
    }

    scrollEndTimerRef.current = setTimeout(() => {
      isScrollingRef.current = false;

      // Khi đã dừng cuộn và người dùng không còn chạm màn hình
      if (!isInteractingRef.current) {
        scheduleAutoplay(cooldownBuffer);
      }
    }, 180); // 180ms sau scroll event cuối cùng là chuyển động quán tính đã dừng
  }, [clearAutoplayTimer, handleInfiniteReset, scheduleAutoplay, cooldownBuffer]);

  // Bắt đầu tương tác (Chạm tay / Nhấn chuột)
  const handleInteractionStart = useCallback(() => {
    isInteractingRef.current = true;
    clearAutoplayTimer();
  }, [clearAutoplayTimer]);

  // Kết thúc tương tác (Nhấc tay / Thả chuột)
  const handleInteractionEnd = useCallback(() => {
    isInteractingRef.current = false;

    // Nếu lúc này trình duyệt không còn cuộn quán tính nữa thì bắt đầu đếm cooldown
    if (!isScrollingRef.current) {
      scheduleAutoplay(cooldownBuffer);
    }
  }, [scheduleAutoplay, cooldownBuffer]);

  // Desktop Hover handlers
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    handleInteractionStart();
  }, [handleInteractionStart]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    handleInteractionEnd();
  }, [handleInteractionEnd]);

  // Touch handlers
  const handleTouchStart = useCallback(() => {
    handleInteractionStart();
  }, [handleInteractionStart]);

  const handleTouchEnd = useCallback(() => {
    handleInteractionEnd();
  }, [handleInteractionEnd]);

  // Điều khiển bằng nút bấm thủ công (Next / Prev)
  const manualScroll = useCallback(
    (direction: "left" | "right") => {
      clearAutoplayTimer();
      scroll(direction);
      // Cho người dùng thời gian đọc card sau khi bấm nút
      scheduleAutoplay(cooldownBuffer);
    },
    [clearAutoplayTimer, scroll, scheduleAutoplay, cooldownBuffer]
  );

  // IntersectionObserver: Chỉ chạy autoplay khi slider đang hiển thị trong viewport
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const isVisible = entry ? entry.isIntersecting && entry.intersectionRatio >= 0.35 : false;
        isVisibleRef.current = isVisible;

        if (isVisible) {
          scheduleAutoplay(autoplayInterval);
        } else {
          clearAutoplayTimer();
        }
      },
      { threshold: [0, 0.35, 0.7] }
    );

    observer.observe(container);

    // Lắng nghe thay đổi tab (Page Visibility API)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearAutoplayTimer();
      } else if (isVisibleRef.current) {
        scheduleAutoplay(cooldownBuffer);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearAutoplayTimer();
      if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current);
    };
  }, [scheduleAutoplay, clearAutoplayTimer, autoplayInterval, cooldownBuffer]);

  return {
    scrollContainerRef,
    isHovered,
    scroll: manualScroll,
    containerProps: {
      onScroll: handleScroll,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onTouchStart: handleTouchStart,
      onTouchEnd: handleTouchEnd,
      onTouchCancel: handleTouchEnd,
      onPointerDown: handleTouchStart,
      onPointerUp: handleTouchEnd,
    },
  };
}
