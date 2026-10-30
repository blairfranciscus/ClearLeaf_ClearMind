import { useState } from "react";
import { asset, teas } from "../content";
import { PageLink, Sachet } from "../components";
export default function Home() {
  const [paused, setPaused] = useState(false);
  return (
    <>
      <section className="home-hero wrap">
        <div className="hero-copy">
          <p className="eyebrow">Your everyday tea break</p>
          <h1>
            Clear Mind,
            <br />
            <em>Clearleaf.</em>
          </h1>
          <p className="lead">
            Tea for the chapters, the catch-ups
            <br className="desktop-break" /> and the time in between.
          </p>
          <p>
            Three botanical tea flavours, in little sachets made to come along
            for the day.
          </p>
          <div className="button-row">
            <PageLink href="./products.html">Meet our teas</PageLink>
            <a className="text-link" href="./about.html">
              A little about us <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <figure className="hero-art">
          <div className="gingham-paper">
            <div
              id="homepage-teacup"
              className={`teacup-float${paused ? " is-paused" : ""}`}
            >
              <img
                src={asset("teacup-transparent-v1")}
                alt="Clearleaf teacup illustration, filled with pink, yellow and purple flowers"
                width="1268"
                height="1241"
                fetchPriority="high"
              />
            </div>
          </div>
          <figcaption>
            <span>for your next tea break ♡</span>
            <button
              type="button"
              className="motion-toggle"
              aria-controls="homepage-teacup"
              onClick={() => setPaused(!paused)}
            >
              {paused ? "Play teacup animation" : "Pause teacup animation"}
            </button>
          </figcaption>
        </figure>
      </section>
      <section className="tea-preview wrap">
        <div className="section-heading">
          <div>
            <p className="eyebrow">A colour for every cup</p>
            <h2>
              Meet the <em>tea trio.</em>
            </h2>
          </div>
          <a href="./products.html" className="text-link">
            Our Products <span aria-hidden="true">→</span>
          </a>
        </div>
        <div className="tea-trio">
          {teas.map((tea) => (
            <a
              className="tea-preview-item"
              key={tea.id}
              href={`./products.html#${tea.id}`}
            >
              <div
                className="preview-art"
                style={{ backgroundColor: tea.colour }}
              >
                <Sachet tea={tea} />
              </div>
              <h3>{tea.name}</h3>
              <span>{tea.flavour}</span>
            </a>
          ))}
        </div>
      </section>
      <section className="campus-invitation wrap">
        <div>
          <p className="eyebrow">A cup of campus life</p>
          <h2>
            See you
            <br />
            <em>between classes.</em>
          </h2>
          <p>
            Explore our university pop-up plans, sampling programme and campus
            campaign.
          </p>
          <PageLink href="./events.html" secondary>
            What’s on campus
          </PageLink>
        </div>
        <figure>
          <img
            src={asset("original-stall")}
            alt="The proposed flower-decorated Clearleaf campus stall"
            width="1536"
            height="1024"
            loading="lazy"
          />
          <figcaption>Our campus pop-up concept.</figcaption>
        </figure>
      </section>
    </>
  );
}
