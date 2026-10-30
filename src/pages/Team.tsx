import { asset } from "../content";
import { PageIntro, PageLink } from "../components";
export default function Team() {
  return (
    <div className="wrap page-content">
      <section className="team-intro">
        <PageIntro
          label="Join Our Team"
          title={
            <>
              Create with us.
              <br />
              <em>Grow with Clearleaf.</em>
            </>
          }
        >
          <p>
            For influencers, student creators and future brand ambassadors who’d
            like to be part of our campaigns.
          </p>
          <a className="text-link" href="#opportunities">
            Find your place <span aria-hidden="true">↓</span>
          </a>
        </PageIntro>
        <figure className="team-note gingham-paper">
          <img
            src={asset("teacup-sketch")}
            alt="Your original Clearleaf line drawing of a tea cup with a heart"
            width="1502"
            height="1066"
          />
          <figcaption>your ideas, our next chapter ♡</figcaption>
        </figure>
      </section>
      <section className="opportunities" id="opportunities">
        <p className="eyebrow">Let’s make something together</p>
        <h2>Two ways to be part of the campaign.</h2>
        <div className="opportunity-grid">
          <article className="opportunity pink">
            <p className="role-label">For influencers & creators</p>
            <h3>Tell the Clearleaf story.</h3>
            <p>
              Bring your own style to tea breaks, campus life and study-day
              content on Instagram or TikTok.
            </p>
            <ul>
              <li>Create content for the Clearleaf campaign</li>
              <li>Share the collection with your community</li>
              <li>Introduce followers to our campus pop-up plans</li>
            </ul>
          </article>
          <article className="opportunity sage">
            <p className="role-label">For brand ambassadors</p>
            <h3>Be our campus connection.</h3>
            <p>
              Help students discover Clearleaf and bring the campaign to life
              around university.
            </p>
            <ul>
              <li>Introduce the teas at campus activations</li>
              <li>Help with sampling and campaign activity</li>
              <li>Share ideas from your campus community</li>
            </ul>
          </article>
        </div>
      </section>
      <section className="application-note">
        <span aria-hidden="true" className="note-heart">
          ♡
        </span>
        <div>
          <h2>Sound like your kind of thing?</h2>
          <p>
            Campaign details and the application contact are coming soon. When
            applications open, we’ll share how creators and ambassadors can get
            involved.
          </p>
          <p className="small-copy">
            The campaign is a university project concept. Roles and partnership
            terms are still being developed.
          </p>
        </div>
      </section>
      <div className="next-step">
        <p>Get to know what we’re creating.</p>
        <PageLink href="./events.html" secondary>
          Explore the campus campaign
        </PageLink>
      </div>
    </div>
  );
}
