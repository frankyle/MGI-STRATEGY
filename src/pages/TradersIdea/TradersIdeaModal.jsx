import TradersIdeaForm from "./TradersIdeaForm";

function TradersIdeaModal({ initialData, onSave, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn overflow-auto">
      
      {/* Modal Container */}
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl p-6 animate-scaleIn relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          {initialData ? "Edit Idea" : "Add Idea"}
        </h2>

        {/* Form */}
        <TradersIdeaForm
          initialData={initialData}
          onSubmit={onSave}
          onClose={onClose}
        />

      </div>
    </div>
  );
}

export default TradersIdeaModal;