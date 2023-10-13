import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateGroup, getGroup } from "../../store/group";
import { Redirect, useHistory, useParams } from "react-router-dom";
import "./UpdateGroup.css";
import { useEffect } from "react";

function UpdateGroup() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { groupId } = useParams();

  const group = useSelector((state) => state.groupState[groupId]);
  const user = useSelector((state) => state.session.user);

  const [name, setName] = useState(group?.name || "");
  const [about, setAbout] = useState(group?.about || "");
  const [city, setCity] = useState(group?.city || "");
  const [state, setState] = useState(group?.state || "");
  const [privated, setPrivated] = useState(false);
  const [type, setType] = useState(group?.type || "");

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getGroup(groupId));
  }, [dispatch, groupId]);

  if (!user || user.id !== group?.organizerId) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(
      updateGroup({ name, about, city, state, privated, type }, groupId)
    ).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });

    return history.push(`/groups/${groupId}`);
  };

  console.log(name, city)

  return (
    user &&
    user.id === group.organizerId && (
      <div className="create-group-container">
        <form onSubmit={handleSubmit}>
          <div className="container-headers">
            <h1>UPDATE YOUR GROUP</h1>
            <h2>
              We'll walk you through a few steps to update your group's
              information
            </h2>
          </div>
          <div className="border-line"></div>
          <div>
            <label>
              <h2 className="section-title">
                First, set your group's location.
              </h2>
              <p className="section-caption">
                Meetup groups meet locally, in person and online. We'll connect
                you with people in your area, and more can join you online.
              </p>
              <div className="city-state-field">
                <div>
                <p style={{margin: '0px'}}>City:</p>
                  <input
                    required
                    placeholder="City"
                    type="input"
                    className="input-box"
                    defaultValue={group.city}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  ></input>
                  {errors.city && (
                    <p className="error-message">City is required</p>
                  )}
                </div>
                <div style={{marginLeft: '20px'}}>
                  <p style={{margin: '0px'}}>State:</p>
                  <select
                    defaultValue="DEFAULT"
                    onChange={(e) => setState(e.target.value)}
                    className="state-select"
                    value={state}
                    required
                  >
                    <option value="" disabled>
                      (Select One)
                    </option>
                    <option value="AL">AL</option>
                    <option value="AK">AK</option>
                    <option value="AR">AR</option>
                    <option value="AZ">AZ</option>
                    <option value="CA">CA</option>
                    <option value="CO">CO</option>
                    <option value="CT">CT</option>
                    <option value="DC">DC</option>
                    <option value="DE">DE</option>
                    <option value="FL">FL</option>
                    <option value="GA">GA</option>
                    <option value="HI">HI</option>
                    <option value="IA">IA</option>
                    <option value="ID">ID</option>
                    <option value="IL">IL</option>
                    <option value="IN">IN</option>
                    <option value="KS">KS</option>
                    <option value="KY">KY</option>
                    <option value="LA">LA</option>
                    <option value="MA">MA</option>
                    <option value="MD">MD</option>
                    <option value="ME">ME</option>
                    <option value="MI">MI</option>
                    <option value="MN">MN</option>
                    <option value="MO">MO</option>
                    <option value="MS">MS</option>
                    <option value="MT">MT</option>
                    <option value="NC">NC</option>
                    <option value="NE">NE</option>
                    <option value="NH">NH</option>
                    <option value="NJ">NJ</option>
                    <option value="NM">NM</option>
                    <option value="NV">NV</option>
                    <option value="NY">NY</option>
                    <option value="ND">ND</option>
                    <option value="OH">OH</option>
                    <option value="OK">OK</option>
                    <option value="OR">OR</option>
                    <option value="PA">PA</option>
                    <option value="RI">RI</option>
                    <option value="SC">SC</option>
                    <option value="SD">SD</option>
                    <option value="TN">TN</option>
                    <option value="TX">TX</option>
                    <option value="UT">UT</option>
                    <option value="VT">VT</option>
                    <option value="VA">VA</option>
                    <option value="WA">WA</option>
                    <option value="WI">WI</option>
                    <option value="WV">WV</option>
                    <option value="WY">WY</option>
                  </select>
                  {errors.state && (
                    <p className="error-message state-input-box">
                      State is required
                    </p>
                  )}
                </div>
              </div>
            </label>
          </div>

          <div className="border-line"></div>

          <div className="group-name-container">
            <label>
              <h2 className="section-title">What will your group's name be?</h2>
              <p className="section-caption">
                Choose a name that will give people a clear idea of what the
                group is about. Feel free to get creative! You can edit this
                later if you change your mind.
              </p>
              <input
                required
                placeholder="What is your group's name?"
                type="input"
                className="input-box"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
              {errors.name && <p className="error-message">Name is required</p>}
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
                required
                placeholder="Please write at least 50 characters"
                type="input"
                className="text-area-box"
                minLength={50}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
              {errors.about && <p className="error-message">{errors.about}</p>}
            </label>
          </div>
          <div className="border-line"></div>

          <div>
            <label>
              <h2 className="section-title">Final steps...</h2>
              <p className="section-caption">
                Is this an in person or online group?
              </p>
              <select
                onChange={(e) => setType(e.target.value)}
                defaultValue={type}
                required
              >
                <option value="" disabled>
                  (Select One)
                </option>
                <option value="In person">In person</option>
                <option value="Online">Online</option>
              </select>
              {errors.type && (
                <p className="error-message">Group Type is required</p>
              )}

              <p>Is this group public or private?</p>
              <select
                required
                onChange={(e) => setPrivated(e.target.value)}
                defaultValue={privated}
              >
                <option value="" disabled>
                  (Select One)
                </option>
                <option value="false">Public</option>
                <option value="true">Private</option>
              </select>
              {errors.private && (
                <p className="error-message">Visibility Type is required</p>
              )}
            </label>
          </div>
          <button type="submit" className="create-group-button">
            Update Group
          </button>
        </form>
      </div>
    )
  );
}

export default UpdateGroup;
