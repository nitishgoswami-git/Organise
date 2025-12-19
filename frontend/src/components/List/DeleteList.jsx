import React, { useState } from "react";
import { listApi } from "../../api/list";
import { useListStore } from "../../store/lists.store";
import { useCardStore } from "../../store/cards.store";

const DeleteList = ({ list, onClose }) => {
  const { removeList } = useListStore();
  const { removeCardsByList } = useCardStore(); 
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!list?._id) return;

    setLoading(true);

   
    removeList(list._id);
    removeCardsByList(list._id); 
    onClose();

    try {
      await listApi.deleteList(list._id);
    } catch (err) {
      console.error("Delete list failed:", err);
      // optional: refetch lists + cards or show toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] bg-white rounded-xl p-5 shadow-xl z-50">
      <h1 className="text-lg font-bold text-center mb-3">
        Delete List
      </h1>

      <p className="text-sm text-gray-600 text-center mb-6">
        Are you sure you want to delete
        <span className="font-semibold"> {list.Title}</span>?
        <br />
        This action cannot be undone.
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={onClose}
          disabled={loading}
          className="px-4 py-2 border rounded-lg disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          onClick={handleDelete}
          disabled={loading}
          className="px-4 py-2 bg-red-600 text-white rounded-lg disabled:opacity-50"
        >
          {loading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default DeleteList;
