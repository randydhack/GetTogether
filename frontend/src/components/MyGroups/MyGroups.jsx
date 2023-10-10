// Hooks
import { userGroups, deleteGroup } from "../../store/group";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
// Context
import { Modal } from "../../context/Modal";
// Components
import DeleteGroup from "../GroupsPage/DeleteGroup";
// CSS
import "../GroupsPage/GroupsPage.css";
import "./MyGroups.css";

function MyGroups() {
  const dispatch = useDispatch();
  const groups = useSelector((state) => Object.values(state.groupState));
  const user = useSelector((state) => state.session.user);

  const [isLoaded, setIsLoaded] = useState(false);
  const [groupId, setGroupId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(userGroups());
      setIsLoaded(true);
    })();
  }, [dispatch]);

  return (
    isLoaded && (
      <div className="my-group-container">
        <div>
          <div className="my-event-group-heading">
            <span>Manage Groups</span>
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
              <div key={group.id} className="group-div">
                <div key={group.id} className="group-container">
                  <Link to={`/groups/${group.id}`}>
                    <img
                      src={group.previewImage}
                      alt="group"
                      style={{
                        width: "170px",
                        height: "90px",
                        borderRadius: "5px",
                      }}
                    />
                  </Link>
                  <div className="group-info">
                    <Link to={`/groups/${group.id}`}>
                      <h2 className="group-detail-name">{group.name}</h2>
                    </Link>
                    <p className="group-location">
                      {group.city}, {group.state}
                    </p>
                    <p className="group-about" maxLength="25">
                      {group.about}
                    </p>
                    <div className="bottom-group-card">
                      <p
                        className="group-members"
                        style={{ color: "grey", width: "100%" }}
                      >
                        {group.numMembers} Members ·{" "}
                        {group.private ? "Private" : "Public"}
                      </p>
                      {user.id === group.organizerId ? (
                        <div className="manage-groups-owner-button">
                          <Link
                            to={`/group/${group.id}/edit`}
                            style={{ height: "20px" }}
                          >
                            <button className="manage-buttons">Update</button>
                          </Link>
                          <div style={{ height: "20px" }}>
                            <button
                              className="manage-button-red"
                              onClick={(e) => setShowModal(true)}
                            >
                              Delete
                            </button>
                          </div>

                          {showModal && (
                            <Modal onClose={() => setShowModal(false)}>
                              <DeleteGroup
                                setShowModal={setShowModal}
                                id={group.id}
                              />
                            </Modal>
                          )}
                        </div>
                      ) : (
                        <div className="manage-groups-owner-button">
                          <div>
                            <button className="manage-button-red">
                              Leave Group
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
}

export default MyGroups;
