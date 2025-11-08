// MicroStats.jsx — minimalist metrics for Friends Lounge Mbaise
import React, { useState, useEffect } from "react"
import { Users, TrendingUp, Flag } from "lucide-react"

const MicroStats = () => {
  const [activeFriends, setActiveFriends] = useState(0)
  const [donationProgress, setDonationProgress] = useState(0)
  const [monthlyVisitors, setMonthlyVisitors] = useState(0)

  // Simulate real-time metrics (placeholder logic)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFriends(Math.floor(Math.random() * 45) + 15)
      setDonationProgress((prev) => (prev < 85 ? prev + Math.random() * 2 : prev))
      setMonthlyVisitors((prev) => (prev < 1200 ? prev + Math.floor(Math.random() * 15) : prev))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative bg-white text-gray-800 py-16 border-t border-gray-200 overflow-hidden">
      {/* Subtle background words */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-gray-100 text-[10vw] font-extrabold uppercase tracking-widest select-none pointer-events-none leading-none opacity-30">
        <span className="translate-y-[-1.5rem]">Friendship</span>
        <span>Community</span>
        <span className="translate-y-[1.5rem]">Progress</span>
      </div>

      {/* Overlay tint for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/95 to-white/100 backdrop-blur-[2px]"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-10 flex flex-col md:flex-row items-stretch justify-center gap-6 md:gap-10">
        {/* Active Friends */}
        <div className="flex-1 bg-white rounded-2xl shadow-md border border-gray-100 p-6 text-center hover:shadow-lg transition-all duration-300">
          <div className="bg-red-100 p-3 rounded-full w-fit mx-auto mb-4">
            <Users size={28} className="text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700">Active Friends Online</h3>
          <p className="text-4xl font-bold text-gray-900 mt-2">{activeFriends}</p>
          <p className="text-sm text-gray-500 mt-1">currently connected</p>
        </div>

        {/* Road Project Donations */}
        <div className="flex-1 bg-white rounded-2xl shadow-md border border-gray-100 p-6 text-center hover:shadow-lg transition-all duration-300">
          <div className="bg-red-100 p-3 rounded-full w-fit mx-auto mb-4">
            <Flag size={28} className="text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700">Mbaise Road Project</h3>
          <div className="w-full bg-gray-100 h-3 rounded-full mt-4">
            <div
              className="h-3 bg-red-500 rounded-full transition-all duration-500"
              style={{ width: `${donationProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            ₦{Math.floor((donationProgress / 100) * 2000000).toLocaleString()} raised of ₦2,000,000 goal
          </p>
        </div>

        {/* Monthly Visitors */}
        <div className="flex-1 bg-white rounded-2xl shadow-md border border-gray-100 p-6 text-center hover:shadow-lg transition-all duration-300">
          <div className="bg-red-100 p-3 rounded-full w-fit mx-auto mb-4">
            <TrendingUp size={28} className="text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700">Monthly Visitors</h3>
          <p className="text-4xl font-bold text-gray-900 mt-2">
            {monthlyVisitors.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-1">and counting</p>
        </div>
      </div>
    </section>
  )
}

export default MicroStats;
