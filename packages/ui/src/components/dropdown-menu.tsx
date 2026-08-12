"use client";

import * as React from "react";
import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { cn } from "@workspace/ui/lib/utils";

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof MenuPrimitive.Root>) {
  return <MenuPrimitive.Root {...props} />;
}

function DropdownMenuTrigger({
  children,
  asChild,
  render,
  ...props
}: React.ComponentProps<typeof MenuPrimitive.Trigger> & {
  asChild?: boolean;
}) {
  if (asChild && React.isValidElement(children)) {
    return <MenuPrimitive.Trigger render={children} {...props} />;
  }
  return (
    <MenuPrimitive.Trigger render={render} {...props}>
      {children}
    </MenuPrimitive.Trigger>
  );
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof MenuPrimitive.Portal>) {
  return <MenuPrimitive.Portal {...props} />;
}

function DropdownMenuContent({
  className,
  sideOffset = 6,
  side = "bottom",
  align = "start",
  ...props
}: React.ComponentProps<typeof MenuPrimitive.Popup> & {
  sideOffset?: number;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
}) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner side={side} sideOffset={sideOffset} align={align} className="z-[9999]">
        <MenuPrimitive.Popup
          className={cn(
            "z-[9999] min-w-[12rem] overflow-hidden rounded-2xl border bg-popover p-1.5 text-popover-foreground shadow-2xl outline-none font-sans antialiased data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            className
          )}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
}

function DropdownMenuItem({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof MenuPrimitive.Item> & {
  inset?: boolean;
}) {
  return (
    <MenuPrimitive.Item
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-xl px-3 py-2 text-xs font-semibold font-sans antialiased outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  );
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  inset?: boolean;
}) {
  return (
    <div
      className={cn(
        "px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground font-sans antialiased",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuPortal,
};
