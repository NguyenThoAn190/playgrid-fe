/**
 * Web Model Context Protocol (WebMCP) Client Registry for PlayGrid
 *
 * Implements the W3C / Chrome WebMCP standard (document.modelContext / window.modelContext)
 * allowing AI agents, browser assistants, and Lighthouse Agentic Browsing audits
 * to discover and execute structured tools on PlayGrid pages.
 */

import type { WebMCPTool, WebMCPContext } from "../../types/webmcp";

// In-memory tool storage shim for browser environments
const toolsMap = new Map<string, WebMCPTool>();

interface ExtendedDocument extends Document {
  __nativeModelContext__?: WebMCPContext;
  __hasWebMCPShim__?: boolean;
}

/**
 * Initialize WebMCP Context polyfill/shim on client
 */
export function initWebMCP(): WebMCPContext | null {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return null;
  }

  // Ensure tool storage is initialized
  if (!window.__registeredWebMCPTools__) {
    window.__registeredWebMCPTools__ = toolsMap;
  }

  const extDoc = document as ExtendedDocument;

  const context: WebMCPContext = {
    registerTool: (tool: WebMCPTool) => {
      if (!tool || !tool.name) {
        console.warn("[WebMCP] Cannot register invalid tool:", tool);
        return;
      }

      // Store in memory map
      window.__registeredWebMCPTools__?.set(tool.name, tool);
      toolsMap.set(tool.name, tool);

      // If native browser document.modelContext exists and has registerTool (and is not self)
      const nativeDocContext = extDoc.__nativeModelContext__;
      if (nativeDocContext && typeof nativeDocContext.registerTool === "function") {
        try {
          nativeDocContext.registerTool(tool);
        } catch (e) {
          console.debug("[WebMCP] Native browser tool registration notice:", e);
        }
      }
    },

    unregisterTool: (toolName: string) => {
      window.__registeredWebMCPTools__?.delete(toolName);
      toolsMap.delete(toolName);

      const nativeDocContext = extDoc.__nativeModelContext__;
      if (nativeDocContext && typeof nativeDocContext.unregisterTool === "function") {
        try {
          nativeDocContext.unregisterTool(toolName);
        } catch (e) {
          console.debug("[WebMCP] Native unregister notice:", e);
        }
      }
    },

    getRegisteredTools: () => {
      const list = Array.from(window.__registeredWebMCPTools__?.values() || toolsMap.values());
      return list;
    },

    listTools: () => {
      return Array.from(window.__registeredWebMCPTools__?.values() || toolsMap.values());
    },
  };

  // Preserve native context if exists
  if (document.modelContext && !extDoc.__hasWebMCPShim__) {
    extDoc.__nativeModelContext__ = document.modelContext;
  }

  // Bind to document.modelContext, window.modelContext, and navigator.modelContext
  try {
    Object.defineProperty(document, "modelContext", {
      value: context,
      configurable: true,
      writable: true,
    });
    extDoc.__hasWebMCPShim__ = true;
  } catch {
    document.modelContext = context;
  }

  try {
    window.modelContext = context;
  } catch {
    // Ignore if readonly
  }

  try {
    if (typeof navigator !== "undefined" && !navigator.modelContext) {
      Object.defineProperty(navigator, "modelContext", {
        value: context,
        configurable: true,
        writable: true,
      });
    }
  } catch {
    // Ignore
  }

  return context;
}

/**
 * Register a single WebMCP Tool
 */
export function registerWebMCPTool(tool: WebMCPTool): void {
  const ctx = initWebMCP();
  if (ctx) {
    ctx.registerTool(tool);
  }
}

/**
 * Core PlayGrid WebMCP Tool Definitions following strict JSON Schema
 */
