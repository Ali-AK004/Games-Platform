// components/UnjumbleGame.js - Drag and drop words to form correct sentences
import { useState, useEffect } from "react";

export default function UnjumbleGame({ unjumbleData }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userSentence, setUserSentence] = useState([]);
  const [availableWords, setAvailableWords] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  const currentSentence = unjumbleData[currentIndex];

  useEffect(() => {
    if (currentSentence) {
      // Shuffle the words
      const words = currentSentence.words.map((word, index) => ({
        id: index,
        word: word,
        originalIndex: index,
      }));
      setAvailableWords(words.sort(() => Math.random() - 0.5));
      setUserSentence([]);
      setIsCorrect(null);
    }
  }, [currentIndex, currentSentence]);

  const handleWordClick = (wordObj, fromSentence = false) => {
    if (fromSentence) {
      // Move word back to available
      setAvailableWords([...availableWords, wordObj]);
      setUserSentence(userSentence.filter((w) => w.id !== wordObj.id));
    } else {
      // Move word to sentence
      setUserSentence([...userSentence, wordObj]);
      setAvailableWords(availableWords.filter((w) => w.id !== wordObj.id));
    }
  };

  const checkSentence = () => {
    const userWords = userSentence.map((w) => w.word);
    const correctWords = currentSentence.words;
    const correct = JSON.stringify(userWords) === JSON.stringify(correctWords);

    setIsCorrect(correct);

    if (correct) {
      setScore(score + 1);
      setTimeout(() => {
        if (currentIndex + 1 < unjumbleData.length) {
          setCurrentIndex(currentIndex + 1);
        } else {
          setGameComplete(true);
        }
      }, 2000);
    }
  };

  const resetGame = () => {
    setCurrentIndex(0);
    setScore(0);
    setGameComplete(false);
    setIsCorrect(null);
  };

  const nextSentence = () => {
    if (currentIndex + 1 < unjumbleData.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (!currentSentence) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Game Header */}
      <div className="mb-8 text-center">
        <div className="bg-gray-300 backdrop-blur-sm rounded-lg p-6">
          <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center">
            <span className="text-4xl mr-3">🔀</span>
            Unjumble the Sentence!
          </h2>
          <div className="flex justify-center items-center space-x-8">
            <div className="bg-gradient-to-r from-blue-400 to-purple-500 rounded-full px-6 py-3">
              <span className="text-white font-bold text-lg">
                📝 Sentence: {currentIndex + 1} / {unjumbleData.length}
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

      {/* Topic */}
      <div className="mb-8 text-center">
        <div className="bg-gray-400 backdrop-blur-sm rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-2">📚 Topic:</h3>
          <p className="text-white/90 text-lg">{currentSentence.topic}</p>
        </div>
      </div>

      {/* User Sentence Area */}
      <div className="mb-8 p-6 bg-gray-400 backdrop-blur-sm rounded-lg">
        <h3 className="text-xl font-bold text-white mb-4 text-center">
          🎯 Your Sentence:
        </h3>
        <div className="min-h-[120px]">
          <div className="flex flex-wrap gap-2 justify-center items-center min-h-[80px]">
            {userSentence.length === 0 ? (
              <div className="text-white/50 text-lg">
                Drag words here to form a sentence...
              </div>
            ) : (
              userSentence.map((wordObj, index) => (
                <div
                  key={`sentence-${wordObj.id}`}
                  onClick={() => handleWordClick(wordObj, true)}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg px-4 py-2 cursor-pointer hover:scale-110 transform transition-all duration-300 shadow-lg"
                >
                  <span className="text-white font-bold">{wordObj.word}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Available Words */}
      <div className="mb-8 bg-gray-400 backdrop-blur-sm rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4 text-center">
          🔤 Available Words:
        </h3>
        <div className="">
          <div className="flex flex-wrap gap-3 justify-center min-h-[80px]">
            {availableWords.length === 0 ? (
              <div className="text-white/50 text-lg flex items-center">
                All words used!
              </div>
            ) : (
              availableWords.map((wordObj) => (
                <div
                  key={`available-${wordObj.id}`}
                  onClick={() => handleWordClick(wordObj, false)}
                  className="bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg px-4 py-2 cursor-pointer hover:scale-110 transform transition-all duration-300 shadow-lg"
                >
                  <span className="text-white font-bold">{wordObj.word}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Check Button */}
      <div className="text-center mb-8">
        <button
          onClick={checkSentence}
          disabled={userSentence.length !== currentSentence.words.length}
          className={`px-8 py-4 rounded-full font-bold text-xl shadow-lg transform transition-all duration-300 cursor-pointer ${
            userSentence.length !== currentSentence.words.length
              ? "bg-gray-400 text-gray-200 cursor-not-allowed"
              : "bg-gradient-to-r from-green-400 to-blue-500 text-white hover:shadow-xl hover:scale-105"
          }`}
        >
          <span className="text-2xl mr-2">✅</span>
          Check Sentence
        </button>
      </div>

      {/* Feedback */}
      {isCorrect !== null && (
        <div className="text-center mb-8">
          <div
            className={`rounded-2xl p-6 ${
              isCorrect
                ? "bg-gradient-to-r from-green-400 to-emerald-500"
                : "bg-gradient-to-r from-red-400 to-pink-500"
            }`}
          >
            <div className="text-4xl mb-2">{isCorrect ? "🎉" : "❌"}</div>
            <div className="text-white font-bold text-xl mb-2">
              {isCorrect ? "Perfect sentence!" : "Not quite right, try again!"}
            </div>
            {isCorrect && (
              <div className="text-white/90">
                <strong>Correct sentence:</strong>{" "}
                {currentSentence.words.join(" ")}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Game Complete Modal */}
      {gameComplete && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-yellow-300 to-orange-400 rounded-3xl p-8 shadow-2xl text-center max-w-md mx-4">
            <div className="text-8xl mb-4">🎉</div>
            <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
              All Sentences Complete!
            </h2>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-6">
              <p className="text-2xl text-white font-bold mb-2">
                Final Score: {score} / {unjumbleData.length}
              </p>
              <p className="text-xl text-white/90">
                🏆 Excellent sentence building!
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

      {/* Control Buttons */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={resetGame}
          className="px-6 py-3 bg-gradient-to-r from-red-400 to-pink-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer flex items-center space-x-2"
        >
          <span className="text-xl">🔄</span>
          <span>Reset</span>
        </button>

        {currentIndex + 1 < unjumbleData.length && (
          <button
            onClick={nextSentence}
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
