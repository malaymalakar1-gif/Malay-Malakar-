import React, { useState, useEffect } from "react";
import {
  Sparkles,
  ArrowRight,
  Camera,
  Upload,
  Heart,
  Shirt,
  Star,
  User,
  History,
  Share2,
  Languages,
  ArrowLeft,
  RefreshCw,
  AlertCircle,
  ShoppingBag,
  Eye,
  Sliders,
  CheckCircle,
  CheckCircle2,
  Lock,
  Compass,
  Briefcase,
  Layers,
  Flame,
  Award
} from "lucide-react";

import {
  StyleAnalysisReport,
  ScreenType,
  PresetModel,
  SavedReport,
  UserProfile
} from "./types";

import { PRESET_MODELS } from "./presets";
import { TRANSLATIONS } from "./translations";

// Sub components
import CircularGauge from "./components/CircularGauge";
import ColorPaletteView from "./components/ColorPaletteView";
import PhotoChooser from "./components/PhotoChooser";
import MannequinPresets from "./components/MannequinPresets";
import StyleImprovementAdvice from "./components/StyleImprovementAdvice";
import OccasionsGrid from "./components/OccasionsGrid";
import CelebritySection from "./components/CelebritySection";
import ProfileAndHistory from "./components/ProfileAndHistory";
import LuxuryLookBook from "./components/LuxuryLookBook";

