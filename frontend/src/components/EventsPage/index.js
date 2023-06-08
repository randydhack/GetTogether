import { useEffect, useState } from "react";
import { fetchEvent } from "../../store/event";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./EventsPage.css";

function EventsPage() {
  const dispatch = useDispatch();

  const events = useSelector((state) => Object.values(state.eventState));
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(fetchEvent()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const fullDate = (data) => {
    const eventDate = new Date(data);
    const year = eventDate.getFullYear();
    const month = eventDate.getMonth();
    const date = eventDate.getDate();

    let hours = eventDate.getHours();
    let minutes = eventDate.getMinutes();

    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return `${month}/${date}/${year} · ${hours}:${minutes} ${ampm}`;
  };

  const sortEventByDate = events.sort((a, b) => {
    const timeA = a.startDate;
    const timeB = b.startDate;

    const convertTimeA = new Date(timeA).getTime();
    const convertTimeB = new Date(timeB).getTime();

    return convertTimeB - convertTimeA;
  });

  const shortenDescription = (description) => {
    return description.split(".").slice(0, 5).join(".");
  };
  return (
    isLoaded && (
      <div className="all-events-container">
        <div className="events-nav">
          <span>Events</span>
          <Link to="/groups" className="groups-link">
            Groups
          </Link>
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
          Events in GatherUp
        </p>
        {sortEventByDate.map((event) => {
          return (
            <Link
              key={event.id}
              to={`/events/${event.id}`}
              className="event-link"
            >
              <div key={event.id} className="events-container">
                <div className="flex-row">
                  <img
                    src={event.previewImage}
                    alt="event"
                    style={{
                      width: "200px",
                      height: "120px",
                      borderRadius: "5px",
                    }}
                  />
                  <div className="event-details">
                    <p className="event-date">{fullDate(event.endDate)}</p>
                    <h2 className="event-title">{event.name}</h2>
                    <p className="event-location">
                      {event.Venue.city}, {event.Venue.state}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="event-about">
                    {event.description && shortenDescription(event.description)}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    )
  );
}

export default EventsPage;
