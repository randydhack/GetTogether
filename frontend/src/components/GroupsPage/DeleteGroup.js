import React, { useState } from "react";
import { useDispatch, } from "react-redux";
import { useHistory,  useParams } from "react-router-dom";
import { deleteGroup } from "../../store/group";
import { Modal } from '../../context/Modal';

function DeleteGroup() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { groupId } = useParams()

    const [showModal, setShowModal] = useState(false);

    const handleDeleteGroup = (e) => {
        e.preventDefault()

        dispatch(deleteGroup(groupId))
        return history.push('/groups')
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
