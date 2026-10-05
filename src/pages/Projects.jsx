import React, { useState, useMemo } from "react";
import ProjectHeader from "@/components/projects/ProjectHeader.jsx";
import MessageBanner from "@/components/projects/MessageBanner.jsx";
import ActiveProjectCard from "@/components/projects/ActiveProjectCard.jsx";
import InitiateProjectModal from "@/components/projects/InitiateProjectModal.jsx";
import ContributionModal from "@/components/projects/ContributionModal.jsx";

export default function Projects() {
  const [projects, setProjects] = useState([
    {
      id: "donameche-road-2026",
      name: "Donameche Crescent 150-Yard Road Completion",
      primaryFundraisers: "Landowners & Diaspora Stakeholders (US, UK, Canada)",
      estimatedCost: 2500000,
      fundraisingPeriod: "30 Days (Oct 1 - Oct 31, 2026)",
      executionDuration: "3 Weeks",
      foreman: "Engr. Kenneth Nwachukwu",
      status: "active",
      bankDetails: {
        bankName: "Guarantee Trust Bank (GTB)",
        accountNumber: "3001586851",
        accountName: "JUST FRIENDS INVESTMENT LTD",
        managerPhone: "+2348031234567"
      },
      createdAt: "2026-09-29"
    }
  ]);

  const [contributions, setContributions] = useState({
    "donameche-road-2026": [
      {
        id: "c-1",
        contributorName: "Engr. Okey (Diaspora)",
        phone: "+1 404 555 0192",
        isAnonymous: false,
        amount: 250000,
        proofFileName: "receipt_250k.pdf",
        date: "2026-09-30 11:20"
      }
    ]
  });

  const [showInitiateModal, setShowInitiateModal] = useState(false);
  const [activeContributeProject, setActiveContributeProject] = useState(null);

  const activeProject = useMemo(() => {
    return projects.find((p) => p.status === "active") || null;
  }, [projects]);

  const activeTotalRaised = useMemo(() => {
    if (!activeProject) return 0;
    const projectContribs = contributions[activeProject.id] || [];
    return projectContribs.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  }, [activeProject, contributions]);

  const handleCreateProject = (projectData) => {
    const created = {
      id: `proj-${Date.now()}`,
      ...projectData,
      status: "active",
      createdAt: new Date().toISOString().split("T")[0]
    };
    setProjects([created, ...projects]);
    setShowInitiateModal(false);
  };

  const handleAddContribution = (projectId, contributionData) => {
    const entry = {
      id: `c-${Date.now()}`,
      ...contributionData,
      date: new Date().toLocaleString("en-GB", {
        dateStyle: "short",
        timeStyle: "short"
      })
    };
    setContributions((prev) => ({
      ...prev,
      [projectId]: [entry, ...(prev[projectId] || [])]
    }));
    setActiveContributeProject(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans py-6 sm:py-10 px-3 sm:px-6 lg:px-12">
      {/* Expanded to max-w-7xl so desktop utilizes full horizontal real estate */}
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        
        {/* Header Section */}
        <ProjectHeader 
          activeProject={activeProject} 
          onOpenInitiateModal={() => setShowInitiateModal(true)} 
        />

        {/* Message Banner */}
        <MessageBanner />

        {/* Active Project Details */}
        {activeProject ? (
          <ActiveProjectCard
            project={activeProject}
            totalRaised={activeTotalRaised}
            contributions={contributions[activeProject.id] || []}
            onOpenContributeModal={() => setActiveContributeProject(activeProject)}
          />
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg p-8 sm:p-12 text-center shadow-sm">
            <h3 className="text-gray-700 font-medium text-base sm:text-lg">No Active Project Underway</h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Click "+ Initiate New Project" above to start a community development drive.
            </p>
          </div>
        )}
      </div>

      {/* Modals */}
      {showInitiateModal && (
        <InitiateProjectModal
          onClose={() => setShowInitiateModal(false)}
          onSubmit={handleCreateProject}
        />
      )}

      {activeContributeProject && (
        <ContributionModal
          project={activeContributeProject}
          onClose={() => setActiveContributeProject(null)}
          onSubmit={(data) => handleAddContribution(activeContributeProject.id, data)}
        />
      )}
    </div>
  );
}