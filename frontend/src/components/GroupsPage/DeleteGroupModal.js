import './DeleteGroup.css'
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteGroup from './DeleteGroup';
import './DeleteGroup.css'

function DeleteGroupModal() {

    const [showModal, setShowModal] = useState(false);

    return (
      <>
        <button onClick={() => setShowModal(true)} className='delete-group-button'>Delete</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <DeleteGroup setShowModal={setShowModal}/>
          </Modal>
        )}
      </>
    );
}

export default DeleteGroupModal;
