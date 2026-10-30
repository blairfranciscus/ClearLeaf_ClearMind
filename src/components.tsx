import { asset, pages, type Page, type Tea } from "./content";
import { useCart } from "./cart";
import { useEffect, useRef, useState, type ReactNode } from "react";

export function Header({ page }: { page: Page }) {
  const { count } = useCart();
  return (
    <>
      <div className="top-note">
        Clear Mind, Clearleaf. <span aria-hidden="true">♡</span> A tea break to
        call your own.
      </div>
      <header className="site-header wrap">
        <a href="./" className="brand" aria-label="Clearleaf home">
          clearleaf<span>tea, with a little flower power.</span>
        </a>
        <nav aria-label="Main navigation">
          {pages.map((link) => (
            <a
              key={link.id}
              href={link.href}
              aria-current={page === link.id ? "page" : undefined}
            >
              {link.name}
            </a>
          ))}
        </nav>
        <a
          className="cart-link"
          href="./cart.html"
          aria-current={page === "cart" ? "page" : undefined}
        >
          <svg
            viewBox="0 0 24 24"
            width="21"
            height="21"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M5 8h14l1 13H4L5 8Z" />
            <path d="M8 8V6a4 4 0 0 1 8 0v2" />
          </svg>
          <span>My Cart</span>
          <span className="cart-count" aria-label={`${count} items`}>
            {count}
          </span>
        </a>
      </header>
    </>
  );
}
function FooterGarden() {
  const garden = useRef<HTMLDivElement>(null);
  const [revealState, setRevealState] = useState("visible");

  useEffect(() => {
    const element = garden.current;
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    // The artwork stays visible if motion is reduced or observation is unavailable.
    if (
      !element ||
      motionPreference.matches ||
      typeof IntersectionObserver !== "function"
    )
      return;

    let active = true;
    let revealed = false;
    const reveal = () => {
      if (!active || revealed) return;
      revealed = true;
      setRevealState("revealed");
      observer.disconnect();
    };
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) reveal();
      },
      { threshold: 0.12, rootMargin: "0px 0px -24px 0px" },
    );
    const handleMotionChange = () => {
      if (motionPreference.matches) reveal();
    };

    setRevealState("pending");
    observer.observe(element);
    motionPreference.addEventListener("change", handleMotionChange);
    return () => {
      active = false;
      observer.disconnect();
      motionPreference.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <div
      ref={garden}
      className="footer-garden"
      data-reveal-state={revealState}
      style={{ backgroundImage: `url("${asset("wildflower-border")}")` }}
      aria-hidden="true"
    />
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-content">
        <div>
          <a href="./" className="brand">
            clearleaf
          </a>
          <p>
            Clear Mind, Clearleaf.
            <br />
            For the moments between everything.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          {pages.map((link) => (
            <a href={link.href} key={link.id}>
              {link.name}
            </a>
          ))}
          <a href="./cart.html">My Cart</a>
        </nav>
      </div>
      <div className="wrap footer-bottom">
        <p>A University of Sydney marketing concept.</p>
        <p>Concept store · no real purchases.</p>
      </div>
      <FooterGarden />
    </footer>
  );
}
export function PageLink({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <a href={href} className={`button${secondary ? " secondary" : ""}`}>
      {children}
      <span aria-hidden="true">↗</span>
    </a>
  );
}
export function PageIntro({
  label,
  title,
  children,
}: {
  label: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="page-intro">
      <p className="eyebrow">{label}</p>
      <h1>{title}</h1>
      {children && <div className="intro-text">{children}</div>}
    </div>
  );
}
export function Sachet({ tea }: { tea: Tea }) {
  return (
    <svg
      className="sachet-artwork"
      viewBox={tea.viewBox}
      role="img"
      aria-label={`${tea.name} tea sachet`}
    >
      <image href={asset("sachets-transparent-v1")} width="2171" height="724" />
    </svg>
  );
}
export function Quantity({
  value,
  onChange,
  label,
}: {
  value: number;
  onChange: (quantity: number) => void;
  label: string;
}) {
  return (
    <div className="quantity">
      <button
        type="button"
        aria-label={`Decrease ${label}`}
        disabled={value <= 1}
        onClick={() => onChange(value - 1)}
      >
        −
      </button>
      <output aria-label={`${label} quantity`}>{value}</output>
      <button
        type="button"
        aria-label={`Increase ${label}`}
        disabled={value >= 99}
        onClick={() => onChange(value + 1)}
      >
        +
      </button>
    </div>
  );
}
