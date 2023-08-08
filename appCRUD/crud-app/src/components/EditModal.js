import React, { useState } from "react";

const EditModal = ({ setShowEditModal, setEditId, editId, handleEditBook }) => {
  const [newBookName, setNewBookName] = useState("");

  const handleSave = () => {
    setShowEditModal(false);
  };

  return (
    <div className="confirm-modal">
      <div className="modal-inner">
        <h5>Kitap ismini düzenle</h5>
        <input
          type="text"
          className="form-control shadow"
          onChange={(e) => setEditId({ ...editId, title: e.target.value })}
        />
        <div className="d-flex justify-content-between">
          <button
            className="btn btn-warning"
            onClick={() => setShowEditModal(false)}
          >
            Vazgeç
          </button>
          <button
            className="btn btn-success"
            onClick={() => {
              handleEditBook();
              handleSave();
            }}
          >
            Kaydet
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
