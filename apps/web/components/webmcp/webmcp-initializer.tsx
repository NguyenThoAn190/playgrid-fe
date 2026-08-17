"use client";

import { useEffect } from "react";
import { registerDefaultPlayGridTools } from "@workspace/shared/lib/webmcp/index";

export function WebMCPInitializer() {
  useEffect(() => {
    // Initialize WebMCP context and register standard PlayGrid tools for agentic browsing
    try {
      registerDefaultPlayGridTools();
    } catch (err) {
      console.debug("[WebMCP] Initialization notice:", err);
    }
  }, []);

  return null;
}
