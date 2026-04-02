"use client";

import Link from "next/link";
import type { ReactNode } from "react";

export function NavBar({ title, right }: { title: string; right?: ReactNode }) {
  return (
    <header
      style={{
        height: "var(--ymz-nav-h)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 var(--ymz-space-3)",
        background: "var(--ymz-bg-card)",
        borderBottom: "1px solid var(--ymz-border)",
        position: "sticky",
        top: 0,
        zIndex: 20,
      }}
    >
      <Link
        href="/"
        style={{
          color: "var(--ymz-text-primary)",
          fontSize: "var(--ymz-ty-body)",
          minWidth: 44,
        }}
        aria-label="返回"
      >
        ‹
      </Link>
      <span
        style={{
          fontSize: "var(--ymz-ty-body)",
          fontWeight: 600,
          flex: 1,
          textAlign: "center",
        }}
      >
        {title}
      </span>
      <div style={{ minWidth: 44, textAlign: "right" }}>{right}</div>
    </header>
  );
}
