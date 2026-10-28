import React from "react";
import { createRoot } from "react-dom/client";
import { Header, Footer, PageLink } from "./components";
import { asset, teas, type Page } from "./content";
import "./styles.css";

function Home() {
  return (
    <>
      <section className="home-intro wrap">
        <div className="intro-copy">
          <p className="section-label">Meet Clearleaf</p>
          <h1>
            Clear Mind,
            <br />
            <em>Clearleaf.</em>
          </h1>
          <p className="lead">A tea ritual for everyday student life.</p>
          <p>
            Clearleaf is an Australian powdered tea concept, made for the space
            between lectures, library sessions and everything else.
          </p>
          <div className="page-links">
            <PageLink href="./packaging.html">Meet the packaging</PageLink>
            <PageLink secondary href="./events.html">
              On campus
            </PageLink>
          </div>
        </div>
        <figure className="brand-artwork">
          <img
            src={asset("original-teacup")}
            alt="Original Clearleaf illustration of a teacup filled with hand-drawn flowers and leaves"
            width="1192"
            height="1180"
            fetchPriority="high"
          />
        </figure>
      </section>
      <section className="about-section">
        <div className="wrap about-layout">
          <div>
            <p className="section-label">The idea behind it</p>
            <h2>
              Tea that fits
              <br />
              into your day.
            </h2>
          </div>
          <div className="reading-copy">
            <p>
              Developed for a University of Sydney marketing project, Clearleaf
              brings together a powdered tea drink, single-serve sachets and a
              botanical identity.
            </p>
            <p>
              The proposed drink mixes into hot or cold water. The sachets are
              designed to fit in a pencil case or bag, ready for a tea break on
              campus or at home.
            </p>
            <p>
              Our three flavours are Berrylicious, Mint Study and Lemon Myrtle.
            </p>
            <a className="inline-link" href="./packaging.html">
              See the three designs <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function Packaging() {
  return (
    <div className="wrap page-content">
      <div className="page-intro">
        <p className="section-label">Our packaging</p>
        <h1>
          Three flavours.
          <br />
          <em>One Clearleaf.</em>
        </h1>
        <p className="lead">
          Pink, blue and yellow. Each flavour has its own colour, with the same
          hand-drawn botanical character.
        </p>
        <p>
          Single-serve sachets for a powdered tea drink, designed to mix into
          hot or cold water.
        </p>
      </div>
      <div className="packaging-list">
        {teas.map((tea) => (
          <section
            className="packaging-row"
            key={tea.name}
            aria-label={tea.name}
          >
            <div
              className="sachet-display"
              style={{ backgroundColor: tea.colour }}
            >
              <svg
                className="sachet-artwork"
                viewBox={`${tea.offset} 0 ${tea.cropWidth} 242`}
                role="img"
                aria-label={`Original ${tea.name} Clearleaf sachet design`}
              >
                <image
                  href={asset("original-sachets")}
                  width="1924"
                  height="242"
                />
              </svg>
            </div>
            <div className="packaging-copy">
              <h2>{tea.name}</h2>
              <p>{tea.description}</p>
            </div>
          </section>
        ))}
      </div>
      <section className="packaging-notes">
        <h2>Small enough to take along.</h2>
        <div className="reading-copy">
          <p>
            The report proposes a five-sachet starter pack, a twenty-sachet
            standard pack and a student subscription. The individual sachets are
            designed for convenience on campus.
          </p>
          <p className="muted">
            These are concept designs. Final ingredients, allergens, serving
            amounts and packaging specifications are still to be confirmed.
          </p>
        </div>
      </section>
      <div className="next-page">
        <span>From the packaging to the campus.</span>
        <PageLink secondary href="./events.html">
          Explore the pop-up concept
        </PageLink>
      </div>
    </div>
  );
}

function Events() {
  return (
    <div className="wrap page-content">
      <div className="page-intro">
        <p className="section-label">Events</p>
        <h1>
          Clearleaf
          <br />
          <em>on campus.</em>
        </h1>
        <p className="lead">
          A proposed pop-up at the University of Sydney, bringing the tea and
          its botanical artwork into student life.
        </p>
      </div>
      <section className="event-layout">
        <figure className="stall-figure">
          <img
            src={asset("original-stall")}
            alt="Clearleaf campus pop-up concept: a cream stall decorated with flowers, tea sachets and samples"
            width="1536"
            height="1024"
          />
          <figcaption>The proposed Clearleaf campus stall.</figcaption>
        </figure>
        <div className="event-copy">
          <p className="status-note">Proposed campaign</p>
          <h2>
            Come for a sample.
            <br />
            Stay for a tea break.
          </h2>
          <p>
            The campaign proposes a campus stall where students can try
            Clearleaf and meet student ambassadors in the lead-up to exams.
          </p>
          <dl className="event-details">
            <div>
              <dt>Where</dt>
              <dd>University of Sydney</dd>
            </div>
            <div>
              <dt>When</dt>
              <dd>Exam season. Dates to be confirmed.</dd>
            </div>
            <div>
              <dt>What’s planned</dt>
              <dd>Tea sampling and a chance to meet the collection.</dd>
            </div>
          </dl>
        </div>
      </section>
      <section className="poster-section">
        <div className="poster-copy">
          <p className="section-label">The campaign artwork</p>
          <h2>
            A familiar face
            <br />
            around campus.
          </h2>
          <p>
            The proposed posters use the same flowers, colours and handwritten
            lettering as the packaging.
          </p>
          <p>
            They introduce the campus sampling idea and carry the brand’s line:
            Clear Mind, Clearleaf.
          </p>
          <a
            className="inline-link"
            href={asset("original-poster")}
            target="_blank"
            rel="noreferrer"
          >
            Open the poster <span aria-hidden="true">↗</span>
          </a>
        </div>
        <figure className="poster-figure">
          <img
            src={asset("original-poster")}
            alt="Original Clearleaf campus poster with botanical border, three tea sachets and free sampling campaign details"
            width="1024"
            height="1536"
            loading="lazy"
          />
          <figcaption>
            Campaign concept artwork. Flavour labels are to be confirmed.
          </figcaption>
        </figure>
      </section>
      <p className="event-disclaimer">
        This activation is a proposal from the marketing project. It is not a
        confirmed event; the schedule shown in the poster is illustrative.
      </p>
    </div>
  );
}

function App() {
  const file = window.location.pathname.split("/").pop();
  const page: Page =
    file === "packaging.html"
      ? "packaging"
      : file === "events.html"
        ? "events"
        : "home";
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header page={page} />
      <main id="main">
        {page === "packaging" ? (
          <Packaging />
        ) : page === "events" ? (
          <Events />
        ) : (
          <Home />
        )}
      </main>
      <Footer />
    </>
  );
}
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
