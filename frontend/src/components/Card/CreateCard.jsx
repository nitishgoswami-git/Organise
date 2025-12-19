import React from "react";
import { useForm } from "react-hook-form";

const CreateCard = ({ onClose, onCreate, listId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Card Data:", data);

    // Pass data with listId to parent
    onCreate?.({ ...data, listId });

    reset();
    onClose?.();
  };

  return (
    <div
      className="
        absolute
        top-24
        left-1/2
        -translate-x-1/2
        w-[350px]
        bg-white
        rounded-xl
        p-4
        shadow-xl
        z-50
      "
    >
      {/* Header */}
      <h1 className="text-lg font-bold mb-4 text-center">
        CREATE NEW CARD
      </h1>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Card Title */}
        <div>
          <input
            type="text"
            placeholder="Card title"
            {...register("title", {
              required: "Card title is required",
              minLength: {
                value: 3,
                message: "Minimum 3 characters",
              },
            })}
            className="
              w-full px-3 py-2 border border-gray-300
              rounded-lg outline-none focus:border-black
            "
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <textarea
            placeholder="Description (optional)"
            {...register("description")}
            rows={3}
            className="
              w-full px-3 py-2 border border-gray-300
              rounded-lg outline-none focus:border-black
            "
          />
        </div>

        {/* Labels */}
        <div>
          <input
            type="text"
            placeholder="Labels (optional)"
            {...register("labels")}
            className="
              w-full px-3 py-2 border border-gray-300
              rounded-lg outline-none focus:border-black
            "
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCard;