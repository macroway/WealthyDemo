"use client";

export function LoadingOverlay({ message }: { message: string }) {
  return (
    <div className="ymz-overlay" style={{ zIndex: 150 }}>
      <div
        style={{
          background: "var(--ymz-bg-card)",
          padding: "var(--ymz-space-5)",
          borderRadius: "var(--ymz-radius-md)",
          textAlign: "center",
          minWidth: 220,
          boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
        }}
      >
        <div
          className="ymz-spinner"
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: "3px solid var(--ymz-border)",
            borderTopColor: "var(--ymz-color-primary)",
            margin: "0 auto var(--ymz-space-3)",
          }}
        />
        <p style={{ margin: 0, fontSize: "var(--ymz-ty-caption)", color: "var(--ymz-text-secondary)" }}>
          {message}
        </p>
      </div>
    </div>
  );
}
