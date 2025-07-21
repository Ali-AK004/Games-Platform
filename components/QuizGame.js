import { useState } from "react";

export default function QuizGame({ questions }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswer = (isCorrect, answerIndex) => {
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);

    if (isCorrect) setScore(score + 1);

    // Show feedback for 1.5 seconds before moving to next question
    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const getScoreEmoji = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90) return "🏆";
    if (percentage >= 70) return "🌟";
    if (percentage >= 50) return "👍";
    return "💪";
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90) return "Amazing! You're a Tajweed superstar!";
    if (percentage >= 70) return "Great job! You're doing really well!";
    if (percentage >= 50) return "Good work! Keep practicing!";
    return "Nice try! Practice makes perfect!";
  };

  return (
    <div className="max-w-2xl mx-auto">
      {showResult ? (
        <div className="text-center bg-white rounded-2xl p-8 shadow-lg border-2 border-green-200">
          <div className="text-6xl mb-4">{getScoreEmoji()}</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Quiz Complete! 🎉
          </h2>
          <div className="bg-green-50 rounded-xl p-6 mb-6">
            <p className="text-xl text-gray-800 font-bold mb-2">
              You scored {score} out of {questions.length}!
            </p>
            <p className="text-lg text-gray-600 font-medium">
              {getScoreMessage()}
            </p>
          </div>
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={resetQuiz}
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
      ) : (
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 font-bold">Progress</span>
              <span className="text-gray-700 font-bold">
                {currentQuestion + 1} / {questions.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="bg-blue-50 rounded-xl p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="text-3xl mr-3">🤔</span>
              Question {currentQuestion + 1}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {questions[currentQuestion].question}
            </p>
          </div>

          {/* Answer Options */}
          <div className="space-y-4">
            {questions[currentQuestion].answers.map((answer, index) => {
              let buttonClass =
                "w-full p-4 rounded-2xl font-bold text-lg transition-all duration-300 cursor-pointer transform hover:scale-105 ";

              if (showFeedback) {
                if (answer.isCorrect) {
                  buttonClass += "bg-green-500 text-white shadow-lg";
                } else if (selectedAnswer === index) {
                  buttonClass += "bg-red-500 text-white shadow-lg";
                } else {
                  buttonClass += "bg-gray-200 text-gray-500";
                }
              } else {
                buttonClass +=
                  "bg-gray-100 text-gray-800 hover:bg-blue-100 border border-gray-300 shadow-md hover:shadow-lg";
              }

              return (
                <button
                  key={index}
                  onClick={() =>
                    !showFeedback && handleAnswer(answer.isCorrect, index)
                  }
                  className={buttonClass}
                  disabled={showFeedback}
                >
                  <div className="flex items-center justify-between">
                    <span>{answer.text}</span>
                    {showFeedback && answer.isCorrect && (
                      <span className="text-2xl">✅</span>
                    )}
                    {showFeedback &&
                      !answer.isCorrect &&
                      selectedAnswer === index && (
                        <span className="text-2xl">❌</span>
                      )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Score Display */}
          <div className="mt-6 text-center">
            <div className="bg-gray-100 rounded-lg px-6 py-3 inline-block">
              <span className="text-gray-700 font-bold text-lg">
                🏆 Score: {score} / {questions.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
