import { userGroups } from "../../store/group";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../GroupsPage/GroupsPage.css";


function MyGroups() {
    const dispatch = useDispatch();
    const groups = useSelector((state) => Object.values(state.groupState));

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
      (async () => {
        await dispatch(userGroups());
        setIsLoaded(true);
      })();
    }, [dispatch]);

    return (
      isLoaded && (
        <div className="all-group-container">
          <div className="event-group-heading">
            <Link style={{ color: "grey" }} to="/events/manage">
              Events
            </Link>
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
      )
    );
}

export default MyGroups