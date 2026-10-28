import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  ShoppingBag,
  X,
  Plus,
  Minus,
  Leaf,
  Menu,
  Check,
  RotateCcw,
} from "lucide-react";
import { products, questions, type Product } from "./content";
import { Flower, Sprig, HeroArt, Overlay } from "./components";
import "./styles.css";
const asset = (name: string) => `${import.meta.env.BASE_URL}images/${name}.png`;
type Cart = Record<string, number>;
function readCart(): Cart {
  try {
    const data = JSON.parse(localStorage.getItem("clearleaf-cart") || "{}");
    return Object.fromEntries(
      products.map((p) => [
        p.id,
        Number.isInteger(data?.[p.id])
          ? Math.min(99, Math.max(0, data[p.id]))
          : 0,
      ]),
    );
  } catch {
    return {};
  }
}
function App() {
  const reduced = useReducedMotion();
  const [cart, setCart] = useState<Cart>(readCart),
    [cartOpen, setCartOpen] = useState(false),
    [product, setProduct] = useState<Product | null>(null),
    [qty, setQty] = useState(1),
    [quiz, setQuiz] = useState(false),
    [answers, setAnswers] = useState<string[]>([]),
    [menu, setMenu] = useState(false),
    [notice, setNotice] = useState("");
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  useEffect(() => {
    try {
      localStorage.setItem("clearleaf-cart", JSON.stringify(cart));
    } catch {
      /* Cart remains usable when storage is unavailable. */
    }
  }, [cart]);
  useEffect(() => {
    if (notice) {
      const t = setTimeout(() => setNotice(""), 2600);
      return () => clearTimeout(t);
    }
  }, [notice]);
  function update(id: string, n: number) {
    setCart((c) => ({
      ...c,
      [id]: Math.max(0, Math.min(99, (c[id] || 0) + n)),
    }));
  }
  function add(p: Product, n = 1) {
    update(p.id, n);
    setNotice(`${p.name} added to your bag`);
  }
  function detail(p: Product) {
    setProduct(p);
    setQty(1);
    setQuiz(false);
  }
  const result = products.reduce(
    (a, b) =>
      answers.filter((x) => x === b.id).length >
      answers.filter((x) => x === a.id).length
        ? b
        : a,
    products[0],
  );
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="announcement">
        A little pause in your day. A little Clearleaf. <span>✳</span>
      </div>
      <header>
        <a href="#home" className="wordmark" aria-label="Clearleaf home">
          CLEARLEAF<span>BOTANICAL TEA · LITTLE DAILY RITUALS</span>
        </a>
        <nav aria-label="Main navigation" className={menu ? "open" : ""}>
          {[
            ["Our teas", "teas"],
            ["Find your tea", "quiz"],
            ["Our story", "story"],
            ["On campus", "campus"],
          ].map(([text, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
              {text}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <button
            onClick={() => setCartOpen(true)}
            className="bag-button"
            aria-label={`Open shopping bag, ${count} items`}
          >
            <ShoppingBag size={20} />
            <span className="bag-label">Your bag</span>
            <span className="count">{count}</span>
          </button>
          <button
            className="mobile-menu icon-button"
            aria-label="Toggle navigation"
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main id="main">
        <section className="hero section" id="home">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="small-line" /> A FRESH LITTLE RITUAL
            </div>
            <h1>
              Clear mind.
              <br />
              <em>Clearleaf.</em>
              <svg viewBox="0 0 330 20" aria-hidden="true">
                <path
                  d="M5 13 Q150 -3 320 9 M30 18 Q175 5 290 14"
                  fill="none"
                  stroke="#a6b67d"
                  strokeWidth="2"
                />
              </svg>
            </h1>
            <p>
              For the chapters, the catch-ups,
              <br className="desktop" /> and the moments in between.
              <br />
              Meet your new botanical tea ritual.
            </p>
            <div className="hero-buttons">
              <a className="button" href="#teas">
                Explore our teas <ArrowUpRight size={18} />
              </a>
              <button
                className="text-button"
                onClick={() => {
                  setQuiz(true);
                  setAnswers([]);
                }}
              >
                Find your tea <ArrowRight size={17} />
              </button>
            </div>
            <div className="hero-footnote">
              <Leaf size={16} /> Three flavours. A moment for you.
            </div>
          </div>
          <HeroArt />
          <a className="scroll-note" href="#teas">
            <ArrowDown size={15} /> A little more to discover
          </a>
          <span className="hero-number">01 / LET’S PUT THE KETTLE ON</span>
        </section>
        <div className="ribbon">
          <span>Made for your everyday</span>
          <i>✳</i>
          <span>Inspired by botanicals</span>
          <i>✳</i>
          <span>A moment between chapters</span>
          <i>✳</i>
          <span>Clear mind, Clearleaf</span>
        </div>
        <section className="section teas" id="teas">
          <div className="section-heading">
            <div>
              <div className="eyebrow">THREE FLAVOURS. YOUR LITTLE RITUAL.</div>
              <h2>
                Good things come
                <br />
                in <em>little sachets.</em>
              </h2>
            </div>
            <p>
              A colour for every kind of day.
              <br />
              Meet the Clearleaf collection.
            </p>
            <Sprig />
          </div>
          <div className="product-grid">
            {products.map((p, i) => (
              <motion.article
                key={p.id}
                className="product-card"
                style={{ "--product": p.colour } as React.CSSProperties}
                initial={reduced ? false : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: i * 0.12 }}
              >
                <button
                  className="product-image"
                  onClick={() => detail(p)}
                  aria-label={`Explore ${p.name}`}
                >
                  <span className="product-index">0{i + 1}</span>
                  <span className="product-doodle">
                    {i === 0 ? "✿" : i === 1 ? "❧" : "☼"}
                  </span>
                  <img
                    src={asset(p.image)}
                    alt={`${p.name} Clearleaf tea sachet`}
                    loading="lazy"
                  />
                  <span className="product-view">
                    Take a closer look <ArrowUpRight size={16} />
                  </span>
                </button>
                <div className="product-info">
                  <span className="eyebrow">{p.label}</span>
                  <div className="product-title">
                    <button onClick={() => detail(p)}>
                      <h3>{p.name}</h3>
                    </button>
                    <button
                      className="round-button"
                      onClick={() => add(p)}
                      aria-label={`Add ${p.name} to bag`}
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                  <p>{p.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
          <p className="concept-note">
            A student-created powdered tea concept. Single-serve sachets, made
            for hot or cold water.
          </p>
        </section>
        <section className="quiz-banner section" id="quiz">
          <div className="quiz-art">
            <svg viewBox="0 0 280 290" aria-hidden="true">
              <Flower x={75} y={75} scale={1.2} />
              <Flower
                x={180}
                y={120}
                scale={0.9}
                colour="#f4eab3"
                delay={0.4}
              />
              <path
                d="M40 230 Q140 265 230 230"
                stroke="#65744d"
                fill="none"
                strokeWidth="2"
              />
              <text
                x="135"
                y="280"
                textAnchor="middle"
                fill="#65744d"
                fontFamily="Georgia"
                fontStyle="italic"
                fontSize="19"
              >
                a flavour that feels like you
              </text>
            </svg>
          </div>
          <div>
            <div className="eyebrow">LET YOUR TASTE LEAD THE WAY</div>
            <h2>
              Your next favourite
              <br />
              is <em>waiting to bloom.</em>
            </h2>
            <p>
              Berry daydreamer? Mint enthusiast? A little sunshine?
              <br />
              Three little questions. One tea to try.
            </p>
            <button
              className="button"
              onClick={() => {
                setQuiz(true);
                setAnswers([]);
              }}
            >
              Find my tea <ArrowUpRight size={18} />
            </button>
            <span className="quiz-time">A little moment · 3 questions</span>
          </div>
          <span className="quiz-star">✳</span>
        </section>
        <section className="section story" id="story">
          <div className="story-image">
            <img
              src={asset("brand-board")}
              alt="Original Clearleaf brand illustration with floral teacup and three pastel tea sachets"
              loading="lazy"
            />
            <span className="image-note">Where our little garden began.</span>
          </div>
          <div className="story-copy">
            <div className="eyebrow">A LITTLE ABOUT US</div>
            <h2>
              Rooted in nature.
              <br />
              <em>Made for your day.</em>
            </h2>
            <p>
              Clearleaf began with a familiar university rhythm: full calendars,
              open notebooks, and the little breaks that make a day your own.
            </p>
            <p>
              Our student-focused Australian concept is a powdered tea drink in
              single-serve sachets, designed to mix into hot or cold water and
              fit into those everyday moments. Between lectures or between
              chapters, there’s room for a little pause.
            </p>
            <p className="handwritten">Clear mind, Clearleaf.</p>
            <span className="story-credit">
              A University of Sydney marketing project.
            </span>
          </div>
        </section>
        <section className="section campus" id="campus">
          <div className="campus-copy">
            <div className="eyebrow">FROM OUR GARDEN TO YOUR CAMPUS</div>
            <h2>
              A little tea.
              <br />A little <em>campus colour.</em>
            </h2>
            <p>
              Picture a botanical corner between classes. Meet the proposed
              Clearleaf campus pop-up: a chance to discover the collection,
              share a tea break and find your favourite flavour.
            </p>
            <div className="event-details">
              <div>
                <span>WHERE</span>
                <strong>University of Sydney</strong>
              </div>
              <div>
                <span>WHEN</span>
                <strong>Proposed exam-season activation</strong>
              </div>
            </div>
            <span className="concept-tag">
              Campaign concept · dates to be confirmed
            </span>
            <a
              className="text-button"
              href={asset("campus-poster")}
              target="_blank"
              rel="noreferrer"
            >
              Explore the campaign poster <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="campus-visual">
            <img
              className="stall"
              src={asset("campus-stall")}
              alt="Concept visual of a flower-decorated Clearleaf sampling stall on campus"
              loading="lazy"
            />
            <img
              className="poster"
              src={asset("campus-poster")}
              alt="Proposed Clearleaf campus sampling campaign poster"
              loading="lazy"
            />
            <span className="image-note">See you between classes?</span>
          </div>
        </section>
        <section className="faq section">
          <div>
            <div className="eyebrow">A FEW LITTLE THINGS</div>
            <h2>
              Before you <em>sip.</em>
            </h2>
          </div>
          <div className="faq-items">
            <details>
              <summary>Can I order Clearleaf?</summary>
              <p>
                This is a university brand concept and mock store. You can
                explore products and save a bag, but orders and payments are not
                available.
              </p>
            </details>
            <details>
              <summary>
                Where can I find ingredients and preparation details?
              </summary>
              <p>
                The report proposes a whole-leaf tea powder mixed into hot or
                cold water. Product panels describe the proposed base; final
                flavour ingredients, allergens and serving instructions are
                awaiting confirmation.
              </p>
            </details>
            <details>
              <summary>How does the tea quiz work?</summary>
              <p>
                Each answer gives one point to a flavour. The flavour with the
                most points is your match; ties use the collection order. It’s a
                playful preference match, without health or performance claims.
              </p>
            </details>
          </div>
        </section>
      </main>
      <footer>
        <div className="footer-top section">
          <div>
            <a href="#home" className="wordmark">
              CLEARLEAF
            </a>
            <p>A little pause. A fresh perspective.</p>
          </div>
          <a className="text-button" href="#teas">
            Find your next little ritual <ArrowUpRight size={18} />
          </a>
          <a className="back-top" href="#home">
            Back to the garden ↑
          </a>
        </div>
        <motion.img
          className="garden"
          src={asset("wildflower-border")}
          alt=""
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          whileInView={{ clipPath: "inset(0% 0 0 0)" }}
          transition={{ duration: 1.4 }}
          viewport={{ once: true }}
        />
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Clearleaf · Clear Mind, Clearleaf.
          </span>
          <span>
            University of Sydney marketing concept · No real purchases
          </span>
        </div>
      </footer>
      {notice && (
        <div role="status" className="toast">
          <Check size={17} />
          {notice}
        </div>
      )}
      {product && (
        <Overlay title="A closer look" onClose={() => setProduct(null)}>
          <div className="detail-image" style={{ background: product.colour }}>
            <img src={asset(product.image)} alt={`${product.name} sachet`} />
          </div>
          <div className="eyebrow">{product.note}</div>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <div className="pending-info">
            <p>
              <strong>Proposed base:</strong> Whole-leaf Camellia sinensis tea,
              sodium, potassium and coconut water powder. Full flavour
              ingredients and allergens await confirmation.
            </p>
            <p>
              <strong>Preparation concept:</strong> Mix into hot or cold water.
              Serving amount and water volume to be confirmed.
            </p>
            <p>
              <strong>Proposed packs (AUD):</strong> Exam Week Starter · 5
              sachets / $5.00. Standard Pack · 20 sachets / $19.95. Student
              subscription · 30 sachets / $19.95 per month. Pack selection is
              not offered in this mock store.
            </p>
          </div>
          <div className="detail-actions">
            <div className="quantity">
              <button
                aria-label="Decrease quantity"
                onClick={() => setQty(Math.max(1, qty - 1))}
                disabled={qty <= 1}
              >
                <Minus size={16} />
              </button>
              <output aria-label="Quantity">{qty}</output>
              <button
                aria-label="Increase quantity"
                onClick={() => setQty(Math.min(99, qty + 1))}
                disabled={qty >= 99}
              >
                <Plus size={16} />
              </button>
            </div>
            <button className="button" onClick={() => add(product, qty)}>
              Add to bag <ShoppingBag size={17} />
            </button>
          </div>
          <p className="concept-note">Concept store · no payment or checkout</p>
        </Overlay>
      )}
      {cartOpen && (
        <Overlay
          title={`Your little bag (${count})`}
          onClose={() => setCartOpen(false)}
          drawer
        >
          <h2>
            A few <em>good things.</em>
          </h2>
          {count === 0 ? (
            <div className="empty-bag">
              <Sprig />
              <p>Your bag is waiting to bloom.</p>
              <button
                className="button"
                onClick={() => {
                  setCartOpen(false);
                  document
                    .getElementById("teas")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Explore our teas <ArrowRight size={17} />
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {products
                  .filter((p) => cart[p.id] > 0)
                  .map((p) => (
                    <div className="cart-item" key={p.id}>
                      <div style={{ background: p.colour }}>
                        <img src={asset(p.image)} alt={p.name} />
                      </div>
                      <section>
                        <h3>{p.name}</h3>
                        <span className="cart-price">
                          Price to be confirmed
                        </span>
                        <div className="quantity">
                          <button
                            aria-label={`Decrease ${p.name}`}
                            onClick={() => update(p.id, -1)}
                          >
                            <Minus size={14} />
                          </button>
                          <output aria-label={`${p.name} quantity`}>
                            {cart[p.id]}
                          </output>
                          <button
                            aria-label={`Increase ${p.name}`}
                            disabled={cart[p.id] >= 99}
                            onClick={() => update(p.id, 1)}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          className="remove"
                          onClick={() => setCart((c) => ({ ...c, [p.id]: 0 }))}
                        >
                          Remove
                        </button>
                      </section>
                    </div>
                  ))}
              </div>
              <div className="cart-bottom">
                <p>Your picks are saved in this browser.</p>
                <p className="concept-note">
                  This is a concept store. Pricing is unconfirmed and checkout
                  is not available.
                </p>
                <button className="button" onClick={() => setCartOpen(false)}>
                  Keep exploring <ArrowRight size={17} />
                </button>
              </div>
            </>
          )}
        </Overlay>
      )}
      {quiz && (
        <Overlay title="Find your tea" onClose={() => setQuiz(false)}>
          {answers.length < questions.length ? (
            <>
              <div className="quiz-progress">
                {questions.map((_, i) => (
                  <span
                    key={i}
                    className={i <= answers.length ? "active" : ""}
                  />
                ))}
              </div>
              <div className="eyebrow">QUESTION {answers.length + 1} OF 3</div>
              <h2>{questions[answers.length].title}</h2>
              <div className="quiz-answers">
                {questions[answers.length].answers.map((a, i) => (
                  <button
                    key={a.text}
                    onClick={() => setAnswers([...answers, a.product])}
                  >
                    <span className={`answer-flower flower-${i}`}>
                      {["✿", "❧", "☼"][i]}
                    </span>
                    <span>
                      <strong>{a.text}</strong>
                      <small>{a.detail}</small>
                    </span>
                    <ArrowRight size={17} />
                  </button>
                ))}
              </div>
              {answers.length > 0 && (
                <button
                  className="text-button"
                  onClick={() => setAnswers(answers.slice(0, -1))}
                >
                  ← Previous question
                </button>
              )}
            </>
          ) : (
            <div className="quiz-result">
              <div className="eyebrow">YOUR LITTLE TEA MATCH</div>
              <h2>
                Hello, <em>{result.name}.</em>
              </h2>
              <div
                className="detail-image"
                style={{ background: result.colour }}
              >
                <img src={asset(result.image)} alt={result.name} />
              </div>
              <p>{result.description}</p>
              <p className="concept-note">
                Matched to your preferences:{" "}
                {answers.filter((a) => a === result.id).length} of your 3
                answers picked this flavour. Ties follow collection order.
              </p>
              <button className="button" onClick={() => add(result)}>
                Add my match to bag <Plus size={17} />
              </button>
              <button className="text-button" onClick={() => detail(result)}>
                View tea details <ArrowUpRight size={17} />
              </button>
              <button className="text-button" onClick={() => setAnswers([])}>
                <RotateCcw size={15} /> Try again
              </button>
            </div>
          )}
        </Overlay>
      )}
    </>
  );
}
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
