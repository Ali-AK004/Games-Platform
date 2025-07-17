// components/games/MatchingPairsGame.jsx
import { useState, useEffect } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MatchingPairsGame({ pairs }) {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIndices, setMatchedIndices] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [matchAnimation, setMatchAnimation] = useState([]);

  useEffect(() => {
    // Initialize game
    const items = [...pairs, ...pairs];
    const shuffled = items
      .map((item, index) => ({ id: index, content: item, matched: false }))
      .sort(() => Math.random() - 0.5);
    setCards(shuffled);
  }, [pairs]);

  useEffect(() => {
    if (matchedIndices.length === cards.length && cards.length > 0) {
      setGameComplete(true);
    }
  }, [matchedIndices, cards]);

  const handleCardClick = (index) => {
    // Don't allow flipping if already flipped or matched
    if (
      flippedIndices.includes(index) ||
      matchedIndices.includes(index) ||
      flippedIndices.length >= 2
    ) {
      return;
    }

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      setMoves(moves + 1);
      const [firstIndex, secondIndex] = newFlippedIndices;

      if (cards[firstIndex].content === cards[secondIndex].content) {
        // Match found - add celebration animation
        setMatchAnimation([firstIndex, secondIndex]);
        setTimeout(() => {
          setMatchedIndices([...matchedIndices, firstIndex, secondIndex]);
          setFlippedIndices([]);
          setMatchAnimation([]);
        }, 600);
      } else {
        // No match, flip back after delay
        setTimeout(() => {
          setFlippedIndices([]);
        }, 1200);
      }
    }
  };

  const resetGame = () => {
    const items = [...pairs, ...pairs];
    const shuffled = items
      .map((item, index) => ({ id: index, content: item, matched: false }))
      .sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedIndices([]);
    setMatchedIndices([]);
    setMoves(0);
    setGameComplete(false);
    setMatchAnimation([]);
    toast.success("Game reset successfully !");
  };

  const getPerformanceMessage = () => {
    const perfectMoves = pairs.length;
    if (moves <= perfectMoves) return "🏆 Perfect! You're amazing!";
    if (moves <= perfectMoves + 3) return "🌟 Excellent memory!";
    if (moves <= perfectMoves + 6) return "👍 Great job!";
    return "💪 Good effort! Try again!";
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Game Header */}
      <div className="mb-8 text-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
          <h2 className="text-3xl font-bold text-gray-500 mb-4 flex items-center justify-center">
            <span className="text-4xl mr-3">🧩</span>
            Memory Matching Game
          </h2>
          <div className="flex justify-center items-center space-x-8">
            <div className="bg-gradient-to-r from-blue-400 to-purple-500 rounded-full px-6 py-3">
              <span className="text-white font-bold text-lg">
                🎯 Moves: {moves}
              </span>
            </div>
            <div className="bg-gradient-to-r from-green-400 to-teal-500 rounded-full px-6 py-3">
              <span className="text-white font-bold text-lg">
                ✅ Matches: {matchedIndices.length / 2} / {pairs.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Game Board */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {cards.map((card, index) => {
          const isFlipped =
            flippedIndices.includes(index) || matchedIndices.includes(index);
          const isMatched = matchedIndices.includes(index);
          const isAnimating = matchAnimation.includes(index);

          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(index)}
              className={`aspect-square flex items-center justify-center rounded-2xl cursor-pointer transition-all duration-500 transform ${
                isFlipped
                  ? isMatched
                    ? "bg-gradient-to-br from-green-400 to-emerald-500 scale-105 shadow-2xl"
                    : "bg-gradient-to-br from-yellow-300 to-orange-400 shadow-xl"
                  : "bg-gradient-to-br from-purple-400 to-pink-500 hover:scale-105 hover:shadow-xl"
              } ${isAnimating ? "animate-bounce" : ""}`}
            >
              {isFlipped ? (
                <div className="text-center">
                  <span className="text-3xl font-bold text-white drop-shadow-lg">
                    {card.content}
                  </span>
                  {isMatched && <div className="text-2xl mt-1">✨</div>}
                </div>
              ) : (
                <div className="text-center">
                  <span className="text-4xl">❓</span>
                  <div className="text-white text-sm font-bold mt-1">
                    Tap me!
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Game Complete Modal */}
      {gameComplete && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-yellow-300 min-w-[500px] to-orange-400 rounded-3xl p-8 shadow-2xl text-center max-w-md mx-4">
            <div className="text-8xl mb-4">🎉</div>
            <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
              Congratulations!
            </h2>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-6">
              <p className="text-2xl text-white font-bold mb-2">
                Game Complete!
              </p>
              <p className="text-xl text-white/90 mb-2">
                You finished in {moves} moves!
              </p>
              <p className="text-lg text-white/90 font-medium">
                {getPerformanceMessage()}
              </p>
            </div>
            <div className="flex flex-col space-y-4">
              <button
                onClick={resetGame}
                className="px-8 py-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2"
              >
                <span className="text-xl">🔄</span>
                <span>Play Again!</span>
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
          <span>New Game</span>
        </button>
      </div>
    </div>
  );
}
