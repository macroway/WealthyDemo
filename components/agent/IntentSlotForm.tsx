"use client";

import type { CSSProperties } from "react";
import { useMemo, useState } from "react";

import { agentSecondaryText, bubbleAgentBodyText } from "@/lib/bubbleTypography";

const ALL_CATEGORIES = [
  "食品生鲜",
  "家居百货",
  "家用清洁",
  "个护美妆",
  "母婴用品",
  "数码家电",
  "运动户外",
  "图书文娱",
  "宠物生活",
] as const;

const ALL_BRANDS = ["心相印", "维达", "立白", "滴露", "新秀丽"] as const;

const CATS_FIRST_ROW = 3;
const BRANDS_FIRST_ROW = 3;

export function IntentSlotForm({
  balance,
  allowComboPay,
  locked = false,
  onSubmit,
}: {
  balance: number;
  allowComboPay: boolean;
  locked?: boolean;
  onSubmit: (payload: {
    budgetMin: number;
    budgetMax: number;
    categories: string[];
    specialNote: string;
    brandPreferences: string[];
  }) => void;
}) {
  const [budgetMin] = useState(1);
  const [budgetMax, setBudgetMax] = useState(balance);
  const [selected, setSelected] = useState<string[]>(["家居百货", "家用清洁"]);
  const [catExpanded, setCatExpanded] = useState(false);
  const [wantToBuy, setWantToBuy] = useState("");
  const [brandSelected, setBrandSelected] = useState<string[]>([]);
  const [brandExpanded, setBrandExpanded] = useState(false);

  const visibleCats = useMemo(() => {
    if (catExpanded) return [...ALL_CATEGORIES];
    return ALL_CATEGORIES.slice(0, CATS_FIRST_ROW);
  }, [catExpanded]);

  const visibleBrands = useMemo(() => {
    if (brandExpanded) return [...ALL_BRANDS];
    return ALL_BRANDS.slice(0, BRANDS_FIRST_ROW);
  }, [brandExpanded]);

  const canSubmit =
    !locked && selected.length > 0 && wantToBuy.trim().length > 0;

  function toggleCat(cat: string) {
    if (locked) return;
    setSelected((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  }

  function toggleBrand(brand: string) {
    if (locked) return;
    setBrandSelected((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  }

  const tagButtonStyle = (active: boolean): CSSProperties => ({
    ...agentSecondaryText,
    height: 40,
    padding: "0 var(--ymz-space-2)",
    borderRadius: "var(--ymz-radius-sm)",
    border: `1px solid ${active ? "var(--ymz-color-primary)" : "var(--ymz-border)"}`,
    background: active ? "var(--ymz-color-primary-soft)" : "#fff",
    cursor: locked ? "default" : "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    whiteSpace: "nowrap",
    opacity: locked ? 0.75 : 1,
  });

  return (
    <div>
      <p
        style={{
          ...bubbleAgentBodyText,
          margin: "0 0 var(--ymz-space-3)",
        }}
      >
        本次最高预算
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: allowComboPay ? "1fr" : "1fr auto",
          gap: "var(--ymz-space-2)",
          alignItems: "center",
          marginBottom: "var(--ymz-space-4)",
        }}
      >
        {allowComboPay ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--ymz-space-2)",
              border: "1px solid var(--ymz-border)",
              borderRadius: "var(--ymz-radius-sm)",
              paddingLeft: "var(--ymz-space-3)",
              height: 40,
              background: "#fff",
              opacity: locked ? 0.7 : 1,
            }}
          >
            <span
              style={{
                ...bubbleAgentBodyText,
                fontWeight: 600,
              }}
            >
              福利值
            </span>
            <input
              type="number"
              min={1}
              value={budgetMax}
              onChange={(e) => {
                const next = Math.max(1, Number(e.target.value || 1));
                setBudgetMax(next);
              }}
              inputMode="numeric"
              disabled={locked}
              style={{
                ...bubbleAgentBodyText,
                flex: 1,
                border: "none",
                height: "100%",
                padding: "0 var(--ymz-space-3) 0 0",
                fontVariantNumeric: "tabular-nums",
                outline: "none",
                background: "transparent",
              }}
              aria-label="本次最高预算"
            />
          </div>
        ) : (
          <>
            <input
              type="range"
              min={1}
              max={balance}
              value={Math.min(budgetMax, balance)}
              onChange={(e) => setBudgetMax(Number(e.target.value))}
              style={{ width: "100%" }}
              aria-label="本次最高预算"
              disabled={locked}
            />
            <span
              style={{
                ...bubbleAgentBodyText,
                fontWeight: 700,
                fontVariantNumeric: "tabular-nums",
                textAlign: "right",
                minWidth: 72,
                opacity: locked ? 0.8 : 1,
              }}
            >
              ¥{Math.min(budgetMax, balance)}
            </span>
          </>
        )}
      </div>
      <p
        style={{
          ...agentSecondaryText,
          margin: "-8px 0 var(--ymz-space-4)",
        }}
      >
        {allowComboPay
          ? "可超过当前剩余福利值，超出部分需自付。"
          : "本活动不支持组合支付，本次最高预算上限为剩余福利值。"}
      </p>

      <p
        style={{
          ...bubbleAgentBodyText,
          margin: "0 0 var(--ymz-space-2)",
        }}
      >
        你想购买哪些商品
        <span
          style={{
            color: "var(--ymz-color-primary)",
            fontWeight: 700,
            marginLeft: 4,
            fontSize: "0.95em",
          }}
        >
          必填
        </span>
      </p>
      <textarea
        value={wantToBuy}
        onChange={(e) => setWantToBuy(e.target.value)}
        disabled={locked}
        rows={3}
        required
        placeholder="请描述想买的商品，例如：洗衣液、纸巾、大米等"
        style={{
          ...bubbleAgentBodyText,
          width: "100%",
          boxSizing: "border-box",
          margin: "0 0 var(--ymz-space-4)",
          padding: "var(--ymz-space-3)",
          borderRadius: "var(--ymz-radius-sm)",
          border: "1px solid var(--ymz-border)",
          background: "#fff",
          resize: "vertical",
          minHeight: 72,
          outline: "none",
          fontFamily: "inherit",
          opacity: locked ? 0.85 : 1,
        }}
        aria-label="你想购买哪些商品（必填）"
      />

      <p
        style={{
          ...bubbleAgentBodyText,
          margin: "0 0 var(--ymz-space-2)",
        }}
      >
        品类偏好（可多选）
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "var(--ymz-space-2)",
          marginBottom: "var(--ymz-space-2)",
        }}
      >
        {visibleCats.map((cat) => {
          const active = selected.includes(cat);
          return (
            <button
              key={cat}
              type="button"
              onClick={() => toggleCat(cat)}
              disabled={locked}
              style={tagButtonStyle(active)}
            >
              {cat}
            </button>
          );
        })}
      </div>
      {!catExpanded && ALL_CATEGORIES.length > CATS_FIRST_ROW ? (
        <button
          type="button"
          onClick={() => setCatExpanded(true)}
          disabled={locked}
          style={{
            ...bubbleAgentBodyText,
            border: "none",
            background: "none",
            color: "var(--ymz-color-info)",
            padding: 0,
            marginBottom: "var(--ymz-space-4)",
            cursor: locked ? "default" : "pointer",
            opacity: locked ? 0.6 : 1,
          }}
        >
          展开更多品类
        </button>
      ) : (
        <div style={{ height: 8 }} />
      )}

      <p
        style={{
          ...bubbleAgentBodyText,
          margin: "0 0 var(--ymz-space-2)",
        }}
      >
        品牌偏好（可多选）
        <span style={{ ...agentSecondaryText, fontWeight: 400, marginLeft: 6 }}>选填</span>
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "var(--ymz-space-2)",
          marginBottom: "var(--ymz-space-2)",
        }}
      >
        {visibleBrands.map((brand) => {
          const active = brandSelected.includes(brand);
          return (
            <button
              key={brand}
              type="button"
              onClick={() => toggleBrand(brand)}
              disabled={locked}
              style={tagButtonStyle(active)}
            >
              {brand}
            </button>
          );
        })}
      </div>
      {!brandExpanded && ALL_BRANDS.length > BRANDS_FIRST_ROW ? (
        <button
          type="button"
          onClick={() => setBrandExpanded(true)}
          disabled={locked}
          style={{
            ...bubbleAgentBodyText,
            border: "none",
            background: "none",
            color: "var(--ymz-color-info)",
            padding: 0,
            marginBottom: "var(--ymz-space-4)",
            cursor: locked ? "default" : "pointer",
            opacity: locked ? 0.6 : 1,
          }}
        >
          展开更多品牌
        </button>
      ) : (
        <div style={{ height: 8 }} />
      )}

      <button
        type="button"
        onClick={() =>
          onSubmit({
            budgetMin,
            budgetMax: allowComboPay ? Math.max(1, budgetMax) : Math.min(Math.max(1, budgetMax), balance),
            categories: selected,
            specialNote: wantToBuy.trim(),
            brandPreferences: brandSelected,
          })
        }
        disabled={!canSubmit}
        style={{
          width: "100%",
          height: 44,
          borderRadius: "var(--ymz-radius-md)",
          border: "none",
          fontSize: "var(--ymz-ty-body)",
          fontWeight: 600,
          color: "#fff",
          cursor: canSubmit ? "pointer" : "not-allowed",
          opacity: canSubmit ? 1 : 0.5,
          background: "linear-gradient(135deg, var(--ymz-color-primary), var(--ymz-color-orange))",
        }}
      >
        开始凑单
      </button>
    </div>
  );
}
