import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getGroup } from "../../store/group";
import { getEventByGroup } from "../../store/event";
import DeleteGroupModal from "./DeleteGroupModal";

import "./GroupDetails.css";

function GroupDetails() {
  const dispatch = useDispatch();

  const { groupId } = useParams();

  const group = useSelector((state) => state.groupState[groupId]);
  const event = useSelector((state) => Object.values(state.eventState));
  const user = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(getGroup(groupId));
      await dispatch(getEventByGroup(groupId));
      setIsLoaded(true);
    })();
  }, [dispatch, groupId]);

  const handleJoinGroup = (e) => {
    e.preventDefault();
    return alert("Feature coming soon");
  };

  const pastEvent = [];
  const upcomingEvent = [];

  event.forEach((event) => {
    const currentDate = new Date().getTime();
    const start = new Date(event.startDate).getTime();
    const end = new Date(event.endDate).getTime();

    if (start < end && start > currentDate) {
      upcomingEvent.push(event);
    } else {
      pastEvent.push(event);
    }
  });

  const fullDate = (data) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const eventDate = new Date(data);
    const year = eventDate.getFullYear();
    const month = eventDate.getMonth();
    const date = eventDate.getDate();
    const dayIndex = eventDate.getDay();

    let hours = eventDate.getHours();
    let minutes = eventDate.getMinutes();

    const ampm = hours >= 12 ? "AM" : "PM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return `${days[dayIndex].slice(0, 3)}, ${monthNames[month].slice(
      0,
      3
    )} ${date}, ${year} · ${hours}:${minutes} ${ampm}`;
  };

  return (
    isLoaded &&
    group.previewImage && (
      <div className="group-detail-container">
        <div className="group-detail-col">
          <div className="section-1-detail">
            <div className="back-button-container">
              <Link to="/groups" className="back-button">
                {"Back to groups"}
              </Link>
            </div>
            <div className="group-details">
              <img
                alt="main-group"
                style={{
                  height: "350px",
                  borderRadius: "15px",
                }}
                visibility={group.previewImage ? "visible" : "hidden"}
                src={group.previewImage}
              />
              <div className="group-detail-info">
                <div>
                  <h1 style={{ marginBottom: "20px" }}>{group.name}</h1>
                  <div className="group-location-events-org">
                    <span className="grey-p">
                      <i class="fa-solid fa-location-dot"></i>
                      <span>
                        {group.city}, {group.state}
                      </span>
                    </span>
                  </div>
                  <div className="group-location-events-org">
                    <span className="grey-p">
                      <i class="fa-solid fa-calendar-days"></i>
                      <span>
                        {upcomingEvent.length} events ·{" "}
                        {group.private ? "Private" : "Public"}
                      </span>
                    </span>
                  </div>
                  <div className="group-location-events-org">
                    <span className="grey-p">
                      <i class="fa-regular fa-user"></i>
                      <span>
                        Organized by: {group.Organizer?.firstName}{" "}
                        {group.Organizer?.lastName}
                      </span>
                    </span>
                  </div>
                </div>

                {user && user.id !== group.organizerId && (
                  <button
                    onClick={handleJoinGroup}
                    className="join-group-button"
                  >
                    Join this group
                  </button>
                )}

                {user && user.id === group.organizerId && (
                  <div>
                    <button className="create-event-button organizer-buttons">
                      <Link
                        to={`/group/${group.id}/events/new`}
                        style={{ color: "black", textDecoration: "none" }}
                      >
                        Create Event
                      </Link>
                    </button>
                    <button
                      style={{ margin: "0px 10px" }}
                      className="organizer-buttons edit-delete-button"
                    >
                      <Link
                        to={`/group/${group.id}/edit`}
                        style={{ color: "black", textDecoration: "none" }}
                      >
                        Edit
                      </Link>
                    </button>
                    <DeleteGroupModal />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div style={{ width: "100%" }} className="group-detail-section-2">
            <div className="section-2-container">
              <div>
                <h2 style={{ marginBottom: "10px", width: "fit-content" }}>
                  Organizer
                </h2>
                <p style={{ margin: "0px 0px", color: "grey" }}>
                  {group.Organizer?.firstName} {group.Organizer?.lastName}
                </p>
              </div>

              <div>
                <h2 style={{ width: "fit=content", marginBottom: "5px" }}>
                  What we're about
                </h2>
                <p style={{ width: "fit-content", marginTop: "0px" }}>
                  {group.about}
                </p>
              </div>

              {!upcomingEvent.length && !pastEvent.length && (
                <h2>No Upcoming Events</h2>
              )}

              {/* --------- --------- --------- --------- UPCOMING EVENTS --------- --------- --------- ---------  */}
              {upcomingEvent.length !== 0 && (
                <div className="past-event-container">
                  <h2 style={{ marginBottom: "0px" }}>
                    Upcoming Events ({upcomingEvent.length})
                  </h2>
                  {upcomingEvent.map((event) => {
                    return (
                      <div key={event.id} className="past-events">
                        <Link
                          to={`/events/${event.id}`}
                          className="past-event-links"
                        >
                          <div className="event-container">
                            <img
                              alt="event-img"
                              src={event.previewImage}
                              className="cursor-pointer past-upcoming-event-photo"
                            />

                            <div className="location-info">
                              <p className="event-time cursor-pointer">
                                {fullDate(event.startDate)}
                              </p>
                              <h3
                                className="cursor-pointer"
                                style={{
                                  overflowWrap: "break-word",
                                  margin: "5px 0px",
                                }}
                              >
                                {event.name}
                              </h3>
                              <p
                                className="cursor-pointer"
                                style={{ margin: "0px", color: "grey" }}
                              >
                                {event.Venue.city}, {event.Venue.state}
                              </p>
                            </div>
                          </div>
                          <div className="caption-container">
                            <p className="event-caption cursor-pointer">
                              {event.description}
                            </p>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* --------- --------- --------- PAST EVENTS  --------- --------- --------- --------- */}

              {pastEvent.length !== 0 && (
                <div className="past-event-container">
                  <h2 style={{ marginBottom: "0px" }}>
                    Past Events ({pastEvent.length})
                  </h2>
                  {pastEvent.map((event) => {
                    return (
                      <div key={event.id} className="past-events">
                        <Link
                          to={`/events/${event.id}`}
                          className="past-event-links"
                        >
                          <div className="event-container">
                            <img
                              alt="event-img"
                              src={event.previewImage}
                              className="cursor-pointer past-upcoming-event-photo"
                            />

                            <div className="location-info">
                              <p className="event-time cursor-pointer">
                                {fullDate(event.startDate)}
                              </p>
                              <h3
                                className="cursor-pointer"
                                style={{
                                  overflowWrap: "break-word",
                                  margin: "5px 0px",
                                }}
                              >
                                {event.name}
                              </h3>
                              <p
                                className="cursor-pointer"
                                style={{ margin: "0px", color: "grey" }}
                              >
                                {event.Venue.city}, {event.Venue.state}
                              </p>
                            </div>
                          </div>
                          <div className="caption-container">
                            <p className="event-caption cursor-pointer">
                              {event.description}
                            </p>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section 2 */}
      </div>
    )
  );
}

export default GroupDetails;
