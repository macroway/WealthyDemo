import type { CSSProperties } from "react";

/** Agent 气泡内容区默认正文：与 `Bubble` 内层容器一致，供表单等嵌套内容对齐 */
export const bubbleAgentBodyText: CSSProperties = {
  color: "var(--ymz-text-primary)",
  fontSize: "var(--ymz-ty-body)",
  lineHeight: 1.55,
};

/** 辅助说明、品类标签等：次级字号 + 次要色 */
export const agentSecondaryText: CSSProperties = {
  fontSize: "var(--ymz-ty-caption)",
  color: "var(--ymz-text-secondary)",
  lineHeight: 1.5,
};
