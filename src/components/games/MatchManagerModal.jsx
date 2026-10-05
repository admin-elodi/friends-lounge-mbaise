import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, X, Settings, AlertCircle, Trash2, Plus, Calendar, Loader2, CalendarCheck, ChevronLeft, ChevronRight } from 'lucide-react';

export default function MatchManagerModal({
  prizesModalOpen,
  setPrizesModalOpen,
  selectedPrizeCategory,
  isAdminOpen,
  setIsAdminOpen,
  errorMsg,
  matches,
  handleDeleteMatch,
  newMatch,
  setNewMatch,
  handleCreateMatch,
  isSaving,
  isDateTimePickerOpen,
  setIsDateTimePickerOpen,
  currentMonth,
  setCurrentMonth,
  daysInCurrentMonth,
  selectedDay,
  setSelectedDay,
  selectedTimePill,
  setSelectedTimePill,
  formatSelectedDate,
  handleApplyDateTime
}) {
  return (
    <>
      {/* CEO PRIZE APPROVAL MODAL */}
      <AnimatePresence>
        {prizesModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl text-white"
            >
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
                <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                  <Award className="w-4 h-4" /> Concept Proposal — CEO Approval Required
                </h3>
                <button
                  onClick={() => setPrizesModalOpen(false)}
                  className="p-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-neutral-300">
                <p className="font-semibold text-white">
                  Category: <span className="text-amber-400">{selectedPrizeCategory}</span>
                </p>
                <p className="leading-relaxed">
                  This feature is currently configured as a proposal for management preview. Once approved by the CEO, exact prize amounts (e.g., Cash Grants, Drinks Vouchers, Suya Platters, or Academic Scholarships) will be explicitly displayed here before pushing to production.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-800 flex justify-end">
                <button
                  onClick={() => setPrizesModalOpen(false)}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs transition"
                >
                  Got It
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MANAGER POST MATCH DRAWER */}
      <AnimatePresence>
        {isAdminOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl text-white scrollbar-none"
            >
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <h3 className="text-base font-bold flex items-center gap-2 text-amber-400">
                  <Settings className="w-4 h-4" /> Match Posting Manager
                </h3>
                <button
                  onClick={() => setIsAdminOpen(false)}
                  className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {errorMsg && (
                <div className="mt-4 p-3 rounded-xl bg-red-950/50 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* LIST EXISTING MATCHES */}
              <div className="mt-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
                  Currently Active Match Announcements ({matches.length}/4)
                </h4>

                {matches.length > 0 ? (
                  <div className="space-y-2 mb-6">
                    {matches.map((item) => (
                      <div
                        key={item.$id}
                        className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-red-950 text-red-400">
                              {item.competition}
                            </span>
                            <span className="text-xs font-bold truncate">
                              {item.homeTeam} vs {item.awayTeam}
                            </span>
                          </div>
                          <p className="text-[10px] text-neutral-400 mt-1">
                            {item.date} at {item.time}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeleteMatch(item.$id)}
                          className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition"
                          title="Remove match"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-neutral-500 italic mb-6">No active match announcements posted.</p>
                )}
              </div>

              {/* POST NEW MATCH FORM */}
              {matches.length < 4 && (
                <form onSubmit={handleCreateMatch} className="pt-4 border-t border-neutral-800 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Plus className="w-4 h-4" /> Post New Match Announcement
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-300 mb-1">Home Team</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Enyimba FC"
                        value={newMatch.homeTeam}
                        onChange={(e) => setNewMatch({ ...newMatch, homeTeam: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-red-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-300 mb-1">Away Team</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rangers Int"
                        value={newMatch.awayTeam}
                        onChange={(e) => setNewMatch({ ...newMatch, awayTeam: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-300 mb-1">League / Competition</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. NPFL / Premier League"
                        value={newMatch.competition}
                        onChange={(e) => setNewMatch({ ...newMatch, competition: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-red-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-300 mb-1">Match Date & Time</label>
                      <button
                        type="button"
                        onClick={() => setIsDateTimePickerOpen(true)}
                        className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white flex items-center justify-between hover:border-neutral-700 transition"
                      >
                        <span className={newMatch.date ? "text-white font-medium" : "text-neutral-500"}>
                          {newMatch.date ? `${newMatch.date} · ${newMatch.time}` : "Select Date & Kickoff Time"}
                        </span>
                        <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-300 mb-1">Banner Announcement Text</label>
                    <textarea
                      rows={2}
                      value={newMatch.announcement}
                      onChange={(e) => setNewMatch({ ...newMatch, announcement: e.target.value })}
                      placeholder="e.g., Join us at Friends Lounge for cold drinks and great vibes!"
                      className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsAdminOpen(false)}
                      className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-medium"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-50 text-xs font-bold text-white flex items-center gap-2 shadow-lg shadow-red-600/20"
                    >
                      {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                      Publish Match
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SLEEK CUSTOM DATE & TIME PICKER MODAL */}
      <AnimatePresence>
        {isDateTimePickerOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="relative w-full max-w-sm bg-neutral-900 border border-neutral-800 rounded-2xl p-5 shadow-2xl text-white"
            >
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
                <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                  <CalendarCheck className="w-4 h-4 text-amber-400" /> Select Match Schedule
                </h4>
                <button
                  onClick={() => setIsDateTimePickerOpen(false)}
                  className="p-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* MONTH NAVIGATION */}
              <div className="flex items-center justify-between mb-3 px-1">
                <button
                  type="button"
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                  className="p-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-300 hover:bg-neutral-800"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                  className="p-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-300 hover:bg-neutral-800"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* DAY GRID */}
              <div className="grid grid-cols-7 gap-1 text-center mb-4">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, idx) => (
                  <span key={idx} className="text-[10px] font-bold text-neutral-500 py-1">
                    {day}
                  </span>
                ))}
                {Array.from({ length: daysInCurrentMonth }).map((_, idx) => {
                  const dayNum = idx + 1;
                  const isSelected = selectedDay === dayNum;
                  return (
                    <button
                      key={dayNum}
                      type="button"
                      onClick={() => setSelectedDay(dayNum)}
                      className={`h-8 text-xs font-semibold rounded-lg transition ${
                        isSelected
                          ? "bg-red-600 text-white font-bold"
                          : "bg-neutral-950 border border-neutral-800/60 text-neutral-300 hover:border-neutral-700"
                      }`}
                    >
                      {dayNum}
                    </button>
                  );
                })}
              </div>

              {/* KICKOFF TIME PRESETS */}
              <div className="mb-4">
                <label className="block text-[11px] font-semibold text-neutral-400 mb-2">Select Kickoff Time</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {["16:00", "18:00", "20:00", "21:00"].map((timeStr) => (
                    <button
                      key={timeStr}
                      type="button"
                      onClick={() => setSelectedTimePill(timeStr)}
                      className={`py-1.5 text-xs font-bold rounded-lg border transition ${
                        selectedTimePill === timeStr
                          ? "bg-amber-500/20 border-amber-500 text-amber-400"
                          : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700"
                      }`}
                    >
                      {timeStr}
                    </button>
                  ))}
                </div>
              </div>

              {/* SELECTION PREVIEW */}
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-center mb-4">
                <p className="text-[10px] uppercase text-neutral-500 font-semibold tracking-wider">Schedule Selected</p>
                <p className="text-xs font-bold text-amber-400 mt-0.5">
                  {formatSelectedDate(selectedDay, currentMonth)} at {selectedTimePill}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsDateTimePickerOpen(false)}
                  className="w-1/2 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-medium transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleApplyDateTime}
                  className="w-1/2 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-bold text-white transition shadow-lg shadow-red-600/20"
                >
                  Set Schedule
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}