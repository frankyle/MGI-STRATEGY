// TradersIdeaForm.jsx
import React, { useState, useEffect } from "react";

function TradersIdeaForm({ initialData, onSubmit, onClose }) {
  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    date: initialData?.date || today,
    pair: initialData?.pair || "",
    signal: initialData?.signal || "Buy",
    monday_image: initialData?.monday_image || null,
    tuesday_image: initialData?.tuesday_image || null,
    wednesday_image: initialData?.wednesday_image || null,
    thursday_image: initialData?.thursday_image || null,
    friday_image: initialData?.friday_image || null,
    saturday_image: initialData?.saturday_image || null,
    sunday_image: initialData?.sunday_image || null,
  });

  const [previews, setPreviews] = useState({
    monday_image: initialData?.monday_image || null,
    tuesday_image: initialData?.tuesday_image || null,
    wednesday_image: initialData?.wednesday_image || null,
    thursday_image: initialData?.thursday_image || null,
    friday_image: initialData?.friday_image || null,
    saturday_image: initialData?.saturday_image || null,
    sunday_image: initialData?.sunday_image || null,
  });

  useEffect(() => {
    if (initialData) {
      setForm((f) => ({
        ...f,
        date: initialData.date || today,
        pair: initialData.pair || "",
        signal: initialData.signal || "Buy",
        monday_image: initialData.monday_image || null,
        tuesday_image: initialData.tuesday_image || null,
        wednesday_image: initialData.wednesday_image || null,
        thursday_image: initialData.thursday_image || null,
        friday_image: initialData.friday_image || null,
        saturday_image: initialData.saturday_image || null,
        sunday_image: initialData.sunday_image || null,
      }));

      setPreviews({
        monday_image: initialData.monday_image || null,
        tuesday_image: initialData.tuesday_image || null,
        wednesday_image: initialData.wednesday_image || null,
        thursday_image: initialData.thursday_image || null,
        friday_image: initialData.friday_image || null,
        saturday_image: initialData.saturday_image || null,
        sunday_image: initialData.sunday_image || null,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e) => {
    const { name, files } = e.target;
    const file = files?.[0] || null;
    
    // If a file is selected, store the File object. If not, store null.
    setForm((prev) => ({ ...prev, [name]: file })); 

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prevState) => ({ ...prevState, [name]: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      // If input is cleared, reset the preview to null. 
      // It also handles the case where the input value for the existing image URL is replaced by null in form state.
      setPreviews((prevState) => ({ ...prevState, [name]: null }));
    }
  };

  const handleSubmit = () => {
    if (!form.pair?.trim()) { // Check for non-whitespace content
      alert("Please enter a valid currency pair (e.g. XAUUSD).");
      return;
    }
    if (!form.date) {
      alert("Please select a date.");
      return;
    }

    onSubmit(form);
  };

  const ImageInput = ({ label, name }) => (
    <div className="flex flex-col items-center gap-2">
      <p className="text-sm font-medium">{label}</p>

      <div className="w-32 h-32 border rounded-lg overflow-hidden flex items-center justify-center bg-gray-50">
        {previews[name] ? (
          <img src={previews[name]} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <span className="text-gray-400 text-xs">No image</span>
        )}
      </div>

      {/* Adding a reset button/logic could be useful for existing images, but leaving as is for brevity */}
      <input type="file" accept="image/*" name={name} onChange={handleImage} className="text-xs text-gray-500" />
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-5xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">{initialData ? "Edit Idea" : "New Idea"}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-400" />

        <input type="text" name="pair" value={form.pair} onChange={handleChange} placeholder="Pair (e.g. XAUUSD)" className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-400" />

        <select name="signal" value={form.signal} onChange={handleChange} className="w-full border rounded-xl p-3 bg-white focus:ring-2 focus:ring-blue-400">
          <option value="Buy">Buy</option>
          <option value="Sell">Sell</option>
        </select>
      </div>

      {/* Note: Updated ImageInput component renders 7 inputs correctly */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <ImageInput label="Monday" name="monday_image" />
        <ImageInput label="Tuesday" name="tuesday_image" />
        <ImageInput label="Wednesday" name="wednesday_image" />
        <ImageInput label="Thursday" name="thursday_image" />
        <ImageInput label="Friday" name="friday_image" />
        <ImageInput label="Saturday" name="saturday_image" />
        <ImageInput label="Sunday" name="sunday_image" />
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <button onClick={onClose} className="px-5 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 font-medium">Cancel</button>

        <button onClick={handleSubmit} className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-medium">Save</button>
      </div>
    </div>
  );
}

export default TradersIdeaForm;