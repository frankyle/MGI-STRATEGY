import React, { useEffect, useState } from "react";
import { TrendingUp, DollarSign, Loader, Image as ImageIcon } from "lucide-react";
import { supabase } from "../../supabaseClient";

function TradingPairsWidget() {
  const [pairsData, setPairsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // CHART_FIELDS mapping for image keys
  const CHART_FIELDS = [
    { key: "daily_chart", label: "Monday" },
    { key: "two_hr_chart", label: "Tuesday" },
    { key: "one_hr_chart", label: "Wednesday" },
    { key: "fifteen_min_chart", label: "Thursday" },
    { key: "mt5_chart", label: "Friday" },
    { key: "profit_chart", label: "Saturday" },
    { key: "pnl_chart", label: "Sunday" },
  ];

  useEffect(() => {
    const fetchPairsWithImages = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("mgi_strategies")
          .select("pair, daily_chart, two_hr_chart, one_hr_chart, fifteen_min_chart, mt5_chart, profit_chart, pnl_chart");

        if (error) {
          console.error("Error fetching pairs:", error);
          setPairsData([]);
          return;
        }

        // Group by unique pair and collect all images
        const groupedData = {};
        data.forEach((item) => {
          if (!groupedData[item.pair]) {
            groupedData[item.pair] = [];
          }
          // Collect all images for this pair
          CHART_FIELDS.forEach(({ key, label }) => {
            if (item[key]) {
              groupedData[item.pair].push({
                url: item[key],
                label: label,
              });
            }
          });
        });

        const pairsArray = Object.entries(groupedData)
          .map(([pair, images]) => ({
            pair,
            images: [...new Map(images.map((img) => [img.url, img])).values()], // Remove duplicates by URL
          }))
          .sort((a, b) => a.pair.localeCompare(b.pair));

        setPairsData(pairsArray);
      } catch (err) {
        console.error("Error:", err);
        setPairsData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPairsWithImages();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-center h-48">
          <Loader className="w-6 h-6 animate-spin text-indigo-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-indigo-600 rounded-lg">
          <DollarSign className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">Trading Pairs & Charts</h3>
          <p className="text-xs text-gray-600 mt-1">
            MGI Strategy • NY Session Ladders - Related Traders' Ideas
          </p>
        </div>
      </div>

      {/* Pairs with Images */}
      {pairsData.length > 0 ? (
        <div className="space-y-4">
          {pairsData.map((pairData) => (
            <div
              key={pairData.pair}
              className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl shadow-lg p-6 border border-indigo-200 hover:shadow-xl transition-all duration-200"
            >
              {/* Pair Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-600 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900">{pairData.pair}</h4>
                <span className="ml-auto text-xs font-semibold text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full">
                  {pairData.images.length} Charts
                </span>
              </div>

              {/* Images Grid */}
              {pairData.images.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
                  {pairData.images.map((image, idx) => (
                    <div
                      key={idx}
                      className="group relative rounded-lg overflow-hidden bg-white border border-indigo-200 hover:border-indigo-400 transition-all duration-200"
                    >
                      <img
                        src={image.url}
                        alt={image.label}
                        className="w-full h-24 object-cover hover:scale-105 transition-transform duration-200 cursor-pointer"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center">
                        <p className="text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          {image.label}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <ImageIcon className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">No charts uploaded yet</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg p-12 border border-gray-100 text-center">
          <DollarSign className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">No trading pairs with charts yet</p>
        </div>
      )}
    </div>
  );
}

export default TradingPairsWidget;
