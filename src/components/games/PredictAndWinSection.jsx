import React, { useState, useEffect } from "react";
import {
  Trophy,
  HelpCircle,
  Send,
  CheckCircle2,
  Gift,
  Award,
  GlassWater,
  HelpCircle as QuizIcon,
  Loader2,
  Tv,
  MapPin,
} from "lucide-react";
import { Client, Databases, Query } from "appwrite";

/* ---------------- APPWRITE CONFIG ---------------- */
const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1";
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const matchesCollectionId = import.meta.env.VITE_APPWRITE_MATCHES_COLLECTION_ID;

const client = new Client().setEndpoint(endpoint).setProject(projectId);
const databases = new Databases(client);

const WHATSAPP_MSISDN = "2347066064379";

const PRIZE_CATEGORIES = [
  {
    id: "grand",
    title: "Grand Cash Prize",
    description:
      "Predict exact score + correctly answer trivia to enter the ₦10,000 weekly prize pool.",
    icon: <Trophy className="w-5 h-5 text-amber-400" />,
    tag: "Top Tier",
  },
  {
    id: "drinks",
    title: "Matchday Refreshment",
    description:
      "Free bucket of ice-cold drinks or pepper soup bowl redeemable live at the lounge.",
    icon: <GlassWater className="w-5 h-5 text-blue-400" />,
    tag: "Popular",
  },
  {
    id: "vip",
    title: "VIP Lounge Pass",
    description:
      "Reserved seating with best view of big screens + complimentary matchday snacks.",
    icon: <Award className="w-5 h-5 text-purple-400" />,
    tag: "Exclusive",
  },
];

const TRIVIA_BY_PRIZE = {
  grand: [
    {
      id: "g1",
      category: "General Knowledge",
      question: "Which country has won the highest number of FIFA World Cup titles?",
      options: ["Germany", "Brazil", "Argentina", "Italy"],
      answer: "Brazil",
    },
    {
      id: "g2",
      category: "African History & Geography",
      question: "What is the largest continent in the world by land area?",
      options: ["Africa", "North America", "Asia", "Europe"],
      answer: "Asia",
    },
  ],
  drinks: [
    {
      id: "d1",
      category: "Pop Culture & Music",
      question: "Which Afrobeats artist released the global hit album 'African Giant'?",
      options: ["Wizkid", "Davido", "Burna Boy", "Asake"],
      answer: "Burna Boy",
    },
    {
      id: "d2",
      category: "Fun General Knowledge",
      question: "How many colors make up a standard rainbow?",
      options: ["5", "6", "7", "8"],
      answer: "7",
    },
  ],
  vip: [
    {
      id: "v1",
      category: "Nigerian Trivia",
      question: "What is the official capital city of Nigeria?",
      options: ["Lagos", "Abuja", "Port Harcourt", "Kano"],
      answer: "Abuja",
    },
    {
      id: "v2",
      category: "General Sports",
      question: "How long is a standard professional football match (excluding extra time)?",
      options: ["80 mins", "90 mins", "100 mins", "60 mins"],
      answer: "90 mins",
    },
  ],
};

