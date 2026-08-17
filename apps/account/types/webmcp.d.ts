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
