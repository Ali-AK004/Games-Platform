import { useEffect, useState } from "react";

const ARABIC_FONT =
  "'Cairo', 'Traditional Arabic', 'Arabic Typesetting', 'Noto Naskh Arabic', sans-serif";

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function ArabicLettersGame({ arabicLettersData }) {
  const { lonelyLetters, sortLetters, wordBuilderChallenges, connectPairs } =
    arabicLettersData;

  const [phase, setPhase] = useState("welcome");
  const [activityIndex, setActivityIndex] = useState(0);

  const activities = ["sort", "build", "connect"];

  const goToNextActivity = () => {
    if (activityIndex < activities.length - 1) {
      setActivityIndex((i) => i + 1);
    } else {
      setPhase("complete");
    }
  };

  const resetGame = () => {
    setPhase("welcome");
    setActivityIndex(0);
  };

  return (
    <div className="max-w-4xl mx-auto" dir="ltr">
      {phase === "welcome" && (
        <WelcomeScreen
          lonelyLetters={lonelyLetters}
          onStart={() => {
            setPhase("play");
            setActivityIndex(0);
          }}
        />
      )}

      {phase === "play" && (
        <div>
          <ActivityProgress
            current={activityIndex}
            total={activities.length}
            labels={["Sort Letters", "Build Words", "Connect or Gap"]}
          />

          {activityIndex === 0 && (
            <SortActivity
              sortLetters={sortLetters}
              onComplete={goToNextActivity}
            />
          )}
          {activityIndex === 1 && (
            <WordBuilderActivity
              challenges={wordBuilderChallenges}
              onComplete={goToNextActivity}
            />
          )}
          {activityIndex === 2 && (
            <ConnectActivity
              pairs={connectPairs}
              onComplete={goToNextActivity}
            />
          )}
        </div>
      )}

      {phase === "complete" && (
        <CompleteScreen lonelyLetters={lonelyLetters} onPlayAgain={resetGame} />
      )}
    </div>
  );
}

