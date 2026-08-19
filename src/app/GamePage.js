// pages/games/index.js
import { useState } from "react";
import Head from "next/head";
import {
  quizQuestions,
  wheelItems,
  matchingPairs,
  flashCards,
  matchUpData,
  boxItems,
  anagramData,
  groupSortData,
  speakingCards,
  findMatchData,
  unjumbleData,
  completeSentenceData,
} from "../../data/tajweedData";
import {
  lonelyLetters,
  sortLetters,
  wordBuilderChallenges,
  connectPairs,
} from "../../data/arabicLettersData";

import {
  hathaHadhiWords,
  hathaHadhiCategories,
} from "../../data/hathaHadhiData";
import WheelGame from "../../components/SpinWheel";
import QuizGame from "../../components/QuizGame";
import MatchingPairsGame from "../../components/MatchingGame";
import FlashcardsGame from "../../components/FlashCards";
import MatchUpGame from "../../components/MatchUpGame";
import OpenBoxGame from "../../components/OpenBoxGame";
import AnagramGame from "../../components/AnagramGame";
import GroupSortGame from "../../components/GroupSortGame";
import SpeakingCardsGame from "../../components/SpeakingCardsGame";
import FindMatchGame from "../../components/FindMatchGame";
import UnjumbleGame from "../../components/UnjumbleGame";
import CompleteSentenceGame from "../../components/CompleteSentenceGame";
import ArabicLettersGame from "../../components/ArabicLettersGame";
import { Bounce, ToastContainer } from "react-toastify";
import HathaHadhiGame from "../../components/HathaHadhiGame";

const GAME_TYPES = {
  QUIZ: "quiz",
  WHEEL: "wheel",
  MATCHING_PAIRS: "matching_pairs",
  FLASHCARDS: "flashcards",
  MATCH_UP: "match_up",
  OPEN_BOX: "open_box",
  ANAGRAM: "anagram",
  GROUP_SORT: "group_sort",
  SPEAKING_CARDS: "speaking_cards",
  FIND_MATCH: "find_match",
  UNJUMBLE: "unjumble",
  COMPLETE_SENTENCE: "complete_sentence",
  ARABIC_LETTERS: "arabic_letters",
  HATHA_HADHI: "hatha_hadhi",
};

