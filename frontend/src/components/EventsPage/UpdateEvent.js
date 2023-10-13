import "./CreateEventForm.css";
import { useHistory, useParams, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addEventImage, createEvent, deleteEvent, getEventDetail, updateEvent } from "../../store/event";

function UpdateEventForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { eventId } = useParams();

  const event = useSelector((state) => state.eventState[eventId]);
  const user = useSelector((state) => state.session.user);

  const [name, setName] = useState(event?.name || '');
  const [type, setType] = useState(event?.type || "");
  const [price, setPrice] = useState(event?.price || "");
  const [capacity, setCapacity] = useState(event?.capacity || "");
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState(event?.description || "");

  const [errors, setErrors] = useState({});

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(getEventDetail(eventId)).then(() => setIsLoaded(true));
  }, [dispatch, eventId, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({})

    const event = await dispatch(
      updateEvent(
        {
          venueId: 1,
          name,
          type,
          capacity,
          price,
          description,
          startDate,
          endDate,
        },
        eventId
      )
    ).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });

    if (!event) return;

    return history.push(`/events/${eventId}`)
  };



  return (
    isLoaded &&
    user.id === event.Group.Organizer.id &&
     (
      <div className="create-event-container">
        <form className="event-form-container" onSubmit={handleSubmit}>
          <h1>Create an event for {event.name}</h1>

          <div className="border-line"></div>

          {/* Name input section */}
          <label className="event-name-input">
            <p className="event-form-questions">
              What is the name of your event?
            </p>
            <input
              required
              placeholder="Event Name"
              value={name}
              maxLength={60}
              onChange={(e) => setName(e.target.value)}
            ></input>
            {errors.name && <p className="error-message">{errors.name}</p>}
          </label>

          <div className="border-line"></div>

          {/* ------------------------ Input info for Event ------------------------------- */}
          <label>
            <div>
              <p className="event-form-questions">
                Is this an in person or online event?
              </p>
              <select
                required
                onChange={(e) => setType(e.target.value)}
                defaultValue={type}
              >
                <option value="" disabled>
                  (Select one)
                </option>
                <option value="In person">In Person</option>
                <option value="Online">Online</option>
              </select>
              {errors.type && <p className="error-message">{errors.type}</p>}
            </div>

            <div>
              <p className="event-form-questions">
                What is the price of your event?
              </p>
              <input
                required
                className="event-price-input"
                placeholder="$0"
                defaultValue={price}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              {errors.price && <p className="error-message">{errors.price}</p>}
            </div>

            <div>
              <p className="event-form-questions">
                What is the capacity for the event?
              </p>
              <input
                required
                className="event-price-input"
                placeholder="Capacity"
                defaultValue={capacity}
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
              />
              {errors.capacity && (
                <p className="error-message">{errors.capacity}</p>
              )}
            </div>
          </label>

          <div className="border-line"></div>

          {/* ------------------ Start and End Date of Event ---------------------*/}
          <label>
            <div>
              <p className="event-form-questions">
                When does your event start?
              </p>
              <input
                required
                className="event-date-input"
                placeholder="MM/DD/YYYY HH:mm AM"
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <span className="event-calendar-icon">
                <i className="fa-solid fa-calendar-days fa-lg"></i>
              </span>
              {errors.startDate && (
                <p className="error-message">{errors.startDate}</p>
              )}
            </div>
            <div>
              <p className="event-form-questions">When does your event end?</p>
              <input
                required
                className="event-date-input"
                placeholder="MM/DD/YYYY HH:mm PM"
                type="datetime-local"
                defaultValue={endDate}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <span className="event-calendar-icon">
                <i className="fa-solid fa-calendar-days fa-lg"></i>
              </span>
              {errors.endDate && (
                <p className="error-message">{errors.endDate}</p>
              )}
            </div>
          </label>

          <div className="border-line"></div>

          {/* ------------------------------ Description Input ------------------------------------ */}
          <label>
            <p className="event-form-questions">Please describe your event:</p>
            <textarea
              required
              className="event-description-input"
              placeholder="Please include at least 30 characters"
              value={description}
              maxLength={255}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && (
              <p className="error-message">{errors.description}</p>
            )}
          </label>

          {/* --------------------- Submit Button --------------------------------- */}
          <div>
            <button type="submit" className="create-event-form-button">
              Update Event
            </button>
          </div>
        </form>
      </div>
    )
  );
}

export default UpdateEventForm;
