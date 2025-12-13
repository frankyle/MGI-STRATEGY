// MgiStrategyForm.jsx
import React, { useState, useEffect } from "react";
import { Upload, X } from 'lucide-react'; 

// Define the new chart fields array (Total 7 fields now)
const CHART_FIELDS = [
  { key: "daily_chart", label: "Daily" },
  { key: "two_hr_chart", label: "2hr Chart" },
  { key: "one_hr_chart", label: "1hr Chart" },
  { key: "fifteen_min_chart", label: "15min Chart" },
  { key: "mt5_chart", label: "MT5 Chart" },
  { key: "profit_chart", label: "Profit Chart" },
  { key: "pnl_chart", label: "PnL Chart" }, // FINAL PnL CHART FIELD
];


function MgiStrategyForm({ initialData, onSubmit, onClose }) {
  const today = new Date().toISOString().split("T")[0];

  // --- Initial State for New Chart Fields ---
  const initialChartState = CHART_FIELDS.reduce((acc, field) => {
    acc[field.key] = initialData?.[field.key] || null;
    return acc;
  }, {});

  const [form, setForm] = useState({
    date: initialData?.date || today,
    pair: initialData?.pair || "",
    signal: initialData?.signal || "Buy",
    ...initialChartState, // Include all new chart fields (7 total)
  });

  const [previews, setPreviews] = useState({
    ...initialChartState, // Previews also use the new fields
  });

  useEffect(() => {
    if (initialData) {
      // --- useEffect State Handling ---
      const newFormState = {
        date: initialData.date || today,
        pair: initialData.pair || "",
        signal: initialData.signal || "Buy",
      };
      const newPreviewState = {};

      CHART_FIELDS.forEach(({ key }) => {
        // Ensure initial data mapping uses the new keys
        newFormState[key] = initialData[key] || null;
        newPreviewState[key] = initialData[key] || null;
      });

      setForm((f) => ({ ...f, ...newFormState }));
      setPreviews(newPreviewState);
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
      setPreviews((prevState) => ({ ...prevState, [name]: null }));
    }
  };

  const clearImage = (name) => {
    // 1. Clear the preview (image URL)
    setPreviews((prevState) => ({ ...prevState, [name]: null }));
    
    // 2. Clear the form field (File object or existing URL)
    setForm((prev) => ({ ...prev, [name]: null }));

    // Note: The file input element itself might still show the old filename
    // but the file and state are cleared. This is a common pattern.
  };

  const handleSubmit = () => {
    if (!form.pair?.trim()) { 
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
      <p className="text-sm font-medium text-gray-700">{label}</p>

      <div className="w-32 h-32 border border-gray-300 rounded-xl overflow-hidden flex items-center justify-center bg-gray-50 relative">
        {previews[name] ? (
          <>
            <img 
              src={previews[name]} 
              alt={`${label} Preview`} 
              className="w-full h-full object-cover" 
            />
            <button
              type="button"
              onClick={() => clearImage(name)}
              className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-80 hover:opacity-100 transition shadow-md z-10"
              aria-label={`Clear ${label} image`}
            >
              <X size={16} />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center text-center text-gray-400 p-2">
            <Upload size={24} className="mb-1" />
            <span className="text-xs">{label.includes('Chart') ? label : `${label} Chart`}</span>
          </div>
        )}
      </div>

      <input 
        type="file" 
        accept="image/*" 
        name={name} 
        onChange={handleImage} 
        className="text-xs text-gray-500 w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" 
      />
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-5xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4 border-b pb-3">{initialData ? "Edit Trading Idea" : "New Trading Idea"}</h2>

      {/* Primary Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <input 
          type="date" 
          name="date" 
          value={form.date} 
          onChange={handleChange} 
          className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-400" 
          aria-label="Trade Date"
        />

        <input 
          type="text" 
          name="pair" 
          value={form.pair} 
          onChange={handleChange} 
          placeholder="Pair (e.g. XAUUSD)" 
          className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-400" 
          aria-label="Currency Pair"
        />

        <select 
          name="signal" 
          value={form.signal} 
          onChange={handleChange} 
          className="w-full border rounded-xl p-3 bg-white focus:ring-2 focus:ring-indigo-400 appearance-none"
          aria-label="Trade Signal"
        >
          <option value="Buy">Buy Signal (Long)</option>
          <option value="Sell">Sell Signal (Short)</option>
        </select>
      </div>

      {/* Chart Image Inputs: Now displays 7 inputs, using lg:grid-cols-7 for layout */}
      <div className="space-y-3">
        <p className="text-lg font-semibold text-gray-700 border-t pt-4">Technical Charts Overview</p>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-4 justify-center">
          {CHART_FIELDS.map(({ key, label }) => (
            <ImageInput key={key} label={label} name={key} />
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pt-4 border-t">
        <button onClick={onClose} className="px-5 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 font-medium">Cancel</button>

        <button onClick={handleSubmit} className="px-5 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 font-medium">Save Idea</button>
      </div>
    </div>
  );
}

export default MgiStrategyForm;