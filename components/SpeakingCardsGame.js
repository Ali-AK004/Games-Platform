// components/SpeakingCardsGame.js - Deal random cards from a shuffled deck
import { useState } from "react";

export default function SpeakingCardsGame({ speakingCards }) {
  const [currentCard, setCurrentCard] = useState(null);
  const [usedCards, setUsedCards] = useState([]);
  const [deckShuffled, setDeckShuffled] = useState(false);
  const [shuffledDeck, setShuffledDeck] = useState([]);

  const shuffleDeck = () => {
    const shuffled = [...speakingCards].sort(() => Math.random() - 0.5);
    setShuffledDeck(shuffled);
    setDeckShuffled(true);
    setUsedCards([]);
    setCurrentCard(null);
  };

  const dealCard = () => {
    const availableCards = shuffledDeck.filter(
      (card) => !usedCards.includes(card.id)
    );

    if (availableCards.length > 0) {
      const randomCard =
        availableCards[Math.floor(Math.random() * availableCards.length)];
      setCurrentCard(randomCard);
      setUsedCards([...usedCards, randomCard.id]);
    }
  };

  const resetDeck = () => {
    setCurrentCard(null);
    setUsedCards([]);
    setDeckShuffled(false);
    setShuffledDeck([]);
  };

  const remainingCards = shuffledDeck.length - usedCards.length;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Game Header */}
      <div className="mb-8 text-center">
        <div className="bg-gray-400 backdrop-blur-sm rounded-2xl p-6">
          <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center">
            <span className="text-4xl mr-3">🗣️</span>
            Speaking Practice Cards
          </h2>
          <p className="text-white/90 text-lg">
            Practice pronunciation with random Tajweed cards!
          </p>
        </div>
      </div>

      {/* Deck Status */}
      <div className="mb-8 text-center">
        <div className="bg-gray-400 backdrop-blur-sm rounded-2xl p-6">
          <div className="flex justify-center items-center space-x-8">
            <div className="bg-gradient-to-r from-blue-400 to-purple-500 rounded-full px-6 py-3">
              <span className="text-white font-bold text-lg">
                🃏 Cards Left:{" "}
                {deckShuffled ? remainingCards : speakingCards.length}
              </span>
            </div>
            <div className="bg-gradient-to-r from-green-400 to-teal-500 rounded-full px-6 py-3">
              <span className="text-white font-bold text-lg">
                ✅ Used: {usedCards.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Current Card Display */}
      <div className="mb-8">
        {currentCard ? (
          <div className="bg-gradient-to-br from-yellow-300 to-orange-400 rounded-3xl p-8 shadow-2xl text-center text-black">
            <div className="text-6xl mb-4">{currentCard.emoji}</div>
            <h3 className="text-3xl font-bold  mb-4 drop-shadow-lg">
              {currentCard.title}
            </h3>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-4">
              <p className="text-xl font-medium mb-3">
                {currentCard.description}
              </p>
              {currentCard.example && (
                <div className="bg-white/20 rounded-xl p-4">
                  <p className=" text-lg">
                    <strong>Example:</strong> {currentCard.example}
                  </p>
                </div>
              )}
            </div>
            <div className="text-white/90 text-lg">
              🎯 Practice saying this out loud!
            </div>
          </div>
        ) : (
          <div className="bg-gray-400 backdrop-blur-sm rounded-3xl p-12 text-center">
            <div className="text-8xl mb-4">🃏</div>
            <h3 className="text-2xl font-bold text-white mb-4">
              {deckShuffled
                ? "Ready to deal cards!"
                : "Shuffle the deck to start!"}
            </h3>
            <p className="text-white/70 text-lg">
              {deckShuffled
                ? 'Click "Deal Card" to get a random speaking practice card'
                : 'Click "Shuffle Deck" to prepare your cards'}
            </p>
          </div>
        )}
      </div>

      {/* Control Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {!deckShuffled ? (
          <button
            onClick={shuffleDeck}
            className="px-8 py-4 bg-gradient-to-r from-purple-400 to-pink-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer flex items-center space-x-2"
          >
            <span className="text-xl">🔀</span>
            <span>Shuffle Deck</span>
          </button>
        ) : (
          <>
            <button
              onClick={dealCard}
              disabled={remainingCards === 0}
              className={`px-8 py-4 rounded-full font-bold text-xl shadow-lg transform transition-all duration-300 cursor-pointer flex items-center space-x-2 ${
                remainingCards === 0
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-400 to-blue-500 text-white hover:shadow-xl hover:scale-105"
              }`}
            >
              <span className="text-xl">🎴</span>
              <span>
                {remainingCards === 0 ? "No Cards Left" : "Deal Card"}
              </span>
            </button>

            <button
              onClick={shuffleDeck}
              className="px-6 py-3 bg-gradient-to-r from-purple-400 to-pink-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer flex items-center space-x-2"
            >
              <span className="text-xl">🔀</span>
              <span>Reshuffle</span>
            </button>
          </>
        )}

        <button
          onClick={resetDeck}
          className="px-6 py-3 bg-gradient-to-r from-red-400 to-pink-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer flex items-center space-x-2"
        >
          <span className="text-xl">🔄</span>
          <span>Reset</span>
        </button>
      </div>

      {/* Deck Complete Message */}
      {deckShuffled && remainingCards === 0 && (
        <div className="text-center">
          <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl p-8 shadow-2xl">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">
              Deck Complete!
            </h3>
            <p className="text-xl text-white/90 mb-6">
              You&apos;ve practiced with all the cards! Great job! 🏆
            </p>
            <button
              onClick={shuffleDeck}
              className="px-8 py-4 bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer flex items-center space-x-2 mx-auto"
            >
              <span className="text-xl">🔀</span>
              <span>Shuffle Again</span>
            </button>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-8 text-center">
        <div className="bg-gray-400 backdrop-blur-sm rounded-2xl p-6">
          <h4 className="text-lg font-bold text-white mb-3">📋 How to Play:</h4>
          <div className="text-white/80 space-y-2">
            <p>1. 🔀 Shuffle the deck to randomize cards</p>
            <p>2. 🎴 Deal a card to get a random Tajweed concept</p>
            <p>3. 🗣️ Practice pronouncing the concept out loud</p>
            <p>4. 🔄 Continue until you&apos;ve practiced all cards!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
