import { useEffect } from "react";
import { fetchEvent } from "../../store/event";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./EventsPage.css";

function EventsPage() {
  const dispatch = useDispatch();

  const events = useSelector((state) => Object.values(state.eventState));

  const sortedEvents = events.sort((a, b) => b - a);

  useEffect(() => {
    dispatch(fetchEvent());
  }, [dispatch, fetchEvent]);

  const fullDate = (data) => {
    const eventDate = new Date(data);
    const year = eventDate.getFullYear();
    const month = eventDate.getMonth();
    const date = eventDate.getDate();

    const time = eventDate.toLocaleTimeString("en-US");

    return `${year}/${month}/${date} · ${time}`;
  };

  return (
    events && (
      <div className="container">
        <div className="events-nav">
          <Link>Events</Link>
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
        {sortedEvents.map((event) => {
          return (
            <Link
              key={event.id}
              to={`/events/${event.id}`}
              className="event-link"
            >
              <div key={event.id} className="events-container">
                <img
                  src="https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?cs=srgb&dl=pexels-josh-sorenson-976866.jpg&fm=jpg"
                  style={{ width: "200px", height: "150px", borderRadius: '5px' }}
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
                <p>EVENT DETAILS (FIX BACKEND)</p>
              </div>
            </Link>
          );
        })}
      </div>
    )
  );
}

export default EventsPage;
