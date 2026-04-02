"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

function MonitorChartIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 100"
      width="120"
      height="100"
      aria-hidden
    >
      <rect
        x="8"
        y="12"
        width="104"
        height="72"
        rx="6"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
      />
      <path d="M 8 68 L 112 68" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <rect x="32" y="44" width="14" height="24" rx="2" fill="currentColor" />
      <rect x="52" y="34" width="14" height="34" rx="2" fill="currentColor" />
      <rect x="72" y="48" width="14" height="20" rx="2" fill="currentColor" />
      <path d="M 48 88 L 72 88 L 60 98 Z" fill="currentColor" />
    </svg>
  );
}

function AiRecommendIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09zM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456zM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423z" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M6 6h15l-1.5 9h-12z" strokeLinejoin="round" />
      <path d="M6 6L5 3H2" strokeLinecap="round" />
      <circle cx="9" cy="20" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="17" cy="20" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function WelfareActivityPage() {
  const router = useRouter();

  return (
    <div className="ymz-activity-page">
      <header className="ymz-activity-nav">
        <button
          type="button"
          className="ymz-activity-nav-back"
          onClick={() => router.back()}
          aria-label="返回"
        >
          ‹
        </button>
        <h1 className="ymz-activity-nav-title">福利活动</h1>
        <span className="ymz-activity-nav-spacer" aria-hidden />
      </header>

      <main className="ymz-activity-main">
        <div className="ymz-activity-hero-visual">
          <MonitorChartIcon className="ymz-activity-monitor" />
        </div>

        <div className="ymz-activity-balance-row">
          <span className="ymz-activity-balance-num">800.00</span>
          <span className="ymz-activity-balance-tag">福利值</span>
        </div>

        <p className="ymz-activity-issuer">甘肃古河州酒业有限责任公司发放</p>

        <div className="ymz-activity-time-card">
          <div className="ymz-activity-time-row">
            <span className="ymz-activity-time-label">开始时间</span>
            <span className="ymz-activity-time-value">2026-03-05 16:00:00</span>
          </div>
          <div className="ymz-activity-time-row">
            <span className="ymz-activity-time-label">结束时间</span>
            <span className="ymz-activity-time-value">2027-04-30 00:00:00</span>
          </div>
        </div>

        <div className="ymz-activity-actions">
          <button type="button" className="ymz-activity-goshop">
            自行选购
          </button>
          <Link href="/agent" className="ymz-activity-action-ai" aria-label="智能凑单">
            <AiRecommendIcon />
            <span>智能凑单</span>
          </Link>
        </div>
      </main>

      <button type="button" className="ymz-activity-rules-tab">
        活动规则
      </button>

      <button type="button" className="ymz-activity-cart-fab" aria-label="购物车，3件">
        <span className="ymz-activity-cart-fab-inner">
          <CartIcon />
        </span>
        <span className="ymz-activity-cart-badge">3</span>
      </button>
    </div>
  );
}
