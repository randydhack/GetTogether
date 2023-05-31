import { fetchGroups } from "../../store/group";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, Switch, Route } from "react-router-dom";

import GroupDetails from "./GroupDetails";
import "./GroupsPage.css";

function GroupsPage() {
  const dispatch = useDispatch();
  const groups = useSelector((state) => Object.values(state.groupState));

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  return (
    groups && (
      <div className="container">
        <div className="event-group-heading">
          <Link style={{color: 'grey'}} to="/events">Events</Link>
          <Link>Groups</Link>
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
          Groups in GatherUp
        </p>
        {groups.map((group) => {
          return (
            <Link key={group.id} to={`/groups/${group.id}`} className="group-link">
              <div key={group.id} className="group-container">
                <img
                  src="https://t4.ftcdn.net/jpg/02/16/27/49/360_F_216274912_GyI0SwIKvhuxxrLpOv5QYxqmaoaLZkQg.jpg"
                  style={{ width: "200px", height: "150px", borderRadius: '5px' }}
                />
                <div className="group-info">
                  <h2 className="group-name">{group.name}</h2>
                  <p className="group-location" style={{ color: "grey" }}>
                    {group.city}, {group.state}
                  </p>
                  <p className="group-about">{group.about}</p>
                  <p className="group-event" style={{ color: "grey" }}>
                    ## Events · {group.private ? "Private" : "Public"}
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

export default GroupsPage;
