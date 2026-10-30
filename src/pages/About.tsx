import { asset } from "../content";
import { PageIntro, PageLink } from "../components";
export default function About() {
  return (
    <div className="wrap page-content">
      <PageIntro
        label="Our story"
        title={
          <>
            A tea break,
            <br />
            <em>made your own.</em>
          </>
        }
      >
        <p>
          Clearleaf began with student life in mind: lectures, library sessions,
          catch-ups and a tea break somewhere in the middle.
        </p>
      </PageIntro>
      <section className="story-layout">
        <figure className="sketch-paper">
          <img
            src={asset("teacup-sketch")}
            alt="Your hand-drawn Clearleaf teacup and heart illustration"
            width="1502"
            height="1066"
          />
          <figcaption>From the Clearleaf sketchbook.</figcaption>
        </figure>
        <div className="story-copy">
          <h2>
            Small sachet.
            <br />
            <em>Everyday ritual.</em>
          </h2>
          <p>
            We’re an Australian tea concept developed for a University of Sydney
            marketing project.
          </p>
          <p>
            Our proposed drink is a whole-leaf tea powder that mixes into hot or
            cold water. Single-serve sachets are designed to fit into a pencil
            case or bag, ready for a break on campus or at home.
          </p>
          <p>
            Berrylicious, Mint Study and Lemon Myrtle each have their own
            colour. The flowers, leaves and handwritten details bring the
            collection together.
          </p>
          <PageLink href="./products.html">Explore the collection</PageLink>
        </div>
      </section>
      <section className="brand-note">
        <p className="eyebrow">The drawings are part of the story</p>
        <h2>A little hand-drawn character.</h2>
        <p>
          Our flower-filled teacup, botanical borders and pastel packaging are
          the starting point for Clearleaf. You’ll find the same artwork across
          the sachets and our proposed campus campaign.
        </p>
        <a className="text-link" href="./events.html">
          See the campaign <span aria-hidden="true">→</span>
        </a>
      </section>
    </div>
  );
}
