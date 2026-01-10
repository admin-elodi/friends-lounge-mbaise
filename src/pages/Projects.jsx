// src/pages/Projects.jsx
import React, { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  HandCoins,
  PiggyBank,
  Eye,
  Trash2,
  User,
  Calendar,
  Archive,
  ChevronDown,
} from "lucide-react";

// 🔥 Udo Transparency Archive - Friends' Lounge Mbaise
export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [contributions, setContributions] = useState({});
  const [newProject, setNewProject] = useState({ 
    name: "", 
    initiator: "", 
    description: "",
    status: "ongoing",
    amount: ""
  });
  const [isCreating, setIsCreating] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [showHistorical, setShowHistorical] = useState(false);

  // Calculate totals by status
  const totals = useMemo(() => {
    const ongoingTotal = projects
      .filter(p => p.status === "ongoing")
      .reduce((acc, proj) => {
        acc[proj.id] = (contributions[proj.id] || []).reduce((a, b) => a + b, 0);
        return acc;
      }, {});

    const grandOngoing = Object.values(ongoingTotal).reduce((a, b) => a + b, 0);
    
    return {
      ongoing: ongoingTotal,
      grandOngoing,
      completed: projects.filter(p => p.status === "completed").length,
      historical: projects.filter(p => p.status === "historical").length,
    };
  }, [projects, contributions]);

  const isFormValid = newProject.name.trim() && newProject.initiator.trim();

  const handleInputChange = useCallback((field, value) => {
    setNewProject(prev => ({ ...prev, [field]: value }));
  }, []);

  const createProject = useCallback(async () => {
    if (!isFormValid) return;
    
    setIsCreating(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const project = {
      id: Date.now(),
      name: newProject.name.trim(),
      initiator: newProject.initiator.trim(),
      description: newProject.description.trim(),
      status: newProject.status,
      amount: newProject.amount.trim() || null,
      createdAt: new Date().toISOString(),
      contributions: []
    };

    setProjects(prev => [...prev, project]);
    setNewProject({ name: "", initiator: "", description: "", status: "ongoing", amount: "" });
    setIsCreating(false);
  }, [newProject, isFormValid]);

  const addContribution = useCallback((id) => {
    const amount = window.prompt("Enter contribution amount (₦):");
    if (!amount?.trim()) return;

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      alert("Please enter a valid positive amount");
      return;
    }

    setContributions(prev => ({
      ...prev,
      [id]: [...(prev[id] || []), numAmount]
    }));
  }, []);

  const deleteProject = useCallback((id) => {
    if (!window.confirm("Delete this project?")) return;
    
    setProjects(prev => prev.filter(p => p.id !== id));
    setContributions(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const filteredProjects = useMemo(() => {
    let result = projects;
    
    if (!showCompleted) result = result.filter(p => p.status !== "completed");
    if (!showHistorical) result = result.filter(p => p.status !== "historical");
    
    return result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [projects, showCompleted, showHistorical]);

  const ProjectCard = ({ project }) => {
    const total = totals.ongoing[project.id] || 0;
    const contribCount = contributions[project.id]?.length || 0;
    const createdDate = new Date(project.createdAt).toLocaleDateString('en-NG');

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="group bg-black/20 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-white truncate">{project.name}</h3>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <User size={14} />
                  <span className="truncate">{project.initiator}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  {createdDate}
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                  project.status === 'ongoing'
                    ? 'bg-green-500/20 text-green-400 border border-green-400/30'
                    : project.status === 'completed'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-400/30'
                    : 'bg-gray-500/20 text-gray-400 border border-gray-400/30'
                }`}>
                  {project.status === 'historical'
                    ? 'Historical'
                    : project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </span>
              </div>
            </div>

            <div className="flex gap-2 ml-4 flex-shrink-0 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity lg:transition-opacity">
              {project.status === 'ongoing' && (
                <button
                  onClick={() => addContribution(project.id)}
                  className="p-2 bg-green-500/20 hover:bg-green-500/40 border border-green-500/30 rounded-lg transition-all hover:scale-105"
                  title="Contribute"
                  aria-label="Contribute"
                >
                  <HandCoins size={16} />
                </button>
              )}
              <button
                onClick={() => deleteProject(project.id)}
                className="p-2 bg-red-500/20 hover:bg-red-500/40 border border-red-500/30 rounded-lg transition-all hover:scale-105"
                title="Delete"
                aria-label="Delete"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          {project.description && (
            <p className="text-gray-300 text-sm leading-relaxed">{project.description}</p>
          )}

          {project.amount && (
            <p className="text-xs text-gray-500">
              Est. Cost: ₦{parseFloat(project.amount).toLocaleString()}
            </p>
          )}

          {project.status === 'ongoing' && total > 0 && (
            <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
              <p className="text-lg font-bold text-green-400">
                ₦{total.toLocaleString()}
              </p>
              <p className="text-green-300 text-xs">
                {contribCount} contribution{contribCount !== 1 ? 's' : ''}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen text-white overflow-x-hidden">
      {/* Enhanced Background with map.jpg */}
      <div className="fixed inset-0 -z-10">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 blur-sm"
          style={{ backgroundImage: "url('/map.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 opacity-80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,#6366f1_0%,transparent_50%),radial-gradient(circle_at_80%_20%,#f59e0b_0%,transparent_50%)] opacity-20" />
      </div>

      <div className="fixed right-6 bottom-6 w-2 h-20 bg-gradient-to-t from-red-500/30 to-transparent rounded-full z-40 animate-pulse" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* HEADER */}
        <motion.section className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 bg-black/40 px-6 py-3 rounded-lg border border-white/20 mb-8 backdrop-blur-sm"
          >
            <div>
              <h1 className="text-xl bg-gradient-to-r from-white via-gray-100 to-transparent bg-clip-text">
                Friends' Lounge Mbaise
              </h1>
              <p className="text-xs text-red-400 font-medium tracking-wide">
                Encouraging Accountability
              </p>
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-3xl bg-gradient-to-r from-white via-gray-100 to-transparent bg-clip-text mb-6"
          >
            Udo Transparency Archive
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            Honoring past Contributors - Tracking ongoing Projects - Preserving History
          </motion.p>
        </motion.section>

        {/* STATS */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          <div className="bg-black/30 border border-white/10 rounded-xl p-6 text-center backdrop-blur-sm">
            <div className="text-3xl font-black text-green-400">
              ₦{totals.grandOngoing.toLocaleString()}
            </div>
            <div className="text-gray-400 text-sm mt-1">Ongoing Total</div>
          </div>
          <div className="bg-black/30 border border-white/10 rounded-xl p-6 text-center backdrop-blur-sm">
            <div className="text-3xl font-black">{totals.completed}</div>
            <div className="text-gray-400 text-sm mt-1">Completed</div>
          </div>
          <div className="bg-black/30 border border-white/10 rounded-xl p-6 text-center backdrop-blur-sm">
            <div className="text-3xl font-black">{totals.historical}</div>
            <div className="text-gray-400 text-sm mt-1">Historical</div>
          </div>
        </motion.section>

        {/* FORM */}
        <section className="max-w-2xl mx-auto mb-16">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-black/30 border border-white/10 rounded-xl p-8 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <Plus className="w-7 h-7 text-red-400" />
              <h2 className="text-xl font-bold">Add Project</h2>
            </div>

            <div className="space-y-4">
              <input
                placeholder="Project Name (e.g. Udo Market Roof)"
                value={newProject.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg focus:border-red-400 focus:ring-1 focus:ring-red-400/50 transition-all text-sm"
              />
              <input
                placeholder="Initiator (e.g. De Lucius Nwosu)"
                value={newProject.initiator}
                onChange={(e) => handleInputChange('initiator', e.target.value)}
                className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg focus:border-red-400 focus:ring-1 focus:ring-red-400/50 transition-all text-sm"
              />
              <textarea
                placeholder="Description (e.g. Built Udo market road single-handedly)"
                value={newProject.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg focus:border-red-400 focus:ring-1 focus:ring-red-400/50 transition-all resize-none text-sm"
              />
              <input
                placeholder="Est. Cost ₦ (optional)"
                value={newProject.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
                className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg focus:border-red-400 focus:ring-1 focus:ring-red-400/50 transition-all text-sm"
              />
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <select
                  value={newProject.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="flex-1 px-4 py-3 bg-black/50 border border-white/20 rounded-lg focus:border-red-400 text-sm"
                >
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="historical">Historical</option>
                </select>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={createProject}
                  disabled={!isFormValid || isCreating}
                  className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 disabled:opacity-50 rounded-lg font-bold transition-all text-sm"
                >
                  {isCreating ? "Adding..." : "Add Project"}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className={`px-6 py-2 rounded-full font-medium border transition-all text-sm ${
              showCompleted
                ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                : 'border-white/30 text-gray-400 hover:border-white/50'
            }`}
            onClick={() => setShowCompleted(!showCompleted)}
          >
            Completed ({totals.completed})
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className={`px-6 py-2 rounded-full font-medium border transition-all text-sm ${
              showHistorical
                ? 'bg-gray-500/20 border-gray-400 text-gray-300'
                : 'border-white/30 text-gray-400 hover:border-white/50'
            }`}
            onClick={() => setShowHistorical(!showHistorical)}
          >
            Historical ({totals.historical})
          </motion.button>
        </div>

        {/* GRID */}
        <section className="pb-24">
          <AnimatePresence mode="wait">
            {filteredProjects.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-32"
              >
                <div className="rounded-lg w-20 h-12 bg-gradient-to-br from-red-500/20 to-amber-500/20 mx-auto mb-2 flex items-center justify-center backdrop-blur-sm shadow-lg">
                  <Eye className="w-10 h-8 text-red-400 drop-shadow-lg" />
                </div>
                <h3 className="text-xl mb-4 text-gray-300">No projects yet</h3>
                <p className="text-lg text-gray-500 max-w-md mx-auto">
                  Friends' Lounge Mbaise invites you to add the first project above
                </p>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {filteredProjects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* PUBLIC TRACKERS */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-32 pt-16 border-t-2 border-dashed border-white/20"
        >
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-4 justify-center">
              <Eye className="w-10 h-10 text-red-400 ml-2" />
              Track Public Spending
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { url: "https://tracka.ng", name: "Tracka", desc: "Track government projects in your community" },
              { url: "https://www.eyemark.ng", name: "Eyemark", desc: "Monitor capital projects across Nigeria" },
              { url: "https://constrack.ng", name: "ConsTrack", desc: "Track constituency and executive projects" }
            ].map(({ url, name, desc }, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-black/40 hover:bg-red-500/20 border-2 border-white/30 hover:border-red-400 rounded-2xl p-8 text-center transition-all duration-300 hover:scale-105 backdrop-blur-md shadow-xl"
              >
                <div className="font-bold text-2xl text-white group-hover:text-red-400 transition-colors mb-3">
                  {name}
                </div>
                <p className="text-gray-400 text-sm">{desc}</p>
              </a>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-xs text-gray-600">
              These are independent third-party platforms for tracking public projects and holding leaders accountability
            </p>
          </div>
        </motion.section>

        {/* FOOTER */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12 border-t border-white/10 mt-32"
        >
          <p className="text-gray-500 text-sm">
            Transparency Engine by <span className="font-bold text-white">Friends' Lounge Mbaise</span>
          </p>
          <p className="text-xs text-gray-600 mt-1 tracking-wide">
            Building Udo through accountability • Donamenche Crescent, Mbaise
          </p>
        </motion.div>
      </div>
    </div>
  );
}
