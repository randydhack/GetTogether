import "./LandingPage.css";
import { Link } from "react-router-dom";

function LandingPage() {

  return (
    <div className="landing-page-container">
      {/* Landing Page */}
      <div className="landing-page-section-1">
        {/* Section 1 */}
        <div className="landing-page-heading">
          <h1 style={{ fontSize: "46px" }}>
            The people platform — Where interests become friendships
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus
            mauris a diam maecenas. Turpis egestas integer eget aliquet nibh
            praesent. Orci phasellus egestas tellus rutrum tellus.
          </p>
        </div>
        <img
          style={{ width: "600px" }}
          src="https://secure.meetupstatic.com/next/images/shared/online_events.svg?w=1080"
        />
      </div>

      {/* Section 2 */}
      <div className="landing-page-section-2">
        <h2>How GatherUp Works</h2>
        <p className="subtitle-info">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      {/* Section 3 */}
      <div className="landing-page-section-3">
        {/* 1 */}
        <div className="group-event-container">
          <img
            className="group-event-images"
            src="https://secure.meetupstatic.com/next/images/shared/handsUp.svg?w=384"
          />
          <Link to="/groups" className="group-event-link">
            See all groups
          </Link>
          <p className="caption">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>

        {/* 2 */}
        <div className="group-event-container">
          <img
            className="group-event-images"
            src="https://secure.meetupstatic.com/next/images/shared/ticket.svg?w=384"
          />
          <Link to='/events' className="group-event-link">
            See all events
          </Link>
          <p className="caption">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>

        {/* 3 */}
        <div className="group-event-container">
          <img
            className="group-event-images"
            src="https://secure.meetupstatic.com/next/images/shared/joinGroup.svg?w=384"
          />
          <div>
            <Link to={''} className="group-event-link">
              Start a new group
            </Link>
            <p className="caption">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
      </div>
      {/* Section 4 */}
      <div className="landing-page-section-4">
        <div className="section-4-button">
          <Link src=''>Join GatherUp</Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
