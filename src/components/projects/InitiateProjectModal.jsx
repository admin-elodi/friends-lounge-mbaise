import React, { useState } from "react";

export default function InitiateProjectModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    primaryFundraisers: "",
    estimatedCost: "",
    fundraisingPeriod: "",
    executionDuration: "",
    foreman: "",
    bankDetails: {
      bankName: "",
      accountNumber: "",
      accountName: "",
      managerPhone: ""
    }
  });

  const handleChange = (field, val) => {
    setForm((prev) => ({ ...prev, [field]: val }));
  };

  const handleBankChange = (field, val) => {
    setForm((prev) => ({
      ...prev,
      bankDetails: { ...prev.bankDetails, [field]: val }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.bankDetails.accountNumber) return;
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto text-gray-900 shadow-xl">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="font-bold text-lg">Initiate Community Project</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-black">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold mb-1">Project Name *</label>
            <input
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-red-600"
              placeholder="e.g. Donameche Crescent 150-Yard Road Completion"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1">Target Fundraisers</label>
              <input
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="e.g. Landowners & Diaspora"
                value={form.primaryFundraisers}
                onChange={(e) => handleChange("primaryFundraisers", e.target.value)}
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Estimated Cost (₦) *</label>
              <input
                required
                type="number"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="e.g. 2500000"
                value={form.estimatedCost}
                onChange={(e) => handleChange("estimatedCost", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1">Collection Period</label>
              <input
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="e.g. Oct 1 - Oct 31, 2026"
                value={form.fundraisingPeriod}
                onChange={(e) => handleChange("fundraisingPeriod", e.target.value)}
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Project Duration</label>
              <input
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="e.g. 3 Weeks"
                value={form.executionDuration}
                onChange={(e) => handleChange("executionDuration", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Project Foreman / Lead Engineer</label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="e.g. Engr. Kenneth Nwachukwu"
              value={form.foreman}
              onChange={(e) => handleChange("foreman", e.target.value)}
            />
          </div>

          <div className="border-t pt-3 space-y-2">
            <span className="font-bold text-amber-800 uppercase text-[10px] block">
              Fundraising Bank Account Details
            </span>
            <div className="grid grid-cols-2 gap-3">
              <input
                required
                className="p-2 border border-gray-300 rounded"
                placeholder="Bank Name"
                value={form.bankDetails.bankName}
                onChange={(e) => handleBankChange("bankName", e.target.value)}
              />
              <input
                required
                className="p-2 border border-gray-300 rounded font-mono"
                placeholder="Account Number"
                value={form.bankDetails.accountNumber}
                onChange={(e) => handleBankChange("accountNumber", e.target.value)}
              />
            </div>
            <input
              required
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Account Name"
              value={form.bankDetails.accountName}
              onChange={(e) => handleBankChange("accountName", e.target.value)}
            />
            <input
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Account Manager Phone Number"
              value={form.bankDetails.managerPhone}
              onChange={(e) => handleBankChange("managerPhone", e.target.value)}
            />
          </div>

          <div className="flex gap-2 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 bg-gray-100 text-gray-700 font-semibold rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 bg-red-700 hover:bg-red-800 text-white font-semibold rounded"
            >
              Launch Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}