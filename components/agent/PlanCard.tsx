"use client";

import type { ShoppingPlan } from "@/lib/types";

function formatMoney(n: number) {
  return `${n.toFixed(2)}`;
}

export function PlanCard({
  plan,
  index,
  balance,
  onOpen,
}: {
  plan: ShoppingPlan;
  index: number;
  balance: number;
  onOpen: () => void;
}) {
  const top3 = plan.lines.slice(0, 3);

  return (
    <button
      type="button"
      onClick={onOpen}
      style={{
        width: "100%",
        textAlign: "left",
        padding: "var(--ymz-space-4)",
        marginBottom: "var(--ymz-space-3)",
        borderRadius: "var(--ymz-radius-md)",
        border: "1px solid var(--ymz-border)",
        background: "var(--ymz-bg-card)",
        cursor: "pointer",
        boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "var(--ymz-space-3)",
          marginBottom: "var(--ymz-space-2)",
        }}
      >
        <div>
          <h3
            style={{
              margin: 0,
              fontSize: "var(--ymz-ty-t5)",
              fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: "var(--ymz-space-2)",
            }}
          >
              <span
                aria-hidden="true"
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 11,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 800,
                  color: "#fff",
                  background:
                    "linear-gradient(135deg, var(--ymz-color-primary), var(--ymz-color-orange))",
                  flexShrink: 0,
                }}
              >
                {index}
              </span>
            {plan.title}
          </h3>
          <p
            style={{
              margin: "var(--ymz-space-1) 0 0",
              fontSize: "var(--ymz-ty-small)",
              color: "var(--ymz-text-secondary)",
            }}
          >
            {plan.subtitle}
          </p>
        </div>
      </div>

      <p
        style={{
          margin: "0 0 var(--ymz-space-3)",
          fontSize: "var(--ymz-ty-caption)",
          color: "var(--ymz-text-secondary)",
          lineHeight: 1.45,
        }}
      >
        {plan.reason}
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: "var(--ymz-space-3)",
        }}
      >
        <span style={{ fontSize: "var(--ymz-ty-small)", color: "var(--ymz-text-tertiary)" }}>
          福利消耗
        </span>
        <span
          style={{
            fontSize: "20px",
            fontWeight: 700,
            color: "var(--ymz-text-primary)",
          }}
        >
          {formatMoney(plan.totalWelfare)}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "var(--ymz-ty-small)",
          color: "var(--ymz-text-secondary)",
          marginBottom: "var(--ymz-space-3)",
        }}
      >
        <span>余额 {formatMoney(balance)}</span>
        <span>
          {plan.totalSelfPay > 0 ? `预计自付 ${formatMoney(plan.totalSelfPay)}` : "无需自付"}
        </span>
      </div>

      <div style={{ display: "flex", gap: "var(--ymz-space-2)" }}>
        {top3.map((l) => (
          <div
            key={l.skuId}
            style={{
              flex: 1,
              aspectRatio: "5 / 3",
              borderRadius: "var(--ymz-radius-sm)",
              background: l.thumbColor,
              opacity: 0.85,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.25) 100%)",
              }}
            />
          </div>
        ))}
      </div>
      <p
        style={{
          margin: "var(--ymz-space-2) 0 0",
          fontSize: "12px",
          color: "var(--ymz-text-tertiary)",
        }}
      >
        {plan.skuCount} 件 · {plan.categoryCount} 个品类 · 点击查看完整清单
      </p>
    </button>
  );
}