function WelcomeScreen({ lonelyLetters, onStart }) {
  return (
    <div className="text-center flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold text-slate-800 mb-2">
        Lonely Arabic Letters
      </h2>
      <p
        className="text-lg text-slate-500 mb-3"
        dir="rtl"
        style={{ fontFamily: ARABIC_FONT }}
      >
        حروف لا تتصل بما بعدها
      </p>
      <p className="text-gray-500 mb-8 leading-relaxed max-w-lg mx-auto text-sm">
        Drag letters, build words, and fix the chain! Three activities to learn
        which letters connect and which stay lonely.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto w-full">
        <MiniCard icon="📂" title="Sort" desc="Drag letters into baskets" />
        <MiniCard icon="🧩" title="Build" desc="Make words and see gaps" />
        <MiniCard icon="🔗" title="Connect" desc="Choose connect or gap" />
      </div>

      <div
        className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8 inline-block"
        dir="rtl"
      >
        <p className="text-sm font-semibold text-amber-800 mb-3 text-right">
          The 6 lonely letters:
        </p>
        <div className="flex gap-2 justify-center flex-wrap">
          {lonelyLetters.map((l) => (
            <span
              key={l.letter}
              className="text-3xl font-bold text-amber-800 bg-white px-3 py-1 rounded-lg border border-amber-200"
              style={{ fontFamily: ARABIC_FONT }}
            >
              {l.letter}
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={onStart}
        className="px-10 py-3 bg-violet-600 hover:bg-violet-700 text-white font-semibold text-lg rounded-xl transition-colors cursor-pointer"
      >
        Start Learning
      </button>
    </div>
  );
}

function MiniCard({ icon, title, desc }) {
  return (
    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-left">
      <span className="text-2xl mb-2 block">{icon}</span>
      <p className="font-semibold text-slate-800 text-sm">{title}</p>
      <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
    </div>
  );
}

function ActivityProgress({ current, total, labels }) {
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        {labels.map((label, i) => (
          <span
            key={label}
            className={`text-xs sm:text-sm font-medium ${
              i === current
                ? "text-violet-700"
                : i < current
                  ? "text-green-600"
                  : "text-gray-400"
            }`}
          >
            {i < current ? "✓ " : ""}
            {label}
          </span>
        ))}
      </div>
      <div className="w-full bg-gray-100 rounded-full h-1.5">
        <div
          className="bg-violet-500 h-1.5 rounded-full transition-all duration-500"
          style={{ width: `${((current + 1) / total) * 100}%` }}
        />
      </div>
    </div>
  );
}

/* ─── Activity 1: Drag letters into Lonely / Connects baskets ─── */

function SortActivity({ sortLetters, onComplete }) {
  const [pool, setPool] = useState([]);
  const [lonelyBin, setLonelyBin] = useState([]);
  const [connectsBin, setConnectsBin] = useState([]);
  const [dragged, setDragged] = useState(null);
  const [selected, setSelected] = useState(null);
  const [wrongBin, setWrongBin] = useState(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setPool(shuffleArray(sortLetters));
  }, [sortLetters]);

  const tryDrop = (item, target) => {
    const correct =
      (target === "lonely" && item.lonely) ||
      (target === "connects" && !item.lonely);

    if (correct) {
      const newPool = pool.filter((x) => x.id !== item.id);
      if (target === "lonely") setLonelyBin((b) => [...b, item]);
      else setConnectsBin((b) => [...b, item]);
      setPool(newPool);
      setSelected(null);
      setDragged(null);

      if (newPool.length === 0) {
        setDone(true);
      }
    } else {
      setWrongBin(target);
      setTimeout(() => setWrongBin(null), 2000);
    }
  };

  const handleDragStart = (e, item) => {
    setDragged(item);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDrop = (e, target) => {
    e.preventDefault();
    if (dragged) tryDrop(dragged, target);
  };

  const handleTapSelect = (item) => {
    if (selected?.id === item.id) setSelected(null);
    else setSelected(item);
  };

  const handleBinTap = (target) => {
    if (selected) tryDrop(selected, target);
  };

  return (
    <div>
      <ActivityHeader
        title="Sort the Letters"
        subtitle="Drag each letter to the right basket — or tap a letter, then tap a basket."
      />

      {wrongBin && (
        <div className="bg-red-50 border border-red-200 text-red-700 font-medium rounded-xl p-3 mb-4 text-center text-sm">
          Not quite — try the other basket.
        </div>
      )}

      {selected && !wrongBin && (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 font-medium rounded-xl p-3 mb-4 text-center text-sm">
          Letter selected — now tap a basket below.
        </div>
      )}

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-6">
        <p className="text-center font-medium text-slate-600 mb-3 text-sm">
          Letters to sort ({pool.length} remaining)
        </p>
        <div className="flex flex-wrap gap-3 justify-center min-h-[80px]">
          {pool.map((item) => (
            <DraggableLetter
              key={item.id}
              item={item}
              selected={selected?.id === item.id}
              onDragStart={handleDragStart}
              onTap={() => handleTapSelect(item)}
            />
          ))}
          {pool.length === 0 && (
            <span className="text-green-700 font-semibold text-base self-center">
              All sorted!
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <DropBin
          id="connects"
          label="Connects"
          desc="Holds the next letter's hand"
          color="blue"
          items={connectsBin}
          shaking={wrongBin === "connects"}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, "connects")}
          onTap={() => handleBinTap("connects")}
        />
        <DropBin
          id="lonely"
          label="Lonely"
          desc="No connection forward"
          color="purple"
          items={lonelyBin}
          shaking={wrongBin === "lonely"}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, "lonely")}
          onTap={() => handleBinTap("lonely")}
        />
      </div>

      {done && (
        <div className="mt-6 text-center">
          <p className="text-green-700 font-semibold text-base mb-4">
            All letters sorted correctly!
          </p>
          <NextButton onClick={onComplete} label="Next activity" />
        </div>
      )}
    </div>
  );
}

