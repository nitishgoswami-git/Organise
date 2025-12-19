import React, { useState, useEffect } from "react";
import { Plus, Trash, ChevronUp, ChevronDown } from "lucide-react";
import Card from "../Card/Card";
import CreateCard from "../Card/CreateCard";
import DeleteList from "./DeleteList";
import { useListStore } from "../../store/lists.store";
import { useCardStore } from "../../store/cards.store";
import { cardApi } from "../../api/card";

const List = ({ boardId }) => {
  const { lists } = useListStore();
  const { cards, setCards, addCard } = useCardStore();

  const [openListIds, setOpenListIds] = useState({});
  const [loading, setLoading] = useState(false);

  const [showCreateCard, setShowCreateCard] = useState(false);
  const [selectedListId, setSelectedListId] = useState(null);

  const [showDeleteList, setShowDeleteList] = useState(false);
  const [selectedList, setSelectedList] = useState(null);

  const boardLists = lists.filter((l) => l.BoardId === boardId);

  /* 
     FETCH ALL CARDS
     */
  useEffect(() => {
    const fetchAllCards = async () => {
      if (!boardLists.length) return;

      setLoading(true);
      try {
        const results = await Promise.all(
          boardLists.map((list) => cardApi.getCards(list._id))
        );

        const allCards = results.flatMap((r) => r.data || []);
        setCards(allCards);
      } catch (err) {
        console.error("Fetch cards failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCards();
  }, [boardLists.length, setCards]);

  /*
     CREATE CARD
      */
  const handleCreateCard = async (data) => {
    try {
      const res = await cardApi.createCard({
        title: data.title,
        description: data.description,
        listId: data.listId,
      });

      if (res?.data) addCard(res.data);
      closeCreateCardPopup();
    } catch (err) {
      console.error("Create card failed:", err);
    }
  };

  /*
     HELPERS
     */
  const toggleListBody = (id) => {
    setOpenListIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const openCreateCardPopup = (listId) => {
    setSelectedListId(listId);
    setShowCreateCard(true);
  };

  const closeCreateCardPopup = () => {
    setShowCreateCard(false);
    setSelectedListId(null);
  };

  const openDeleteListPopup = (list) => {
    setSelectedList(list);
    setShowDeleteList(true);
  };

  const closeDeleteListPopup = () => {
    setShowDeleteList(false);
    setSelectedList(null);
  };

  if (!boardLists.length) {
    return <div className="p-4 text-gray-500">No lists yet</div>;
  }

  return (
    <>
      {/*
          CREATE CARD MODAL
        */}
      {showCreateCard && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={closeCreateCardPopup}
          />
          <CreateCard
            onClose={closeCreateCardPopup}
            onCreate={handleCreateCard}
            listId={selectedListId}
          />
        </>
      )}

      {/* 
          DELETE LIST MODAL
         */}
      {showDeleteList && selectedList && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={closeDeleteListPopup}
          />
          <DeleteList
            list={selectedList}
            onClose={closeDeleteListPopup}
          />
        </>
      )}

      <div className="flex gap-4 p-4 overflow-x-auto">
        {boardLists.map((list) => {
          const isOpen = openListIds[list._id] ?? true;
          const listCards = cards.filter((c) => c.ListId === list._id);

          return (
            <div
              key={list._id}
              className="min-w-[220px] border-2 border-dotted rounded-2xl relative pb-6"
            >
              {/* HEADER */}
              <div
                className={`flex justify-between items-center bg-gray-800 text-white px-3 py-2 ${
                  isOpen ? "rounded-t-2xl" : "rounded-2xl"
                }`}
              >
                <h1 className="text-sm font-semibold">{list.Title}</h1>

                <div className="flex gap-2 bg-neutral-600 rounded-full p-1 items-center">
                  <Plus
                    size={18}
                    onClick={() => openCreateCardPopup(list._id)}
                    className="cursor-pointer hover:scale-110"
                  />

                  <Trash
                    size={18}
                    color="#FF1E56"
                    onClick={() => openDeleteListPopup(list)}
                    className="cursor-pointer hover:scale-110"
                  />

                  {isOpen ? (
                    <ChevronUp
                      onClick={() => toggleListBody(list._id)}
                      className="cursor-pointer bg-gray-500 rounded-full p-1"
                    />
                  ) : (
                    <ChevronDown
                      onClick={() => toggleListBody(list._id)}
                      className="cursor-pointer bg-gray-500 rounded-full p-1"
                    />
                  )}
                </div>
              </div>

              {/* BODY */}
              {isOpen && (
                <>
                  {loading ? (
                    <div className="p-4 text-center text-gray-400 text-sm">
                      Loading cards...
                    </div>
                  ) : listCards.length ? (
                    listCards.map((card) => (
                      <Card key={card._id} card={card} />
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-400 text-sm">
                      No cards
                    </div>
                  )}
                </>
              )}

              {/* BOTTOM DOT */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-black rounded-full w-6 h-6" />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default List;
