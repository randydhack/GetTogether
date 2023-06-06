import { fetchGroups } from "../../store/group";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import "./GroupsPage.css";

function GroupsPage() {
  const dispatch = useDispatch();
  const groups = useSelector((state) => Object.values(state.groupState));

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  return (
    groups && (
      <div className="all-group-container">
        <div className="event-group-heading">
          <Link style={{color: 'grey'}} to="/events">Events</Link>
          <span>Groups</span>
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
                  src={group.GroupImages[group.GroupImages.length - 1].url}
                  style={{ width: "200px", height: "140px", borderRadius: '5px' }}
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
