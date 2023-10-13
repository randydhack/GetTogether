import { fetchGroups } from "../../store/group";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./GroupsPage.css";

function GroupsPage() {
  const dispatch = useDispatch();
  const groups = useSelector((state) => Object.values(state.groupState));

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(fetchGroups());
      setIsLoaded(true);
    })();
  }, [dispatch]);

  return (
    isLoaded && (
      <div className="all-group-container">
        <div>


        <div className="event-group-heading">
          <Link style={{ color: "grey" }} to="/events">
            Events
          </Link>
          <span>Groups</span>
        </div>
        <p
          style={{
            color: "grey",
            fontSize: "14px",
          }}
        >
          Groups in GatherUp
        </p>
        {groups.reverse().map((group, i) => {
          return (
            <Link
              key={group.id}
              to={`/groups/${group.id}`}
              className="group-link"
            >
              <div key={group.id} className="group-container">
                <img
                  src={group.previewImage}
                  alt="group"
                  style={{
                    width: "170px",
                    height: "90px",
                    borderRadius: "5px",
                  }}
                />
                <div className="group-info">
                  <h2 className="group-detail-name">{group.name}</h2>
                  <p className="group-location">
                    {group.city}, {group.state}
                  </p>
                  <p className="group-about" maxLength="25">
                    {group.about}
                  </p>
                  <p className="group-members" style={{ color: "grey" }}>
                    {group.numMembers} Members ·{" "}
                    {group.private ? "Private" : "Public"}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
        </div>
      </div>
    )
  );
}

export default GroupsPage;
