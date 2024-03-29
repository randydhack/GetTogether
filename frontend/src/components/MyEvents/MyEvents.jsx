import { useEffect, useState } from "react";
import { deleteEvent, fetchUserEvent } from "../../store/event";
import { Modal } from "../../context/Modal";
import DeleteEvent from "../EventsPage/DeleteEvent";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "../EventsPage/EventsPage.css";
import "./MyEvents.css";
import "../MyGroups/MyGroups.css";

function MyEvents() {
  const dispatch = useDispatch();

  const events = useSelector((state) => Object.values(state.eventState));
  const user = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchUserEvent()).then(() => setIsLoaded(true));
  }, [dispatch]);

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

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return `${days[dayIndex].slice(0, 3)}, ${monthNames[month].slice(
      0,
      3
    )} ${date}, ${year} · ${hours}:${minutes} ${ampm}`;
  };

  const sortEventByDate = events.sort((a, b) => {
    const timeA = a.startDate;
    const timeB = b.startDate;

    const convertTimeA = new Date(timeA).getTime();
    const convertTimeB = new Date(timeB).getTime();

    return convertTimeB - convertTimeA;
  });

  const recentEvents = [];
  const pastEvents = [];

  sortEventByDate.forEach((el) => {
    const todayYear = new Date().getFullYear();
    const eventYear = new Date(el.startDate).getFullYear();

    if (todayYear <= eventYear) recentEvents.unshift(el);
    else pastEvents.unshift(el);
  });

  const shortenDescription = (description) => {
    return description.split(".").slice(0, 5).join(".");
  };

  return (
    isLoaded && (
      <div className="all-events-container">
        <div>
          <div
            className="my-event-group-heading"
            style={{
              display: "flex",
              justifyContent: "flex-start",
              width: "100%",
            }}
          >
            <span>Manage Events</span>
          </div>
          <p
            style={{
              color: "grey",
              fontSize: "14px",
              marginRight: "570px",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            {events.length ? "Events in GatherUp" : "No events found"}
          </p>
          {recentEvents.map((event, i) => {
            return (
              <div key={event.id} className="event-link">
                <div key={event.id} className="events-container">
                  <div className="flex-row">
                    <Link to={`/events/${event.id}`}>
                      <img
                        src={event.previewImage}
                        alt="event"
                        style={{
                          width: "170px",
                          height: "90px",
                          borderRadius: "3px",
                        }}
                      />
                    </Link>
                    <div className="event-details">
                      <p className="event-date font-size-md font-uppercase">
                        {fullDate(event.startDate)}
                      </p>

                      <Link to={`/events/${event.id}`}>
                        <h2 className="event-title font-size-md font-uppercase">
                          {event.name}
                        </h2>
                      </Link>
                      <div className="manage-event-bottom">
                        <p className="event-location font-size-md font-uppercase">
                          {event.Venue.city}, {event.Venue.state}
                        </p>
                        {user && user.id === event.Group.organizerId ? (
                          <div className="manage-event-buttons">
                            <Link to={`/event/${event.id}/edit`}>
                              <button className="manage-buttons">Update</button>
                            </Link>
                            <div>
                            <div style={{ height: "20px" }}>
                              <button
                                className="manage-button-red"
                                onClick={(e) => setShowModal(true)}
                              >
                                Delete
                              </button>
                            </div>
                            {showModal && (
                              <Modal onClose={() => setShowModal(false)}>
                                <DeleteEvent
                                  setShowModal={setShowModal}
                                  id={event.id}
                                />
                              </Modal>
                            )}
                              </div>
                          </div>
                        ) : (
                          <div className="manage-event-buttons">
                            <button className="manage-button-red">
                              Unattend Event
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="event-about">
                      {event.description &&
                        shortenDescription(event.description)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}


          {pastEvents.map((event, i) => {
            return (
              <div key={event.id} className="event-link">
                <div key={event.id} className="events-container">
                  <div className="flex-row">
                    <Link to={`/events/${event.id}`}>
                      <img
                        src={event.previewImage}
                        alt="event"
                        style={{
                          width: "170px",
                          height: "90px",
                          borderRadius: "3px",
                        }}
                      />
                    </Link>
                    <div className="event-details">
                      <p className="event-date font-size-md font-uppercase">
                        {fullDate(event.startDate)}
                      </p>

                      <Link to={`/events/${event.id}`}>
                        <h2 className="event-title font-size-md font-uppercase">
                          {event.name}
                        </h2>
                      </Link>
                      <div className="manage-event-bottom">
                        <p className="event-location font-size-md font-uppercase">
                          {event.Venue.city}, {event.Venue.state}
                        </p>
                        {user && user.id === event.Group.organizerId ? (
                          <div className="manage-event-buttons">
                            <Link to={`/event/${event.id}/edit`}>
                              <button className="manage-buttons">Update</button>
                            </Link>
                            <div>
                            <div style={{ height: "20px" }}>
                              <button
                                className="manage-button-red"
                                onClick={(e) => setShowModal(true)}
                              >
                                Delete
                              </button>
                            </div>
                            {showModal && (
                              <Modal onClose={() => setShowModal(false)}>
                                <DeleteEvent
                                  setShowModal={setShowModal}
                                  id={event.id}
                                />
                              </Modal>
                            )}
                              </div>
                          </div>
                        ) : (
                          <div className="manage-event-buttons">
                            <button className="manage-button-red">
                              Unattend Event
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="event-about">
                      {event.description &&
                        shortenDescription(event.description)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
}

export default MyEvents;