// Safe JSON stringify helper to prevent circular references, DOM element serialization, or Event leaks
function safeStringify(obj: any): string {
  const cache = new Set();
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (cache.has(value)) {
        return "[Circular]";
      }
      cache.add(value);
    }
    // Prevent DOM element leakage
    if (value instanceof HTMLElement || (value && typeof value.nodeType === "number" && typeof value.nodeName === "string")) {
      return `[HTMLElement: ${value.tagName || "unknown"}]`;
    }
    // Prevent React FiberNode / internal object leakage
    if (key.startsWith("__react") || key === "_owner" || key === "_store") {
      return undefined;
    }
    // Prevent Event object leakage
    if (value && typeof value.preventDefault === "function" && typeof value.stopPropagation === "function") {
      return "[Event]";
    }
    return value;
  });
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("home");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("English");

  // Input states
  const [uploadedBase64, setUploadedBase64] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>("image/jpeg");
  const [presetItemName, setPresetItemName] = useState<string | null>(null);
  const [goalsText, setGoalsText] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("Any Style");

  // Output states
  const [activeReport, setActiveReport] = useState<StyleAnalysisReport | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  // User details & local storage state list
  const [profile, setProfile] = useState<UserProfile>({
    name: "Fashion Enthusiast",
    stylePreference: "High-End Streetwear & Tailoring",
    gender: "Unisex",
    language: "English",
    premiumTier: "Elite Stylist",
  });

  const [savedReports, setSavedReports] = useState<SavedReport[]>([]);
  const [showShareSuccess, setShowShareSuccess] = useState<boolean>(false);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const storedScans = localStorage.getItem("stylevision_scans_v1");
      if (storedScans) {
        setSavedReports(JSON.parse(storedScans));
      } else {
        // Hydrate default scans from PRESET_MODELS for initial demonstration value!
        const defaultScans: SavedReport[] = [
          {
            id: "default_scan_1",
            title: "Sophistication Scan — Aiden Shibuya Style",
            date: "June 18, 2026",
            overallStyleCategory: PRESET_MODELS[0].report.overallStyleCategory,
            ratingScore: PRESET_MODELS[0].report.ratingScore,
            imageUrl: PRESET_MODELS[0].imageUrl,
            report: PRESET_MODELS[0].report,
            goals: "Tokyo Streetwear look",
            category: "Streetwear",
          },
          {
            id: "default_scan_2",
            title: "Sophistication Scan — Sophia Power Suit",
            date: "June 17, 2026",
            overallStyleCategory: PRESET_MODELS[1].report.overallStyleCategory,
            ratingScore: PRESET_MODELS[1].report.ratingScore,
            imageUrl: PRESET_MODELS[1].imageUrl,
            report: PRESET_MODELS[1].report,
            goals: "Job Keynote Presentation fit",
            category: "Formal",
          }
        ];
        setSavedReports(defaultScans);
        localStorage.setItem("stylevision_scans_v1", safeStringify(defaultScans));
      }

      const storedProfile = localStorage.getItem("stylevision_profile_v1");
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      }
    } catch (e) {
      console.error("Local storage restoration failed:", e);
    }
  }, []);

  // Save state to localStorage
  const persistScans = (updatedScans: SavedReport[]) => {
    setSavedReports(updatedScans);
    try {
      localStorage.setItem("stylevision_scans_v1", safeStringify(updatedScans));
    } catch (e) {
      console.error("Local storage save failed:", e);
    }
  };

  useEffect(() => {
    try {
      localStorage.setItem("stylevision_profile_v1", safeStringify(profile));
    } catch (e) {
      console.error("Local storage profile save failed:", e);
    }
  }, [profile]);

  const langSet = TRANSLATIONS[selectedLanguage] || TRANSLATIONS.English;

  // Handle preset mannequin selection
  const handleSelectPresetModel = (preset: PresetModel & { report: StyleAnalysisReport }) => {
    setUploadedBase64(preset.imageUrl);
    setMimeType("image/jpeg");
    setPresetItemName(preset.name);
    setActiveReport(preset.report);
    // Directly guide user to the active dashboard report
    setCurrentScreen("dashboard");
    // Seed analytical options
    setGoalsText(preset.placeholderText);
    setActiveCategory(preset.style);
    setAnalysisError(null);
  };

  // Select image from uploader
  const handlePhotoSelected = (base64: string, mime: string, name?: string) => {
    setUploadedBase64(base64);
    setMimeType(mime);
    if (name) {
      setPresetItemName(name);
    } else {
      setPresetItemName(null);
    }
    setAnalysisError(null);
  };

  const handleResetPhoto = () => {
    setUploadedBase64(null);
    setMimeType("image/jpeg");
    setPresetItemName(null);
    setAnalysisError(null);
  };

  // Perform Gemini AI Request
  const handleExecuteAIAnalysis = async (targetCategory?: string) => {
    let imageToUse = uploadedBase64;
    let mimeToUse = mimeType;
    let nameToUse = presetItemName;

    // Elegant fallback: If they didn't upload or choose a photo, select the first premium preset model!
    if (!imageToUse) {
      imageToUse = PRESET_MODELS[0].imageUrl;
      mimeToUse = "image/jpeg";
      nameToUse = PRESET_MODELS[0].name;
      setUploadedBase64(imageToUse);
      setMimeType(mimeToUse);
      setPresetItemName(nameToUse);
    }

    setIsAnalyzing(true);
    setAnalysisError(null);

    // Deep sanitization of the style category:
    // If targetCategory is passed, make sure it is a string and not a Click Event.
    let categoryToUse = "Any Style";
    if (targetCategory && typeof targetCategory === "string") {
      categoryToUse = targetCategory;
    } else if (activeCategory && typeof activeCategory === "string") {
      categoryToUse = activeCategory;
    }

    // Clean other input values to protect against object injection
    const goalsToUse = typeof goalsText === "string" ? goalsText : "";

    try {
      // Robust image validation check
      if (!imageToUse || typeof imageToUse !== "string") {
        throw new Error(selectedLanguage === "Hindi" ? "कृपया विश्लेषण करने के लिए पहले एक फोटो चुनें या अपलोड करें।" : "Please upload or select a photo first before running the analysis.");
      }

      const response = await fetch("/api/analyze-style", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: safeStringify({
          image: imageToUse,
          mimeType: mimeToUse || "image/jpeg",
          goals: goalsToUse || "Overall aesthetic valuation",
          category: categoryToUse,
          language: selectedLanguage || "English",
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || errData.details || "API server returned error status");
      }

      const generatedReport: StyleAnalysisReport = await response.json();
      setActiveReport(generatedReport);

      // Save to history logs
      const formattedDate = new Date().toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

      const newScan: SavedReport = {
        id: `scan_${Date.now()}`,
        title: nameToUse ? `Sophistication Scan — ${nameToUse}` : `Style Analysis #${savedReports.length + 1}`,
        date: formattedDate,
        overallStyleCategory: generatedReport.overallStyleCategory,
        ratingScore: generatedReport.ratingScore,
        imageUrl: imageToUse,
        report: generatedReport,
        goals: goalsToUse,
        category: categoryToUse,
      };

      const updatedScans = [newScan, ...savedReports];
      persistScans(updatedScans);

      // Navigate to analysis board
      setCurrentScreen("dashboard");

    } catch (err: any) {
      console.error("Style analysis fail:", err);
      setAnalysisError(err.message || "An unexpected error occurred during analysis. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDeleteReport = (id: string) => {
    const updated = savedReports.filter((item) => item.id !== id);
    persistScans(updated);
  };

  const handleLoadSavedReport = (item: SavedReport) => {
    setUploadedBase64(item.imageUrl);
    setActiveReport(item.report);
    setGoalsText(item.goals || "");
    setActiveCategory(item.category || "");
    setCurrentScreen("dashboard");
    setAnalysisError(null);
  };

  // Copy report summary as card link
  const handleShareReport = () => {
    if (!activeReport) return;
    const shareText = `🌟 StyleVision AI Report 🌟\nStyle Category: ${activeReport.overallStyleCategory}\nRating: ${activeReport.ratingScore}/10\nColor Harmony: ${activeReport.colorHarmonyScore}/10\nStrengths:\n1. ${activeReport.strengths[0] || ""}\n2. ${activeReport.strengths[1] || ""}\n\nGenerated with StyleVision AI Stylist App.`;
    navigator.clipboard.writeText(shareText);
    setShowShareSuccess(true);
    setTimeout(() => setShowShareSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-start p-3 sm:p-6 md:p-8 font-sans selection:bg-amber-500/30 selection:text-amber-100 relative overflow-x-hidden">
      {/* Decorative Aurora Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-900/10 filter blur-[150px] pointer-events-none ambient-glow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-amber-900/5 filter blur-[120px] pointer-events-none ambient-glow" />

      {/* Main Container framed like a modern high-end application chassis */}
      <div className="w-full max-w-4xl bg-slate-950/80 border border-slate-900 rounded-[32px] sm:rounded-[40px] shadow-3xl flex flex-col overflow-hidden relative backdrop-blur-2xl min-h-[820px]">
        
        {/* Top Premium Brand Header */}
        <header className="p-4 sm:p-6 border-b border-slate-900/80 flex items-center justify-between gap-4 bg-slate-950/90 z-20 sticky top-0 backdrop-blur-lg">
          <div
            onClick={() => setCurrentScreen("home")}
            className="flex items-center gap-3 cursor-pointer group active:scale-98 transition-transform"
            id="brand-logo"
          >
            <div className="w-12 h-12 rounded-2xl overflow-hidden border border-amber-500/35 shadow-lg shadow-amber-500/15 group-hover:scale-105 transition-all p-0.5 bg-slate-900 flex items-center justify-center">
              <img
                src="/src/assets/images/luxury_style_logo_1781836297005.jpg"
                alt="StyleVision Premium Luxe"
                className="w-full h-full object-cover rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h1 className="text-base font-display font-bold text-slate-100 tracking-tight leading-none flex items-center gap-1.5">
                <span>{langSet.appName}</span>
                <span className="text-[9px] bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-extrabold uppercase px-1.5 py-0.5 rounded font-mono select-none">
                  LUXE
                </span>
              </h1>
              <p className="text-[10px] text-slate-500 font-mono tracking-wider font-semibold mt-1">
                {langSet.tagline}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Quick Language Dropdown with custom aesthetic padding */}
            <div className="relative group/lang flex items-center gap-1.5 bg-slate-900/50 border border-slate-800/60 p-2 rounded-xl text-xs hover:border-slate-700 transition-colors">
              <Languages className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-transparent text-slate-350 outline-none font-medium cursor-pointer text-xs pr-1 font-sans"
              >
                <option value="English" className="bg-slate-900 text-slate-200">English</option>
                <option value="Spanish" className="bg-slate-900 text-slate-200">Español</option>
                <option value="French" className="bg-slate-900 text-slate-200">Français</option>
                <option value="German" className="bg-slate-900 text-slate-200">Deutsch</option>
                <option value="Japanese" className="bg-slate-900 text-slate-200">日本語</option>
                <option value="Chinese" className="bg-slate-900 text-slate-200">中文</option>
                <option value="Hindi" className="bg-slate-900 text-slate-200">हिन्दी</option>
              </select>
            </div>

            {/* Premium Badge */}
            <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-amber-500/10 to-amber-500/5 border border-amber-500/20 rounded-xl text-[10px] font-mono tracking-wide text-amber-400 font-bold uppercase">
              <Award className="w-3 h-3 animate-pulse text-amber-400" />
              <span>Elite User</span>
            </div>
          </div>
        </header>

        {/* Viewport Canvas Body */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto space-y-8 pb-24 min-h-[640px]">
          
          {/* 1. HOME SCREEN */}
          {currentScreen === "home" && (
            <div className="space-y-8 animate-fade-in">
              {/* Premium Welcome Box */}
              <div className="relative rounded-3xl p-6 sm:p-8 bg-slate-900/40 border border-slate-800/40 backdrop-blur-md overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="absolute inset-0 bg-radial-gradient from-amber-500/5 via-transparent to-transparent opacity-50 pointer-events-none" />
                <div className="space-y-3 max-w-lg">
                  <span className="px-2.5 py-1 bg-amber-500/10 text-amber-400 text-[10px] tracking-widest font-mono font-bold uppercase rounded-full border border-amber-500/10">
                    AI Fashion Hub
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-150 tracking-tight">
                    {langSet.welcomeBack}, {profile.name}!
                  </h2>
                  <p className="text-sm text-slate-400 leading-relaxed font-sans">
                    Transform your smartphone into an elite haute couture advisor. Using advanced computer vision and Google Gemini AI, get deep analysis of your color coordination, fits, garment layers, and celebrity counterparts instantly.
                  </p>
                  
                  <div className="pt-3 flex flex-wrap gap-3">
                    <button
                      onClick={() => setCurrentScreen("upload")}
                      className="inline-flex items-center gap-2 px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm tracking-tight rounded-xl shadow-lg hover:shadow-amber-500/15 cursor-pointer active:scale-98 transition-all"
                      id="start-scan-btn"
                    >
                      <span>{langSet.startAnalysis}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setCurrentScreen("profile")}
                      className="inline-flex items-center gap-2 px-5 py-3 bg-slate-900 hover:bg-slate-850 hover:text-slate-200 border border-slate-800 text-slate-400 text-sm font-semibold rounded-xl cursor-pointer active:scale-98 transition-colors"
                    >
                      <History className="w-4 h-4" />
                      <span>Saved Scans</span>
                    </button>
                  </div>
                </div>

                {/* Right side luxurious graphic element showing premium costly styling illustration */}
                <div className="relative w-44 h-44 rounded-3xl overflow-hidden border border-amber-500/35 shadow-2.5xl shadow-amber-500/10 flex-shrink-0 group/welcome">
                  <img
                    src="/src/assets/images/luxury_style_logo_1781836297005.jpg"
                    alt="Premium Couture Design"
                    className="w-full h-full object-cover group-hover/welcome:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-3.5">
                    <span className="text-[9px] font-mono font-bold text-amber-400 tracking-widest uppercase flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 animate-spin" />
                      <span>PRÉCIS STYLE</span>
                    </span>
                    <span className="text-xs font-bold text-slate-100 font-sans tracking-tight block">Luxury Atelier v3.5</span>
                  </div>
                </div>
              </div>

              {/* Grid of Mannequin Presets for immediate interactive verification */}
              <div className="p-1">
                <MannequinPresets
                  onSelectPreset={handleSelectPresetModel}
                  title={langSet.presetsTitle}
                  tryPresetsText={langSet.tryPresetsText}
                />
              </div>

              {/* Saved History Quick Look */}
              {savedReports && savedReports.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-mono text-slate-500 uppercase tracking-widest font-bold">
                      Recent Activity
                    </h3>
                    <button
                      onClick={() => setCurrentScreen("profile")}
                      className="text-xs text-indigo-400 hover:text-indigo-300 hover:underline font-semibold"
                    >
                      View all scans
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {savedReports.slice(0, 3).map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleLoadSavedReport(item)}
                        className="bg-slate-900/30 border border-slate-800/60 hover:border-slate-750 p-3.5 rounded-2xl flex items-center gap-3 cursor-pointer group hover:bg-slate-900/60 transition-all"
                      >
                        <div className="w-10 h-14 bg-slate-950 rounded-lg overflow-hidden flex-shrink-0 border border-slate-850">
                          <img src={item.imageUrl} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs font-bold text-slate-350 truncate group-hover:text-amber-400 transition-colors">
                            {item.title}
                          </h4>
                          <span className="text-[9px] text-slate-500 font-mono tracking-tight block mt-0.5">{item.date}</span>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="px-1.5 py-0.2 bg-slate-950 text-[8px] font-semibold text-slate-400 rounded">
                              {item.overallStyleCategory}
                            </span>
                            <span className="text-[9px] text-emerald-450 font-mono font-bold">
                              {item.ratingScore}/10
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 2. PHOTO UPLOAD & PREFERENCES SCREEN */}
          {currentScreen === "upload" && (
            <div className="space-y-6 max-w-xl mx-auto animate-fade-in">
              <div className="space-y-1">
                <button
                  onClick={() => setCurrentScreen("home")}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 font-semibold mb-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Home</span>
                </button>
                <h2 className="text-xl font-display font-extrabold text-slate-100">
                  {langSet.uploadPhoto}
                </h2>
                <p className="text-xs text-slate-400">
                  Share a clean full-body portrait representing your clothes clearly.
                </p>
              </div>

              {/* Photo Input Interface */}
              <PhotoChooser
                onPhotoSelected={handlePhotoSelected}
                selectedImage={uploadedBase64}
                resetPhoto={handleResetPhoto}
                langSet={langSet}
              />

              {/* Styling parameters */}
              {uploadedBase64 && (
                <div className="space-y-5 p-5 bg-slate-900/40 border border-slate-800/40 rounded-3xl backdrop-blur-md">
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-slate-450 uppercase tracking-widest flex items-center gap-2">
                      <Sliders className="w-3.5 h-3.5 text-amber-400" />
                      <span>{langSet.activeCategory}</span>
                    </label>
                    <div className="flex flex-col gap-1.5 mb-2">
                      <span className="text-[11px] text-amber-500 font-bold bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/15 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-400" />
                        <span>👉 नीचे दिए गए 24 प्रीमियम स्टाइल्स में से कोई भी चुनें और तुरंत एनालिसिस शुरू करें / Click any of the 24 premium styles to trigger instant AI evaluation:</span>
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full max-h-72 overflow-y-auto pr-1.5 scrollbar-thin scrollbar-thumb-slate-800">
                      {[
                        "Any Style (Auto)",
                        "Casual Wear",
                        "Formal Business",
                        "Smart Casual",
                        "Business Casual",
                        "Streetwear",
                        "Minimalist Quiet Luxe",
                        "Sporty Athletic",
                        "Traditional & Ethnic",
                        "Luxury Haute Couture",
                        "Trendy High-Street",
                        "Retro & Vintage",
                        "Bohemian (Boho)",
                        "Academic Ivy League",
                        "Chic Parisian",
                        "Preppy Sporty",
                        "Gothic Dark Wear",
                        "Y2K Futuristic",
                        "Grunge Alternative",
                        "Avant-Garde Concept",
                        "Punk Rebellion",
                        "Athleisure Comfort",
                        "Indie Folk Aesthetic",
                        "Festive Wedding Glam"
                      ].map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => {
                            setActiveCategory(cat);
                            handleExecuteAIAnalysis(cat);
                          }}
                          disabled={isAnalyzing}
                          className={`p-3 text-left text-xs rounded-xl border hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex flex-col justify-between gap-1.5 min-h-[64px] ${
                            activeCategory === cat
                              ? "bg-amber-500/15 font-bold border-amber-500 text-amber-400 shadow-md shadow-amber-500/10"
                              : isAnalyzing
                              ? "bg-slate-900/40 border-slate-900 text-slate-600 cursor-not-allowed"
                              : "bg-slate-950/80 border-slate-850 text-slate-400 hover:text-slate-100 hover:border-slate-700"
                          }`}
                        >
                          <span className="font-semibold block leading-tight">{cat}</span>
                          <span className="text-[9px] uppercase tracking-wider text-slate-500 font-mono font-bold leading-none block">
                            Analyze Now
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-slate-450 uppercase tracking-widest flex items-center gap-2">
                      <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{langSet.activeGoals} / Target Occasion</span>
                    </label>
                    <input
                      type="text"
                      className="w-full bg-slate-950/80 border border-slate-800 px-4 py-3.5 rounded-2xl text-xs text-slate-200 outline-none focus:border-amber-500/50 transition-colors"
                      value={goalsText}
                      onChange={(e) => setGoalsText(e.target.value)}
                      placeholder={langSet.goalsPlaceholder}
                    />
                    <div className="flex flex-wrap gap-2 pt-1.5">
                      {[
                        "Job Interview",
                        "Yacht Party",
                        "Street Photoshoot",
                        "Casual Date Night",
                        "Indoors Cozy Chill"
                      ].map((presetGoal) => (
                        <button
                          key={presetGoal}
                          type="button"
                          onClick={() => setGoalsText(presetGoal)}
                          className="px-2.5 py-1 rounded bg-slate-950 border border-slate-850 hover:border-slate-800 hover:text-slate-300 text-[10px] text-slate-400 font-mono"
                        >
                          + {presetGoal}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Trigger AI Analyze Action */}
                  <div className="pt-4">
                    {analysisError && (
                      <div className="p-3.5 bg-rose-950/30 border border-rose-900/65 rounded-2xl text-xs text-rose-300 flex items-center gap-3.5 mb-4">
                        <AlertCircle className="w-5 h-5 text-rose-450 flex-shrink-0" />
                        <p className="leading-relaxed">{analysisError}</p>
                      </div>
                    )}

                    <button
                      onClick={() => handleExecuteAIAnalysis()}
                      disabled={isAnalyzing}
                      className={`w-full flex items-center justify-center gap-3 py-4 bg-amber-500 text-slate-950 font-bold tracking-tight text-sm rounded-2xl cursor-pointer hover:bg-amber-400 transition-all shadow-xl shadow-amber-500/10 ${
                        isAnalyzing ? "opacity-50 cursor-not-allowed" : "active:scale-98"
                      }`}
                    >
                      {isAnalyzing ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>{langSet.analyzingText}</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          <span>{langSet.analyzeBtn}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 3. REPORT / DASHBOARD SCREEN */}
          {currentScreen === "dashboard" && (
            <div className="space-y-8 animate-fade-in">
              {/* Header Navigator options */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-900/80 pb-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setCurrentScreen("home")}
                    className="p-2 border border-slate-800 hover:border-slate-700 rounded-xl bg-slate-900/40 text-slate-400 hover:text-slate-100 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-amber-500 tracking-wider uppercase block">
                      Evaluation Output
                    </span>
                    <h2 className="text-xl font-display font-extrabold text-slate-100 flex items-center gap-2">
                      <span>Dressing Sense Report</span>
                      {activeReport && (
                        <span className="px-2.5 py-0.5 bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold rounded-full text-indigo-400 uppercase tracking-widest font-mono">
                          {activeReport.overallStyleCategory}
                        </span>
                      )}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setCurrentScreen("upload")}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-900 border border-slate-800 text-slate-300 font-semibold text-xs rounded-xl cursor-pointer hover:bg-slate-850"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Upload New</span>
                  </button>
                  <button
                    onClick={handleShareReport}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-semibold text-xs rounded-xl cursor-pointer hover:bg-indigo-505/20 transition-all"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share Report</span>
                  </button>
                </div>
              </div>

              {/* Share Toast Notification Banner */}
              {showShareSuccess && (
                <div className="p-3.5 bg-emerald-950/40 border border-emerald-900/50 rounded-2xl text-xs text-emerald-300 flex items-center gap-2 animate-pulse">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>{langSet.reportShared}</span>
                </div>
              )}

              {/* No Report State */}
              {!activeReport && (
                <div className="text-center py-16 bg-slate-900/10 border border-slate-850 rounded-3xl max-w-xl mx-auto">
                  <Shirt className="w-12 h-12 text-slate-700 mx-auto stroke-[1.2] mb-4 animate-bounce" />
                  <h3 className="text-base font-bold text-slate-350">No active styling report found</h3>
                  <p className="text-xs text-slate-400 mt-2 max-w-sm mx-auto leading-relaxed">
                    Select one of our stylish mannequin presets in Home or upload a custom full body photo to perform active style critiques instantly.
                  </p>
                  <div className="mt-6 flex justify-center gap-3">
                    <button
                      onClick={() => setCurrentScreen("home")}
                      className="px-4 py-2 text-xs bg-amber-500 text-slate-950 font-bold rounded-xl cursor-pointer"
                    >
                      Browse Mannequins
                    </button>
                    <button
                      onClick={() => setCurrentScreen("upload")}
                      className="px-4 py-2 text-xs bg-slate-900 border border-slate-800 text-slate-350 font-bold rounded-xl cursor-pointer"
                    >
                      Snap Photo
                    </button>
                  </div>
                </div>
              )}

              {/* Main Report View Card */}
              {activeReport && (
                <div className="space-y-8">
                  {/* Scores and Silhouette layout */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                    {/* Left: Input preview thumbnail */}
                    {uploadedBase64 && (
                      <div className="md:col-span-4 rounded-3xl overflow-hidden border border-slate-850 bg-slate-950 relative flex items-center justify-center max-h-[300px]">
                        <img
                          src={uploadedBase64}
                          alt="Analyzed outfit"
                          className="w-full h-full object-contain mx-auto"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none opacity-40" />
                        <div className="absolute bottom-3 left-3 z-10 text-[9px] font-mono uppercase bg-slate-950/80 border border-slate-800 p-1 rounded">
                          Target Outfit Preview
                        </div>
                      </div>
                    )}

                    {/* Middle: Gauges and Categories */}
                    <div className="md:col-span-8 bg-slate-900/40 border border-slate-800/40 rounded-3xl p-6 flex flex-col justify-between space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <CircularGauge
                          score={activeReport.ratingScore}
                          title={langSet.ratingTitle}
                        />
                        <CircularGauge
                          score={activeReport.colorHarmonyScore}
                          title={langSet.colorHarmonyTitle}
                        />
                      </div>

                      {/* Overall styling statement */}
                      <div className="space-y-2 p-4 bg-slate-950/60 rounded-2xl border border-slate-900">
                        <span className="text-[10px] uppercase font-bold text-slate-550 font-mono tracking-widest block">
                          {langSet.styleDescriptionLabel}
                        </span>
                        <p className="text-sm text-slate-300 leading-relaxed font-sans font-medium">
                          {activeReport.styleDescription}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Detected Clothing Items Segment */}
                  <div className="bg-slate-900/60 rounded-3xl p-6 border border-slate-800/40 backdrop-blur-md shadow-xl space-y-4">
                    <div className="flex items-center gap-2.5">
                      <Shirt className="w-5 h-5 text-indigo-400" />
                      <h3 className="text-base font-display font-semibold text-slate-150">
                        {langSet.detectedItemsTitle}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      {activeReport.detectedItems && activeReport.detectedItems.length > 0 ? (
                        activeReport.detectedItems.map((item, index) => (
                          <div
                            key={index}
                            className="bg-slate-950/40 p-4 rounded-2xl border border-slate-850 flex flex-col justify-between hover:border-slate-750 transition-colors"
                          >
                            <div>
                              <span className="text-[10px] uppercase tracking-wider font-mono font-semibold text-slate-500">
                                {item.category}
                              </span>
                              <h4 className="text-sm font-bold text-slate-200 mt-1">{item.name}</h4>
                            </div>

                            <div className="mt-3 pt-2.5 border-t border-slate-900 flex items-center justify-between gap-1">
                              <span className="text-[11px] font-medium text-slate-400 italic font-mono truncate max-w-[110px]">
                                {item.color}
                              </span>
                              <span className="text-[10px] text-indigo-400 bg-indigo-950/20 px-2 py-0.5 rounded border border-indigo-950">
                                Fit details
                              </span>
                            </div>

                            {item.description && (
                              <p className="text-[11px] text-slate-450 mt-2 font-sans line-clamp-2">
                                {item.description}
                              </p>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="col-span-4 text-center py-6 text-slate-500 font-mono text-sm leading-none">
                          No garments parsed in scan sensor
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Color Palettte and Coordinator Advice */}
                  <ColorPaletteView
                    palette={activeReport.colorPalette}
                    colorAnalysis={activeReport.colorHarmonyAnalysis}
                    labels={langSet}
                  />

                  {/* Strengths / Improvements / Recommendations visual list */}
                  <StyleImprovementAdvice
                    strengths={activeReport.strengths}
                    improvements={activeReport.improvements}
                    accessoriesAdvice={activeReport.accessoriesAdvice}
                    recommendedColors={activeReport.recommendedColors}
                    personalAdvice={activeReport.personalAdvice}
                    labels={langSet}
                  />

                  {/* Ultimate 10 Custom Outfit Designer with Color Combination selectors */}
                  <LuxuryLookBook
                    uploadedBase64={uploadedBase64}
                    presetItemName={presetItemName}
                    activeCategory={activeReport.overallStyleCategory || activeCategory}
                    selectedLanguage={selectedLanguage}
                  />

                  {/* Occasions Navigator Prompt */}
                  <div className="p-6 bg-gradient-to-r from-amber-500/10 to-indigo-500/5 border border-slate-800 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="space-y-1 text-center sm:text-left">
                      <h4 className="text-sm font-bold text-slate-200">How adaptable is this look?</h4>
                      <p className="text-xs text-slate-400">Discover occasion scores and fast adjustments tips.</p>
                    </div>
                    <button
                      onClick={() => setCurrentScreen("recommendations")}
                      className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl cursor-pointer"
                    >
                      View Occasion Tips
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 4. RECOMMENDATIONS / OCCASIONS SCREEN */}
          {currentScreen === "recommendations" && (
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-1 pb-2 border-b border-slate-900/40">
                <button
                  onClick={() => setCurrentScreen("dashboard")}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 font-semibold mb-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Report</span>
                </button>
                <h2 className="text-xl font-display font-extrabold text-slate-100">
                  {langSet.occasionsTitle}
                </h2>
                <p className="text-xs text-slate-400">
                  Check whether your ensemble fits business formal, casual cozy settings, and weekend excursions.
                </p>
              </div>

              {activeReport ? (
                <OccasionsGrid
                  occasions={activeReport.occasionsAdvice}
                  title="Contextual Adaptability Map"
                />
              ) : (
                <div className="text-center py-16 bg-slate-900/10 border border-slate-850 rounded-3xl max-w-xl mx-auto">
                  <Compass className="w-12 h-12 text-slate-700 mx-auto stroke-[1.2] mb-3 animate-spin-slow" />
                  <h3 className="text-sm font-semibold text-slate-400">No active occasion recommendations available</h3>
                  <p className="text-xs text-slate-500 mt-2 max-w-xs mx-auto">
                    Please upload or choose a mannequin style in Home to perform dynamic adaptability analytics.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* 5. CELEBRITY MATCH SCREEN */}
          {currentScreen === "celebrities" && (
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-1 pb-2 border-b border-slate-900/40">
                <button
                  onClick={() => setCurrentScreen("dashboard")}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 font-semibold mb-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Report</span>
                </button>
                <h2 className="text-xl font-display font-extrabold text-slate-100 font-sans">
                  {langSet.celebrityMatchTitle}
                </h2>
                <p className="text-xs text-slate-400 font-sans">
                  Meet the world class style icons who embody matching aesthetics, layers, and accessory playbooks.
                </p>
              </div>

              {activeReport ? (
                <CelebritySection
                  celebrityMatches={activeReport.celebrityMatches}
                  title="Celebrity Style Crossovers"
                />
              ) : (
                <div className="text-center py-16 bg-slate-900/10 border border-slate-850 rounded-3xl max-w-xl mx-auto">
                  <Star className="w-12 h-12 text-slate-700 mx-auto stroke-[1.2] mb-3 animate-pulse" />
                  <h3 className="text-sm font-semibold text-slate-400">No celebrity style matches found</h3>
                  <p className="text-xs text-slate-500 mt-2 max-w-xs mx-auto">
                    Complete your custom dress sense analysis to match with high-fashion icons.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* 6. PROFILE & LOGS SCREEN */}
          {currentScreen === "profile" && (
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-1 pb-2 border-b border-slate-900/40">
                <button
                  onClick={() => setCurrentScreen("home")}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 font-semibold mb-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Home</span>
                </button>
                <h2 className="text-xl font-display font-extrabold text-slate-100">
                  Stylist Hub & archived reports
                </h2>
                <p className="text-xs text-slate-400 font-sans">
                  Configure your standard profile metrics and restore previously reviewed coordinates.
                </p>
              </div>

              <ProfileAndHistory
                profile={profile}
                setProfile={setProfile}
                savedReports={savedReports}
                onDeleteReport={handleDeleteReport}
                onLoadReport={handleLoadSavedReport}
                onLoginSuccess={() => setCurrentScreen("home")}
                labels={langSet}
              />
            </div>
          )}
        </main>

        {/* Global Floating Glass Smartphone Bottom Navigation tab ring */}
        <nav className="absolute bottom-4 left-1/2 translate-x-[-50%] w-[92%] sm:w-[85%] max-w-lg bg-slate-950/85 border border-slate-850 rounded-2xl p-2.5 flex items-center justify-around shadow-2xl backdrop-blur-xl z-30">
          
          <button
            onClick={() => setCurrentScreen("home")}
            className={`flex flex-col items-center gap-1 cursor-pointer transition-colors p-1.5 rounded-xl ${
              currentScreen === "home" ? "text-amber-400 bg-slate-900/50" : "text-slate-500 hover:text-slate-350"
            }`}
          >
            <Shirt className="w-4.5 h-4.5" />
            <span className="text-[9px] font-mono tracking-wider font-bold uppercase">Home</span>
          </button>

          <button
            onClick={() => setCurrentScreen("upload")}
            className={`flex flex-col items-center gap-1 cursor-pointer transition-colors p-1.5 rounded-xl ${
              currentScreen === "upload" ? "text-amber-400 bg-slate-900/50" : "text-slate-500 hover:text-slate-350"
            }`}
          >
            <Camera className="w-4.5 h-4.5" />
            <span className="text-[9px] font-mono tracking-wider font-bold uppercase">Scan</span>
          </button>

          <button
            onClick={() => {
              if (activeReport) {
                setCurrentScreen("dashboard");
              } else {
                alert("Please select a mannequin on Home or upload an image first to view the active Report dashboard.");
              }
            }}
            className={`flex flex-col items-center gap-1 cursor-pointer transition-colors p-1.5 rounded-xl relative ${
              currentScreen === "dashboard" ? "text-amber-400 bg-slate-900/50" : "text-slate-500 hover:text-slate-350"
            } ${!activeReport ? "opacity-45" : ""}`}
          >
            <History className="w-4.5 h-4.5" />
            <span className="text-[9px] font-mono tracking-wider font-bold uppercase">Report</span>
            {activeReport && currentScreen !== "dashboard" && (
              <span className="absolute top-1 right-2 w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
            )}
          </button>

          <button
            onClick={() => {
              if (activeReport) {
                setCurrentScreen("recommendations");
              } else {
                alert("Please load a style report first to see occasion suitability ratings.");
              }
            }}
            className={`flex flex-col items-center gap-1 cursor-pointer transition-colors p-1.5 rounded-xl ${
              currentScreen === "recommendations" ? "text-amber-400 bg-slate-900/50" : "text-slate-500 hover:text-slate-350"
            } ${!activeReport ? "opacity-45" : ""}`}
          >
            <Compass className="w-4.5 h-4.5" />
            <span className="text-[9px] font-mono tracking-wider font-bold uppercase">Occasions</span>
          </button>

          <button
            onClick={() => setCurrentScreen("profile")}
            className={`flex flex-col items-center gap-1 cursor-pointer transition-colors p-1.5 rounded-xl ${
              currentScreen === "profile" ? "text-amber-400 bg-slate-900/50" : "text-slate-500 hover:text-slate-350"
            }`}
          >
            <User className="w-4.5 h-4.5" />
            <span className="text-[9px] font-mono tracking-wider font-bold uppercase">Profile</span>
          </button>
        </nav>
      </div>

      {/* Styled Footer Credit bar */}
      <footer className="mt-6 text-[10px] text-slate-600 font-mono tracking-wide text-center">
        StyleVision AI Engine Powered by Google Gemini-3.5-Flash • © 2026 Applet Inc.
      </footer>
    </div>
  );
}
