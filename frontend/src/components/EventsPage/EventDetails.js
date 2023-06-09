import { Link, useParams } from "react-router-dom";
import "./EventDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getEventDetail } from "../../store/event";
import DeleteEventModal from "./DeleteEventModal";

function EventDetails() {
  const dispatch = useDispatch();
  const { eventId } = useParams();

  const event = useSelector((state) => state.eventState[eventId]);
  const user = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(getEventDetail(eventId))
      setIsLoaded(true);
    })();
  }, [dispatch, eventId]);

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

  return (
    isLoaded && (
      <div className="events-detail-container">
        {/* Section 1 */}

        <div className="event-details-section-1">
          <div>
          <Link to="/events" className="back-to-events-container"><i className="fa-solid fa-arrow-left"></i><span className="back-button-events">Back to events</span></Link>
          </div>
          <div>
            <h1 className="event-name">{event?.name}</h1>
            <p className="organizer-name">
              Hosted by {event.Group?.Organizer?.firstName} {event.Group.Organizer?.lastName}
            </p>
          </div>
        </div>

        {/* Section 2 */}
        <div className="event-details-section-2">
          {/* image */}
          <div className="main-event-container">
            <img className="event-image" src={event.previewImage} alt="event" />

            {/* Side bar informaton event */}
            <div className="event-side-details">
              <Link
                className="event-group-link"
                to={`/groups/${event.groupId}`}
              >
                <div className="group-info-section">
                  <img
                    className="group-image"
                    src={event.Group?.GroupImages[0].url}
                    alt="group"
                  />
                  <div className="group-name-privacy">
                    <p className="group-name">{event.Group?.name}</p>
                    <p className="group-privacy">
                      {event.Group?.private ? "Private" : "In Person"}
                    </p>
                  </div>
                </div>
              </Link>

              {/* Side bar informaton price, time, type */}
              <div className="event-time-price-type">
                <div className="flex-column">
                  <i className="fa-regular fa-clock fa-2xl"></i>
                  <div className="start-end-date">
                    <p className="start-date">
                      Start Date:{" "}
                      <span className="span-start-date">
                        {fullDate(event.startDate)}
                      </span>
                    </p>
                    <p className="end-date">
                      End Date:{" "}
                      <span className="span-end-date">
                        {fullDate(event.endDate)}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex-column">
                  <i className="fa-solid fa-money-bill fa-2xl"></i>
                  <p className="event-price">
                    {event.price > 0 ? `$${event.price}` : "FREE"}
                  </p>
                </div>
                <div className="flex-column">
                  <i className="fa-solid fa-map-pin fa-2xl event-type-icon"></i>
                  <div className="event-type">
                    <p>{event.type} </p>
                    {user && user.id === event.Group?.Organizer?.id && (
                      <p>
                        <DeleteEventModal event={event} />
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="event-description">
          <h2>Description</h2>
          <p style={{ width: "95%", wordBreak: 'break-word'}}>{event.description}</p>
        </div>
      </div>
    )
  );
}

export default EventDetails;
