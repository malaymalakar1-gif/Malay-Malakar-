export interface DetectedItem {
  name: string;
  category: string;
  color: string;
  description: string;
}

export interface ColorPaletteItem {
  hex: string;
  name: string;
  role: string;
}

export interface OccasionAdviceItem {
  occasion: string;
  suitability: "High" | "Medium" | "Low" | string;
  reasoning: string;
  tip: string;
}

export interface CelebrityMatchItem {
  name: string;
  styleReason: string;
  outfitExample: string;
}

export interface StyleAnalysisReport {
  overallStyleCategory: string;
  styleDescription: string;
  ratingScore: number;
  colorHarmonyScore: number;
  detectedItems: DetectedItem[];
  colorPalette: ColorPaletteItem[];
  colorHarmonyAnalysis: string;
  strengths: string[];
  improvements: string[];
  personalAdvice: string;
  occasionsAdvice: OccasionAdviceItem[];
  accessoriesAdvice: string[];
  recommendedColors: string[];
  celebrityMatches: CelebrityMatchItem[];
}

export type ScreenType = "home" | "upload" | "dashboard" | "recommendations" | "celebrities" | "profile";

export interface PresetModel {
  id: string;
  name: string;
  gender: string;
  style: string;
  imageUrl: string;
  placeholderText: string;
}

export interface SavedReport {
  id: string;
  title: string;
  date: string;
  overallStyleCategory: string;
  ratingScore: number;
  imageUrl: string;
  report: StyleAnalysisReport;
  goals?: string;
  category?: string;
}

export interface UserProfile {
  name: string;
  stylePreference: string;
  gender: string;
  language: string;
  premiumTier: "Free" | "Style Enthusiast" | "Elite Stylist";
  isLoggedIn?: boolean;
  email?: string;
  phone?: string;
}
