"use client";

import type { ShoppingPlan } from "@/lib/types";

function formatMoney(n: number) {
  return `¥${n.toFixed(2)}`;
}

export function CompareSheet({
  plans,
  balance,
  open,
  onClose,
}: {
  plans: ShoppingPlan[];
  balance: number;
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="ymz-overlay" role="dialog" aria-modal="true" aria-labelledby="compare-title">
      <div
        style={{
          width: "100%",
          maxWidth: 430,
          maxHeight: "90vh",
          background: "var(--ymz-bg-card)",
          borderRadius: "var(--ymz-radius-lg)",
          padding: "var(--ymz-space-4)",
          overflow: "auto",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 id="compare-title" style={{ margin: 0, fontSize: "var(--ymz-ty-t5)" }}>
            三方案对比
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
            }}
          >
            ×
          </button>
        </div>
        <p style={{ fontSize: "var(--ymz-ty-small)", color: "var(--ymz-text-secondary)" }}>
          PRD 2.2 维度：福利消耗、是否自付、件数/品类（示意）
        </p>

        <div style={{ overflowX: "auto", marginTop: "var(--ymz-space-3)" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "var(--ymz-ty-small)",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    textAlign: "left",
                    padding: "var(--ymz-space-2)",
                    borderBottom: "1px solid var(--ymz-border)",
                  }}
                >
                  维度
                </th>
                {plans.map((p) => (
                  <th
                    key={p.id}
                    style={{
                      padding: "var(--ymz-space-2)",
                      borderBottom: "1px solid var(--ymz-border)",
                      minWidth: 88,
                    }}
                  >
                    {p.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                {
                  label: "福利消耗",
                  val: (p: ShoppingPlan) => formatMoney(p.totalWelfare),
                },
                {
                  label: "预计自付",
                  val: (p: ShoppingPlan) =>
                    p.totalSelfPay > 0 ? formatMoney(p.totalSelfPay) : "—",
                },
                {
                  label: "与余额",
                  val: (p: ShoppingPlan) =>
                    p.totalWelfare + p.totalSelfPay > balance + 0.009 ? "超出" : "余额内",
                },
                {
                  label: "件数 / 品类",
                  val: (p: ShoppingPlan) => `${p.skuCount} / ${p.categoryCount}`,
                },
              ].map((row) => (
                <tr key={row.label}>
                  <td
                    style={{
                      padding: "var(--ymz-space-2)",
                      borderBottom: "1px solid var(--ymz-border)",
                      color: "var(--ymz-text-secondary)",
                    }}
                  >
                    {row.label}
                  </td>
                  {plans.map((p) => (
                    <td
                      key={p.id}
                      style={{
                        padding: "var(--ymz-space-2)",
                        borderBottom: "1px solid var(--ymz-border)",
                        fontWeight: 500,
                      }}
                    >
                      {row.val(p)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          type="button"
          onClick={onClose}
          style={{
            marginTop: "var(--ymz-space-4)",
            width: "100%",
            height: 44,
            borderRadius: "var(--ymz-radius-md)",
            border: "1px solid var(--ymz-border)",
            background: "#fff",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          关闭
        </button>
      </div>
    </div>
  );
}
