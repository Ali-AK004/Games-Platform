// components/CompleteSentenceGame.js - Drag words into blank spaces to complete sentences
import { useState, useEffect } from "react";

export default function CompleteSentenceGame({ completeSentenceData }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [availableWords, setAvailableWords] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  const currentSentence = completeSentenceData[currentIndex];

  useEffect(() => {
    if (currentSentence) {
      // Shuffle the available words
      const words = [...currentSentence.options].sort(
        () => Math.random() - 0.5
      );
      setAvailableWords(words);
      setUserAnswers({});
      setIsCorrect(null);
    }
  }, [currentIndex, currentSentence]);

  const handleWordDrop = (word, blankIndex) => {
    // Add word to blank
    const newAnswers = { ...userAnswers, [blankIndex]: word };
    setUserAnswers(newAnswers);

    // Remove word from available words
    setAvailableWords(availableWords.filter((w) => w !== word));
  };

  const handleWordRemove = (blankIndex) => {
    const word = userAnswers[blankIndex];
    if (word) {
      // Remove from answers
      const newAnswers = { ...userAnswers };
      delete newAnswers[blankIndex];
      setUserAnswers(newAnswers);

      // Add back to available words
      setAvailableWords([...availableWords, word]);
    }
  };

  const checkSentence = () => {
    const correct = currentSentence.blanks.every(
      (correctWord, index) => userAnswers[index] === correctWord
    );

    setIsCorrect(correct);

    if (correct) {
      setScore(score + 1);
      setTimeout(() => {
        if (currentIndex + 1 < completeSentenceData.length) {
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
    if (currentIndex + 1 < completeSentenceData.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (!currentSentence) return <div>Loading...</div>;

  // Split sentence into parts around blanks
  const renderSentence = () => {
    const parts = currentSentence.sentence.split("___");
    const result = [];

    parts.forEach((part, index) => {
      result.push(
        <span key={`text-${index}`} className="text-white text-xl">
          {part}
        </span>
      );

      if (index < parts.length - 1) {
        result.push(
          <div key={`blank-${index}`} className="inline-block mx-2">
            <div
              className={`min-w-[120px] h-12 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 ${
                userAnswers[index]
                  ? "bg-gradient-to-r from-green-400 to-emerald-500 border-green-300"
                  : "bg-white/10 border-white/50 hover:border-white/70"
              }`}
              onClick={() => handleWordRemove(index)}
            >
              {userAnswers[index] ? (
                <span className="text-white font-bold px-2">
                  {userAnswers[index]}
                </span>
              ) : (
                <span className="text-white/50 text-sm">Drop here</span>
              )}
            </div>
          </div>
        );
      }
    });

    return result;
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Game Header */}
      <div className="mb-8 text-center">
        <div className="bg-gray-400 backdrop-blur-sm rounded-lg p-6">
          <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center">
            <span className="text-4xl mr-3">📝</span>
            Complete the Sentence!
          </h2>
          <div className="flex justify-center items-center space-x-8">
            <div className="bg-gradient-to-r from-blue-400 to-purple-500 rounded-full px-6 py-3">
              <span className="text-white font-bold text-lg">
                📝 Sentence: {currentIndex + 1} / {completeSentenceData.length}
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

      {/* Sentence with Blanks */}
      <div className="mb-8">
        <div className="bg-gray-400 backdrop-blur-sm rounded-lg p-8">
          <h3 className="text-xl font-bold text-white mb-6 text-center">
            🎯 Complete the sentence:
          </h3>
          <div className="text-center leading-relaxed">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {renderSentence()}
            </div>
          </div>
        </div>
      </div>

      {/* Available Words */}
      <div className="mb-8 bg-gray-400 backdrop-blur-sm rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4 text-center">
          🔤 Available Words:
        </h3>
        <div className="">
          <div className="flex flex-wrap gap-3 justify-center">
            {availableWords.length === 0 ? (
              <div className="text-white/50 text-lg flex items-center">
                All words used!
              </div>
            ) : (
              availableWords.map((word, index) => (
                <div
                  key={`word-${index}`}
                  className="bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg px-6 py-2 cursor-pointer hover:scale-110 transform transition-all duration-300 shadow-lg"
                  onClick={() => {
                    // Find first empty blank
                    const emptyBlankIndex = currentSentence.blanks.findIndex(
                      (_, i) => !userAnswers[i]
                    );
                    if (emptyBlankIndex !== -1) {
                      handleWordDrop(word, emptyBlankIndex);
                    }
                  }}
                >
                  <span className="text-white font-bold">{word}</span>
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
          disabled={
            Object.keys(userAnswers).length !== currentSentence.blanks.length
          }
          className={`px-8 py-4 rounded-full font-bold text-xl shadow-lg transform transition-all duration-300 cursor-pointer ${
            Object.keys(userAnswers).length !== currentSentence.blanks.length
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
            className={`rounded-lg p-6 ${
              isCorrect
                ? "bg-gradient-to-r from-green-400 to-emerald-500"
                : "bg-gradient-to-r from-red-400 to-pink-500"
            }`}
          >
            <div className="text-4xl mb-2">{isCorrect ? "🎉" : "❌"}</div>
            <div className="text-white font-bold text-xl mb-2">
              {isCorrect
                ? "Perfect completion!"
                : "Not quite right, try again!"}
            </div>
            {isCorrect && (
              <div className="text-white/90">
                <strong>Complete sentence:</strong>{" "}
                {currentSentence.completeSentence}
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
                Final Score: {score} / {completeSentenceData.length}
              </p>
              <p className="text-xl text-white/90">
                🏆 Excellent completion skills!
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

        {currentIndex + 1 < completeSentenceData.length && (
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
