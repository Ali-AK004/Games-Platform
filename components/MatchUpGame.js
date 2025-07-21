import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MatchUpGame({ matchUpData }) {
  const [draggedItem, setDraggedItem] = useState(null);
  const [matches, setMatches] = useState({});
  const [gameComplete, setGameComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongDrop, setWrongDrop] = useState(false); // New state for wrong drops
  const [shakeDefinition, setShakeDefinition] = useState(null); // New state for shaking animation

  const router = useRouter();

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, definition) => {
    e.preventDefault();
    if (draggedItem && draggedItem.definition === definition.text) {
      // Correct match
      const newMatches = { ...matches, [definition.id]: draggedItem };
      setMatches(newMatches);
      setScore(score + 1);

      if (Object.keys(newMatches).length === matchUpData.definitions.length) {
        setGameComplete(true);
      }
    } else {
      // Wrong match
      setWrongDrop(true);
      setShakeDefinition(definition.id);
      setTimeout(() => {
        setWrongDrop(false);
        setShakeDefinition(null);
      }, 1000);
    }
    setDraggedItem(null);
  };

  // Reset wrong drop animation
  useEffect(() => {
    if (wrongDrop) {
      const timer = setTimeout(() => setWrongDrop(false), 12000);
      return () => clearTimeout(timer);
    }
  }, [wrongDrop]);

  const resetGame = () => {
    setMatches({});
    setGameComplete(false);
    setScore(0);
    setDraggedItem(null);
  };

  const availableKeywords = matchUpData.keywords.filter(
    (keyword) => !Object.values(matches).includes(keyword)
  );

  return (
    <div className="max-w-4xl mx-auto">
      {wrongDrop && (
        <div className="animate-bounce bg-gradient-to-r from-red-400 to-pink-500 text-white font-bold rounded-full px-6 py-3 mb-4 text-center">
          🐘 Oh no! That doesn&aspos;t match. Can you try again?
        </div>
      )}
      {/* Game Header */}
      <div className="mb-8 text-center">
        <div className="bg-gray-300 backdrop-blur-sm rounded-2xl p-6">
          <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center">
            <span className="text-4xl mr-3">🎯</span>
            Match Keywords to Definitions
          </h2>
          <div className="bg-gradient-to-r from-green-400 to-teal-500 rounded-full px-6 py-3 inline-block">
            <span className="text-white font-bold text-lg">
              ✅ Matches: {score} / {matchUpData.definitions.length}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Keywords Section */}
        <div className="bg-gray-300 backdrop-blur-sm rounded-2xl p-6">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            🏷️ Keywords
          </h3>
          <div className="space-y-3">
            {availableKeywords.map((keyword, index) => (
              <div
                key={keyword.id}
                draggable
                onDragStart={(e) => handleDragStart(e, keyword)}
                className="bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl p-4 cursor-move hover:scale-105 transform transition-all duration-300 shadow-lg"
              >
                <span className="text-white font-bold text-lg">
                  {keyword.term}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Definitions Section */}
        <div className="bg-gray-300 backdrop-blur-sm rounded-2xl p-6">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            📝 Definitions
          </h3>
          <div className="space-y-3">
            {matchUpData.definitions.map((definition) => (
              <div
                key={definition.id}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, definition)}
                className={`rounded-xl p-4 min-h-[80px] border-2 border-dashed transition-all duration-300 ${
                  matches[definition.id]
                    ? "bg-gradient-to-r from-green-400 to-emerald-500 border-green-300"
                    : shakeDefinition === definition.id
                    ? "animate-shake bg-gradient-to-r from-red-400 to-pink-500 border-red-300"
                    : "bg-white/5 border-white/30 hover:border-white/50"
                }`}
              >
                {matches[definition.id] ? (
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-bold text-lg mb-1">
                        {matches[definition.id].term}
                      </div>
                      <div className="text-white/90 text-sm">
                        {definition.text}
                      </div>
                    </div>
                    <span className="text-2xl">✅</span>
                  </div>
                ) : (
                  <div className="text-black/70 text-center">
                    <div className="text-sm mb-2">Drop keyword here</div>
                    <div className="text-black text-[18px]">
                      {definition.text}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Game Complete Modal */}
      {gameComplete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-yellow-300 to-orange-400 rounded-3xl p-8 shadow-2xl text-center max-w-md mx-4">
            <div className="text-8xl mb-4">🎉</div>
            <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
              Perfect Match!
            </h2>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-6">
              <p className="text-2xl text-white font-bold mb-2">
                All definitions matched correctly!
              </p>
              <p className="text-xl text-white/90">
                🏆 You&apos;re a Tajweed expert!
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
      <div className="text-center mt-8">
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