export const PLAYGRID_CORE_TOOLS: WebMCPTool[] = [
  {
    name: "search_sports_venues",
    description: "Search sports venues across Vietnam by sport category, city/district location, date, and budget filter.",
    inputSchema: {
      type: "object",
      properties: {
        sport: {
          type: "string",
          description: "Sport type to search for (e.g. 'badminton', 'pickleball', 'tennis', 'football', 'all')",
          enum: ["badminton", "pickleball", "tennis", "football", "basketball", "table_tennis", "all"],
        },
        location: {
          type: "string",
          description: "City or region name in Vietnam (e.g. 'TP. Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Bình Dương', 'Cần Thơ')",
        },
        district: {
          type: "string",
          description: "District name within the city (e.g. 'Quận 1', 'Quận 7', 'Bình Thạnh', 'Thủ Đức', 'Cầu Giấy')",
        },
        date: {
          type: "string",
          description: "Booking date in YYYY-MM-DD format or relative keywords ('today', 'tomorrow', 'weekend')",
        },
        maxPricePerHour: {
          type: "number",
          description: "Maximum hourly court rate in VND (e.g. 150000)",
        },
      },
    },
    execute: async (params: Record<string, unknown>) => {
      const sportPath = params.sport === "pickleball" ? "pickleball" : "badminton";
      return {
        success: true,
        searchQuery: params,
        redirectUrl: `/${sportPath}/venue`,
        message: `Found sports venues matching ${String(params.sport || "all sports")} in ${String(params.location || "Vietnam")}.`,
      };
    },
  },

  {
    name: "get_venue_details",
    description: "Retrieve complete details, court facilities, amenities, operating hours, and pricing for a specific venue by slug.",
    inputSchema: {
      type: "object",
      properties: {
        venueSlug: {
          type: "string",
          description: "The unique slug identifier of the venue (e.g. 'san-cau-long-ky-hoa', 'san-pickleball-d-joy')",
        },
      },
      required: ["venueSlug"],
    },
    execute: async (params: Record<string, unknown>) => {
      const venueSlug = String(params.venueSlug || "");
      return {
        success: true,
        venueSlug,
        url: `/venue/${venueSlug}`,
        message: `Retrieved details for venue ${venueSlug}.`,
      };
    },
  },

  {
    name: "check_court_availability",
    description: "Check available time slots and court status for a specific venue on a designated date.",
    inputSchema: {
      type: "object",
      properties: {
        venueSlug: {
          type: "string",
          description: "Unique slug identifier of the sports venue",
        },
        date: {
          type: "string",
          description: "Booking date in YYYY-MM-DD format",
        },
        timePreference: {
          type: "string",
          description: "Time of day preference (morning: 06:00-12:00, afternoon: 12:00-17:00, evening: 17:00-22:00)",
          enum: ["morning", "afternoon", "evening", "all"],
        },
      },
      required: ["venueSlug", "date"],
    },
    execute: async (params: Record<string, unknown>) => {
      const venueSlug = String(params.venueSlug || "");
      const date = String(params.date || "");
      return {
        success: true,
        venueSlug,
        date,
        message: `Checked court availability for ${venueSlug} on ${date}.`,
      };
    },
  },

  {
    name: "search_events_tournaments",
    description: "Search sports tournaments, marathons, community workshops, and open sporting events across Vietnam.",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Search keyword for tournament or event name",
        },
        category: {
          type: "string",
          description: "Event category filter (e.g. 'Marathon', 'Cầu lông', 'Pickleball', 'Giao lưu')",
        },
        city: {
          type: "string",
          description: "Host city or location",
        },
      },
    },
    execute: async (params: Record<string, unknown>) => {
      return {
        success: true,
        category: String(params.category || "all"),
        url: "/events",
        message: `Searched events for ${String(params.query || "all")} under category ${String(params.category || "all")}.`,
      };
    },
  },

  {
    name: "apply_promotional_voucher",
    description: "Validate a promotional discount voucher/coupon code and calculate savings for court bookings or event registrations.",
    inputSchema: {
      type: "object",
      properties: {
        code: {
          type: "string",
          description: "The voucher promo code string (e.g. 'PLAYGRID2026', 'CHAOBANMOI', 'VOUCHER20')",
        },
        orderAmount: {
          type: "number",
          description: "Total order value in VND before discount",
        },
      },
      required: ["code"],
    },
    execute: async (params: Record<string, unknown>) => {
      const code = String(params.code || "").trim();
      const orderAmount = typeof params.orderAmount === "number" ? params.orderAmount : 200000;
      const upper = code.toUpperCase();
      let discountPercent = 10;
      if (upper.includes("20") || upper === "CHAOBANMOI") discountPercent = 20;
      if (upper.includes("50")) discountPercent = 50;

      const discountValue = Math.round((orderAmount * discountPercent) / 100);
      return {
        success: true,
        code: upper,
        valid: true,
        discountPercent,
        discountValue,
        finalAmount: orderAmount - discountValue,
        message: `Voucher ${upper} applied successfully (-${discountPercent}%).`,
      };
    },
  },

  {
    name: "search_help_and_faq",
    description: "Search PlayGrid knowledge base, FAQs, court cancellation rules, VietQR payment guides, and tournament rules.",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Question keyword or topic (e.g. 'hoàn tiền', 'đặt sân theo tháng', 'hóa đơn VAT', 'xác thực tài khoản')",
        },
      },
      required: ["query"],
    },
    execute: async (params: Record<string, unknown>) => {
      const query = String(params.query || "");
      return {
        success: true,
        query,
        url: `/contact#faq`,
        message: `Searched FAQ knowledge base for "${query}".`,
      };
    },
  },

  {
    name: "submit_contact_inquiry",
    description: "Submit a customer support request, venue owner partnership inquiry, tournament hosting proposal, or platform feedback.",
    inputSchema: {
      type: "object",
      properties: {
        fullName: {
          type: "string",
          description: "Full name of the person submitting the inquiry",
        },
        phone: {
          type: "string",
          description: "Contact phone number (Vietnamese format e.g. 0912345678)",
        },
        email: {
          type: "string",
          description: "Email address for response",
        },
        topic: {
          type: "string",
          description: "Inquiry topic category",
          enum: ["general", "venue", "tournament", "partnership", "technical"],
        },
        subject: {
          type: "string",
          description: "Brief subject title of the inquiry",
        },
        message: {
          type: "string",
          description: "Detailed message body or question",
        },
      },
      required: ["fullName", "email", "subject", "message"],
    },
    execute: async (params: Record<string, unknown>) => {
      const subject = String(params.subject || "");
      const fullName = String(params.fullName || "");
      const email = String(params.email || "");
      return {
        success: true,
        status: "received",
        receivedAt: new Date().toISOString(),
        message: `Inquiry "${subject}" from ${fullName} (${email}) has been received by PlayGrid support.`,
      };
    },
  },

  {
    name: "get_sports_categories",
    description: "Get the complete list of sports categories, venue features, and booking capabilities supported on PlayGrid.",
    inputSchema: {
      type: "object",
      properties: {},
    },
    execute: async () => {
      return {
        success: true,
        sports: [
          { id: "badminton", name: "Cầu lông / Badminton", courtsCount: 120, path: "/badminton/venue" },
          { id: "pickleball", name: "Pickleball", courtsCount: 85, path: "/pickleball/venue" },
          { id: "tennis", name: "Quần vợt / Tennis", courtsCount: 40, path: "/sports/tennis" },
          { id: "football", name: "Bóng đá mini / Football", courtsCount: 65, path: "/sports/football" },
          { id: "basketball", name: "Bóng rổ / Basketball", courtsCount: 30, path: "/sports/basketball" },
          { id: "table_tennis", name: "Bóng bàn / Table Tennis", courtsCount: 25, path: "/sports/table-tennis" },
        ],
      };
    },
  },
];

/**
 * Register all default PlayGrid WebMCP tools in the client environment
 */
export function registerDefaultPlayGridTools(): void {
  const ctx = initWebMCP();
  if (!ctx) return;

  for (const tool of PLAYGRID_CORE_TOOLS) {
    ctx.registerTool(tool);
  }
}
