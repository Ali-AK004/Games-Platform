// components/GroupSortGame.js - Drag and drop items into correct groups
import { useEffect, useState } from "react";

export default function GroupSortGame({ groupSortData }) {
  const [draggedItem, setDraggedItem] = useState(null);
  const [groups, setGroups] = useState(
    groupSortData.groups.reduce((acc, group) => {
      acc[group.id] = [];
      return acc;
    }, {})
  );
  const [availableItems, setAvailableItems] = useState([
    ...groupSortData.items,
  ]);
  const [gameComplete, setGameComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongDrop, setWrongDrop] = useState(false);
  const [shakeGroup, setShakeGroup] = useState(null);

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, groupId) => {
    e.preventDefault();
    if (draggedItem && draggedItem.groupId === groupId) {
      // Correct group
      const newGroups = {
        ...groups,
        [groupId]: [...groups[groupId], draggedItem],
      };
      setGroups(newGroups);
      setAvailableItems(
        availableItems.filter((item) => item.id !== draggedItem.id)
      );
      setScore(score + 1);

      // Check if game is complete
      if (availableItems.length === 1) {
        setGameComplete(true);
      }
    } else {
      // Wrong group
      setWrongDrop(true);
      setShakeGroup(groupId);
      setTimeout(() => {
        setShakeGroup(null);
      }, 1000);
    }
    setDraggedItem(null);
  };

  const handleItemClick = (item, fromGroup = false, groupId = null) => {
    if (fromGroup) {
      // Move item back to available items
      const newGroups = {
        ...groups,
        [groupId]: groups[groupId].filter((i) => i.id !== item.id),
      };
      setGroups(newGroups);
      setAvailableItems([...availableItems, item]);
      setScore(Math.max(0, score - 1));
    }
  };

  const resetGame = () => {
    setGroups(
      groupSortData.groups.reduce((acc, group) => {
        acc[group.id] = [];
        return acc;
      }, {})
    );
    setAvailableItems([...groupSortData.items]);
    setGameComplete(false);
    setScore(0);
    setDraggedItem(null);
    setWrongDrop(false);
    setShakeGroup(null);
  };

  // Reset wrong drop message after timeout
  useEffect(() => {
    if (wrongDrop) {
      const timer = setTimeout(() => setWrongDrop(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [wrongDrop]);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Wrong Drop Feedback */}
      {wrongDrop && (
        <div className="animate-bounce bg-gradient-to-r from-red-400 to-pink-500 text-white font-bold rounded-full px-6 py-3 mb-4 text-center">
          🐘 Oops! That doesn&apos;t belong here. Try another group!
        </div>
      )}

      {/* Game Header */}
      <div className="mb-8 text-center">
        <div className="bg-gray-400 backdrop-blur-sm rounded-2xl p-6">
          <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center">
            <span className="text-4xl mr-3">📂</span>
            Sort Items into Groups
          </h2>
          <div className="bg-gradient-to-r from-purple-400 to-pink-500 rounded-full px-6 py-3 inline-block">
            <span className="text-white font-bold text-lg">
              ✅ Sorted: {score} / {groupSortData.items.length}
            </span>
          </div>
        </div>
      </div>

      {/* Available Items */}
      <div className="mb-8">
        <div className="bg-gray-400 backdrop-blur-sm rounded-2xl p-6">
          <h3 className="text-2xl font-bold text-white mb-4 text-center">
            🎯 Items to Sort
          </h3>
          <div className="flex flex-wrap gap-3 justify-center min-h-[100px]">
            {availableItems.length === 0 ? (
              <div className="text-white/50 text-lg flex items-center">
                All items sorted! 🎉
              </div>
            ) : (
              availableItems.map((item) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                  className="bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl px-4 py-3 cursor-move hover:scale-105 transform transition-all duration-300 shadow-lg"
                >
                  <div className="text-white font-bold text-center">
                    <div className="text-2xl mb-1">{item.emoji}</div>
                    <div className="text-sm">{item.name}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Groups */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {groupSortData.groups.map((group) => (
          <div
            key={group.id}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, group.id)}
            className={`bg-gray-500 backdrop-blur-sm rounded-2xl p-6 min-h-[300px] transition-all duration-300 ${
              shakeGroup === group.id
                ? "animate-shake bg-gradient-to-br from-red-400/20 to-pink-500/20"
                : ""
            }`}
          >
            <div className="text-center mb-4">
              <div className="text-3xl mb-2">{group.emoji}</div>
              <h3 className="text-xl font-bold text-white">{group.name}</h3>
              <p className="text-white/70 text-sm mt-1">{group.description}</p>
            </div>

            <div
              className={`border-2 border-dashed rounded-xl p-4 min-h-[180px] ${
                shakeGroup === group.id
                  ? "border-red-400 bg-red-400/10"
                  : groups[group.id].length > 0
                  ? "border-green-400"
                  : "border-white/30"
              }`}
            >
              {groups[group.id].length === 0 ? (
                <div className="text-white/50 text-center h-full flex items-center justify-center">
                  Drop items here
                </div>
              ) : (
                <div className="space-y-2">
                  {groups[group.id].map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleItemClick(item, true, group.id)}
                      className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg px-3 py-2 cursor-pointer hover:scale-105 transform transition-all duration-300 shadow-lg"
                    >
                      <div className="text-white font-bold text-center">
                        <span className="text-lg mr-2">{item.emoji}</span>
                        <span className="text-sm">{item.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Game Complete Modal */}
      {gameComplete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-yellow-300 to-orange-400 rounded-3xl p-8 shadow-2xl text-center max-w-md mx-4">
            <div className="text-8xl mb-4">🎉</div>
            <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
              Perfect Sorting!
            </h2>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-6">
              <p className="text-2xl text-white font-bold mb-2">
                All items sorted correctly!
              </p>
              <p className="text-xl text-white/90">
                🏆 You&apos;re a categorization expert!
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
      <div className="text-center">
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
