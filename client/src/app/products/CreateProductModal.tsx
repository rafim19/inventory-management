import React, { ChangeEvent, FormEvent, useState } from "react";
import { v4 } from "uuid";
import Header from "../(components)/Header";

type ProductFormData = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formData: ProductFormData) => void;
};

const CreateProductModal = ({ isOpen, onClose, onCreate }: Props) => {
  const [formData, setFormData] = useState({
    productId: v4(),
    name: "",
    price: 0,
    stockQuantity: 0,
    rating: 0,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "price" || name === "stockQuantity" || name === "rating"
          ? parseFloat(value)
          : value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate(formData);
    onClose();
  };

  const labelCssStyles = `block text-sm font-medium text-gray-700`;
  const inputCssStyles = `block w-full mb-2 p-2 border-gray-500 border-2 rounded-md`;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600/50 overflow-y-auto h-full w-full z-20">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <Header name="Create New Product" />
        <form onSubmit={handleSubmit} className="mt-5">
          <label htmlFor="productName" className={labelCssStyles}>
            Product Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={formData.name}
            className={inputCssStyles}
            required
          />
          <label htmlFor="productPrice" className={labelCssStyles}>
            Price
          </label>
          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            value={formData.price}
            className={inputCssStyles}
            required
          />
          <label htmlFor="productStockQuantity" className={labelCssStyles}>
            Stock
          </label>
          <input
            type="number"
            name="stockQuantity"
            placeholder="Stock"
            onChange={handleChange}
            value={formData.stockQuantity}
            className={inputCssStyles}
            required
          />
          <label htmlFor="productRating" className={labelCssStyles}>
            Rating
          </label>
          <input
            type="number"
            name="rating"
            placeholder="Rating"
            onChange={handleChange}
            value={formData.rating}
            className={inputCssStyles}
            required
          />
          <div className="mt-4">
            <button
              type="submit"
              className="rounded px-4 py-2 bg-blue-500 text-white hover:bg-blue-700"
            >
              Create
            </button>
            <button
              onClick={onClose}
              className="rounded ml-2 px-4 py-2 bg-gray-500 text-white hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductModal;
