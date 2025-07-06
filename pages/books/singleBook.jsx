import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getImgUrl } from '../../utils/getImgUrl';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { useFetchBookByIdQuery } from '../../redux/features/books/booksApi';

const SingleBook = () => {
  const { id } = useParams();
  const { data: book, isLoading, isError } = useFetchBookByIdQuery(id);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError || !book) return <div>Not able to load book info</div>;

  return (
    <div className="max-w-lg shadow-md p-5">
      <h1 className="text-2xl font-bold mb-6">{book?.title}</h1>

      <div>
        <img
          src={getImgUrl(book?.coverImage)}
          alt={book?.title || 'Book cover'}
          className="mb-8"
        />

        <div className="mb-5">
          <p className="text-gray-700 mb-2">
            <strong>Author:</strong> {book?.author || 'Admin'}
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Published:</strong>{' '}
            {new Date(book?.createdAt).toLocaleDateString()}
          </p>
          <p className="text-gray-700 mb-4 capitalize">
            <strong>Category:</strong> {book?.category}
          </p>
          <p className="text-gray-700">
            <strong>Description:</strong> {book?.description}
          </p>
        </div>

        <button
  onClick={() => handleAddToCart(book)}
  className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded flex items-center gap-1"
>
  <FiShoppingCart />
  <span>Add to Cart</span>
</button>

      </div>
    </div>
  );
};

export default SingleBook;
