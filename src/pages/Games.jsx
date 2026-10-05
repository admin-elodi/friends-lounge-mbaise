import React, { useState, useEffect } from 'react';
import { Client, Databases, ID, Query } from 'appwrite';

import TableBookingModal from '@/features/TableBookingModal';
import BookEvent from '@/features/BookEvent';
import FoodOrderModal from '@/features/food-order/FoodOrderModal';

import MatchHeaderBanner from '@/components/games/MatchHeaderBanner';
import LiveStreamViewer from '@/components/games/LiveStreamViewer';
import PredictAndWinSection from '@/components/games/PredictAndWinSection';
import MatchScheduleGrid from '@/components/games/MatchScheduleGrid';
import MatchManagerModal from '@/components/games/MatchManagerModal';

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID || '');

const databases = new Databases(client);

// Environment variable checks with fallbacks for alternative naming conventions
const DATABASE_ID =
  import.meta.env.VITE_APPWRITE_DATABASE_ID || '';

const MATCHES_COLLECTION =
  import.meta.env.VITE_APPWRITE_MATCHES_COLLECTION_ID ||
  import.meta.env.VITE_APPWRITE_MATCHES_COLLECTION ||
  import.meta.env.VITE_APPWRITE_GAMES_COLLECTION_ID ||
  '';

