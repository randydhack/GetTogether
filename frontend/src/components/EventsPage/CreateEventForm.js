import "./CreateEventForm.css";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getGroup } from "../../store/group";
import { addEventImage, createEvent, deleteEvent } from "../../store/event";

function CreateEventForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { groupId } = useParams();

  const group = useSelector((state) => state.groupState[groupId]);
  const session = useSelector((state) => state.session.user);

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  const [errors, setErrors] = useState({});
  const [imageError, setImageError] = useState({});

  useEffect(() => {
    dispatch(getGroup(groupId));
  }, [dispatch, groupId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({})
    setImageError({})

    const splitImage = imageUrl.split(".");
    const verifiedImage =
      splitImage[splitImage.length - 1].match(/jpg|png|jpeg/g);

    if (!verifiedImage || verifiedImage === null) setImageError({ image: "Image URL must end in .png, .jpg, or .jpeg" });

    const event = await dispatch(
      createEvent(
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
        groupId
      )
    ).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });

    if (!event) return;

    if (verifiedImage === null || !verifiedImage) {
      return dispatch(deleteEvent(event.id));
    } else {
      await dispatch(addEventImage(imageUrl, event.id));
      return history.push(`/events/${event.id}`);
    }
  };

  return (
    group &&
    session.id === group.organizerId && (
      <div className="create-event-container">
        <form className="event-form-container" onSubmit={handleSubmit}>
          <h1>Create an event for {group.name}</h1>

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
                defaultValue={""}
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

          {/* --------------------- Image Input ------------------------*/}
          <label>
            <p className="event-form-questions">
              Please add in an image url for your event below:
            </p>
            <input
              required
              placeholder="Image Url"
              type="input"
              className="event-image-input"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            {imageError.image && (
              <p className="error-message">{imageError.image}</p>
            )}
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
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && (
              <p className="error-message">{errors.description}</p>
            )}
          </label>

          {/* --------------------- Submit Button --------------------------------- */}
          <div>
            <button type="submit" className="create-event-form-button">
              Create Event
            </button>
          </div>
        </form>
      </div>
    )
  );
}

export default CreateEventForm;