function DraggableLetter({ item, selected, onDragStart, onTap }) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, item)}
      onClick={onTap}
      className={`cursor-grab active:cursor-grabbing select-none rounded-xl px-4 py-3 transition-all duration-150 hover:scale-105 ${
        selected
          ? "bg-amber-100 ring-2 ring-amber-400 scale-105"
          : "bg-white border border-slate-200 hover:border-violet-300 hover:shadow-sm"
      }`}
    >
      <div className="text-center">
        <div
          className="text-4xl font-bold text-slate-800"
          dir="rtl"
          style={{ fontFamily: ARABIC_FONT }}
        >
          {item.letter}
        </div>
      </div>
    </div>
  );
}

function DropBin({
  label,
  desc,
  color,
  items,
  shaking,
  onDragOver,
  onDrop,
  onTap,
}) {
  const headerBg =
    color === "blue"
      ? "bg-blue-600"
      : "bg-violet-600";
  const border = color === "blue" ? "border-blue-200" : "border-violet-200";
  const dotColor = color === "blue" ? "bg-blue-500" : "bg-violet-500";

  return (
    <div
      onDragOver={onDragOver}
      onDrop={onDrop}
      onClick={onTap}
      className={`rounded-2xl overflow-hidden cursor-pointer border ${border} transition-all ${
        shaking ? "ring-2 ring-red-400" : ""
      }`}
    >
      <div className={`${headerBg} px-4 py-3 text-center`}>
        <p className="text-white font-semibold text-base">{label}</p>
        <p className="text-white/70 text-xs mt-0.5">{desc}</p>
      </div>
      <div
        className={`border-t border-dashed ${border} p-3 min-h-[120px] bg-white/60 flex flex-wrap gap-2 justify-center content-start`}
      >
        {items.length === 0 ? (
          <p className="text-gray-400 text-sm self-center w-full text-center mt-4">Drop here</p>
        ) : (
          items.map((item) => (
            <span
              key={item.id}
              className="text-3xl font-bold text-slate-800 bg-white px-2 py-1 rounded-lg border border-slate-200"
              style={{ fontFamily: ARABIC_FONT }}
              dir="rtl"
            >
              {item.letter}
            </span>
          ))
        )}
      </div>
    </div>
  );
}

/* ─── Activity 2: Build words — see connections form live ─── */

