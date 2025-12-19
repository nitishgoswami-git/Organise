import React, { useState } from "react";
import { ChevronDown, ChevronUp, Trash, Pencil } from "lucide-react";
import EditCard from "./EditCard";
import { cardApi } from "../../api/card";
import { useCardStore } from "../../store/cards.store";

const Card = ({ card }) => {
  const [open, setOpen] = useState(true);
  const [editOpen, setEditOpen] = useState(false);

  const { updateCard, deleteCard } = useCardStore();

  const toggleBody = () => setOpen((p) => !p);

  /* ======================
     UPDATE CARD
     ====================== */
  const handleUpdate = async (updatedData) => {
    const optimistic = { ...card, ...updatedData };

    // optimistic UI update
    updateCard(optimistic);
    setEditOpen(false);

    try {
      await cardApi.updateCard(card._id, updatedData);
    } catch (err) {
      console.error("Update failed", err);
      updateCard(card); // rollback
    }
  };

  /* ======================
     DELETE CARD
     ====================== */
  const handleDelete = async () => {
    deleteCard(card._id);

    try {
      await cardApi.deleteCard(card._id);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <>
      <div className="m-2">
        {/* HEADER */}
        <div
          className={`flex justify-between items-center bg-gray-800 text-white px-3 py-2 ${
            open ? "rounded-t-2xl" : "rounded-2xl"
          }`}
        >
          <h1 className="text-sm font-medium">{card.Title}</h1>

          <div className="flex gap-2 bg-neutral-600 rounded-full p-1 items-center">
            <Pencil
              size={16}
              onClick={() => setEditOpen(true)}
              className="cursor-pointer hover:scale-110"
            />
            <Trash
              size={16}
              color="#FF1E56"
              onClick={handleDelete}
              className="cursor-pointer hover:scale-110"
            />
            {open ? (
              <ChevronUp
                onClick={toggleBody}
                className="cursor-pointer bg-gray-500 rounded-full p-1"
              />
            ) : (
              <ChevronDown
                onClick={toggleBody}
                className="cursor-pointer bg-gray-500 rounded-full p-1"
              />
            )}
          </div>
        </div>

        {/* BODY */}
        {open && (
          <div className="bg-white border-2 p-2 rounded-b-lg text-sm text-gray-600">
            {card.Description || "No description"}
          </div>
        )}
      </div>

      {/* EDIT MODAL */}
      {editOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setEditOpen(false)}
          />
          <EditCard
            card={card}
            onClose={() => setEditOpen(false)}
            onUpdate={handleUpdate}
          />
        </>
      )}
    </>
  );
};

export default Card;
