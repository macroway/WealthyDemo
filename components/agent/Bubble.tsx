"use client";

import type { ReactNode } from "react";

import { bubbleAgentBodyText } from "@/lib/bubbleTypography";

export function Bubble({
  role,
  children,
}: {
  role: "agent" | "user";
  children: ReactNode;
}) {
  const isAgent = role === "agent";
  return (
    <div
      style={{
        display: "flex",
        justifyContent: isAgent ? "flex-start" : "flex-end",
        marginBottom: "var(--ymz-space-3)",
      }}
    >
      <div
        style={{
          width: isAgent ? "92%" : "auto",
          maxWidth: "92%",
          padding: "var(--ymz-space-3) var(--ymz-space-4)",
          borderRadius: "var(--ymz-radius-lg)",
          background: isAgent ? "var(--ymz-bg-card)" : "var(--ymz-color-primary-soft)",
          ...bubbleAgentBodyText,
          border: isAgent ? "1px solid var(--ymz-border)" : "none",
          boxShadow: isAgent ? "0 2px 8px rgba(0,0,0,0.04)" : "none",
        }}
      >
        {children}
      </div>
    </div>
  );
}
