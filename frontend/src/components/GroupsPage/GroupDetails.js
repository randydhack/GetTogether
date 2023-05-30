import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getGroup } from "../../store/group";
import { getEventByGroup } from "../../store/event";

import "./GroupDetails.css";

function GroupDetails() {
  const dispatch = useDispatch();
  const { groupId } = useParams();
  const pastEvent = [];
  const upcomingEvent = [];

  const group = useSelector((state) => state.groupState[groupId]);
  const event = useSelector((state) => Object.values(state.eventState));
  const user = useSelector((state) => state.session.user);

  const [hidden, setHidden] = useState("");

  event.forEach((event) => {
    const date = new Date().toString();
    if (event.endDate < date) pastEvent.push(event);
    if (event.startDate > date) upcomingEvent.push(event);
  });

  useEffect(() => {
    dispatch(getGroup(groupId));
    dispatch(getEventByGroup(groupId));
  }, [dispatch, groupId]);

  const handleJoinGroup = (e) => {
    e.preventDefault();
    return alert("Feature coming soon");
  };

  return (
    group &&
    group.Organizer && (
      <div className="group-detail-container">
        <div className="section-1-detail">
          <div>
            <Link to="/groups" className="back-button">
              {"Back to groups"}
            </Link>
            <div className="group-details">
              <img
                style={{ width: "600px", height: "350px" }}
                src="https://media.istockphoto.com/id/186411638/photo/green-golf-field-and-blue-cloudy-sky.jpg?s=612x612&w=0&k=20&c=erretmwt9wV7oW39yBXtAI8C9AqxiAYoedOAyuf-80c="
              />
              <div className="group-info">
                <h1>{group.name}</h1>
                <p className="grey-p">
                  {group.city}, {group.state}
                </p>
                <p className="grey-p">
                  {upcomingEvent.length} events ·{" "}
                  {group.private ? "Private" : "Public"}
                </p>
                <p className="grey-p">
                  Organized by: {group.Organizer.firstName}{" "}
                  {group.Organizer.lastName}
                </p>

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
                    <button
                      onClick={handleJoinGroup}
                      className="create-event-button organizer-buttons"
                    >
                      Create Event
                    </button>
                    <button
                      onClick={handleJoinGroup}
                      style={{margin: '0px 10px'}}
                      className="organizer-buttons edit-delete-button"
                    >
                      Edit
                    </button>
                    <button
                      onClick={handleJoinGroup}
                      className="organizer-buttons edit-delete-button"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="group-detail-section-2">
          <div className="section-2-container">
            <div>
              <h2 style={{ marginBottom: "10px" }}>Organizer</h2>
              <p style={{ margin: "0px 0px", color: "grey" }}>
                {group.Organizer.firstName} {group.Organizer.lastName}
              </p>
            </div>

            <div>
              <h2>What we're about</h2>
              <p>{group.about}</p>
            </div>

            {upcomingEvent && (
              <div>
                <h2>Upcoming Events ({upcomingEvent.length})</h2>
                {upcomingEvent.map((event) => {
                  return (
                    <div key={event.id} className="upcoming-events">
                      <div>
                        <img
                          style={{ width: "200px", height: "150px" }}
                          src="https://media.istockphoto.com/id/186411638/photo/green-golf-field-and-blue-cloudy-sky.jpg?s=612x612&w=0&k=20&c=erretmwt9wV7oW39yBXtAI8C9AqxiAYoedOAyuf-80c="
                        />
                        <div>
                          <p className="event-time">{event.startDate}</p>
                          <h3>{event.name}</h3>
                          <p className="event-caption">
                            {event.Venue.city}, {event.Venue.state}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p>
                          LOREM IPSUL LOREM IPSUL LOREM IPSUL LOREM IPSUL v
                          LOREM IPSUL vvLOREM IPSUL LOREM IPSUL
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {pastEvent && (
              <div>
                <h2>Past Events ({pastEvent.length})</h2>
                {pastEvent.map((event) => {
                  return (
                    <div key={event.id} className="past-events">
                      <div className="past-event-div-1">
                        <img
                          style={{ width: "200px", height: "150px" }}
                          src="https://media.istockphoto.com/id/186411638/photo/green-golf-field-and-blue-cloudy-sky.jpg?s=612x612&w=0&k=20&c=erretmwt9wV7oW39yBXtAI8C9AqxiAYoedOAyuf-80c="
                        />
                        <div className="location-info">
                          <p className="event-time">{Date(event.startDate)}</p>
                          <h3
                            style={{
                              overflowWrap: "break-word",
                              margin: "5px 0px",
                            }}
                          >
                            {event.name}
                          </h3>
                          <p style={{ margin: "0px", color: "grey" }}>
                            {event.Venue.city}, {event.Venue.state}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="event-caption">
                          LOREM IPSUL LOREM IPSUL LOREM IPSUL LOREM IPSUL v
                          LOREM IPSUL vvLOREM IPSUL LOREM IPSUL LOREM IPSUL
                          LOREM IPSUL LOREM IPSUL LOREM IPSUL v LOREM IPSUL
                          vvLOREM IPSUL LOREM IPSUL LOREM IPSUL LOREM IPSUL
                          LOREM IPSUL LOREM IPSUL v LOREM IPSUL vvLOREM IPSUL
                          LOREM IPSUL LOREM IPSUL LOREM IPSUL LOREM IPSUL LOREM
                          IPSUL v
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default GroupDetails;
