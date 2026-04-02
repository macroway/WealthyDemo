export type PlanProfile = "closest_use_up" | "quality_pick" | "stock_practical";

export interface PlanLine {
  skuId: string;
  title: string;
  spec: string;
  qty: number;
  unitPrice: number;
  lineWelfare: number;
  lineSelfPay: number;
  thumbColor: string;
}

export interface ShoppingPlan {
  id: string;
  planProfile: PlanProfile;
  title: string;
  subtitle: string;
  reason: string;
  totalWelfare: number;
  totalSelfPay: number;
  balance: number;
  skuCount: number;
  categoryCount: number;
  lines: PlanLine[];
}

export interface IntentDraft {
  budgetMin: number;
  budgetMax: number;
  categories: string[];
  /** 想购买的商品描述（必填） */
  specialNote: string;
  /** 品牌偏好（选填，可多选） */
  brandPreferences: string[];
}
