import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, } from "react-redux";
import { useHistory,  useParams } from "react-router-dom";
import { deleteEvent, getEventDetail } from "../../store/event";

function DeleteEvent({ setShowModal, id}) {
    const dispatch = useDispatch()
    const history = useHistory()
    const { eventId } = useParams();

    const handleDeleteEvent = async (e) => {
        e.preventDefault()

        await dispatch(deleteEvent(eventId || id))

        if (eventId) {
          return history.push(`/events`);
        }
        setShowModal(false)
    }

    const handleCancelEvent = (e) => {
      e.preventDefault()
      setShowModal(false)
    }

  return (
    <>
    <form className="delete-form-container">
        <h1>Confirm Delete</h1>
        <p>Are you sure you want to remove this Event?</p>
        <button className="delete-event-delete-button delete-event-yes" onClick={handleDeleteEvent}>
            Yes (Delete Event)
        </button>
        <button className="delete-event-delete-button delete-event-no" onClick={handleCancelEvent}>
        No (Keep Event)</button>
    </form>
    </>
  );
}
export default DeleteEvent;
