// components/games/WheelGame.jsx
import { useState, useRef } from "react";

export default function WheelGame({ items }) {
  const [spinning, setSpinning] = useState(false);
  const [spinCount, setSpinCount] = useState(0);
  const wheelRef = useRef(null);

  const wheelColors = [
    "from-red-400 to-red-600",
    "from-blue-400 to-blue-600",
    "from-green-400 to-green-600",
    "from-yellow-400 to-yellow-600",
    "from-purple-400 to-purple-600",
    "from-pink-400 to-pink-600",
    "from-indigo-400 to-indigo-600",
    "from-orange-400 to-orange-600",
  ];

  const spinWheel = () => {
    if (spinning) return;

    setSpinning(true);
    setSpinCount(spinCount + 1);

    const spinDuration = 4000;
    const rotations = 8 + Math.random() * 4; // 8-12 rotations
    const segmentAngle = 360 / items.length;

    // Generate a new random index for this spin
    const randomIndex = Math.floor(Math.random() * items.length);
    const degrees =
      rotations * 360 + (360 - randomIndex * segmentAngle - segmentAngle / 2);

    // Reset wheel position before spinning again
    wheelRef.current.style.transition = "none";
    wheelRef.current.style.transform = "rotate(0deg)";

    // Force reflow to apply reset
    setTimeout(() => {
      wheelRef.current.style.transition = `transform ${spinDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
      wheelRef.current.style.transform = `rotate(${degrees}deg)`;

      setTimeout(() => {
        setSpinning(false);
      }, spinDuration);
    }, 10);
  };

  const resetGame = () => {
    setSpinCount(0);
    wheelRef.current.style.transition = "none";
    wheelRef.current.style.transform = "rotate(0deg)";
  };

  return (
    <div className="flex flex-col items-center max-w-2xl mx-auto">
      {/* Game Header */}
      <div className="mb-8 text-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
          <h2 className="text-3xl font-bold text-gray-500 mb-4 flex items-center justify-center">
            <span className="text-4xl mr-3">🎡</span>
            Spin the Wheel of Knowledge!
          </h2>
          <div className="bg-gradient-to-r from-blue-400 to-purple-500 rounded-full px-6 py-3 inline-block">
            <span className="text-white font-bold text-lg">
              🎯 Spins: {spinCount}
            </span>
          </div>
        </div>
      </div>

      {/* Wheel Container */}
      <div className="relative mb-8">
        {/* Decorative outer ring */}
        <div className="absolute -inset-4 bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-400 rounded-full animate-pulse opacity-75"></div>

        {/* Main wheel container */}
        <div className="relative w-80 h-80 bg-white rounded-full shadow-2xl p-2">
          <div
            ref={wheelRef}
            className="w-full h-full rounded-full overflow-hidden relative shadow-inner"
            style={{ transform: "rotate(0deg)" }}
          >
            {items.map((item, index) => {
              const segmentAngle = 360 / items.length;
              const rotation = index * segmentAngle;
              const colorIndex = index % wheelColors.length;

              // Calculate the end point for the segment using proper trigonometry
              const angleInRadians = (segmentAngle * Math.PI) / 180;
              const endX = 50 + 50 * Math.sin(angleInRadians);
              const endY = 50 - 50 * Math.cos(angleInRadians);

              return (
                <div
                  key={index}
                  className={`absolute w-full h-full bg-gradient-to-r ${wheelColors[colorIndex]}`}
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    clipPath: `polygon(50% 50%, 50% 0%, ${endX}% ${endY}%)`,
                  }}
                >
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      transform: `rotate(${segmentAngle / 2}deg)`,
                      transformOrigin: "center center",
                    }}
                  >
                    <span
                      className="text-white font-bold text-lg drop-shadow-lg whitespace-nowrap"
                      style={{
                        transform: "translateY(-100px) rotate(-90deg)",
                        transformOrigin: "center center",
                      }}
                    >
                      {item}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Center circle */}
            <div className="absolute top-1/2 left-1/2 w-13 h-13 -ml-8 -mt-8 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full shadow-lg flex items-center justify-center z-20">
              <span className="text-2xl">🎯</span>
            </div>
          </div>

          {/* Pointer */}
          <div
            className="absolute top-0 left-1/2 w-0 h-0 -ml-3 -mt-3 z-30"
            style={{
              borderLeft: "12px solid transparent",
              borderRight: "12px solid transparent",
              borderTop: "24px solid #ef4444",
              filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))",
            }}
          ></div>
        </div>
      </div>

      {/* Spin Button */}
      <button
        onClick={spinWheel}
        disabled={spinning}
        className={`px-8 py-4 rounded-full font-bold text-xl shadow-lg transform transition-all duration-300 cursor-pointer flex items-center space-x-3 ${
          spinning
            ? "bg-gray-400 text-gray-200 cursor-not-allowed"
            : "bg-gradient-to-r from-green-400 to-blue-500 text-white hover:shadow-xl hover:scale-105"
        }`}
      >
        <span className="text-2xl">{spinning ? "⏳" : "🎲"}</span>
        <span>{spinning ? "Spinning..." : "Spin the Wheel!"}</span>
      </button>

      {/* Reset Button */}
      {spinCount > 0 && (
        <div className="mt-6">
          <button
            onClick={resetGame}
            className="px-6 py-3 bg-gradient-to-r from-red-400 to-pink-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer flex items-center space-x-2"
          >
            <span className="text-xl">🔄</span>
            <span>Reset Wheel</span>
          </button>
        </div>
      )}
    </div>
  );
}
