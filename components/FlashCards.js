// components/games/FlashcardsGame.jsx
import { useState, useEffect } from "react";

export default function FlashcardsGame({ cards }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [shuffledCards, setShuffledCards] = useState([]);
  const [isFlipping, setIsFlipping] = useState(false);

  // Shuffle cards on component mount
  useEffect(() => {
    setShuffledCards([...cards].sort(() => Math.random() - 0.5));
  }, [cards]);

  const nextCard = () => {
    setShowAnswer(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % shuffledCards.length);
  };

  const prevCard = () => {
    setShowAnswer(false);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? shuffledCards.length - 1 : prevIndex - 1
    );
  };

  const flipCard = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setShowAnswer(!showAnswer);
      setIsFlipping(false);
    }, 150);
  };

  const shuffleCards = () => {
    setShuffledCards([...shuffledCards].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setShowAnswer(false);
  };

  if (shuffledCards.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-2xl text-white">🔄 Loading cards...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center max-w-2xl mx-auto">
      {/* Progress indicator */}
      <div className="w-full mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-500 font-bold">📚 Card Progress</span>
          <span className="text-gray-500 font-bold">
            {currentIndex + 1} / {shuffledCards.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-pink-300 to-purple-400 h-3 rounded-full transition-all duration-500"
            style={{
              width: `${((currentIndex + 1) / shuffledCards.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Flashcard */}
      <div className="relative mb-8">
        <div
          className={`w-96 h-80 cursor-pointer transition-all duration-300 ${
            isFlipping ? "scale-95" : "hover:scale-105"
          }`}
          onClick={flipCard}
        >
          <div
            className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
              showAnswer ? "rotate-y-180" : ""
            }`}
          >
            {/* Front of card (Question) */}
            <div className="absolute inset-0 w-full h-full backface-hidden">
              <div className="w-full h-full bg-blue-500 rounded-2xl shadow-xl flex flex-col items-center justify-center p-8 relative">
                <div className="text-center">
                  <div className="text-4xl mb-4">🤔</div>
                  <h3 className="text-2xl font-bold text-white mb-6">
                    Question
                  </h3>
                  <p className="text-lg text-white leading-relaxed font-medium">
                    {shuffledCards[currentIndex].question}
                  </p>
                </div>

                {/* Tap to flip indicator */}
                <div className="absolute bottom-4 right-4 bg-white/20 rounded-lg px-3 py-1">
                  <span className="text-white text-sm font-bold">
                    👆 Tap to flip
                  </span>
                </div>
              </div>
            </div>

            {/* Back of card (Answer) */}
            <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
              <div className="w-full h-full bg-green-500 rounded-2xl shadow-xl flex flex-col items-center justify-center p-8 relative">
                <div className="text-center">
                  <div className="text-4xl mb-4">💡</div>
                  <h3 className="text-2xl font-bold text-white mb-6">Answer</h3>
                  <p className="text-lg text-white leading-relaxed font-medium">
                    {shuffledCards[currentIndex].answer}
                  </p>
                </div>

                {/* Tap to flip indicator */}
                <div className="absolute bottom-4 right-4 bg-white/20 rounded-lg px-3 py-1">
                  <span className="text-white text-sm font-bold">
                    👆 Tap to flip
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Control buttons */}
      <div className="flex flex-wrap justify-center gap-4 w-full max-w-lg">
        <button
          onClick={prevCard}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer flex items-center space-x-2"
        >
          <span className="text-lg">⬅️</span>
          <span>Previous</span>
        </button>

        <button
          onClick={flipCard}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer flex items-center space-x-2"
        >
          <span className="text-lg">🔄</span>
          <span>{showAnswer ? "Show Question" : "Show Answer"}</span>
        </button>

        <button
          onClick={nextCard}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer flex items-center space-x-2"
        >
          <span>Next</span>
          <span className="text-lg">➡️</span>
        </button>
      </div>

      {/* Shuffle button */}
      <div className="mt-6">
        <button
          onClick={shuffleCards}
          className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer flex items-center space-x-2"
        >
          <span className="text-xl">🎲</span>
          <span>Shuffle Cards</span>
        </button>
      </div>
    </div>
  );
}
