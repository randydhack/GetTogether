import React, { useState } from "react";
import { useDispatch, } from "react-redux";
import { useHistory,  useParams } from "react-router-dom";
import { deleteGroup } from "../../store/group";

function DeleteGroup({ setShowModal, id }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const { groupId } = useParams()

    const handleDeleteGroup = async (e) => {
        e.preventDefault()
        dispatch(deleteGroup(groupId || id))

        if (groupId) {
          return history.push(`/groups`);
        }
        setShowModal(false)
    }

    const handleCancelDelete = (e) => {
      e.preventDefault()
      setShowModal(false)
      return;
    }

  return (
    <>
    <form className="delete-form-container">
        <h1>Confirm Delete</h1>
        <p>Are you sure you want to remove this group?</p>
        <button className="delete-group-delete-button delete-group-yes" onClick={handleDeleteGroup}>
            Yes (Delete Group)
        </button>
        <button className="delete-group-delete-button delete-group-no" onClick={handleCancelDelete}>
        No (Keep Group)</button>
    </form>
    </>
  );
}
export default DeleteGroup;
