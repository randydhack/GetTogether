import "./CreateGroupForm.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { createGroup } from "../../store/group";

function CreateGroupForm() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [privated, setPrivated] = useState('');
  const [type, setType] = useState("");
  const [errors, setErrors] = useState({});

  console.log(errors);
  const handleSubmit = (e) => {
    e.preventDefault();

    return dispatch(
      createGroup({ name, about, city, state, privated, type })
    ).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  };

  return (
    <div className="container">
      <div className="container-headers">
        <h1>START A NEW GROUP AND BECOME AN ORGANIZER</h1>
        <h2>
          We'll walk you through a few steps to build your local community
        </h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="border-line"></div>
        <div>
          <label>
            <h2 className="section-title">First, set your group's location.</h2>
            <p className="section-caption">
              Meetup groups meet locally, in person and online. We'll connect
              you with people in your area, and more can join you online.
            </p>
            <div className="city-state-field">
              <div>
                <input
                  placeholder="City"
                  type="input"
                  className="input-box"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                ></input>
                {errors.city && <p className="error-message">{errors.city}</p>}
              </div>
              <div>
                <input
                  placeholder="STATE"
                  type="input"
                  className="input-box state-input-box"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                ></input>
                {errors.state && <p className="error-message state-input-box">{errors.state}</p>}
              </div>
            </div>
          </label>
        </div>

        <div className="border-line"></div>

        <div className="group-name-container">
          <label>
            <h2 className="section-title">What will your group's name be?</h2>
            <p className="section-caption">
              Choose a name that will give people a clear idea of what the group
              is about. Feel free to get creative! You can edit this later if
              you change your mind.
            </p>
            <input
              placeholder="What is your group's name?"
              type="input"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
            {errors.name && <p className="error-message">{errors.name}</p>}
          </label>
        </div>

        <div className="border-line"></div>

        <div>
          <label>
            <h2 className="section-title">
              Now describe what your group will be about
            </h2>
            <p className="section-caption">
              People will see this when we promote your group, but you'll be
              able to add to it later, too.
            </p>
            <ol>
              <li>What's the purpose of the group?</li>
              <li>Who should join?</li>
              <li>What will you do at your events?</li>
            </ol>
            <textarea
              placeholder="Please write at least 30 characters"
              type="input"
              className="text-area-box"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
            {errors.about && <p className="error-message">{errors.about}</p>}
          </label>
        </div>
        <div className="border-line"></div>

        <div>
          <label>
            <h2 className="section-title">Final step...</h2>
            <p className="section-caption">
              Is this an in person or online group?
            </p>
            <select onChange={(e) => setType(e.target.value)}>
              <option value="" disabled selected>
                (Select One)
              </option>
              <option value="In person">In person</option>
              <option value="Online">Online</option>
            </select>
            {errors.type && <p className="error-message">{errors.type}</p>}

            <p>Is this group public or private?</p>
            <select onChange={(e) => setPrivated(e.target.value)}>
              <option value="" disabled selected>
                (Select One)
              </option>
              <option value="false">Public</option>
              <option value="true">Private</option>
            </select>
            {errors.private && <p className="error-message">{errors.private}</p>}

            <p>Please add in image url for your group below:</p>
            <input type="text" placeholder="Image Url"></input>
          </label>
        </div>
        <button type="submit" className="create-group-button">
          Create Group
        </button>
      </form>
    </div>
  );
}

export default CreateGroupForm;