export default function PredictAndWinSection() {
  const [matches, setMatches] = useState([]);
  const [selectedMatchId, setSelectedMatchId] = useState("");
  const [loading, setLoading] = useState(true);

  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [selectedPrize, setSelectedPrize] = useState(PRIZE_CATEGORIES[0].id);

  const [activeQuiz, setActiveQuiz] = useState(TRIVIA_BY_PRIZE.grand[0]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [quizError, setQuizError] = useState(false);

  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [attendingInPerson, setAttendingInPerson] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const selectQuestionForPrize = (prizeId) => {
    const pool = TRIVIA_BY_PRIZE[prizeId] || TRIVIA_BY_PRIZE.grand;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    setActiveQuiz(pick);
    setSelectedAnswer("");
    setQuizError(false);
  };

  const handlePrizeChange = (prizeId) => {
    setSelectedPrize(prizeId);
    selectQuestionForPrize(prizeId);
  };

  useEffect(() => {
    async function fetchMatches() {
      try {
        setLoading(true);
        if (!databaseId || !matchesCollectionId) return;

        const res = await databases.listDocuments(databaseId, matchesCollectionId, [
          Query.orderDesc("$createdAt"),
          Query.limit(10),
        ]);

        if (res.documents?.length > 0) {
          setMatches(res.documents);
          setSelectedMatchId(res.documents[0].$id);
        }
      } catch (err) {
        console.error("Failed to load match schedule:", err);
      } finally {
        setLoading(false);
      }
    }

    selectQuestionForPrize(PRIZE_CATEGORIES[0].id);
    fetchMatches();
  }, []);

  const activeMatch = matches.find((m) => m.$id === selectedMatchId) || matches[0];

  const handleSubmitPrediction = (e) => {
    e.preventDefault();
    if (!activeMatch) return alert("No active match selected.");
    if (!selectedAnswer) return alert("Please answer the qualification quiz question.");
    if (selectedAnswer !== activeQuiz.answer) {
      setQuizError(true);
      return;
    }
    setQuizError(false);

    const prizeObj = PRIZE_CATEGORIES.find((p) => p.id === selectedPrize);
    const message = `⚽ FRIENDS' LOUNGE PREDICT AND WIN ⚽

Match: ${activeMatch.homeTeam} vs ${activeMatch.awayTeam}
Competition: ${activeMatch.competition || "Live Broadcast"}
Schedule: ${activeMatch.date} (${activeMatch.time})

MY PREDICTION: ${activeMatch.homeTeam} ${homeScore} - ${awayScore} ${activeMatch.awayTeam}
TARGET REWARD: ${prizeObj ? prizeObj.title : "Standard"}
QUIZ STATUS: PASSED (${activeQuiz.question} -> ${selectedAnswer})
ATTENDANCE: ${
      attendingInPerson ? "Watching Live at Friends Lounge 🍻" : "Watching Remotely 📱"
    }

PATRON DETAILS:
Name: ${userName}
Phone: ${userPhone}

Logged live from Friends Lounge Web App!`;

    window.open(
      `https://wa.me/${WHATSAPP_MSISDN}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
    setSubmitted(true);
  };

  if (loading) {
    return (
      <div className="my-10 bg-neutral-900 border border-neutral-800 rounded-2xl p-10 text-center text-neutral-400 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-red-500" />
        <p className="text-xs">Loading match schedule for Predict and Win...</p>
      </div>
    );
  }

  return (
    <section className="my-8 sm:my-10 bg-gradient-to-br from-neutral-900 via-black to-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-8 shadow-2xl relative overflow-hidden text-left">
      <div className="absolute top-0 right-0 w-72 h-72 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto space-y-6 sm:space-y-8">
        {/* Heading */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-bold tracking-wider uppercase">
            <Trophy className="w-4 h-4 text-amber-400" />
            Matchday Challenge
          </div>
          <h2 className="text-2xl sm:text-4xl font-semibold text-white tracking-tight uppercase">
            Predict and Win
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto">
            Answer simple quiz to confirm entry
          </p>
        </div>

        {/* Step 1: Match selection */}
        {matches.length > 0 ? (
          <div className="space-y-3">
            <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
              <Tv className="w-4 h-4 text-red-500" /> Step 1: Select Televised Match Fixture
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {matches.map((m) => {
                const isSelected = selectedMatchId === m.$id;
                return (
                  <button
                    type="button"
                    key={m.$id}
                    onClick={() => {
                      setSelectedMatchId(m.$id);
                      setHomeScore(0);
                      setAwayScore(0);
                    }}
                    className={`p-3.5 rounded-xl border text-left transition flex items-center justify-between ${
                      isSelected
                        ? "bg-red-950/50 border-red-500/80 text-white shadow-lg shadow-red-900/20"
                        : "bg-neutral-900/80 border-neutral-800 text-neutral-400 hover:border-neutral-700"
                    }`}
                  >
                    <div>
                      <span className="text-[10px] uppercase font-bold text-red-400 bg-red-950/40 px-2 py-0.5 rounded">
                        {m.competition || "Live Broadcast"}
                      </span>
                      <p className="text-xs font-bold text-white mt-1">
                        {m.homeTeam} vs {m.awayTeam}
                      </p>
                      <p className="text-[11px] text-neutral-400 mt-0.5">
                        {m.date} • {m.time}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="p-6 rounded-xl bg-neutral-900/50 border border-neutral-800 text-center text-neutral-400 text-sm sm:text-base">
            No live televised matches yet
          </div>
        )}

        {/* Step 2: Prize tier */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
            <Gift className="w-4 h-4 text-amber-400" /> Step 2: Choose Target Reward
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PRIZE_CATEGORIES.map((prize) => {
              const isSelected = selectedPrize === prize.id;
              return (
                <button
                  type="button"
                  key={prize.id}
                  onClick={() => handlePrizeChange(prize.id)}
                  className={`p-4 rounded-xl border text-left transition relative flex flex-col justify-between ${
                    isSelected
                      ? "bg-red-950/40 border-red-500/80 shadow-lg shadow-red-900/20"
                      : "bg-neutral-900/80 border-neutral-800 hover:border-neutral-700"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-2 rounded-lg bg-neutral-800/80">{prize.icon}</div>
                      <span className="text-[10px] uppercase font-bold text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded">
                        {prize.tag}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1">{prize.title}</h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {prize.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Scoreline */}
        {activeMatch && (
          <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-4 sm:p-5 shadow-lg space-y-4">
            <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block text-center">
              Step 3: Enter Your Scoreline Prediction
            </label>

            <div className="flex items-center justify-center gap-2 sm:gap-8">
              <span className="text-xs sm:text-base font-bold text-white max-w-[90px] sm:max-w-[120px] text-right truncate">
                {activeMatch.homeTeam}
              </span>

              <div className="flex items-center gap-1.5 sm:gap-2 bg-black/60 px-2.5 sm:px-4 py-2 rounded-lg border border-neutral-800">
                <ScoreStepper value={homeScore} onChange={setHomeScore} />
                <span className="text-neutral-500 mx-0.5 font-bold">:</span>
                <ScoreStepper value={awayScore} onChange={setAwayScore} />
              </div>

              <span className="text-xs sm:text-base font-bold text-white max-w-[90px] sm:max-w-[120px] text-left truncate">
                {activeMatch.awayTeam}
              </span>
            </div>
          </div>
        )}

        {/* Step 4: Quiz — cleaner mobile spacing */}
        <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-xl p-4 sm:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
              <QuizIcon className="w-4 h-4 text-red-400" /> Step 4: Qualification Quiz
            </label>
            <span className="self-start sm:self-auto text-[10px] uppercase font-semibold text-amber-400 bg-amber-950/40 border border-amber-800/40 px-2 py-0.5 rounded">
              {activeQuiz.category}
            </span>
          </div>

          <p className="text-sm text-neutral-200 font-medium leading-relaxed">
            {activeQuiz.question}
          </p>

          <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
            {activeQuiz.options.map((option) => (
              <button
                type="button"
                key={option}
                onClick={() => {
                  setSelectedAnswer(option);
                  setQuizError(false);
                }}
                className={`px-3 py-3 rounded-lg text-xs sm:text-sm font-semibold text-center border transition ${
                  selectedAnswer === option
                    ? "bg-red-600 text-white border-red-500"
                    : "bg-neutral-800/70 text-neutral-300 border-neutral-700 hover:bg-neutral-700"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {quizError && (
            <p className="text-xs text-red-400 font-semibold">
              ❌ Incorrect answer! Try selecting the right option to unlock your entry.
            </p>
          )}
        </div>

        {/* Step 5: Foot traffic + submit */}
        {submitted ? (
          <div className="bg-green-500/10 border border-green-500/20 p-5 rounded-xl flex items-center justify-center gap-3 text-green-400 text-sm font-semibold text-center">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>Prediction logged! Check WhatsApp to verify with lounge staff.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmitPrediction} className="space-y-4">
            {/* Watching-from block — question on its own line, buttons below */}
            <div className="rounded-xl bg-neutral-900 border border-neutral-800 p-4 space-y-3">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-neutral-300 leading-snug">
                  Are you watching live at Friends Lounge?
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setAttendingInPerson(true)}
                  className={`py-2.5 rounded-lg text-[11px] sm:text-xs font-bold transition text-center ${
                    attendingInPerson
                      ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                      : "bg-neutral-800 text-neutral-400 hover:text-white"
                  }`}
                >
                  Yes, At Lounge 🍻
                </button>
                <button
                  type="button"
                  onClick={() => setAttendingInPerson(false)}
                  className={`py-2.5 rounded-lg text-[11px] sm:text-xs font-bold transition text-center ${
                    !attendingInPerson
                      ? "bg-neutral-700 text-white"
                      : "bg-neutral-800 text-neutral-400 hover:text-white"
                  }`}
                >
                  Remotely 📱
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Your Full Name *"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm outline-none focus:border-red-500 transition-colors"
                required
              />
              <input
                type="tel"
                placeholder="Phone Number *"
                value={userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
                className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm outline-none focus:border-red-500 transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              disabled={!activeMatch}
              className="w-full py-3.5 bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white text-sm font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-red-600/20"
            >
              <Send className="w-4 h-4" /> Submit Prediction on WhatsApp
            </button>
          </form>
        )}

        <p className="text-[11px] text-neutral-500 text-center flex items-center justify-center gap-1.5 leading-relaxed px-2">
          <HelpCircle className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
          Predictions close at kick-off. Physical prize redemptions are verified at Friends
          Lounge on matchday.
        </p>
      </div>
    </section>
  );
}

/* Small helper for the score +/- rows to keep JSX tidy */
function ScoreStepper({ value, onChange }) {
  return (
    <>
      <button
        type="button"
        onClick={() => onChange(Math.max(0, value - 1))}
        className="w-7 h-7 rounded bg-neutral-800 text-white font-bold hover:bg-neutral-700 flex items-center justify-center"
      >
        -
      </button>
      <span className="text-xl font-extrabold text-amber-400 w-6 text-center tabular-nums">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className="w-7 h-7 rounded bg-neutral-800 text-white font-bold hover:bg-neutral-700 flex items-center justify-center"
      >
        +
      </button>
    </>
  );
}