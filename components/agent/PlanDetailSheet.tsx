"use client";

import type { ShoppingPlan } from "@/lib/types";

function formatMoney(n: number) {
  return `${n.toFixed(2)}`;
}

export function PlanDetailSheet({
  plan,
  balance,
  open,
  onClose,
  onAdopt,
  adopting,
}: {
  plan: ShoppingPlan | null;
  balance: number;
  open: boolean;
  onClose: () => void;
  onAdopt: () => void;
  adopting: boolean;
}) {
  if (!open || !plan) return null;

  return (
    <div className="ymz-overlay" role="dialog" aria-modal="true" aria-labelledby="plan-sheet-title">
      <div
        style={{
          width: "100%",
          maxWidth: 430,
          maxHeight: "88vh",
          background: "var(--ymz-bg-card)",
          borderRadius: "var(--ymz-radius-lg) var(--ymz-radius-lg) 0 0",
          display: "flex",
          flexDirection: "column",
          alignSelf: "flex-end",
          marginTop: "auto",
        }}
      >
        <div
          style={{
            padding: "var(--ymz-space-3) var(--ymz-space-4)",
            borderBottom: "1px solid var(--ymz-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2 id="plan-sheet-title" style={{ margin: 0, fontSize: "var(--ymz-ty-t5)" }}>
            {plan.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="关闭"
            style={{
              border: "none",
              background: "transparent",
              fontSize: 22,
              cursor: "pointer",
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        <div style={{ overflowY: "auto", padding: "var(--ymz-space-4)", flex: 1 }}>
          <p style={{ margin: "0 0 var(--ymz-space-3)", color: "var(--ymz-text-secondary)" }}>
            {plan.reason}
          </p>

          <ul style={{ listStyle: "none", padding: 0, margin: "var(--ymz-space-4) 0 0" }}>
            {plan.lines.map((l) => (
              <li
                key={l.skuId}
                style={{
                  display: "flex",
                  gap: "var(--ymz-space-3)",
                  padding: "var(--ymz-space-3) 0",
                  borderBottom: "1px solid var(--ymz-border)",
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 40,
                    borderRadius: "var(--ymz-radius-sm)",
                    background: l.thumbColor,
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: "var(--ymz-ty-caption)" }}>
                    {l.title}
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--ymz-text-tertiary)" }}>
                    {l.spec} · ×{l.qty}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 600 }}>{formatMoney(l.lineWelfare)}</div>
                  {l.lineSelfPay > 0 ? (
                    <div style={{ fontSize: "12px", color: "var(--ymz-color-orange)" }}>
                      自付 {formatMoney(l.lineSelfPay)}
                    </div>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div
          style={{
            padding:
              "var(--ymz-space-3) var(--ymz-space-4) calc(var(--ymz-space-4) + env(safe-area-inset-bottom, 0))",
            borderTop: "1px solid var(--ymz-border)",
            background: "var(--ymz-bg-card)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "var(--ymz-space-3)",
              fontSize: "var(--ymz-ty-small)",
            }}
          >
            <span>福利消耗合计</span>
            <span style={{ fontWeight: 700 }}>{formatMoney(plan.totalWelfare)}</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "var(--ymz-space-4)",
              fontSize: "var(--ymz-ty-small)",
              color: "var(--ymz-text-secondary)",
            }}
          >
            <span>当前余额</span>
            <span>{formatMoney(balance)}</span>
          </div>
          <button
            type="button"
            disabled={adopting}
            onClick={onAdopt}
            style={{
              width: "100%",
              height: 48,
              borderRadius: "var(--ymz-radius-md)",
              border: "none",
              fontSize: "var(--ymz-ty-body)",
              fontWeight: 600,
              color: "#fff",
              cursor: adopting ? "wait" : "pointer",
              background: "linear-gradient(135deg, var(--ymz-color-primary), var(--ymz-color-orange))",
              opacity: adopting ? 0.85 : 1,
            }}
          >
            {adopting ? "加购中…" : "一键加购本方案"}
          </button>
        </div>
      </div>
    </div>
  );
}
