import { asset } from "../content";
import { PageIntro, PageLink } from "../components";
export default function Events() {
  return (
    <div className="wrap page-content">
      <PageIntro
        label="Events & campus programmes"
        title={
          <>
            A little Clearleaf,
            <br />
            <em>on your campus.</em>
          </>
        }
      >
        <p>
          Tea sampling, student ambassadors and our flower-covered pop-up.
          Here’s the university programme we’re planning.
        </p>
      </PageIntro>
      <section className="event-feature">
        <figure>
          <img
            src={asset("original-stall")}
            alt="The proposed Clearleaf university pop-up stall, decorated with hand-drawn flowers"
            width="1536"
            height="1024"
          />
          <figcaption>Our proposed campus stall.</figcaption>
        </figure>
        <div>
          <span className="status-tag">Campaign concept</span>
          <h2>
            Between lectures.
            <br />
            <em>Over a cup of tea.</em>
          </h2>
          <p>
            Our University of Sydney pop-up proposal gives students a chance to
            try the collection and meet campus ambassadors.
          </p>
          <dl className="event-details">
            <div>
              <dt>Where</dt>
              <dd>University of Sydney</dd>
            </div>
            <div>
              <dt>When</dt>
              <dd>Exam season · dates to be confirmed</dd>
            </div>
            <div>
              <dt>What to expect</dt>
              <dd>Free tea sampling and a look at the collection</dd>
            </div>
          </dl>
        </div>
      </section>
      <section className="programme-section">
        <p className="eyebrow">Our university campus programme</p>
        <h2>More than a stand.</h2>
        <div className="programme-grid">
          <article>
            <span className="programme-number" aria-hidden="true">
              01
            </span>
            <h3>Meet the teas</h3>
            <p>
              Discover the three flavours at a proposed campus sampling pop-up.
            </p>
          </article>
          <article>
            <span className="programme-number" aria-hidden="true">
              02
            </span>
            <h3>Meet the ambassadors</h3>
            <p>
              Student ambassadors introduce Clearleaf and help bring the
              campaign to campus.
            </p>
          </article>
          <article>
            <span className="programme-number" aria-hidden="true">
              03
            </span>
            <h3>Share your tea break</h3>
            <p>
              The campaign connects campus posters with creator content on
              Instagram and TikTok.
            </p>
          </article>
        </div>
      </section>
      <section className="poster-section">
        <div>
          <p className="eyebrow">Around campus</p>
          <h2>
            Look out for
            <br />
            <em>the flowers.</em>
          </h2>
          <p>
            Our concept poster brings the botanical illustrations and pastel
            sachets into the campus campaign.
          </p>
          <p>
            The programme is proposed. Dates, times and final flavour labels
            will be confirmed before an event is announced.
          </p>
          <a
            className="text-link"
            href={asset("original-poster")}
            target="_blank"
            rel="noreferrer"
          >
            See the original poster <span aria-hidden="true">↗</span>
          </a>
        </div>
        <figure className="poster-figure">
          <img
            src={asset("original-poster")}
            alt="Original Clearleaf campus campaign poster with floral drawings and sampling details"
            width="1024"
            height="1536"
            loading="lazy"
          />
          <figcaption>
            Concept artwork; schedule and flavour labels are illustrative.
          </figcaption>
        </figure>
      </section>
      <div className="join-strip">
        <div>
          <p className="eyebrow">Want to be part of it?</p>
          <h2>Help us bring it to campus.</h2>
        </div>
        <PageLink href="./join-our-team.html">Join Our Team</PageLink>
      </div>
    </div>
  );
}
