import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard - PlayGrid",
  description: "System Administration Portal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
