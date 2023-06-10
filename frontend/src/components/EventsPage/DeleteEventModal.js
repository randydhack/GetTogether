import "./DeleteEvent.css";
import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import DeleteEvent from "./DeleteEvent";

function DeleteEventModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="delete-event-button"
      >
        Delete Event
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteEvent setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default DeleteEventModal;
