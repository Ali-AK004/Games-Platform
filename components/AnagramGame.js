// components/AnagramGame.js - Drag letters to unscramble words
import { useState, useEffect } from "react";

export default function AnagramGame({ anagramData }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState([]);
  const [availableLetters, setAvailableLetters] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  const currentWord = anagramData[currentIndex];

  useEffect(() => {
    if (currentWord) {
      // Scramble the letters
      const letters = currentWord.word.split("").map((letter, index) => ({
        id: index,
        letter: letter,
        originalIndex: index,
      }));
      setAvailableLetters(letters.sort(() => Math.random() - 0.5));
      setUserAnswer([]);
      setIsCorrect(null);
    }
  }, [currentIndex, currentWord]);

  const handleLetterClick = (letterObj, fromAvailable = true) => {
    if (fromAvailable) {
      setUserAnswer([...userAnswer, letterObj]);
      setAvailableLetters(
        availableLetters.filter((l) => l.id !== letterObj.id)
      );
    } else {
      setAvailableLetters([...availableLetters, letterObj]);
      setUserAnswer(userAnswer.filter((l) => l.id !== letterObj.id));
    }
  };

  const checkAnswer = () => {
    const userWord = userAnswer.map((l) => l.letter).join("");
    const correct = userWord === currentWord.word;
    setIsCorrect(correct);

    if (correct) {
      setScore(score + 1);
      setTimeout(() => {
        if (currentIndex + 1 < anagramData.length) {
          setCurrentIndex(currentIndex + 1);
        } else {
          setGameComplete(true);
        }
      }, 1500);
    }
  };

  const resetGame = () => {
    setCurrentIndex(0);
    setScore(0);
    setGameComplete(false);
    setIsCorrect(null);
  };

  const nextWord = () => {
    if (currentIndex + 1 < anagramData.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (!currentWord) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Game Header */}
      <div className="mb-8 text-center">
        <div className="bg-gray-300 backdrop-blur-sm rounded-lg p-6">
          <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center">
            <span className="text-4xl mr-3">🔤</span>
            Unscramble the Word!
          </h2>
          <div className="flex justify-center items-center space-x-8">
            <div className="bg-gradient-to-r from-blue-400 to-purple-500 rounded-full px-6 py-3">
              <span className="text-white font-bold text-lg">
                📝 Word: {currentIndex + 1} / {anagramData.length}
              </span>
            </div>
            <div className="bg-gradient-to-r from-green-400 to-teal-500 rounded-full px-6 py-3">
              <span className="text-white font-bold text-lg">
                🏆 Score: {score}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hint */}
      <div className="mb-8 text-center">
        <div className="bg-gray-300 backdrop-blur-sm rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-2">💡 Hint:</h3>
          <p className="text-white/90 text-lg">{currentWord.hint}</p>
        </div>
      </div>

      {/* Answer Area */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4 text-center">
          🎯 Your Answer:
        </h3>
        <div className="flex justify-center">
          <div className="flex flex-wrap gap-2 min-h-[80px] bg-gray-400 backdrop-blur-sm rounded-lg p-4 justify-center items-center">
            {userAnswer.length === 0 ? (
              <div className="text-white/50 text-lg">Drag letters here...</div>
            ) : (
              userAnswer.map((letterObj, index) => (
                <div
                  key={`answer-${letterObj.id}`}
                  onClick={() => handleLetterClick(letterObj, false)}
                  className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xl cursor-pointer hover:scale-110 transform transition-all duration-300 shadow-lg"
                >
                  {letterObj.letter}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Available Letters */}
      <div className="mb-8 bg-gray-300 py-4 rounded-lg">
        <h3 className="text-xl font-bold text-white mb-4 text-center">
          🔤 Available Letters:
        </h3>
        <div className="flex flex-wrap gap-3 justify-center">
          {availableLetters.map((letterObj) => (
            <div
              key={`available-${letterObj.id}`}
              onClick={() => handleLetterClick(letterObj, true)}
              className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-xl cursor-pointer hover:scale-110 transform transition-all duration-300 shadow-lg"
            >
              {letterObj.letter}
            </div>
          ))}
        </div>
      </div>

      {/* Check Answer Button */}
      <div className="text-center mb-8">
        <button
          onClick={checkAnswer}
          disabled={userAnswer.length !== currentWord.word.length}
          className={`px-8 py-4 rounded-full font-bold text-xl shadow-lg transform transition-all duration-300 cursor-pointer ${
            userAnswer.length !== currentWord.word.length
              ? "bg-gray-400 text-gray-200 cursor-not-allowed"
              : "bg-gradient-to-r from-green-400 to-blue-500 text-white hover:shadow-xl hover:scale-105"
          }`}
        >
          <span className="text-2xl mr-2">✅</span>
          Check Answer
        </button>
      </div>

      {/* Feedback */}
      {isCorrect !== null && (
        <div className="text-center mb-8">
          <div
            className={`rounded-lg p-6 ${
              isCorrect
                ? "bg-gradient-to-r from-green-400 to-emerald-500"
                : "bg-gradient-to-r from-red-400 to-pink-500"
            }`}
          >
            <div className="text-4xl mb-2">{isCorrect ? "🎉" : "❌"}</div>
            <div className="text-white font-bold text-xl">
              {isCorrect ? "Correct!" : "Try again!"}
            </div>
            {isCorrect && (
              <div className="text-white/90 mt-2">
                The word was: <strong>{currentWord.word}</strong>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Game Complete Modal */}
      {gameComplete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-yellow-300 to-orange-400 rounded-lg p-8 shadow-2xl text-center max-w-md mx-4">
            <div className="text-8xl mb-4">🎉</div>
            <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
              All Words Complete!
            </h2>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-6">
              <p className="text-2xl text-white font-bold mb-2">
                Final Score: {score} / {anagramData.length}
              </p>
              <p className="text-xl text-white/90">🏆 Great word skills!</p>
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

      {/* Control Buttons */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={resetGame}
          className="px-6 py-3 bg-gradient-to-r from-red-400 to-pink-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer flex items-center space-x-2"
        >
          <span className="text-xl">🔄</span>
          <span>Reset</span>
        </button>

        {currentIndex + 1 < anagramData.length && (
          <button
            onClick={nextWord}
            className="px-6 py-3 bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer flex items-center space-x-2"
          >
            <span>Skip</span>
            <span className="text-xl">⏭️</span>
          </button>
        )}
      </div>
    </div>
  );
}