export default function Games({
  cart,
  addToCart,
  updateQuantity,
  getTotal,
  customerInfo,
  setCustomerInfo,
  handlePayment,
  isPaying,
  paymentSuccess,
  deliveryFee,
  openFood,
  closeFood,
  foodOpen
}) {
  const [tableOpen, setTableOpen] = useState(false);
  const [bookEventOpen, setBookEventOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [prizesModalOpen, setPrizesModalOpen] = useState(false);
  const [selectedPrizeCategory, setSelectedPrizeCategory] = useState('');

  const [matches, setMatches] = useState([]);
  const [loadingMatches, setLoadingMatches] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [newMatch, setNewMatch] = useState({
    homeTeam: '',
    awayTeam: '',
    competition: '',
    date: '',
    time: '',
    announcement: ''
  });

  const [isDateTimePickerOpen, setIsDateTimePickerOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [selectedTimePill, setSelectedTimePill] = useState('18:00');

  const [predictionData, setPredictionData] = useState({
    homeScore: '',
    awayScore: '',
    userName: '',
    userPhone: '',
    academicStatus: 'Student',
    quizAnswer: ''
  });
  const [isSubmittingPrediction, setIsSubmittingPrediction] = useState(false);

  const educationalQuestions = [
    {
      question: "What primary software engine drives the real-time graphics rendered on this portal?",
      options: ["Three.js / React Three Fiber", "Standard HTML Canvas", "Framer Motion 3D", "WebGL Native Raw"]
    }
  ];

  const fetchMatches = async () => {
    if (!DATABASE_ID || !MATCHES_COLLECTION) {
      console.warn("Missing Appwrite Database or Collection ID.");
      return;
    }
    try {
      setLoadingMatches(true);
      const response = await databases.listDocuments(
        DATABASE_ID,
        MATCHES_COLLECTION,
        [Query.limit(4), Query.orderDesc('$createdAt')]
      );
      setMatches(response.documents);
    } catch (err) {
      console.error("Error fetching matches:", err);
    } finally {
      setLoadingMatches(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  const handleOpenPrizeModal = (category) => {
    setSelectedPrizeCategory(category);
    setPrizesModalOpen(true);
  };

  const handleCreateMatch = async (e) => {
    e.preventDefault();

    if (!DATABASE_ID || !MATCHES_COLLECTION) {
      setErrorMsg("Missing Appwrite Collection ID. Please check your .env file.");
      return;
    }

    if (matches.length >= 4) {
      setErrorMsg("Maximum limit of 4 active matches reached. Remove a match to add a new one.");
      return;
    }

    try {
      setIsSaving(true);
      setErrorMsg('');
      await databases.createDocument(
        DATABASE_ID,
        MATCHES_COLLECTION,
        ID.unique(),
        {
          homeTeam: newMatch.homeTeam,
          awayTeam: newMatch.awayTeam,
          competition: newMatch.competition,
          date: newMatch.date || 'Today',
          time: newMatch.time || '20:00 WAT',
          status: 'Scheduled',
          announcement: newMatch.announcement
        }
      );
      setNewMatch({ homeTeam: '', awayTeam: '', competition: '', date: '', time: '', announcement: '' });
      fetchMatches();
    } catch (err) {
      console.error("Create match error:", err);
      setErrorMsg("Failed to post match. Check Appwrite connection parameters.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteMatch = async (id) => {
    if (!DATABASE_ID || !MATCHES_COLLECTION) return;
    try {
      await databases.deleteDocument(DATABASE_ID, MATCHES_COLLECTION, id);
      fetchMatches();
    } catch (err) {
      setErrorMsg("Failed to delete match document.");
    }
  };

  const handlePredictionSubmit = (e) => {
    e.preventDefault();
    setIsSubmittingPrediction(true);
    setTimeout(() => {
      setIsSubmittingPrediction(false);
      alert("Prediction submitted successfully! Good luck!");
    }, 1200);
  };

  const daysInCurrentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();

  const formatSelectedDate = (day, dateObj) => {
    const temp = new Date(dateObj.getFullYear(), dateObj.getMonth(), day);
    return temp.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const handleApplyDateTime = () => {
    const formattedDate = formatSelectedDate(selectedDay, currentMonth);
    setNewMatch((prev) => ({
      ...prev,
      date: formattedDate,
      time: `${selectedTimePill} WAT`
    }));
    setIsDateTimePickerOpen(false);
  };

  const activeMatch = matches.length > 0 ? matches[0] : null;

  return (
    <main className="min-h-screen bg-black text-white px-4 py-8 sm:px-8 sm:py-12">
      <MatchHeaderBanner activeMatch={activeMatch} onOpenAdmin={() => setIsAdminOpen(true)} />

      <LiveStreamViewer activeMatch={activeMatch} />

      <PredictAndWinSection
        educationalQuestions={educationalQuestions}
        predictionData={predictionData}
        setPredictionData={setPredictionData}
        isSubmitting={isSubmittingPrediction}
        onSubmit={handlePredictionSubmit}
        onOpenPrizeModal={handleOpenPrizeModal}
      />

      <MatchScheduleGrid
        scheduledList={matches}
        onOpenTable={() => setTableOpen(true)}
        onOpenFood={openFood}
        onOpenBookEvent={() => setBookEventOpen(true)}
      />

      <MatchManagerModal
        prizesModalOpen={prizesModalOpen}
        setPrizesModalOpen={setPrizesModalOpen}
        selectedPrizeCategory={selectedPrizeCategory}
        isAdminOpen={isAdminOpen}
        setIsAdminOpen={setIsAdminOpen}
        errorMsg={errorMsg}
        matches={matches}
        handleDeleteMatch={handleDeleteMatch}
        newMatch={newMatch}
        setNewMatch={setNewMatch}
        handleCreateMatch={handleCreateMatch}
        isSaving={isSaving}
        isDateTimePickerOpen={isDateTimePickerOpen}
        setIsDateTimePickerOpen={setIsDateTimePickerOpen}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        daysInCurrentMonth={daysInCurrentMonth}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        selectedTimePill={selectedTimePill}
        setSelectedTimePill={setSelectedTimePill}
        formatSelectedDate={formatSelectedDate}
        handleApplyDateTime={handleApplyDateTime}
      />

      <TableBookingModal isOpen={tableOpen} onClose={() => setTableOpen(false)} />
      <BookEvent isOpen={bookEventOpen} onClose={() => setBookEventOpen(false)} />
      <FoodOrderModal
        isOpen={foodOpen}
        close={closeFood}
        cart={cart}
        addToCart={addToCart}
        updateQuantity={updateQuantity}
        getTotal={getTotal}
        customerInfo={customerInfo}
        setCustomerInfo={setCustomerInfo}
        handlePayment={handlePayment}
        isPaying={isPaying}
        paymentSuccess={paymentSuccess}
        deliveryFee={deliveryFee}
      />
    </main>
  );
}