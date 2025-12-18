// List.jsx - Updated to render multiple lists from Zustand store
import React, { useState, useEffect } from "react";
import { Plus, Trash, ChevronUp, ChevronDown } from "lucide-react";
import Card from "./Card";
import CreateCard from "./CreateCard";
import { useListStore } from "../store/lists.store";
import { useCardStore } from "../store/cards.store";
import { cardApi } from "../api/card";

const List = ({ boardId }) => {

  const { lists } = useListStore(); 
  const { cards, addCard, setCards } = useCardStore();
  const [openListIds, setOpenListIds] = useState({}); 
  const [loading, setLoading] = useState(false);
  const [showCreateCard, setShowCreateCard] = useState(false);
  const [selectedListId, setSelectedListId] = useState(null);
  
  //  Filter lists for this specific board only
  const boardLists = lists.filter((l) => l.BoardId === boardId);

  // Fetch cards for all lists when component mounts
  useEffect(() => {
    const fetchAllCards = async () => {
      if (!boardLists.length) return;
      
      setLoading(true);
      try {
        // Fetch cards for each list
        const cardPromises = boardLists.map(list => 
          cardApi.getCards(list._id)
        );
        
        const results = await Promise.all(cardPromises);
        
        // Flatten all cards from all lists
        const allCards = results.flatMap(result => result.data || []);
        
        setCards(allCards);
      } catch (err) {
        console.error("Error fetching cards:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCards();
  }, [boardLists.length]);

  const handleCreateCard = async (data) => {
    try {
      if (!data.listId) return;

      // Call API to create card
      const res = await cardApi.createCard({ 
        title: data.title, 
        description: data.description,
        labels: data.labels,
        listId: data.listId
      });
      
      console.log("Card created:", res.data);
      
      // Add to store
      if (res.success && res.data) {
        addCard(res.data);
      }
      
    } catch (err) {
      console.error("Create card error:", err.message || err);
      alert("Failed to create card. Please try again.");
    }
  }

  const openCreateCardPopup = (listId) => {
    setSelectedListId(listId);
    setShowCreateCard(true);
  }

  const closeCreateCardPopup = () => {
    setShowCreateCard(false);
    setSelectedListId(null);
  }
  
  const toggleListBody = (id) => {
    setOpenListIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

 
  if (!boardLists.length) {
    return (
      <div className="p-4 text-gray-500">
        No lists yet for this board.
      </div>
    );
  }

  // Map over all lists instead of single hardcoded list
  return (
    <>
      {/* Create Card Popup */}
      {showCreateCard && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeCreateCardPopup}
          />
          
          {/* Popup */}
          <CreateCard 
            onClose={closeCreateCardPopup}
            onCreate={handleCreateCard}
            listId={selectedListId}
          />
        </>
      )}

      <div className="flex gap-4 p-4 overflow-x-auto"> 
      {boardLists.map((list) => {
        const isOpen = openListIds[list._id] ?? true;
        const listCards = cards.filter((card) => card.ListId === list._id);
        
        return (
          <div
            key={list._id}
            className="min-w-[200px] border-2 border-dotted mx-2 my-2 rounded-2xl relative pb-4" 
          >
            {/* Header  */}
            <div
              className={`flex justify-between items-center bg-gray-800 text-white px-3 py-2 ${
                isOpen ? "rounded-t-2xl" : "rounded-2xl"
              }`}
            >
              <h1>{list.Title}</h1>
              <div className="flex gap-2 bg-neutral-600 rounded-full p-1 items-center">
                <Plus 
                  size={20} 
                  onClick={() => openCreateCardPopup(list._id)} 
                  className="cursor-pointer hover:scale-110 transition-transform" 
                />
                <Trash 
                  color="#FF1E56" 
                  size={20} 
                  className="cursor-pointer hover:scale-110 transition-transform"
                />
                {isOpen ? (
                  <ChevronUp
                    onClick={() => toggleListBody(list._id)}
                    className="cursor-pointer bg-gray-500 rounded-full p-1 hover:bg-gray-600"
                  />
                ) : (
                  <ChevronDown
                    onClick={() => toggleListBody(list._id)}
                    className="cursor-pointer bg-gray-500 rounded-full p-1 hover:bg-gray-600"
                  />
                )}
              </div>
            </div>

            {/* Body */}
            {isOpen && (
              <>
                {loading ? (
                  <div className="p-4 text-gray-400 text-sm text-center">
                    Loading cards...
                  </div>
                ) : listCards.length > 0 ? (
                  listCards.map((card) => (
                    <Card key={card._id} card={card} />
                  ))
                ) : (
                  <div className="p-4 text-gray-400 text-sm text-center">
                    No cards yet
                  </div>
                )}
              </>
            )}

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-black rounded-full w-6 h-6" />
          </div>
        );
      })}
      </div>
    </>
  );
};

export default List;