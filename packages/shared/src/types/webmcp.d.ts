import type React from "react";

declare module "react" {
  interface HTMLAttributes<T> extends React.AriaAttributes, React.DOMAttributes<T> {
    toolname?: string;
    tooldescription?: string;
    toolparamdescription?: string;
    toolautosubmit?: boolean | "true" | "false";
  }

  interface FormHTMLAttributes<T> extends React.HTMLAttributes<T> {
    toolname?: string;
    tooldescription?: string;
    toolautosubmit?: boolean | "true" | "false";
  }

  interface InputHTMLAttributes<T> extends React.HTMLAttributes<T> {
    toolparamdescription?: string;
    toolname?: string;
    tooldescription?: string;
  }

  interface TextareaHTMLAttributes<T> extends React.HTMLAttributes<T> {
    toolparamdescription?: string;
    toolname?: string;
    tooldescription?: string;
  }

  interface SelectHTMLAttributes<T> extends React.HTMLAttributes<T> {
    toolparamdescription?: string;
    toolname?: string;
    tooldescription?: string;
  }

  interface ButtonHTMLAttributes<T> extends React.HTMLAttributes<T> {
    toolparamdescription?: string;
    toolname?: string;
    tooldescription?: string;
  }
}

export interface WebMCPPropertySchema {
  type: "string" | "number" | "integer" | "boolean" | "array" | "object";
  description?: string;
  enum?: (string | number)[];
  items?: WebMCPPropertySchema;
  properties?: Record<string, WebMCPPropertySchema>;
  required?: string[];
  minimum?: number;
  maximum?: number;
  default?: unknown;
}

export interface WebMCPInputSchema {
  type: "object";
  properties: Record<string, WebMCPPropertySchema>;
  required?: string[];
}

export interface WebMCPTool {
  name: string;
  description: string;
  inputSchema: WebMCPInputSchema;
  execute?: (params: Record<string, unknown>) => Promise<unknown> | unknown;
}

export interface WebMCPContext {
  registerTool: (tool: WebMCPTool) => Promise<void> | void;
  unregisterTool: (toolName: string) => Promise<void> | void;
  getRegisteredTools: () => WebMCPTool[];
  listTools?: () => Promise<WebMCPTool[]> | WebMCPTool[];
}

declare global {
  interface Document {
    modelContext?: WebMCPContext;
  }

  interface Window {
    modelContext?: WebMCPContext;
    __registeredWebMCPTools__?: Map<string, WebMCPTool>;
  }

  interface Navigator {
    modelContext?: WebMCPContext;
  }
}
