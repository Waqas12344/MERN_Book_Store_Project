import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5000/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        console.error('Error deleting book:', error);
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-8">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-lg w-full">
        <BackButton />
        <h1 className="text-3xl font-bold my-4 text-center text-gray-800">Delete Book</h1>
        {loading ? (
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-6 text-gray-800">Are you sure you want to delete this book?</h3>
            <button
              className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-200 transition"
              onClick={handleDeleteBook}
            >
              Yes, Delete It
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteBook;
