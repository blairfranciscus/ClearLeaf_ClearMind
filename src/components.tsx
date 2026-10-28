import React, { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
const asset = (name: string) => `/images/${name}.png`;
export function Flower({
  x = 0,
  y = 0,
  scale = 1,
  colour = "#eeb4ad",
  delay = 0,
}: {
  x?: number;
  y?: number;
  scale?: number;
  colour?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <motion.g
        style={{ originX: "0px", originY: "130px" }}
        animate={reduced ? {} : { rotate: [-3, 3, -3] }}
        transition={{
          duration: 5 + delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.path
          d="M0 130 Q-12 75 0 0"
          fill="none"
          stroke="#66774b"
          strokeWidth="2"
          initial={{ pathLength: reduced ? 1 : 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 1.8, delay }}
        />
        <motion.g
          initial={{ scale: reduced ? 1 : 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: delay + 0.8, duration: 0.7 }}
        >
          <path
            d="M-4 85 Q-50 48 -30 48 Q-6 51 -4 85 M-3 105 Q38 65 28 71 Q6 70 -3 105"
            fill="#a6b77b"
            stroke="#66774b"
            strokeWidth="1.5"
          />
        </motion.g>
        <motion.g
          initial={{ scale: reduced ? 1 : 0 }}
          whileInView={{ scale: 1 }}
          whileHover={{ scale: 1.17, rotate: 12 }}
          transition={{ delay: delay + 1, duration: 0.7 }}
        >
          {Array.from({ length: 8 }, (_, i) => (
            <ellipse
              key={i}
              cx="0"
              cy="-15"
              rx="7"
              ry="16"
              fill={colour}
              stroke="#716b48"
              strokeWidth="1.2"
              transform={`rotate(${i * 45})`}
            />
          ))}
          <circle r="8" fill="#e5bc50" stroke="#716b48" strokeWidth="1.2" />
        </motion.g>
      </motion.g>
    </g>
  );
}
export function Sprig({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`sprig ${className}`}
      viewBox="-50 -40 130 190"
      aria-hidden="true"
    >
      <Flower x={10} y={5} scale={0.8} />
      <Flower x={55} y={50} scale={0.55} colour="#f4edca" delay={0.3} />
    </svg>
  );
}
export function HeroArt() {
  const reduce = useReducedMotion();
  return (
    <div className="hero-art">
      <div className="art-orbit" />
      <span className="art-note">
        a little pause,
        <br />a little possibility.
      </span>
      <svg
        className="teacup"
        viewBox="0 0 600 600"
        role="img"
        aria-label="Clearleaf floral teacup with blooming botanical stems"
      >
        <defs>
          <clipPath id="cup-crop">
            <rect x="115" y="310" width="366" height="220" />
          </clipPath>
        </defs>
        <Flower x={225} y={210} scale={1.25} delay={0.4} />
        <Flower x={334} y={145} scale={1.65} delay={0.7} />
        <Flower x={403} y={265} scale={0.85} colour="#eee4ac" delay={1} />
        <Flower x={169} y={279} scale={0.65} colour="#f9f6e5" delay={0.2} />
        <motion.path
          d="M126 346 Q265 390 445 346 L425 443 Q411 509 282 510 Q174 508 152 445 Z M446 363 C535 320 525 451 426 469"
          fill="none"
          stroke="#424d37"
          strokeWidth="3"
          initial={{ pathLength: reduce ? 1 : 0 }}
          animate={{ pathLength: 1, opacity: reduce ? 0 : [1, 1, 0] }}
          transition={{
            pathLength: { duration: 2 },
            opacity: { duration: 3, times: [0, 0.75, 1] },
          }}
        />
        <motion.image
          href={asset("brand-board")}
          x="-250"
          y="-210"
          width="1050"
          height="1012"
          clipPath="url(#cup-crop)"
          initial={{ opacity: reduce ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1.2 }}
        />
      </svg>
      <div className="art-caption">
        <span className="tiny-star">✳</span> ROOTED IN LITTLE EVERYDAY RITUALS
      </div>
    </div>
  );
}
export function Overlay({
  title,
  onClose,
  children,
  drawer = false,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  drawer?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.focus();
    function key(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const nodes = ref.current?.querySelectorAll<HTMLElement>(
          'button,a[href],input,[tabindex="0"]',
        );
        if (!nodes?.length) return;
        const first = nodes[0],
          last = nodes[nodes.length - 1];
        if (
          e.shiftKey &&
          (document.activeElement === first ||
            document.activeElement === ref.current)
        ) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = before;
      document.removeEventListener("keydown", key);
      previous?.focus();
    };
  }, [onClose]);
  return (
    <div
      className="overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={ref}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={drawer ? "modal drawer" : "modal"}
        initial={{ opacity: 0, x: drawer ? 50 : 0, y: drawer ? 0 : 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
      >
        <div className="modal-heading">
          <span className="eyebrow">{title}</span>
          <button
            className="icon-button"
            aria-label="Close dialog"
            onClick={onClose}
          >
            <X />
          </button>
        </div>
        {children}
      </motion.div>
    </div>
  );
}
