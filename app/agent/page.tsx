"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { Bubble } from "@/components/agent/Bubble";
import { IntentSlotForm } from "@/components/agent/IntentSlotForm";
import { LoadingOverlay } from "@/components/agent/LoadingOverlay";
import { NavBar } from "@/components/agent/NavBar";
import { PlanCard } from "@/components/agent/PlanCard";
import { PlanDetailSheet } from "@/components/agent/PlanDetailSheet";
import { THINKING_STEPS, generateShoppingPlans } from "@/lib/mockAgent";
import type { IntentDraft, ShoppingPlan } from "@/lib/types";

const ACTIVITY_NAME = "春季员工福利";
const BALANCE = 800;
const ALLOW_COMBO_PAY = true;

type Phase = "intent" | "thinking" | "plans" | "plan_error" | "nomatch";

type PlanRound = {
  userLine: string;
  plans: ShoppingPlan[];
  genError?: string;
};

export default function AgentPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("intent");
  const [intent, setIntent] = useState<IntentDraft | null>(null);
  const [thinkingIdx, setThinkingIdx] = useState(0);
  const [thinkingExpanded, setThinkingExpanded] = useState(false);
  const [planRounds, setPlanRounds] = useState<PlanRound[]>([]);
  const [detailPlan, setDetailPlan] = useState<ShoppingPlan | null>(null);
  const [adopting, setAdopting] = useState(false);
  const [specialDraft, setSpecialDraft] = useState("");
  /** 演示用：访问 /agent?planFail=1 时，首次生成方案失败一次 */
  const [demoPlanFailQuery, setDemoPlanFailQuery] = useState(false);
  const planGenFailDemoUsedRef = useRef(false);
  const lastGenContextRef = useRef<{ draft: IntentDraft; roundIndex: number } | null>(null);

  const thinkingTimeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    setDemoPlanFailQuery(new URLSearchParams(window.location.search).get("planFail") === "1");
  }, []);

  const clearThinkingTimeouts = useCallback(() => {
    thinkingTimeoutsRef.current.forEach((id) => window.clearTimeout(id));
    thinkingTimeoutsRef.current = [];
  }, []);

  const startThinking = useCallback(
    (draft: IntentDraft, roundIndex: number) => {
      clearThinkingTimeouts();
      lastGenContextRef.current = { draft, roundIndex };
      setIntent(draft);
      setPhase("thinking");
      setThinkingIdx(0);
      setThinkingExpanded(true);

      setPlanRounds((prev) => {
        if (prev.length === 0) return prev;
        const next = [...prev];
        const last = next[next.length - 1];
        if (last?.genError) {
          next[next.length - 1] = { ...last, genError: undefined };
        }
        return next;
      });

      const steps = THINKING_STEPS.length;
      const pushT = (fn: () => void, ms: number) => {
        thinkingTimeoutsRef.current.push(window.setTimeout(fn, ms));
      };

      if (steps >= 2) {
        pushT(() => setThinkingIdx(1), 1000);
      }
      if (steps >= 3) {
        for (let idx = 2; idx < steps; idx += 1) {
          const delayMs = 1000 + (idx - 1) * 3000;
          pushT(() => setThinkingIdx(idx), delayMs);
        }
      }

      const finishDelayMs =
        steps <= 1 ? 800 : 1000 + Math.max(0, steps - 2) * 3000 + 800;

      pushT(() => {
        const forceFailure =
          demoPlanFailQuery && !planGenFailDemoUsedRef.current ? true : false;
        if (forceFailure) planGenFailDemoUsedRef.current = true;

        const outcome = generateShoppingPlans(draft, BALANCE, {
          roundIndex,
          forceFailure,
        });

        setPlanRounds((prev) => {
          const next = [...prev];
          const last = next[next.length - 1];
          if (!last) return next;
          if (outcome.ok) {
            next[next.length - 1] = {
              ...last,
              plans: outcome.plans,
              genError: undefined,
            };
          } else {
            next[next.length - 1] = {
              ...last,
              plans: [],
              genError: outcome.message,
            };
          }
          return next;
        });
        setThinkingExpanded(false);
        setPhase(outcome.ok ? "plans" : "plan_error");
      }, finishDelayMs);
    },
    [clearThinkingTimeouts, demoPlanFailQuery]
  );

  const retryLastGeneration = useCallback(() => {
    const ctx = lastGenContextRef.current;
    if (!ctx) return;
    startThinking(ctx.draft, ctx.roundIndex);
  }, [startThinking]);

  const sendFollowUp = (note: string) => {
    if (!intent) return;
    const trimmed = note.trim();
    const display = trimmed === "" ? "（空消息，按原偏好重算）" : trimmed;
    const mergedNote =
      trimmed === ""
        ? intent.specialNote
        : `${intent.specialNote ? `${intent.specialNote}\n` : ""}· 补充：${trimmed}`;
    const merged = { ...intent, specialNote: mergedNote };
    setIntent(merged);
    const nextIndex = planRounds.length;
    setPlanRounds((prev) => [...prev, { userLine: display, plans: [] }]);
    setDetailPlan(null);
    startThinking(merged, nextIndex);
    setSpecialDraft("");
  };

  const handleSend = () => {
    if (phase === "intent" || phase === "thinking" || phase === "plan_error") return;
    const note = specialDraft.trim();
    if (phase === "plans" && intent) {
      sendFollowUp(note);
    }
  };

  return (
    <div className="ymz-app-shell">
      <NavBar title="福利购物清单Agent" />

      <div
        style={{
          padding: "var(--ymz-space-4)",
          paddingBottom: "calc(120px + env(safe-area-inset-bottom, 0))",
          minHeight: "calc(100vh - var(--ymz-nav-h))",
        }}
      >
        <Bubble role="agent">
          <>
            欢迎参加 <strong>{ACTIVITY_NAME}</strong>
            ，当前你有{" "}
            <strong style={{ color: "var(--ymz-color-primary)" }}>{BALANCE}</strong>{" "}
            福利值可用。请先填写预算与商品需求。
          </>
        </Bubble>

        <Bubble role="agent">
          <IntentSlotForm
            balance={BALANCE}
            allowComboPay={ALLOW_COMBO_PAY}
            locked={phase !== "intent"}
            onSubmit={(p) => {
              const note = p.specialNote.trim();
              const merged: IntentDraft = {
                budgetMin: p.budgetMin,
                budgetMax: p.budgetMax,
                categories: p.categories,
                specialNote: note,
                brandPreferences: p.brandPreferences,
              };
              setIntent(merged);
              setSpecialDraft("");
              setPlanRounds([{ userLine: note, plans: [] }]);
              startThinking(merged, 0);
            }}
          />
        </Bubble>

        {planRounds.map((round, ri) => (
          <div key={`round-${ri}`}>
            {round.userLine ? <Bubble role="user">{round.userLine}</Bubble> : null}
            {round.genError ? (
              <Bubble role="agent">
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--ymz-space-3)" }}>
                  <p style={{ margin: 0, fontSize: "var(--ymz-ty-body)", lineHeight: 1.55 }}>
                    {round.genError}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "var(--ymz-space-2)",
                      alignItems: "center",
                    }}
                  >
                    <button
                      type="button"
                      onClick={retryLastGeneration}
                      style={{
                        height: 40,
                        padding: "0 var(--ymz-space-4)",
                        borderRadius: 20,
                        border: "none",
                        fontWeight: 600,
                        fontSize: "var(--ymz-ty-caption)",
                        color: "#fff",
                        cursor: "pointer",
                        background:
                          "linear-gradient(135deg, var(--ymz-color-primary), var(--ymz-color-orange))",
                      }}
                    >
                      重试生成
                    </button>
                    <Link
                      href="/"
                      style={{
                        fontSize: "var(--ymz-ty-caption)",
                        fontWeight: 600,
                        color: "var(--ymz-color-info)",
                        textDecoration: "none",
                      }}
                    >
                      去福利商城自行选购 →
                    </Link>
                  </div>
                </div>
              </Bubble>
            ) : null}
            {round.plans.length > 0 ? (
              <>
                <Bubble role="agent">
                  <span
                    style={{ fontSize: "var(--ymz-ty-caption)", color: "var(--ymz-text-secondary)" }}
                  >
                    {ri === 0 ? "已生成方案" : "已按您的补充重新生成方案"}
                  </span>
                </Bubble>
                <Bubble role="agent">为您推荐了 3 套差异化方案，并包含了您要求的立白洗衣液、维达纸巾、五常大米，点击卡片查看详情。</Bubble>
                {round.plans.map((p, idx) => (
                  <PlanCard
                    key={p.id}
                    plan={p}
                    index={idx + 1}
                    balance={BALANCE}
                    onOpen={() => setDetailPlan(p)}
                  />
                ))}
              </>
            ) : null}
          </div>
        ))}

        {phase === "thinking" && thinkingExpanded ? (
          <Bubble role="agent">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--ymz-space-2)" }}>
                <div
                  className="ymz-spinner"
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    border: "2px solid var(--ymz-border)",
                    borderTopColor: "var(--ymz-color-primary)",
                  }}
                />
                <span style={{ fontWeight: 600, fontSize: "var(--ymz-ty-caption)" }}>思考中</span>
              </div>
              <div style={{ marginTop: "var(--ymz-space-3)" }}>
                {THINKING_STEPS.slice(0, thinkingIdx + 1).map((t, idx) => (
                  <div
                    key={`${idx}-${t}`}
                    style={{
                      fontSize: "var(--ymz-ty-caption)",
                      color: "var(--ymz-text-secondary)",
                      lineHeight: 1.5,
                      marginTop: idx === 0 ? 0 : "var(--ymz-space-2)",
                    }}
                  >
                    · {t}
                  </div>
                ))}
              </div>
            </div>
          </Bubble>
        ) : null}

        {phase === "nomatch" ? (
          <Bubble role="agent">匹配到的商品数量不足，请放宽品类等条件后重试。</Bubble>
        ) : null}
      </div>

      <div
        style={{
          position: "fixed",
          left: "50%",
          transform: "translateX(-50%)",
          bottom: "calc(var(--ymz-safe-bottom) + var(--ymz-space-4))",
          width: "min(430px, 100%)",
          padding: "0 var(--ymz-space-4)",
          zIndex: 30,
        }}
      >
        <div style={{ display: "flex", gap: "var(--ymz-space-2)" }}>
          <input
            value={specialDraft}
            onChange={(e) => setSpecialDraft(e.target.value)}
            placeholder={
              phase === "plans" ? "补充要求后发送，将重新生成方案…" : "发消息继续对话..."
            }
            style={{
              width: "100%",
              height: 44,
              borderRadius: 22,
              border: "1px solid var(--ymz-border)",
              padding: "0 var(--ymz-space-4)",
              fontSize: "var(--ymz-ty-caption)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            }}
            disabled={phase === "thinking" || phase === "plan_error"}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
            aria-label="对话输入"
          />
          <button
            type="button"
            disabled={phase === "intent" || phase === "thinking" || phase === "plan_error"}
            onClick={handleSend}
            style={{
              height: 44,
              padding: "0 var(--ymz-space-4)",
              borderRadius: 22,
              border: "none",
              fontWeight: 700,
              color: "#fff",
              cursor:
                phase === "intent" || phase === "thinking" || phase === "plan_error"
                  ? "not-allowed"
                  : "pointer",
              background: "linear-gradient(135deg, var(--ymz-color-primary), var(--ymz-color-orange))",
              whiteSpace: "nowrap",
              boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
              opacity:
                phase === "intent" || phase === "thinking" || phase === "plan_error" ? 0.5 : 1,
            }}
          >
            发送
          </button>
        </div>
      </div>

      <PlanDetailSheet
        plan={detailPlan}
        balance={BALANCE}
        open={Boolean(detailPlan)}
        adopting={adopting}
        onClose={() => !adopting && setDetailPlan(null)}
        onAdopt={() => {
          if (!detailPlan) return;
          setAdopting(true);
          window.setTimeout(() => {
            setAdopting(false);
            setDetailPlan(null);
            router.push("/cart");
          }, 1200);
        }}
      />

      {adopting ? <LoadingOverlay message="正在写入购物车，请稍候…" /> : null}

    </div>
  );
}