export default function GamesPage() {
  const [currentGame, setCurrentGame] = useState(null);

  return (
    <div className="min-h-screen bg-blue-50">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <Head>
        <title>🌟 Tajweed Games for Kids 🌟</title>
      </Head>

      <main className="container mx-auto py-8 px-4">
        {/* Clean Header */}
        <div className="text-center mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 mx-auto max-w-2xl">
            <h1 className="text-4xl font-bold mb-4 text-blue-800">
              🕌 Tajweed Learning Games
            </h1>
            <p className="text-lg text-gray-600 font-medium">
              Learn Tajweed in a fun and interactive way!
            </p>
            <div className="flex justify-center mt-6 space-x-4 animate-bounce">
              <span className="text-2xl">🎮</span>
              <span className="text-2xl">🎯</span>
              <span className="text-2xl">🏆</span>
            </div>
          </div>
        </div>

        {!currentGame ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <GameCard
              title="🧠 Tajweed Quiz"
              description="Test your knowledge with fun questions!"
              emoji="🤔"
              bgColor="bg-blue-500"
              onClick={() => setCurrentGame(GAME_TYPES.QUIZ)}
            />
            <GameCard
              title="🎡 Spin the Wheel"
              description="Spin to discover Tajweed secrets!"
              emoji="🎲"
              bgColor="bg-green-500"
              onClick={() => setCurrentGame(GAME_TYPES.WHEEL)}
            />
            <GameCard
              title="🔗 Matching Pairs"
              description="Find matching Arabic letters!"
              emoji="🧩"
              bgColor="bg-orange-500"
              onClick={() => setCurrentGame(GAME_TYPES.MATCHING_PAIRS)}
            />
            <GameCard
              title="📇 Flashcards"
              description="Learn with colorful cards!"
              emoji="💡"
              bgColor="bg-purple-500"
              onClick={() => setCurrentGame(GAME_TYPES.FLASHCARDS)}
            />
            <GameCard
              title="🎯 Match Up"
              description="Drag keywords to definitions!"
              emoji="🎯"
              bgColor="bg-teal-500"
              onClick={() => setCurrentGame(GAME_TYPES.MATCH_UP)}
            />
            <GameCard
              title="📦 Open the Box"
              description="Tap boxes to reveal concepts!"
              emoji="📦"
              bgColor="bg-yellow-500"
              onClick={() => setCurrentGame(GAME_TYPES.OPEN_BOX)}
            />
            <GameCard
              title="🔤 Anagram"
              description="Unscramble Tajweed words!"
              emoji="🔤"
              bgColor="bg-pink-500"
              onClick={() => setCurrentGame(GAME_TYPES.ANAGRAM)}
            />
            <GameCard
              title="📂 Group Sort"
              description="Sort items into categories!"
              emoji="📂"
              bgColor="bg-indigo-500"
              onClick={() => setCurrentGame(GAME_TYPES.GROUP_SORT)}
            />
            <GameCard
              title="🗣️ Speaking Cards"
              description="Practice pronunciation!"
              emoji="🗣️"
              bgColor="bg-emerald-500"
              onClick={() => setCurrentGame(GAME_TYPES.SPEAKING_CARDS)}
            />
            <GameCard
              title="🎯 Find Match"
              description="Tap matching pairs to eliminate!"
              emoji="🔍"
              bgColor="bg-violet-500"
              onClick={() => setCurrentGame(GAME_TYPES.FIND_MATCH)}
            />
            <GameCard
              title="🔀 Unjumble"
              description="Rearrange words into sentences!"
              emoji="🔀"
              bgColor="bg-amber-500"
              onClick={() => setCurrentGame(GAME_TYPES.UNJUMBLE)}
            />
            <GameCard
              title="📝 Complete Sentence"
              description="Fill in the missing words!"
              emoji="📝"
              bgColor="bg-lime-500"
              onClick={() => setCurrentGame(GAME_TYPES.COMPLETE_SENTENCE)}
            />
            <GameCard
              title="✍️ Lonely Letters"
              description="Drag, build words, and fix letter chains!"
              emoji="✍️"
              bgColor="bg-rose-500"
              onClick={() => setCurrentGame(GAME_TYPES.ARABIC_LETTERS)}
            />
            <GameCard
              title="👉 هذا أم هذه؟"
              description="Sort words into هذا and هذه!"
              emoji="🧩"
              bgColor="bg-cyan-500"
              onClick={() => setCurrentGame(GAME_TYPES.HATHA_HADHI)}
            />
          </div>
        ) : (
          <div>
            <button
              onClick={() => setCurrentGame(null)}
              className="mb-8 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer flex items-center space-x-2"
            >
              <span className="text-xl">🏠</span>
              <span>Back to Games Menu</span>
            </button>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              {currentGame === GAME_TYPES.QUIZ && (
                <QuizGame questions={quizQuestions} />
              )}
              {currentGame === GAME_TYPES.HATHA_HADHI && (
                <HathaHadhiGame
                  words={hathaHadhiWords}
                  categories={hathaHadhiCategories}
                />
              )}
              {currentGame === GAME_TYPES.WHEEL && (
                <WheelGame items={wheelItems} />
              )}
              {currentGame === GAME_TYPES.MATCHING_PAIRS && (
                <MatchingPairsGame pairs={matchingPairs} />
              )}
              {currentGame === GAME_TYPES.FLASHCARDS && (
                <FlashcardsGame cards={flashCards} />
              )}
              {currentGame === GAME_TYPES.MATCH_UP && (
                <MatchUpGame matchUpData={matchUpData} />
              )}
              {currentGame === GAME_TYPES.OPEN_BOX && (
                <OpenBoxGame boxItems={boxItems} />
              )}
              {currentGame === GAME_TYPES.ANAGRAM && (
                <AnagramGame anagramData={anagramData} />
              )}
              {currentGame === GAME_TYPES.GROUP_SORT && (
                <GroupSortGame groupSortData={groupSortData} />
              )}
              {currentGame === GAME_TYPES.SPEAKING_CARDS && (
                <SpeakingCardsGame speakingCards={speakingCards} />
              )}
              {currentGame === GAME_TYPES.FIND_MATCH && (
                <FindMatchGame findMatchData={findMatchData} />
              )}
              {currentGame === GAME_TYPES.UNJUMBLE && (
                <UnjumbleGame unjumbleData={unjumbleData} />
              )}
              {currentGame === GAME_TYPES.COMPLETE_SENTENCE && (
                <CompleteSentenceGame
                  completeSentenceData={completeSentenceData}
                />
              )}
              {currentGame === GAME_TYPES.ARABIC_LETTERS && (
                <ArabicLettersGame
                  arabicLettersData={{
                    lonelyLetters,
                    sortLetters,
                    wordBuilderChallenges,
                    connectPairs,
                  }}
                />
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function GameCard({ title, description, emoji, bgColor, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`p-6 ${bgColor} rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer group relative`}
    >
      {/* Content */}
      <div className="text-center">
        <div className="mb-4">
          <span className="text-4xl">{emoji}</span>
        </div>
        <h2 className="text-xl font-bold mb-3 text-white">{title}</h2>
        <p className="text-white/90 text-sm leading-relaxed mb-4">
          {description}
        </p>

        {/* Play button indicator */}
        <div className="bg-white/20 rounded-lg px-3 py-2 inline-block">
          <span className="text-white font-medium text-sm flex items-center space-x-1">
            <span>▶️</span>
            <span>Play</span>
          </span>
        </div>
      </div>
    </div>
  );
}
