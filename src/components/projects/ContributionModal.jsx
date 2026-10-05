import React, { useState } from "react";

export default function ContributionModal({ project, onClose, onSubmit }) {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [contributorName, setContributorName] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [proofFileName, setProofFileName] = useState("");

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) setProofFileName(file.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount) return;

    onSubmit({
      isAnonymous,
      contributorName: isAnonymous ? "Anonymous" : contributorName,
      phone,
      amount: Number(amount),
      proofFileName: proofFileName || "Receipt_Uploaded.pdf"
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 space-y-4 text-gray-900 shadow-xl">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="font-bold text-base">Record Contribution & Payment Proof</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-black">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div className="flex items-center gap-2 bg-gray-50 p-2.5 rounded border">
            <input
              type="checkbox"
              id="anon"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="rounded text-emerald-600 focus:ring-emerald-500"
            />
            <label htmlFor="anon" className="font-medium text-gray-700 cursor-pointer">
              Contribute Anonymously (Hide name on public ledger)
            </label>
          </div>

          {!isAnonymous && (
            <div>
              <label className="block font-semibold mb-1">Contributor Name *</label>
              <input
                required
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Your Name or Family Name"
                value={contributorName}
                onChange={(e) => setContributorName(e.target.value)}
              />
            </div>
          )}

          <div>
            <label className="block font-semibold mb-1">Phone Number</label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="+234..."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Amount Transferred (₦) *</label>
            <input
              required
              type="number"
              className="w-full p-2 border border-gray-300 rounded font-semibold text-emerald-700"
              placeholder="e.g. 100000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Upload Receipt / Proof of Payment</label>
            <input
              type="file"
              onChange={handleFile}
              accept="image/*,.pdf"
              className="w-full text-gray-500 text-xs border border-gray-300 rounded p-1.5"
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
              className="flex-1 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded"
            >
              Submit Contribution
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}