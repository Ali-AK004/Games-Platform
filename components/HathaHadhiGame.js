"use client";

import React, { useEffect, useMemo, useState } from "react";
import { hathaHadhiWords, hathaHadhiCategories } from "../data/hathaHadhiData";

const QUESTIONS_PER_GAME = 8;

export default function HathaHadhiGame({
  words = hathaHadhiWords,
  categories = hathaHadhiCategories,
  onComplete,
}) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const [draggedWord, setDraggedWord] = useState(null);
  const [dragOver, setDragOver] = useState(null);

  useEffect(() => {
    if (!words || !words.length) return;
    const shuffled = [...words]
      .sort(() => Math.random() - 0.5)
      .slice(0, QUESTIONS_PER_GAME);

    setQuestions(shuffled);
  }, [words]);

  const currentWord = questions[currentIndex];

  const progress = useMemo(() => {
    if (!questions.length) return 0;

    return ((currentIndex + 1) / questions.length) * 100;
  }, [currentIndex, questions.length]);

  const handleAnswer = (answer) => {
    if (!currentWord || feedback) return;

    setSelectedAnswer(answer);

    const correct = answer === currentWord.answer;

    setFeedback({
      correct,
      answer: currentWord.answer,
    });

    if (correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      setCompleted(true);

      if (onComplete) {
        onComplete({
          score: score + (feedback?.correct ? 1 : 0),
          total: questions.length,
        });
      }

      return;
    }

    setCurrentIndex((prev) => prev + 1);
    setSelectedAnswer(null);
    setFeedback(null);
    setDraggedWord(null);
    setDragOver(null);
  };

  const handleDragStart = (event) => {
    if (feedback) return;

    setDraggedWord(currentWord);
    event.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (event, category) => {
    event.preventDefault();

    if (feedback) return;

    setDragOver(category);
  };

  const handleDragLeave = () => {
    setDragOver(null);
  };

  const handleDrop = (event, category) => {
    event.preventDefault();

    if (feedback) return;

    setDragOver(null);
    handleAnswer(category);
  };

  const restartGame = () => {
    const shuffled = [...words]
      .sort(() => Math.random() - 0.5)
      .slice(0, QUESTIONS_PER_GAME);

    setQuestions(shuffled);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setFeedback(null);
    setScore(0);
    setCompleted(false);
    setDraggedWord(null);
    setDragOver(null);
  };

  if (!questions.length) {
    return <div style={styles.loading}>Loading...</div>;
  }

  if (completed) {
    const finalScore = score + (feedback?.correct ? 1 : 0);

    const percentage = Math.round((finalScore / questions.length) * 100);

    return (
      <div style={styles.gameContainer}>
        <div style={styles.resultCard}>
          <div style={styles.resultEmoji}>
            {percentage >= 80 ? "🎉" : percentage >= 50 ? "😊" : "💪"}
          </div>

          <h2 style={styles.resultTitle}>
            {percentage >= 80
              ? "Amazing!"
              : percentage >= 50
                ? "Good Job!"
                : "Keep Practicing!"}
          </h2>

          <div style={styles.scoreText}>
            {finalScore} / {questions.length}
          </div>

          <p style={styles.resultMessage}>
            You sorted the words into هذا and هذه!
          </p>

          <button onClick={restartGame} style={styles.restartButton}>
            🔄 Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.gameContainer}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>هذا أم هذه؟</h1>

          <p style={styles.subtitle}>Sort the word into the right group!</p>
        </div>

        <div style={styles.scoreBadge}>⭐ {score}</div>
      </div>

      {/* Progress */}
      <div style={styles.progressContainer}>
        <div
          style={{
            ...styles.progressBar,
            width: `${progress}%`,
          }}
        />
      </div>

      <div style={styles.questionCounter}>
        {currentIndex + 1} / {questions.length}
      </div>

      {/* Word Card */}
      <div
        draggable={!feedback}
        onDragStart={handleDragStart}
        style={{
          ...styles.wordCard,

          cursor: feedback ? "default" : "grab",

          opacity: draggedWord && !feedback ? 0.85 : 1,
        }}
      >
        <div style={styles.emoji}>{currentWord.emoji}</div>

        <div style={styles.arabicWord}>{currentWord.word}</div>

        <div style={styles.meaning}>{currentWord.meaning}</div>

        {!feedback && (
          <div style={styles.dragHint}>👆 Drag me or choose a group</div>
        )}
      </div>

      {/* Sorting Areas */}
      <div style={styles.categories}>
        {categories.map((category) => {
          const isSelected = selectedAnswer === category.label;

          const isCorrect = feedback && category.label === currentWord.answer;

          const isWrong = feedback && isSelected && !feedback.correct;

          const isDragTarget = dragOver === category.label;

          return (
            <div
              key={category.id}
              onDragOver={(event) => handleDragOver(event, category.label)}
              onDragLeave={handleDragLeave}
              onDrop={(event) => handleDrop(event, category.label)}
              onClick={() => handleAnswer(category.label)}
              style={{
                ...styles.category,

                ...(category.id === "hatha"
                  ? styles.hathaCategory
                  : styles.hadhiCategory),

                ...(isDragTarget ? styles.dragTarget : {}),

                ...(isCorrect ? styles.correctCategory : {}),

                ...(isWrong ? styles.wrongCategory : {}),
              }}
            >
              <div style={styles.categoryArabic}>{category.label}</div>

              <div style={styles.categoryMeaning}>
                {category.id === "hatha" ? "Masculine (team boys)" : "Feminine (team girls)"}
              </div>

              {feedback && category.label === currentWord.answer && (
                <div style={styles.feedbackIcon}>✓</div>
              )}

              {feedback && isWrong && <div style={styles.feedbackIcon}>✗</div>}
            </div>
          );
        })}
      </div>

      {/* Feedback */}
      {feedback && (
        <div
          style={{
            ...styles.feedback,
            ...(feedback.correct
              ? styles.correctFeedback
              : styles.wrongFeedback),
          }}
        >
          <div style={styles.feedbackTitle}>
            {feedback.correct ? "🎉 Correct!" : "💡 Not quite!"}
          </div>

          {!feedback.correct && (
            <div style={styles.feedbackText}>
              The answer is <strong>{currentWord.answer}</strong>
            </div>
          )}

          <button onClick={handleNext} style={styles.nextButton}>
            {currentIndex + 1 === questions.length ? "See Results" : "Next →"}
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  gameContainer: {
    width: "100%",
    maxWidth: "850px",
    margin: "0 auto",
    padding: "24px",
    boxSizing: "border-box",
    fontFamily: "Arial, sans-serif",
    color: "#0F172A",
  },

  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "400px",
    fontSize: "24px",
    color: "#0F172A",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  title: {
    margin: 0,
    fontSize: "32px",
    fontWeight: "800",
    direction: "rtl",
    color: "#0F172A",
  },

  subtitle: {
    margin: "6px 0 0",
    color: "#475569",
    fontSize: "16px",
  },

  scoreBadge: {
    background: "#FEF08A",
    color: "#854D0E",
    borderRadius: "20px",
    padding: "10px 18px",
    fontSize: "18px",
    fontWeight: "700",
  },

  progressContainer: {
    width: "100%",
    height: "10px",
    background: "#E2E8F0",
    borderRadius: "10px",
    overflow: "hidden",
  },

  progressBar: {
    height: "100%",
    background: "#6C63FF",
    borderRadius: "10px",
    transition: "width 0.3s ease",
  },

  questionCounter: {
    textAlign: "center",
    marginTop: "8px",
    color: "#64748B",
    fontSize: "14px",
  },

  wordCard: {
    width: "min(360px, 90%)",
    margin: "30px auto",
    padding: "28px 20px",
    background: "#FFFFFF",
    borderRadius: "24px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.10)",
    textAlign: "center",
    userSelect: "none",
    transition: "transform 0.2s ease",
  },

  emoji: {
    fontSize: "70px",
    marginBottom: "12px",
  },

  arabicWord: {
    fontSize: "42px",
    fontWeight: "800",
    direction: "rtl",
    marginBottom: "8px",
    color: "#0F172A",
  },

  meaning: {
    color: "#475569",
    fontSize: "18px",
  },

  dragHint: {
    marginTop: "16px",
    color: "#64748B",
    fontSize: "13px",
  },

  categories: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
    maxWidth: "650px",
    margin: "0 auto",
  },

  category: {
    position: "relative",
    minHeight: "160px",
    borderRadius: "25px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    transition: "all 0.2s ease",
    border: "4px solid transparent",
  },

  hathaCategory: {
    background: "#E8F1FF",
    borderColor: "#8DB8FF",
  },

  hadhiCategory: {
    background: "#FFEAF3",
    borderColor: "#FF9FC4",
  },

  dragTarget: {
    transform: "scale(1.04)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
  },

  correctCategory: {
    borderColor: "#16A34A",
    background: "#DCFCE7",
    transform: "scale(1.03)",
  },

  wrongCategory: {
    borderColor: "#DC2626",
    background: "#FEE2E2",
  },

  categoryArabic: {
    fontSize: "48px",
    fontWeight: "800",
    direction: "rtl",
    color: "#0F172A",
  },

  categoryMeaning: {
    marginTop: "8px",
    fontSize: "15px",
    color: "#334155",
    fontWeight: "600",
  },

  feedbackIcon: {
    position: "absolute",
    top: "12px",
    right: "16px",
    fontSize: "28px",
    fontWeight: "800",
    color: "#0F172A",
  },

  feedback: {
    marginTop: "24px",
    padding: "20px",
    borderRadius: "18px",
    textAlign: "center",
  },

  correctFeedback: {
    background: "#DCFCE7",
    color: "#14532D",
  },

  wrongFeedback: {
    background: "#FFEDD5",
    color: "#7C2D12",
  },

  feedbackTitle: {
    fontSize: "22px",
    fontWeight: "800",
    marginBottom: "6px",
    color: "inherit",
  },

  feedbackText: {
    fontSize: "16px",
    marginBottom: "14px",
    color: "inherit",
  },

  nextButton: {
    border: "none",
    background: "#6C63FF",
    color: "white",
    padding: "12px 28px",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
  },

  resultCard: {
    textAlign: "center",
    padding: "60px 20px",
  },

  resultEmoji: {
    fontSize: "80px",
  },

  resultTitle: {
    fontSize: "34px",
    margin: "15px 0",
    color: "#0F172A",
  },

  scoreText: {
    fontSize: "48px",
    fontWeight: "800",
    margin: "20px 0",
    color: "#0F172A",
  },

  resultMessage: {
    color: "#475569",
    fontSize: "18px",
    marginBottom: "30px",
  },

  restartButton: {
    border: "none",
    background: "#6C63FF",
    color: "white",
    padding: "14px 30px",
    borderRadius: "14px",
    fontSize: "17px",
    fontWeight: "700",
    cursor: "pointer",
  },
};