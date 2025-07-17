// components/FindMatchGame.js - Tap matching answers to eliminate them
import { useState } from "react";

export default function FindMatchGame({ findMatchData }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [eliminatedPairs, setEliminatedPairs] = useState([]);
  const [gameComplete, setGameComplete] = useState(false);
  const [score, setScore] = useState(0);

  const handleItemClick = (item) => {
    if (eliminatedPairs.includes(item.pairId)) return;

    if (selectedItems.length === 0) {
      setSelectedItems([item]);
    } else if (selectedItems.length === 1) {
      const firstItem = selectedItems[0];

      if (firstItem.id === item.id) {
        // Clicked same item, deselect
        setSelectedItems([]);
      } else if (firstItem.pairId === item.pairId) {
        // Correct match!
        setEliminatedPairs([...eliminatedPairs, item.pairId]);
        setSelectedItems([]);
        setScore(score + 1);

        // Check if game complete
        const uniquePairIds = [
          ...new Set(findMatchData.map((item) => item.pairId)),
        ];
        if (eliminatedPairs.length + 1 === uniquePairIds.length) {
          setGameComplete(true);
        }
      } else {
        // Wrong match, show briefly then deselect
        setSelectedItems([firstItem, item]);
        setTimeout(() => {
          setSelectedItems([]);
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    setSelectedItems([]);
    setEliminatedPairs([]);
    setGameComplete(false);
    setScore(0);
  };

  const getItemStatus = (item) => {
    if (eliminatedPairs.includes(item.pairId)) return "eliminated";
    if (selectedItems.some((selected) => selected.id === item.id))
      return "selected";
    return "available";
  };

  const remainingPairs =
    [...new Set(findMatchData.map((item) => item.pairId))].length -
    eliminatedPairs.length;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Game Header */}
      <div className="mb-8 text-center">
        <div className="bg-gray-400 backdrop-blur-sm rounded-2xl p-6">
          <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center">
            <span className="text-4xl mr-3">🎯</span>
            Find the Matching Pairs
          </h2>
          <div className="flex justify-center items-center space-x-8">
            <div className="bg-gradient-to-r from-green-400 to-teal-500 rounded-full px-6 py-3">
              <span className="text-white font-bold text-lg">
                ✅ Found: {score}
              </span>
            </div>
            <div className="bg-gradient-to-r from-blue-400 to-purple-500 rounded-full px-6 py-3">
              <span className="text-white font-bold text-lg">
                🎯 Remaining: {remainingPairs}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Items Display */}
      <div className="mb-8 text-center">
        <div className="bg-gray-400 backdrop-blur-sm rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">
            🎯 Selected Items:
          </h3>
          {selectedItems.length > 0 && (
            <div>
              <div className="flex justify-center space-x-4">
                {selectedItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl px-4 py-3"
                  >
                    <div className="text-white font-bold text-center">
                      <div className="text-2xl mb-1">{item.emoji}</div>
                      <div className="text-sm">{item.text}</div>
                    </div>
                  </div>
                ))}
              </div>
              {selectedItems.length === 2 && (
                <div className="mt-4">
                  <div className="text-white/90">
                    {selectedItems[0].pairId === selectedItems[1].pairId
                      ? "🎉 Perfect match!"
                      : "❌ Not a match, try again!"}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="mb-8 text-center">
        <div className="bg-gray-500 backdrop-blur-sm rounded-2xl p-4">
          <p className="text-white/90 text-lg">
            💡 Tap two items that match to eliminate them. Find all pairs to
            win!
          </p>
        </div>
      </div>

      {/* Game Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {findMatchData.map((item) => {
          const status = getItemStatus(item);

          let cardClass =
            "aspect-square rounded-2xl cursor-pointer transform transition-all duration-300 flex flex-col items-center justify-center p-4 ";

          switch (status) {
            case "eliminated":
              cardClass +=
                "bg-gradient-to-br from-gray-300 to-gray-500 opacity-30 scale-95";
              break;
            case "selected":
              cardClass +=
                "bg-gradient-to-br from-yellow-300 to-orange-400 scale-105 shadow-2xl animate-pulse";
              break;
            default:
              cardClass +=
                "bg-gradient-to-br from-blue-400 to-purple-500 hover:scale-105 hover:shadow-xl";
          }

          return (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={cardClass}
            >
              {status === "eliminated" ? (
                <div className="text-center">
                  <div className="text-4xl mb-2">✅</div>
                  <div className="text-gray-600 font-bold text-sm">
                    Matched!
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-3xl mb-2">{item.emoji}</div>
                  <div className="text-white font-bold text-sm drop-shadow-lg">
                    {item.text}
                  </div>
                  {item.subtitle && (
                    <div className="text-white/80 text-xs mt-1">
                      {item.subtitle}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Game Complete Modal */}
      {gameComplete && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-yellow-300 to-orange-400 rounded-3xl p-8 shadow-2xl text-center max-w-md mx-4">
            <div className="text-8xl mb-4">🎉</div>
            <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
              All Matches Found!
            </h2>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-6">
              <p className="text-2xl text-white font-bold mb-2">
                Perfect matching!
              </p>
              <p className="text-xl text-white/90">
                🏆 You found all {score} pairs!
              </p>
            </div>
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={resetGame}
                className="px-8 py-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2 mx-auto"
              >
                <span className="text-xl">🔄</span>
                <span>Play Again!</span>
              </button>
              <button
                onClick={() => {
                  window.location.reload();
                }}
                className="px-8 py-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2 mx-auto"
              >
                <span className="text-xl">🏠</span>
                <span>Go Back!</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Button */}
      <div className="text-center">
        <button
          onClick={resetGame}
          className="px-8 py-4 bg-gradient-to-r from-red-400 to-pink-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer flex items-center space-x-2 mx-auto"
        >
          <span className="text-xl">🔄</span>
          <span>Reset Game</span>
        </button>
      </div>
    </div>
  );
}
