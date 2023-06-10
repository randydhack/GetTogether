import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, } from "react-redux";
import { useHistory,  useParams } from "react-router-dom";
import { deleteEvent, getEventDetail } from "../../store/event";
import { Modal } from '../../context/Modal';

function DeleteEvent() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { eventId } = useParams();

    const [isLoaded, setIsLoaded] = useState(false)


    const event = useSelector(state => state.eventState[eventId])

    useEffect(() => {
      (async () => dispatch(getEventDetail(eventId)).then(() => setIsLoaded(true)))()
    }, [dispatch, eventId])

    const [showModal, setShowModal] = useState(false);

    const handleDeleteEvent = async (e) => {
        e.preventDefault()

        const groupId = event.Group.id
        await dispatch(deleteEvent(eventId))
        return history.push(`/groups/${groupId}`)
    }

  return isLoaded && (
    <>
    <form className="delete-form-container">
        <h1>Confirm Delete</h1>
        <p>Are you sure you want to remove this Event?</p>
        <button className="delete-event-delete-button delete-event-yes" onClick={handleDeleteEvent}>
            Yes (Delete Event)
        </button>
        <button className="delete-event-delete-button delete-event-no">{showModal && (
          <Modal onClose={() => setShowModal(false)}>
          </Modal>
        )}
        No (Keep Event)</button>
    </form>
    </>
  );
}
export default DeleteEvent;
