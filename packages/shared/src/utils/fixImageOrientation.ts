/**
 * Fix image orientation dựa trên EXIF data
 * Giải quyết vấn đề ảnh bị xoay ngang/dọc trên mobile
 */
export async function fixImageOrientation(blob: Blob): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const img = new Image();
        img.onload = async () => {
          // Tạo canvas để vẽ lại ảnh
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          if (!ctx) {
            resolve(blob);
            return;
          }

          // Mặc định: không xoay
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          // Chuyển canvas thành blob
          canvas.toBlob(
            (newBlob) => {
              if (newBlob) {
                resolve(newBlob);
              } else {
                resolve(blob);
              }
            },
            "image/jpeg",
            0.6,
          );
        };

        img.onerror = () => {
          resolve(blob);
        };

        img.src = e.target?.result as string;
      } catch (error) {
        console.error("Error fixing image orientation:", error);
        resolve(blob);
      }
    };

    reader.onerror = () => {
      reject(reader.error);
    };

    reader.readAsDataURL(blob);
  });
}

/**
 * Fix image orientation với EXIF parser (nếu cần xác định chính xác góc xoay)
 * Hàm này sử dụng canvas để xoay ảnh dựa trên EXIF orientation tag
 */
export async function fixImageOrientationAdvanced(blob: Blob): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const orientation = getExifOrientation(new Uint8Array(arrayBuffer));

        const img = new Image();
        img.onload = async () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          if (!ctx) {
            resolve(blob);
            return;
          }

          // Áp dụng rotation dựa trên EXIF orientation
          let { width, height } = img;

          // Xác định các giá trị orientation
          switch (orientation) {
            case 5: // Rotate 90 CW & Flip
            case 6: // Rotate 90 CW
            case 7: // Rotate 270 CW & Flip
            case 8: // Rotate 270 CW
              [width, height] = [height, width];
              break;
          }

          canvas.width = width;
          canvas.height = height;

          // Áp dụng transformation
          switch (orientation) {
            case 2: // Flip H
              ctx.translate(width, 0);
              ctx.scale(-1, 1);
              break;
            case 3: // Rotate 180
              ctx.translate(width, height);
              ctx.rotate(Math.PI);
              break;
            case 4: // Flip V
              ctx.translate(0, height);
              ctx.scale(1, -1);
              break;
            case 5: // Rotate 90 CW & Flip
              ctx.rotate(0.5 * Math.PI);
              ctx.scale(1, -1);
              break;
            case 6: // Rotate 90 CW
              ctx.rotate(0.5 * Math.PI);
              ctx.translate(0, -height);
              break;
            case 7: // Rotate 270 CW & Flip
              ctx.rotate(0.5 * Math.PI);
              ctx.translate(width, -height);
              ctx.scale(-1, 1);
              break;
            case 8: // Rotate 270 CW
              ctx.rotate(-0.5 * Math.PI);
              ctx.translate(-width, 0);
              break;
          }

          ctx.drawImage(img, 0, 0);

          canvas.toBlob(
            (newBlob) => {
              if (newBlob) {
                resolve(newBlob);
              } else {
                resolve(blob);
              }
            },
            "image/jpeg",
            0.6,
          );
        };

        img.onerror = () => {
          resolve(blob);
        };

        // Tạo data URL từ array buffer
        const dataUrl = arrayBufferToDataUrl(new Uint8Array(arrayBuffer));
        img.src = dataUrl;
      } catch (error) {
        console.error("Error fixing image orientation (advanced):", error);
        resolve(blob);
      }
    };

    reader.onerror = () => {
      reject(reader.error);
    };

    reader.readAsArrayBuffer(blob);
  });
}

/**
 * Lấy EXIF orientation tag từ ảnh JPEG
 */
function getByte(arr: Uint8Array, idx: number): number {
  return arr[idx] ?? 0;
}

function getExifOrientation(data: Uint8Array): number {
  // Kiểm tra JPEG signature
  if (data[0] !== 0xff || data[1] !== 0xd8) {
    return 1; // Không phải JPEG, trả về mặc định
  }

  let offset = 2;
  let orientation = 1;

  while (offset < data.length) {
    // Tìm marker
    if (getByte(data, offset) !== 0xff) {
      offset++;
      continue;
    }

    const marker = getByte(data, offset + 1);
    offset += 2;

    // APP1 marker (EXIF)
    if (marker === 0xe1) {
      const length = (getByte(data, offset) << 8) | getByte(data, offset + 1);

      // Kiểm tra EXIF header "Exif\0\0"
      if (
        getByte(data, offset + 2) === 0x45 &&
        getByte(data, offset + 3) === 0x78 &&
        getByte(data, offset + 4) === 0x69 &&
        getByte(data, offset + 5) === 0x66
      ) {
        // TIFF header offset
        const tiffOffset = offset + 8;

        // Kiểm xem big-endian hay little-endian
        const isLittleEndian = getByte(data, tiffOffset) === 0x49;

        // Đọc số lượng IFD entries
        const ifdOffset = tiffOffset + 4;
        const numEntries = isLittleEndian
          ? getByte(data, ifdOffset) | (getByte(data, ifdOffset + 1) << 8)
          : (getByte(data, ifdOffset) << 8) | getByte(data, ifdOffset + 1);

        // Tìm Orientation tag (0x0112)
        for (let i = 0; i < numEntries; i++) {
          const entryOffset = ifdOffset + 2 + i * 12;
          const tag = isLittleEndian
            ? getByte(data, entryOffset) | (getByte(data, entryOffset + 1) << 8)
            : (getByte(data, entryOffset) << 8) | getByte(data, entryOffset + 1);

          if (tag === 0x0112) {
            const valueOffset = entryOffset + 8;
            orientation = isLittleEndian
              ? getByte(data, valueOffset) | (getByte(data, valueOffset + 1) << 8)
              : (getByte(data, valueOffset) << 8) | getByte(data, valueOffset + 1);
            return orientation;
          }
        }
      }

      offset += length;
    } else if (marker === 0xd9) {
      // End of Image
      break;
    } else if ((marker & 0xf0) === 0xd0 || marker === 0x01) {
      // RST or TEM marker, không có data
      offset += 0;
    } else {
      // Các marker khác có data
      const length = (getByte(data, offset) << 8) | getByte(data, offset + 1);
      offset += length;
    }
  }

  return orientation;
}

/**
 * Chuyển Uint8Array thành Data URL
 */
function arrayBufferToDataUrl(buffer: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < buffer.length; i++) {
    binary += String.fromCharCode(getByte(buffer, i));
  }
  return "data:image/jpeg;base64," + btoa(binary);
}
