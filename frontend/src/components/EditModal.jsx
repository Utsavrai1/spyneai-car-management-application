import { useState } from "react";

function EditModal({ isOpen, onClose, onSave, car }) {
  const [formData, setFormData] = useState({
    title: car?.title || "",
    description: car?.description || "",
    tags: car?.tags.join(", ") || "",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, images: Array.from(e.target.files) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append(
      "tags",
      formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .join(",")
    );

    if (formData.images && formData.images.length > 0) {
      formData.images.forEach((file) => formDataToSend.append("images", file));
    }

    for (let pair of formDataToSend.entries()) {
      console.log(pair[0], pair[1]);
    }

    onSave(formDataToSend);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
        <h3 className="text-xl font-semibold mb-4">Edit Car</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="w-full p-2 border rounded-md mb-4"
            value={formData.title}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            className="w-full p-2 border rounded-md mb-4"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
          <input
            type="text"
            name="tags"
            placeholder="Tags (comma separated)"
            className="w-full p-2 border rounded-md mb-4"
            value={formData.tags}
            onChange={handleChange}
          />
          <input
            type="file"
            multiple
            className="w-full p-2 border rounded-md mb-4"
            onChange={handleFileChange}
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded-md"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditModal;
