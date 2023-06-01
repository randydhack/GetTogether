import { Link, useParams } from "react-router-dom";
import "./EventDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getEventDetail } from "../../store/event";
import { fetchGroups, getGroup } from "../../store/group";

function EventDetails() {
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const event = useSelector((state) => state.eventState[eventId]);
  // const groups = useSelector(state => Object.values(state.groupState))

  useEffect(() => {
    dispatch(getEventDetail(eventId));
    dispatch(fetchGroups());
  }, [dispatch, eventId]);

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

    return `${year}/${month}/${date} · ${hours}:${minutes} ${ampm}`;
  };

  return (
    event && (
      <div className="container">
        {/* Section 1 */}
        <div className="wrapper">
          <div className="event-details-section-1">
            <div>
              <Link to="/events">Back to events</Link>
            </div>
            <div>
              <h1 className="event-name">{event.name}</h1>
              <p className="organizer-name">
                COME BACK, DONT KNOW HOW TO FETCH FOR NAME
              </p>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="wrapper wrapper-details">
          <div className="event-details-section-2">
            <div>
              <img className="event-image" src={event.previewImage} />
            </div>

            {/* Side bar informaton event */}
            <div className="event-side-details">
              <Link className="group-link" to={`/groups}`}>
                <div className="group-info-section">
                  <div>
                    <img
                      className="group-image"
                      src="https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?cs=srgb&dl=pexels-josh-sorenson-976866.jpg&fm=jpg"
                    />
                  </div>
                  <div className="group-name-privacy">
                    <p className="group-name">Group Name</p>
                    <p className="group-privacy">Public</p>
                  </div>
                </div>
              </Link>

              {/* Side bar informaton price, time, type */}
              <div className="event-time-price-type">
                <div className="flex-column">
                  <i class="fa-regular fa-clock fa-2xl"></i>
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
                  <i class="fa-solid fa-money-bill fa-2xl"></i>
                  <p className="event-price">
                    {event.price > 0 ? `$${event.price}` : "FREE"}
                  </p>
                </div>
                <div className="flex-column">
                  <i class="fa-solid fa-map-pin fa-2xl event-type-icon"></i>
                  <p className="event-type">{event.type}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="wrapper">
          <div className="event-description">
            <h2>Description</h2>
            <p>{event.description}</p>
          </div>
        </div>
      </div>
    )
  );
}

export default EventDetails;
