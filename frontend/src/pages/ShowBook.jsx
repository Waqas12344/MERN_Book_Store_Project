import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <BackButton />
      <h1 className="text-3xl font-bold text-center my-4 text-blue-600">Book Details</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Book Information</h2>
            <div className="flex flex-col space-y-4">
              <div>
                <span className="text-gray-600 font-bold">Id:</span>
                <span className="text-lg">{book._id}</span>
              </div>
              <div>
                <span className="text-gray-600 font-bold">Title:</span>
                <span className="text-lg">{book.title}</span>
              </div>
              <div>
                <span className="text-gray-600 font-bold">Author:</span>
                <span className="text-lg">{book.author}</span>
              </div>
              <div>
                <span className="text-gray-600 font-bold">Publish Year:</span>
                <span className="text-lg">{book.publishYear}</span>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Timestamps</h2>
            <div className="flex flex-col space-y-4">
              <div>
                <span className="text-gray-600 font-bold">Create Time:</span>
                <span className="text-lg">{new Date(book.createAt).toLocaleString()}</span>
              </div>
              <div>
                <span className="text-gray-600 font-bold">Last Update Time:</span>
                <span className="text-lg">{new Date(book.updatedAt).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