function WordBuilderActivity({ challenges, onComplete }) {
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [pool, setPool] = useState([]);
  const [slots, setSlots] = useState([]);
  const [dragged, setDragged] = useState(null);
  const [selected, setSelected] = useState(null);
  const [celebrate, setCelebrate] = useState(false);

  const challenge = challenges[challengeIndex];

  useEffect(() => {
    const shuffled = shuffleArray(
      challenge.letters.map((l, i) => ({ ...l, slotIndex: i, uid: `${challenge.id}-${i}` }))
    );
    setPool(shuffled);
    setSlots(Array(challenge.letters.length).fill(null));
    setCelebrate(false);
    setSelected(null);
  }, [challengeIndex, challenge]);

  const placeLetter = (item, slotIdx) => {
    if (slots[slotIdx]) return;
    if (item.slotIndex !== slotIdx) return;

    const newSlots = [...slots];
    newSlots[slotIdx] = item;
    setSlots(newSlots);
    setPool((p) => p.filter((x) => x.uid !== item.uid));
    setSelected(null);
    setDragged(null);

    if (newSlots.every(Boolean)) {
      setCelebrate(true);
    }
  };

  const handleSlotTap = (slotIdx) => {
    if (selected) placeLetter(selected, slotIdx);
  };

  const handleNext = () => {
    if (challengeIndex < challenges.length - 1) {
      setChallengeIndex((i) => i + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div>
      <ActivityHeader
        title="Build the Word"
        subtitle={`Word ${challengeIndex + 1} of ${challenges.length} — drag letters into the boxes in order (right to left).`}
      />

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-4 text-center">
        <p className="text-lg font-semibold text-slate-800 mt-1">
          {challenge.meaning} — {challenge.emoji}
        </p>
        <p className="text-sm text-slate-500 mt-1">{challenge.hint}</p>
      </div>

      {selected && (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 font-medium rounded-xl p-3 mb-4 text-center text-sm">
          Now tap the correct empty box. (Box {selected.slotIndex + 1})
        </div>
      )}

      <div dir="rtl" className="mb-6">
        <ConnectionRail slots={slots} celebrate={celebrate} />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-4">
        <p className="text-center font-medium text-slate-600 mb-3 text-sm">
          Letter pool — drag or tap
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          {pool.map((item) => (
            <div
              key={item.uid}
              draggable
              onDragStart={(e) => {
                setDragged(item);
                e.dataTransfer.effectAllowed = "move";
              }}
              onClick={() =>
                setSelected(selected?.uid === item.uid ? null : item)
              }
              className={`cursor-grab rounded-xl px-4 py-2 transition-all hover:scale-105 ${
                selected?.uid === item.uid
                  ? "bg-amber-100 ring-2 ring-amber-400"
                  : "bg-white border border-slate-200 hover:border-violet-300"
              }`}
            >
              <span
                className="text-4xl font-bold text-slate-800"
                style={{ fontFamily: ARABIC_FONT }}
              >
                {item.char}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div dir="rtl" className="flex gap-2 justify-center flex-wrap">
        {slots.map((filled, i) => (
          <div
            key={i}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (dragged) placeLetter(dragged, i);
            }}
            onClick={() => handleSlotTap(i)}
            className={`w-16 h-20 sm:w-20 sm:h-24 rounded-xl border-2 border-dashed flex items-center justify-center transition-all cursor-pointer ${
              filled
                ? "border-green-400 bg-green-50"
                : selected
                  ? "border-blue-400 bg-blue-50"
                  : "border-slate-200 bg-white hover:border-violet-400"
            }`}
          >
            {filled ? (
              <span
                className="text-4xl font-bold text-slate-800"
                style={{ fontFamily: ARABIC_FONT }}
              >
                {filled.char}
              </span>
            ) : (
              <span className="text-slate-300 text-lg font-medium">{i + 1}</span>
            )}
          </div>
        ))}
      </div>

      {celebrate && (
        <div className="mt-6 text-center">
          <p className="text-green-700 font-semibold text-base mb-1">
            Notice the connections and gaps!
          </p>
          <p
            className="text-4xl font-bold text-slate-800 mt-2 mb-4"
            dir="rtl"
            style={{ fontFamily: ARABIC_FONT }}
          >
            {challenge.word}
          </p>
          <NextButton
            onClick={handleNext}
            label={challengeIndex < challenges.length - 1 ? "Next word" : "Next activity"}
          />
        </div>
      )}
    </div>
  );
}

function ConnectionRail({ slots, celebrate }) {
  const filled = slots.filter(Boolean);

  if (filled.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 border border-dashed border-slate-200 text-center text-slate-400 text-sm">
        Your word will appear here showing connections and gaps.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-4 border border-slate-200 flex items-center justify-center flex-wrap gap-0">
      {slots.map((slot, i) => {
        if (!slot) return null;
        const prev = i > 0 ? slots[i - 1] : null;
        const showConnector = prev !== null;

        return (
          <div key={slot.uid} className="flex items-center">
            {showConnector && (
              <ConnectorBetween lonely={prev.lonely} celebrate={celebrate} />
            )}
            <div
              className={`text-5xl font-bold px-1 transition-all duration-500 ${
                celebrate ? "scale-110" : ""
              } ${slot.lonely ? "text-violet-700" : "text-slate-800"}`}
              style={{ fontFamily: ARABIC_FONT }}
            >
              {slot.char}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ConnectorBetween({ lonely, celebrate }) {
  if (lonely) {
    return (
      <div
        className={`flex flex-col items-center mx-1 transition-all ${celebrate ? "animate-bounce" : ""}`}
      >
        <span className="text-red-400 text-base font-bold">✂</span>
        <div className="w-3 h-7 border-l-2 border-dashed border-red-300" />
        <span className="text-xs text-red-400 font-medium">gap</span>
      </div>
    );
  }

  return (
    <div className={`mx-1 transition-all ${celebrate ? "animate-pulse" : ""}`}>
      <span className="text-slate-400 text-xl">⌒</span>
    </div>
  );
}

/* ─── Activity 3: Drag hand or gap between two letters ─── */

function ConnectActivity({ pairs, onComplete }) {
  const [rounds] = useState(() => shuffleArray(pairs));
  const [roundIndex, setRoundIndex] = useState(0);
  const [placed, setPlaced] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [draggedTool, setDraggedTool] = useState(null);

  const round = rounds[roundIndex];

  const tryPlace = (tool) => {
    if (placed) return;

    const wantsConnect = tool === "hand";
    const correct = wantsConnect === round.connects;

    setPlaced(tool);
    setFeedback({
      correct,
      message: correct
        ? round.connects
          ? "Correct — these letters connect."
          : "Correct — this letter stays lonely."
        : round.connects
          ? "Not quite — these letters do connect."
          : "Not quite — this letter doesn't connect forward.",
    });

    if (correct) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (roundIndex < rounds.length - 1) {
      setRoundIndex((i) => i + 1);
      setPlaced(null);
      setFeedback(null);
      setDraggedTool(null);
    } else {
      onComplete();
    }
  };

  return (
    <div>
      <ActivityHeader
        title="Connect or Gap?"
        subtitle="Drag a connector or gap token into the middle — or tap it, then tap the middle."
      />

      <div className="text-center mb-5">
        <span className="bg-violet-100 text-violet-800 font-medium px-4 py-1.5 rounded-full text-sm">
          Round {roundIndex + 1} of {rounds.length} · {score} correct
        </span>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-4">
        <p className="text-center text-slate-500 text-sm mb-4">
          Do these two letters connect?
          <span className="block text-violet-600 font-medium mt-1">
            as in: {round.wordHint}
          </span>
        </p>

        <div className="flex items-center justify-center gap-3" dir="rtl">
          <LetterBox letter={round.first} />
          <DropZone
            placed={placed}
            feedback={feedback}
            onDropTool={tryPlace}
            draggedTool={draggedTool}
          />
          <LetterBox letter={round.second} />
        </div>
      </div>

      {!placed && (
        <div className="flex justify-center gap-4 mb-4">
          <ToolChip
            tool="hand"
            label="They connect"
            icon="🔗"
            color="blue"
            selected={draggedTool === "hand"}
            onDragStart={() => setDraggedTool("hand")}
            onTap={() => {
              if (draggedTool === "hand") setDraggedTool(null);
              else setDraggedTool("hand");
            }}
          />
          <ToolChip
            tool="gap"
            label="Lonely gap"
            icon="✂"
            color="red"
            selected={draggedTool === "gap"}
            onDragStart={() => setDraggedTool("gap")}
            onTap={() => {
              if (draggedTool === "gap") setDraggedTool(null);
              else setDraggedTool("gap");
            }}
          />
        </div>
      )}

      {draggedTool && !placed && (
        <p className="text-center text-blue-600 font-medium text-sm mb-4">
          Now drop or tap the middle box.
        </p>
      )}

      {feedback && (
        <div
          className={`rounded-xl p-4 text-center font-medium text-sm mb-5 ${
            feedback.correct
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-orange-50 text-orange-800 border border-orange-200"
          }`}
        >
          {feedback.message}
        </div>
      )}

      {placed && (
        <div className="text-center">
          <NextButton
            onClick={handleNext}
            label={roundIndex < rounds.length - 1 ? "Next round" : "Finish"}
          />
        </div>
      )}
    </div>
  );
}

function LetterBox({ letter }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
      <span
        className="text-5xl sm:text-6xl font-bold text-slate-800"
        style={{ fontFamily: ARABIC_FONT }}
      >
        {letter}
      </span>
    </div>
  );
}

function DropZone({ placed, feedback, onDropTool, draggedTool }) {
  const handleActivate = () => {
    if (draggedTool) onDropTool(draggedTool);
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        handleActivate();
      }}
      onClick={handleActivate}
      className={`w-20 h-24 sm:w-24 sm:h-28 rounded-xl border-2 border-dashed flex flex-col items-center justify-center transition-all cursor-pointer ${
        placed
          ? feedback?.correct
            ? "border-green-400 bg-green-50"
            : "border-orange-400 bg-orange-50"
          : draggedTool
            ? "border-blue-400 bg-blue-50 scale-105"
            : "border-slate-200 bg-white hover:border-violet-300"
      }`}
    >
      {placed ? (
        <span className="text-3xl">{placed === "hand" ? "🔗" : "✂"}</span>
      ) : (
        <>
          <span className="text-2xl text-slate-300">?</span>
          <span className="text-xs text-slate-400 mt-1">drop here</span>
        </>
      )}
    </div>
  );
}

function ToolChip({ icon, label, color, selected, onDragStart, onTap }) {
  const ringColor = color === "blue" ? "ring-blue-400" : "ring-red-400";
  const borderColor = color === "blue" ? "border-blue-200" : "border-red-200";
  const bgHover = color === "blue" ? "hover:bg-blue-50" : "hover:bg-red-50";

  return (
    <div
      draggable
      onDragStart={(e) => {
        onDragStart();
        e.dataTransfer.effectAllowed = "move";
      }}
      onClick={onTap}
      className={`cursor-grab bg-white border ${borderColor} ${bgHover} rounded-xl px-6 py-3 text-center transition-all ${
        selected ? `ring-2 ${ringColor} scale-105` : ""
      }`}
    >
      <span className="text-2xl block mb-1">{icon}</span>
      <span className="font-medium text-slate-700 text-sm">{label}</span>
    </div>
  );
}

/* ─── Shared UI ─── */

function ActivityHeader({ title, subtitle }) {
  return (
    <div className="bg-violet-600 rounded-2xl p-5 mb-6 text-white">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-violet-200 text-sm mt-1">{subtitle}</p>
    </div>
  );
}

function NextButton({ onClick, label }) {
  return (
    <button
      onClick={onClick}
      className="px-8 py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl transition-colors cursor-pointer"
    >
      {label} →
    </button>
  );
}

function CompleteScreen({ lonelyLetters, onPlayAgain }) {
  return (
    <div className="text-center bg-white rounded-2xl p-8 border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-800 mb-3">
        All 3 activities complete!
      </h2>
      <p className="text-slate-500 mb-6 text-sm">
        You sorted, built words, and identified connections.
      </p>

      <div className="bg-amber-50 rounded-xl p-4 mb-6 border border-amber-200" dir="rtl">
        <p className="text-sm font-semibold text-amber-800 mb-3 text-right">
          Remember — these 6 letters stay lonely:
        </p>
        <div className="flex justify-center gap-2 flex-wrap">
          {lonelyLetters.map((l) => (
            <span
              key={l.letter}
              className="text-3xl font-bold text-amber-800 bg-white px-3 py-1 rounded-lg border border-amber-200"
              style={{ fontFamily: ARABIC_FONT }}
            >
              {l.letter}
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={onPlayAgain}
        className="px-8 py-3 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl transition-colors cursor-pointer"
      >
        Play again
      </button>
    </div>
  );
}