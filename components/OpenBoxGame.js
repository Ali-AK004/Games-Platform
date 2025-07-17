// components/OpenBoxGame.js - Tap boxes to reveal items inside
import { useState } from "react";

export default function OpenBoxGame({ boxItems }) {
  const [openedBoxes, setOpenedBoxes] = useState([]);
  const [gameComplete, setGameComplete] = useState(false);

  const handleBoxClick = (index) => {
    if (!openedBoxes.includes(index)) {
      const newOpenedBoxes = [...openedBoxes, index];
      setOpenedBoxes(newOpenedBoxes);

      if (newOpenedBoxes.length === boxItems.length) {
        setTimeout(() => setGameComplete(true), 5000);
      }
    }
  };

  const resetGame = () => {
    setOpenedBoxes([]);
    setGameComplete(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Game Header */}
      <div className="mb-8 text-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
          <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center">
            <span className="text-4xl mr-3">📦</span>
            Open the Mystery Boxes!
          </h2>
          <div className="bg-gradient-to-r from-purple-400 to-pink-500 rounded-full px-6 py-3 inline-block">
            <span className="text-white font-bold text-lg">
              📦 Opened: {openedBoxes.length} / {boxItems.length}
            </span>
          </div>
        </div>
      </div>

      {/* Boxes Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {boxItems.map((item, index) => {
          const isOpened = openedBoxes.includes(index);

          return (
            <div
              key={index}
              onClick={() => handleBoxClick(index)}
              className={`aspect-square rounded-2xl cursor-pointer transform transition-all duration-500 ${
                isOpened
                  ? "bg-gradient-to-br from-yellow-300 to-orange-400 scale-105 shadow-2xl"
                  : "bg-gradient-to-br from-gray-400 to-gray-600 hover:scale-105 hover:shadow-xl"
              }`}
            >
              <div className="h-full flex flex-col items-center justify-center p-4">
                {isOpened ? (
                  <div className="text-center animate-bounce">
                    <div className="text-4xl mb-2">{item.emoji}</div>
                    <div className="text-white font-bold text-lg drop-shadow-lg">
                      {item.title}
                    </div>
                    <div className="text-white/90 text-sm mt-1">
                      {item.description}
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-6xl mb-2">📦</div>
                    <div className="text-white font-bold">Box {index + 1}</div>
                    <div className="text-white/70 text-sm mt-1">
                      Tap to open!
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Game Complete Modal */}
      {gameComplete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-yellow-300 to-orange-400 rounded-3xl p-8 shadow-2xl text-center max-w-md mx-4">
            <div className="text-8xl mb-4">🎉</div>
            <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
              All Boxes Opened!
            </h2>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-6">
              <p className="text-2xl text-white font-bold mb-2">
                Great exploration!
              </p>
              <p className="text-xl text-white/90">
                🏆 You discovered all the Tajweed concepts!
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
          <span>Reset Boxes</span>
        </button>
      </div>
    </div>
  );
}
