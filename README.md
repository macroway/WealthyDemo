# Wealthy · 福利凑单 Agent UI Demo

纯前端演示：**Next.js 14.2.3 + React 18 + TypeScript 5**，对齐 PRD《福利专区-AI 购物清单推荐 V1.0》核心动线与《云梦泽好客 C 端 App 规范 0425》提取 Token（色板、间距、圆角、字体栈）。

## 动线

1. `/` 福利活动页 → 「✨ AI 推荐」  
2. `/agent` 欢迎语 → 预算/品类槽位 → 特殊要求 → **汇总 + 确认** → 推理提示 → 三套方案卡片 → 详情抽屉一键加购（Mock）

## 本地运行

```bash
cd demo/Wealthy
npm install
npm run dev
```

浏览器打开 **[http://localhost:3333](http://localhost:3333)**（勿与其它端口上旧的 `next dev` 标签页混用）。

## 常见问题

### `/_next/static/...` 404、`Cannot find module './xxx.js'`

多为 **`.next` 开发缓存与热更新不同步**。在本项目目录执行：

```bash
rm -rf .next && npm run dev
```

然后浏览器 **硬刷新**（Mac：Cmd+Shift+R）。

## 说明

- 无后端：方案数据来自 `lib/mockAgent.ts`。  
- 可将 `app/agent/page.tsx` 中 `phase === "nomatch"` 与 `buildMockPlans` 替换为真实接口。  
- 设计宽度约 **430px** 居中，模拟移动端壳层。
