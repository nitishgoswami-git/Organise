import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const EditCard = ({ card, onClose, onUpdate }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  /* 
     PREFILL DATA
      */
  useEffect(() => {
    if (card) {
      reset({
        Title: card.Title,
        Description: card.Description,
      });
    }
  }, [card, reset]);

  const onSubmit = (data) => {
    onUpdate({
      Title: data.Title,
      Description: data.Description,
    });
  };

  if (!card) return null;

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 w-[360px] bg-white rounded-xl p-4 shadow-xl z-50">
      <h1 className="text-lg font-bold mb-4 text-center">
        Edit Card
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <input
            type="text"
            {...register("Title", {
              required: "Title is required",
              minLength: { value: 3, message: "Min 3 characters" },
            })}
            className="w-full px-3 py-2 border rounded-lg outline-none focus:border-black"
            placeholder="Card title"
          />
          {errors.Title && (
            <p className="text-red-500 text-xs mt-1">
              {errors.Title.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <textarea
            {...register("Description")}
            rows={4}
            className="w-full px-3 py-2 border rounded-lg outline-none focus:border-black"
            placeholder="Description"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded-lg"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCard;
