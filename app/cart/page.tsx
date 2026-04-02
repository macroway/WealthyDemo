"use client";

import Link from "next/link";
import { useState } from "react";

function HeartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--ymz-color-primary)" aria-hidden>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2" aria-hidden>
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

function TabHome({ active }: { active?: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
      <path
        fill={active ? "var(--ymz-color-primary)" : "#999"}
        d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z"
      />
    </svg>
  );
}

function TabCart({ active }: { active?: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
      <path
        fill={active ? "var(--ymz-color-primary)" : "#999"}
        d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.1-.18.15-.38.15-.58 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"
      />
    </svg>
  );
}

function TabMe({ active }: { active?: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
      <path
        fill={active ? "var(--ymz-color-primary)" : "#999"}
        d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
      />
    </svg>
  );
}

export default function WelfareCartPage() {
  const [qty, setQty] = useState(1);
  const [groupChecked, setGroupChecked] = useState(false);
  const [itemChecked, setItemChecked] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  const lineWelfare = 89.2;
  const totalWelfare = 0.00;

  return (
    <div className="ymz-welfare-cart">
      <div className="ymz-welfare-cart-status" aria-hidden>
        <span>9:41</span>
        <span className="ymz-welfare-cart-status-icons">5G ●</span>
      </div>

      <header className="ymz-welfare-cart-header">
        <h1 className="ymz-welfare-cart-title">购物车</h1>
        <div className="ymz-welfare-cart-header-actions">
        </div>
      </header>

      <main className="ymz-welfare-cart-main">
        <button type="button" className="ymz-welfare-cart-address">
          <div className="ymz-welfare-cart-address-top">
            <span className="ymz-welfare-cart-address-from">从这里</span>
            <span className="ymz-welfare-cart-address-phone">133-3331-5667</span>
          </div>
          <div className="ymz-welfare-cart-address-row">
            <span className="ymz-welfare-cart-address-text">
              沙河镇昌平区中石油科技创新基地 A12-B2
            </span>
            <ChevronRight />
          </div>
        </button>

        <section className="ymz-welfare-cart-group">
          <div className="ymz-welfare-cart-group-head">
            <label className="ymz-welfare-cart-check-wrap">
              <input
                type="checkbox"
                checked={groupChecked}
                onChange={(e) => setGroupChecked(e.target.checked)}
                className="ymz-welfare-cart-checkbox"
              />
            </label>
            <span className="ymz-welfare-cart-group-name">春季福利活动</span>
            <span className="ymz-welfare-cart-group-total">
              合计(可用额): <em>800</em>
            </span>
          </div>

          <div className="ymz-welfare-cart-item">
            <label className="ymz-welfare-cart-check-wrap">
              <input
                type="checkbox"
                checked={itemChecked}
                onChange={(e) => setItemChecked(e.target.checked)}
                className="ymz-welfare-cart-checkbox"
              />
            </label>
            <div className="ymz-welfare-cart-thumb" aria-hidden>
              <div className="ymz-welfare-cart-thumb-inner" />
            </div>
            <div className="ymz-welfare-cart-item-body">
              <p className="ymz-welfare-cart-item-title">
                昆仑山 饮用天然矿泉水 4.5L*4桶…
              </p>
              <button type="button" className="ymz-welfare-cart-item-tag">
                中石化/中石油加油站 <span className="ymz-welfare-cart-item-tag-arrow">›</span>
              </button>
              <div className="ymz-welfare-cart-item-foot">
                <span className="ymz-welfare-cart-price">
                  {lineWelfare.toFixed(2)} <span className="ymz-welfare-cart-price-unit">福利值</span>
                </span>
                <div className="ymz-welfare-cart-stepper">
                  <button
                    type="button"
                    className="ymz-welfare-cart-stepper-btn"
                    aria-label="减少"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                  >
                    −
                  </button>
                  <span className="ymz-welfare-cart-stepper-val">{qty}</span>
                  <button
                    type="button"
                    className="ymz-welfare-cart-stepper-btn"
                    aria-label="增加"
                    onClick={() => setQty((q) => q + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <div className="ymz-welfare-cart-bottom-wrap">
        <div className="ymz-welfare-cart-actionbar">
          <label className="ymz-welfare-cart-select-all">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={(e) => {
                const v = e.target.checked;
                setSelectAll(v);
                setGroupChecked(v);
                setItemChecked(v);
              }}
              className="ymz-welfare-cart-checkbox"
            />
            <span>全选</span>
          </label>
          <div className="ymz-welfare-cart-actionbar-mid">
            <span className="ymz-welfare-cart-actionbar-label">合计:</span>
            <span className="ymz-welfare-cart-actionbar-total">
              {totalWelfare.toFixed(2)} <span className="ymz-welfare-cart-price-unit">福利值</span>
            </span>
          </div>
          <button type="button" className="ymz-welfare-cart-checkout">
            去结算
          </button>
        </div>

        <nav className="ymz-welfare-cart-tabbar" aria-label="主导航">
          <Link href="/" className="ymz-welfare-cart-tab">
            <TabHome />
            <span>首页</span>
          </Link>
          <Link href="/cart" className="ymz-welfare-cart-tab ymz-welfare-cart-tab--active">
            <TabCart active />
            <span>购物车</span>
          </Link>
          <span className="ymz-welfare-cart-tab ymz-welfare-cart-tab--disabled">
            <TabMe />
            <span>我的</span>
          </span>
        </nav>
      </div>
    </div>
  );
}
