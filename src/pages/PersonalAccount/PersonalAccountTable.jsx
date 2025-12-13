import { Pencil, Trash2 } from "lucide-react";

function PersonalAccountTable({ trades, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full bg-white rounded-2xl shadow-md overflow-hidden text-sm">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-left">Day</th>
            <th className="px-4 py-3 text-left">Pair</th>
            <th className="px-4 py-3 text-left">Signal</th>
            <th className="px-4 py-3 text-left">Risk (USD)</th>
            <th className="px-4 py-3 text-left">Gain (USD)</th>
            <th className="px-4 py-3 text-left">Risk (Pips)</th>
            <th className="px-4 py-3 text-left">Gain (Pips)</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {trades.length === 0 ? (
            <tr>
              <td
                colSpan={9}
                className="text-center py-5 text-gray-500 italic"
              >
                No Personal Trades Yet.
              </td>
            </tr>
          ) : (
            trades.map((trade) => (
              <tr
                key={trade.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3">{trade.date}</td>
                <td className="px-4 py-3">{trade.day}</td>
                <td className="px-4 py-3 font-medium">{trade.pair}</td>

                <td
                  className={`px-4 py-3 font-semibold ${
                    trade.signal.toLowerCase() === "buy"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {trade.signal}
                </td>

                <td className="px-4 py-3">${trade.risk_usd}</td>
                <td className="px-4 py-3">${trade.gain_usd}</td>
                <td className="px-4 py-3">{trade.risk_pips}</td>
                <td className="px-4 py-3">{trade.gain_pips}</td>

                <td className="px-4 py-3 flex gap-2">
                  <button
                    onClick={() => onEdit(trade)}
                    className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-xl transition"
                  >
                    <Pencil size={16} />
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(trade.id)}
                    className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-xl transition"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PersonalAccountTable;
