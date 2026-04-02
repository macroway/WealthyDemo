import type { IntentDraft, ShoppingPlan } from "./types";

const PLACEHOLDER_THUMBS = [
  "#14A9FF",
  "#54B837",
  "#FF5F14",
  "#FF010F",
  "#666666",
  "#222222",
];

function line(
  i: number,
  title: string,
  spec: string,
  qty: number,
  unit: number,
  self: number
) {
  const lineWelfare = unit * qty;
  return {
    skuId: `SKU${1000 + i}`,
    title,
    spec,
    qty,
    unitPrice: unit,
    lineWelfare,
    lineSelfPay: self,
    thumbColor: PLACEHOLDER_THUMBS[i % PLACEHOLDER_THUMBS.length],
  };
}

export function buildMockPlans(
  intent: IntentDraft,
  balance: number,
  options?: { roundIndex?: number }
): ShoppingPlan[] {
  const round = options?.roundIndex ?? 0;
  const roundTag = round > 0 ? ` · 第${round + 1}轮` : "";
  const mid = Math.round((intent.budgetMin + intent.budgetMax) / 2);

  const aTotal = balance;
  const bTotal = Math.min(Math.round(balance * 1.05), intent.budgetMax + 40);
  const cTotal = Math.round(balance * 0.98);

  const plans: ShoppingPlan[] = [
    {
      id: `plan-a-r${round}`,
      planProfile: "closest_use_up",
      title: `刚好花完${roundTag}`,
      subtitle: "不想剩余额 · 尽量贴近余额",
      reason: `在满足品类分散的前提下，将福利使用额对齐您的目标区间。${intent.specialNote ? "（已参考您想购买的商品描述）" : ""}${intent.brandPreferences?.length ? `（品牌偏好：${intent.brandPreferences.join("、")}）` : ""}`,
      totalWelfare: aTotal,
      totalSelfPay: 0,
      balance,
      skuCount: 6,
      categoryCount: 5,
      lines: [
        line(0, "燕麦牛奶礼盒", "1kg", 1, 128, 0),
        line(1, "洗衣液家庭装", "3L", 2, 89, 0),
        line(2, "厨房纸巾", "12卷", 1, 56, 0),
        line(3, "进口坚果混合", "500g", 1, 199, 0),
        line(4, "儿童牙刷套装", "4支", 1, 45, 0),
        line(5, "消毒湿巾", "80抽×3", 1, Math.max(0, aTotal - (128 + 89 * 2 + 56 + 199 + 45)), 0),
      ],
    },
    {
      id: `plan-b-r${round}`,
      planProfile: "quality_pick",
      title: `品质优选${roundTag}`,
      subtitle: "买好一点 · 可含少量自付",
      reason: "优先中高价格带与更高评分商品，余额略超时可组合支付。",
      totalWelfare: balance,
      totalSelfPay: Math.max(0, bTotal - balance),
      balance,
      skuCount: 3,
      categoryCount: 3,
      lines: [
        line(0, "智能恒温杯", "Pro款", 1, 642, Math.max(0, bTotal - balance)),
        line(1, "有机橄榄油", "750ml", 1, 198, 0),
        line(2, "蚕丝眼罩", "礼盒", 1, Math.max(0, mid - 268 - 198), 0),
      ],
    },
    {
      id: `plan-c-r${round}`,
      planProfile: "stock_practical",
      title: `囤货实用${roundTag}`,
      subtitle: "日用为主 · 件数更多",
      reason: "低价格带与日用品类组合，用件数堆满福利使用额。",
      totalWelfare: cTotal,
      totalSelfPay: 0,
      balance,
      skuCount: 9,
      categoryCount: 4,
      lines: [
        line(0, "抽纸", "130抽×8包", 2, 32, 0),
        line(1, "垃圾袋", "100只加厚", 1, 19, 0),
        line(2, "洗洁精", "1.2kg", 1, 22, 0),
        line(3, "牙刷", "软毛×6", 1, 28, 0),
        line(4, "香皂", "3块装", 2, 15, 0),
        line(5, "保鲜袋组合", "大中小", 1, 18, 0),
        line(6, "衣架", "10支", 1, 25, 0),
        line(7, "电池", "8节", 1, 35, 0),
        line(
          8,
          "补充小食",
          "威化/饼干",
          1,
          Math.max(0, cTotal - (32 * 2 + 19 + 22 + 28 + 15 * 2 + 18 + 25 + 35)),
          0
        ),
      ],
    },
  ];

  return plans.map((p) => {
    const tw = p.lines.reduce((s, l) => s + l.lineWelfare, 0);
    const ts = p.lines.reduce((s, l) => s + l.lineSelfPay, 0);
    const cats = new Set(p.lines.map((_, idx) => `C${idx % p.categoryCount}`));
    return {
      ...p,
      totalWelfare: tw,
      totalSelfPay: ts,
      skuCount: p.lines.length,
      categoryCount: Math.max(p.categoryCount, cats.size),
    };
  });
}

export type PlanGenerationOutcome =
  | { ok: true; plans: ShoppingPlan[] }
  | { ok: false; message: string };

/**
 * 模拟「模型生成方案」结果。生产环境可替换为真实 API 的 resolve/reject。
 * forceFailure：用于演示失败链路（如 URL ?planFail=1 首次请求）。
 */
export function generateShoppingPlans(
  intent: IntentDraft,
  balance: number,
  options?: { roundIndex?: number; forceFailure?: boolean }
): PlanGenerationOutcome {
  if (options?.forceFailure) {
    return {
      ok: false,
      message:
        "因系统问题，暂时无法生成智能推荐方案。您可稍后重试，或直接去商城按福利值自行选购。",
    };
  }
  return { ok: true, plans: buildMockPlans(intent, balance, options) };
}

export const THINKING_STEPS = [
  "已接收您的需求，思考中…",
  "正在筛选热销优质商品…",
  "正在组装多套购物清单…",
  "即将为您呈现凑单推荐方案",
];
