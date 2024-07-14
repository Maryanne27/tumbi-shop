import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";

const DeleteModal = ({ isOpen, onClose, onDelete, productName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white shadow-lg p-4 z-10 text-center">
        <h3 className="text-lg font-bold">Remove from Cart</h3>
        <p className="mt-4 text-sm">Do you really want to remove this item from the cart?</p>
        <div className="flex flex-row justify-center items-center mt-6 space-x-4">
          <button className="px-4 py-2 bg-black1 text-white rounded flex items-center space-x-2">
            <RiDeleteBinLine onClick={onDelete} className="cursor-pointer" />
            <span onClick={onClose} className="cursor-pointer">Back to Store</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
