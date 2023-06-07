import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect, useParams } from "react-router-dom";
import { deleteGroup } from "../../store/group";
import { Modal } from '../../context/Modal';
import { getEventByGroup, deleteEvent } from "../../store/event";

function DeleteGroup() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { groupId } = useParams()

    const [showModal, setShowModal] = useState(false);

    const handleDeleteGroup = (e) => {
        e.preventDefault()

        history.push('/groups')
        dispatch(deleteGroup(groupId))
    }

  return (
    <>
    <form className="delete-form-container">
        <h1>Confirm Delete</h1>
        <p>Are you sure you want to remove this group?</p>
        <button className="delete-group-delete-button delete-group-yes" onClick={handleDeleteGroup}>
            Yes (Delete Group)
        </button>
        <button className="delete-group-delete-button delete-group-no">{showModal && (
          <Modal onClose={() => setShowModal(false)}>
          </Modal>
        )}
        No (Keep Group)</button>
    </form>
    </>
  );
}
export default DeleteGroup;
