import React from "react";

export default function ActiveProjectCard({
  project,
  totalRaised,
  contributions,
  onOpenContributeModal
}) {
  const progressPercent = project.estimatedCost
    ? Math.min(100, Math.round((totalRaised / project.estimatedCost) * 100))
    : 0;

  const contactPhone = "+447848149416";
  const rawPhone = "447848149416";

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-6">
      
      {/* Title & Primary CTA */}
      <div className="border-b border-gray-100 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
              Active Project
            </span>
            <h2 className="text-[13px] font-bold text-gray-900 mt-2">{project.name}</h2>
          </div>
          <button
            onClick={onOpenContributeModal}
            className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2 rounded transition shadow-sm whitespace-nowrap text-center shrink-0"
          >
            + Contribute & Upload Receipt
          </button>
        </div>
      </div>

      {/* Project Breakdown Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-gray-50 p-4 rounded-md border border-gray-100">
        <div>
          <span className="text-gray-500 block">Primary Target Fundraisers</span>
          <span className="font-semibold text-gray-900">{project.primaryFundraisers}</span>
        </div>
        <div>
          <span className="text-gray-500 block">Project Foreman / Engineer</span>
          <span className="font-semibold text-gray-900">{project.foreman}</span>
        </div>
        <div>
          <span className="text-gray-500 block">Fundraising Window</span>
          <span className="font-semibold text-gray-900">{project.fundraisingPeriod}</span>
        </div>
        <div>
          <span className="text-gray-500 block">Execution Timeline</span>
          <span className="font-semibold text-gray-900">{project.executionDuration}</span>
        </div>
      </div>

      {/* Financial Summary & Auto-Calculated Progress */}
      <div className="space-y-2">
        <div className="flex justify-between items-baseline">
          <div>
            <span className="text-xs text-gray-500 uppercase font-medium">Total Raised Real-Time</span>
            <div className="text-2xl font-extrabold text-emerald-700">
              ₦{totalRaised.toLocaleString()}
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-500">Target Budget</span>
            <div className="text-sm font-semibold text-gray-800">
              ₦{Number(project.estimatedCost).toLocaleString()}
            </div>
          </div>
        </div>

        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-600 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="text-right text-[11px] font-medium text-gray-500">
          {progressPercent}% Goal Met
        </div>
      </div>

      {/* Official Bank Transfer Account */}
      <div className="border border-gray-200 rounded-md p-4 bg-gray-50/50">
        <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
          Official Project Bank Account
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <span className="text-gray-500 block text-[10px]">Bank</span>
            <span className="font-bold text-gray-900">{project.bankDetails.bankName}</span>
          </div>
          <div>
            <span className="text-gray-500 block text-[10px]">Account Number</span>
            <span className="font-mono font-bold text-gray-900 select-all">
              {project.bankDetails.accountNumber}
            </span>
          </div>
          <div>
            <span className="text-gray-500 block text-[10px]">Account Name</span>
            <span className="font-medium text-gray-800">{project.bankDetails.accountName}</span>
          </div>
        </div>

        {/* Action Row: Contact Number & Buttons Inline */}
        <div className="mt-3 border-t border-gray-200 pt-3 flex flex-wrap items-center gap-3 text-xs">
          <div className="text-gray-600">
            Account Manager / Contact:{" "}
            <strong className="text-gray-900 font-mono">{contactPhone}</strong>
          </div>

          <div className="flex items-center gap-2">
            {/* Direct Phone Call */}
            <a
              href={`tel:${contactPhone}`}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded text-[11px] font-semibold transition"
            >
              <span>📞</span> Call
            </a>

            {/* Direct WhatsApp Chat */}
            <a
              href={`https://wa.me/${rawPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded text-[11px] font-semibold transition"
            >
              <span>💬</span> WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Real-time Ledger of Contributors */}
      <div>
        <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">
          Contributor Public Ledger ({contributions.length})
        </h4>

        {contributions.length === 0 ? (
          <p className="text-xs text-gray-400 italic">No contributions uploaded yet. Be the first to contribute!</p>
        ) : (
          <div className="divide-y divide-gray-100 border border-gray-100 rounded-md overflow-hidden text-xs">
            {contributions.map((item) => (
              <div key={item.id} className="p-3 flex items-center justify-between bg-white">
                <div>
                  <p className="font-bold text-gray-900">
                    {item.isAnonymous ? "Anonymous Contributor" : item.contributorName}
                  </p>
                  <p className="text-[10px] text-gray-400">{item.date}</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-emerald-700 text-sm">
                    ₦{Number(item.amount).toLocaleString()}
                  </span>
                  <span className="block text-[10px] text-gray-400">Receipt Attached</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}