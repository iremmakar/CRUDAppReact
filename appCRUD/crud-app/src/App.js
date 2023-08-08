import { useState } from "react";

import BookCard from "./components/BookCard";
import "./index.css";
import EditModal from "./components/EditModal";

function App() {
  const [bookName, setBookName] = useState("");
  const [books, setBooks] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deletedId, setDeletedId] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (bookName === "") return;

    const book = {
      id: new Date().getTime(),
      title: bookName,
      date: new Date().toLocaleString(),
      isRead: false,
    };

    setBooks([...books, book]);
    setBookName("");
  };

  const handleModal = (id) => {
    setDeletedId(id);
    setShowConfirm(true);
  };

  console.log(showConfirm);
  const handleDelete = (id) => {
    const filteredBooks = books.filter((book) => book.id !== id);
    setBooks(filteredBooks);
  };

  const handleRead = (book) => {
    const cloneBooks = [...books];
    const findIndex = cloneBooks.findIndex((item) => item.id === book.id);
    const updatedBook = { ...book, isRead: !books[findIndex].isRead };
    cloneBooks.splice(findIndex, 1, updatedBook);
    setBooks(cloneBooks);
  };

  const handleEditBook = () => {
    const index = books.findIndex((book) => book.id === editId.id);

    const cloneBooks = [...books];

    cloneBooks.splice(index, 1, editId);

    setBooks(cloneBooks);
  };

  return (
    <div>
      {/* header */}
      <div className="bg-dark text-light px-5 py-2 fs-3">Kitap Kurdu</div>

      {/* form */}
      <div className="container border">
        <form action="" className="d-flex gap-3 mt-4" onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setBookName(e.target.value)}
          />
          <button className="btn btn-warning">Ekle</button>
        </form>

        <div className="d-flex flex-column gap-3 py-5">
          {/* eğer state içi boşsa bunu ekrana yaz*/}
          {books.length === 0 && <h3>Henüz kitap eklenmedi</h3>}
          {/* eğer state içinde eleman varsa bunu ekrana yaz*/}
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              handleModal={handleModal}
              handleRead={handleRead}
              setShowEditModal={setShowEditModal}
              setEditId={setEditId}
            />
          ))}
        </div>
      </div>
      {showConfirm && (
        <div className="confirm-modal">
          <div className="modal-inner">
            <h5>Silmek istiyor musunuz?</h5>
            <button
              className="btn btn-warning"
              onClick={() => setShowConfirm(false)}
            >
              Vazgeç
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                handleDelete(deletedId);
                setShowConfirm(false);
              }}
            >
              Onayla
            </button>
          </div>
        </div>
      )}

      {showEditModal && (
        <EditModal
          setShowEditModal={setShowEditModal}
          setEditId={setEditId}
          editId={editId}
          handleEditBook={handleEditBook}
        />
      )}
    </div>
  );
}

export default App;
