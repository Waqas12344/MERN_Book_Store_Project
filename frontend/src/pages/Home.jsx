import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5000/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl my-8 text-center">Books List</h1>
      <div className="flex justify-center mb-8">
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {books.map((book, index) => (
            <div key={book._id} className="bg-white rounded-lg border border-gray-200 shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">{book.title}</h2>
              <p className="text-gray-600 mb-2"><strong>Author:</strong> {book.author}</p>
              <p className="text-gray-600 mb-4"><strong>Publish Year:</strong> {book.publishYear}</p>
              <div className="flex justify-center">
                <Link to={`/books/details/${book._id}`} className="text-green-800 mx-2">
                  <BsInfoCircle className="text-2xl" />
                </Link>
                <Link to={`/books/edit/${book._id}`} className="text-yellow-800 mx-2">
                  <AiOutlineEdit className="text-2xl" />
                </Link>
                <Link to={`/books/delete/${book._id}`} className="text-red-800 mx-2">
                  <MdOutlineDelete className="text-2xl" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
