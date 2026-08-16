import React, { useState, useEffect, useMemo } from "react";
import {
  BASES,
  FRUIT_PACKS,
  PROTEINS,
  FRUITS_MASTER,
  ADD_ONS,
  PRESET_EXTRA,
  BEST_SELLERS,
} from "./constants";
import {
  SmoothieState,
  SmoothieSnap,
  BestSeller,
  NutritionValues,
  AddOn,
} from "./types";
import { calculateNutrition, formatValue } from "./services/nutritionService";
import { SmoothieCup } from "./components/SmoothieCup";

const BestSellerModal: React.FC<{
  open: boolean;
  onClose: () => void;
  onSelect: (b: BestSeller) => void;
}> = ({ open, onClose, onSelect }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-white dark:bg-[#0c0c0c] rounded-[2rem] border-2 border-gray-100 dark:border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden animate-in zoom-in duration-300 max-h-[85vh] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-black/20">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-400 p-1.5 rounded-xl shadow-lg shadow-yellow-500/20">
              <span className="text-xl">⭐</span>
            </div>
            <div>
              <h2 className="text-xl font-black italic uppercase font-display text-gray-900 dark:text-white leading-none tracking-tight">
                Best Sellers
              </h2>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                Community Favorites
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-all hover:rotate-90 text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
          {BEST_SELLERS.map((best) => (
            <button
              key={best.id}
              onClick={() => onSelect(best)}
              className="w-full text-left p-5 rounded-3xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:border-[#CA210E] dark:hover:border-[#CA210E] group transition-all duration-300 active:scale-[0.98] shadow-sm hover:shadow-xl relative overflow-hidden text-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#CA210E]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex justify-between items-start mb-2 relative z-10">
                <h3 className="text-base font-black uppercase group-hover:text-[#CA210E] transition-colors font-display leading-tight tracking-tight">
                  {best.name}
                </h3>
                <span className="text-[7px] bg-[#CA210E] text-white px-2 py-0.5 rounded-full font-black uppercase tracking-tighter">
                  TOP BLEND
                </span>
              </div>
              <p className="text-xs font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider mb-4 italic leading-relaxed relative z-10">
                {best.desc}
              </p>
              <div className="flex items-center justify-between relative z-10">
                <div className="flex gap-2">
                  <span className="text-[8px] font-black text-gray-400 bg-gray-200/50 dark:bg-white/10 px-2 py-1 rounded-lg uppercase tracking-widest">
                    PRO FORMULA
                  </span>
                </div>
                <span className="text-[10px] font-black text-[#CA210E] uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                  Select Blend →
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const SummaryCard: React.FC<{
  nut: NutritionValues;
  stateToUse: any;
  title: string;
  showValues: boolean;
  onClose?: () => void;
}> = ({ nut, stateToUse, title, showValues, onClose }) => {
  const pack = FRUIT_PACKS.find((p) => p.id === stateToUse.fruitPackId);
  const base = BASES.find(
    (b) => b.id === (stateToUse.base || stateToUse.baseId),
  );
  const protein = PROTEINS.find(
    (p) => p.id === (stateToUse.protein || stateToUse.proteinId),
  );
  const addOnsCount = stateToUse.selectedAddOns?.length || 0;

  return (
    <div className="relative w-full max-w-[420px] bg-black p-0.5 mx-auto overflow-hidden">
      {/* Outer Neon Border Effect */}
      <div className="absolute inset-0 border-2 border-[#CA210E]/40 rounded-[2.5rem] pointer-events-none" />
      <div className="absolute inset-2 border border-[#CA210E]/20 rounded-[2rem] pointer-events-none" />

      <div className="relative bg-black rounded-[2.2rem] p-4 md:p-6 flex flex-col items-center">
        {/* Header */}
        <div className="w-full flex justify-between items-center mb-4">
          <h2 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter text-white font-display">
            {title || "BLEND SUMMARY"}
          </h2>
          {onClose && (
            <button
              onClick={onClose}
              className="text-white hover:text-[#CA210E] transition-colors p-1"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* 1. IMAGE CENTER */}
        <div className="w-24 h-32 md:w-32 md:h-44 mb-6 overflow-hidden rounded-2xl border-2 border-[#CA210E]/30 bg-white/5 shadow-[0_0_30px_rgba(202,33,14,0.15)] shrink-0 flex items-center justify-center">
          <SmoothieCup
            className="w-full h-full object-cover"
            imageUrl={pack?.image || undefined}
          />
        </div>

        {/* 2. CHOICES TABLE */}
        <div className="w-full space-y-2 mb-4 px-2 border-y border-white/10 py-5 bg-white/5 rounded-2xl shadow-inner">
          {[
            { label: "SMOOTHIE BASE", val: pack?.name },
            { label: "MILK", val: base?.name },
            { label: "PROTEIN", val: protein?.name },
            {
              label: "ADD-ONS",
              val: addOnsCount > 0 ? `${addOnsCount} Selected` : "NONE",
            },
          ].map((item, idx) => (
            <div key={idx} className="flex justify-between items-start gap-4">
              <span className="text-[8px] md:text-[9px] font-black text-white/50 tracking-widest uppercase shrink-0 mt-0.5">
                {item.label}
              </span>
              <span className="text-[10px] md:text-[11px] font-black text-white uppercase text-right leading-tight truncate max-w-[70%]">
                {item.val || "---"}
              </span>
            </div>
          ))}
        </div>

        {/* 3. CALORIES TOTAL */}
        <div className="text-center mb-6">
          <div className="text-5xl md:text-6xl font-black italic leading-none text-[#CA210E] mb-1 drop-shadow-[0_0_20px_rgba(202,33,14,0.5)]">
            {showValues ? Math.round(nut.kcal) : "---"}
          </div>
          <div className="text-[8px] font-black text-white/40 tracking-[0.5em] uppercase">
            CALORIES TOTAL
          </div>
        </div>

        {/* 4. MACROS GRID */}
        <div className="grid grid-cols-3 gap-3 w-full border-t border-white/10 pt-5">
          <div className="flex flex-col items-center">
            <div className="text-lg md:text-xl font-black text-white italic">
              {showValues ? `${formatValue(nut.protein)}g` : "---"}
            </div>
            <div className="text-[8px] font-black text-white/30 tracking-widest uppercase">
              Protein
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-lg md:text-xl font-black text-white italic">
              {showValues ? `${formatValue(nut.carbs)}g` : "---"}
            </div>
            <div className="text-[8px] font-black text-white/30 tracking-widest uppercase">
              Carbs
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-lg md:text-xl font-black text-white italic">
              {showValues ? `${formatValue(nut.fat)}g` : "---"}
            </div>
            <div className="text-[8px] font-black text-white/30 tracking-widest uppercase">
              Fat
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface SelectionCardProps {
  id: string;
  name: string;
  image: string;
  tags: string[];
  nutrition: NutritionValues;
  extras?: string[];
  state: "selected" | "other" | "empty";
  onToggle: (id: string) => void;
  type: "fruit" | "milk" | "protein";
  variant?: "default" | "minimal";
  showValues: boolean;
}

const CardImage: React.FC<{ src: string; alt: string; dim: boolean }> = ({
  src,
  alt,
  dim,
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-24 h-full shrink-0 overflow-hidden bg-gray-900/60 border-r border-white/5">
      {!loaded && (
        <div className="absolute inset-0 bg-gray-800/80 animate-pulse flex items-center justify-center">
          <svg className="w-5 h-5 text-gray-600 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-300 ${
          dim ? "opacity-60" : "opacity-100"
        } ${loaded ? "scale-100" : "scale-95 opacity-0"}`}
      />
    </div>
  );
};

const SelectionCard: React.FC<SelectionCardProps> = ({
  id,
  name,
  image,
  tags,
  extras,
  state,
  onToggle,
  type,
  variant = "default",
}) => {
  if (variant === "minimal") {
    const containerClasses = `h-16 w-full rounded-xl overflow-hidden flex flex-row items-center justify-between px-4 transition-all duration-300 relative cursor-pointer ${
      state === "selected"
        ? "ring-2 ring-green-500 bg-green-900/20 shadow-lg scale-[1.02] z-10"
        : "border border-gray-600 bg-gray-800 hover:border-green-500/50"
    }`;

    return (
      <div className={containerClasses} onClick={() => onToggle(id)}>
        <h4 className="text-sm font-bold uppercase tracking-tight text-white leading-tight break-words flex-1 pr-2">
          {name}
        </h4>
        <button
          className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xl transition-all shadow-md ${
            state === "selected"
              ? "bg-red-600 text-white"
              : "bg-green-600 text-white hover:bg-green-500"
          }`}
        >
          {state === "selected" ? "−" : "+"}
        </button>
      </div>
    );
  }

  const containerClasses = `h-28 w-full rounded-xl overflow-hidden flex flex-row transition-all duration-300 relative cursor-pointer ${
    state === "selected"
      ? "ring-2 ring-green-500 bg-green-900/10 shadow-lg scale-[1.02] z-10"
      : "border border-gray-700 bg-gray-900 hover:border-gray-500"
  }`;

  return (
    <div className={containerClasses} onClick={() => onToggle(id)}>
      {type === "fruit" && (
        <CardImage src={image} alt={name} dim={state === "other"} />
      )}
      <div className="flex-1 p-4 flex flex-col min-w-0 justify-center gap-1.5">
        <div className="flex items-start gap-1.5">
          <h4 className="text-base font-bold uppercase tracking-tight text-white leading-tight break-words">
            {name}
          </h4>
          {type === "fruit" && FRUIT_PACKS.find((p) => p.id === id)?.tag && (
            <span className="text-[9px] uppercase bg-red-500 text-white px-1.5 py-0.5 rounded-full font-black shrink-0 shadow-sm">
              {FRUIT_PACKS.find((p) => p.id === id)?.tag}
            </span>
          )}
        </div>
        {type === "fruit" && (
          <div className="flex flex-wrap gap-1">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] bg-gray-800 text-gray-300 px-2 py-0.5 rounded font-black uppercase whitespace-nowrap shadow-sm border border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        {extras && extras.length > 0 && (
          <div className="flex flex-wrap gap-x-2 mt-0.5 opacity-80">
            {extras.map((ex, i) => (
              <span
                key={i}
                className="text-[9px] font-black uppercase text-gray-500 tracking-wider"
              >
                {ex}
              </span>
            ))}
          </div>
        )}
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggle(id);
        }}
        className={buttonClasses}
      >
        <span className="text-3xl font-black text-white">
          {state === "selected" ? "−" : "+"}
        </span>
      </button>
    </div>
  );
};

const SelectedItemRow: React.FC<{
  label: string;
  value: string;
  isSelected: boolean;
}> = ({ label, value, isSelected }) => (
  <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-tight w-full">
    <span className="text-gray-500 font-bold">{label}</span>
    <span
      className={`truncate max-w-[100px] text-right ${isSelected ? "text-white" : "text-gray-700 italic"}`}
    >
      {value}
    </span>
  </div>
);

const App: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    return (localStorage.getItem("theme") as "light" | "dark") || "dark";
  });

  const [state, setState] = useState<SmoothieState>(() => {
    const saved = localStorage.getItem("smokeys_pro_v5_updated");
    if (saved) return JSON.parse(saved);
    return { base: null, fruitPackId: null, protein: null, selectedAddOns: [] };
  });

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [showBest, setShowBest] = useState(false);

  const stepsDone = useMemo(
    () => ({
      step1: state.fruitPackId !== null,
      step2: state.base !== null,
      step3: state.protein !== null,
      step4: state.selectedAddOns?.length > 0,
    }),
    [state],
  );

  const hasMinimumSelection = useMemo(() => {
    return stepsDone.step1 && stepsDone.step2 && stepsDone.step3;
  }, [stepsDone]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("smokeys_pro_v5_updated", JSON.stringify(state));
  }, [state]);

  const nutrition = useMemo(() => calculateNutrition(state), [state]);
  const resolvedPack = useMemo(
    () => FRUIT_PACKS.find((p) => p.id === state.fruitPackId) || null,
    [state.fruitPackId],
  );
  const resolvedMilk = useMemo(
    () => BASES.find((b) => b.id === state.base) || null,
    [state.base],
  );
  const resolvedProtein = useMemo(
    () => PROTEINS.find((p) => p.id === state.protein) || null,
    [state.protein],
  );
  const resolvedAddOns = useMemo(
    () =>
      state.selectedAddOns
        .map((id) => ADD_ONS.find((a) => a.id === id))
        .filter((a): a is AddOn => !!a),
    [state.selectedAddOns],
  );

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const refreshAll = () => {
    setState({
      base: null,
      fruitPackId: null,
      protein: null,
      selectedAddOns: [],
    });
    setCurrentStep(1);
    showToast("Smoothie reset");
  };

  const selectPack = (packId: string) => {
    const isNew = state.fruitPackId !== packId;
    setState((prev) => ({
      ...prev,
      fruitPackId: prev.fruitPackId === packId ? null : packId,
    }));
    if (isNew) setCurrentStep(2);
  };

  const selectMilk = (id: string) => {
    const isNew = state.base !== id;
    setState((prev) => ({ ...prev, base: prev.base === id ? null : id }));
    if (isNew) setCurrentStep(3);
  };

  const selectProtein = (id: string) => {
    const isNew = state.protein !== id;
    setState((prev) => ({ ...prev, protein: prev.protein === id ? null : id }));
    if (isNew) setCurrentStep(4);
  };

  const toggleAddOn = (id: string) => {
    setState((prev) => {
      const current = prev.selectedAddOns || [];
      return current.includes(id)
        ? { ...prev, selectedAddOns: current.filter((item) => item !== id) }
        : { ...prev, selectedAddOns: [...current, id] };
    });
  };

  const navItems = [
    { n: 1, t: "SMOOTHIE", done: stepsDone.step1 },
    { n: 2, t: "MILK", done: stepsDone.step2 },
    { n: 3, t: "PROTEIN", done: stepsDone.step3 },
    { n: 4, t: "ADD-ONS", done: stepsDone.step4 },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen h-screen overflow-hidden bg-white dark:bg-black text-gray-900 dark:text-white transition-all duration-300 selection:bg-[#CA210E] selection:text-white">
      <div className="fixed top-1/2 left-0 -translate-y-1/2 z-[200] flex flex-col items-center">
        <button
          onClick={() => setShowBest(true)}
          className="group relative flex flex-col items-center justify-center p-1.5 md:p-2 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-r-xl shadow-[0_6px_15px_rgba(234,179,8,0.2)] hover:shadow-[0_10px_25px_rgba(234,179,8,0.4)] hover:translate-x-1 transition-all duration-500 ease-out border-y border-r border-white/30 overflow-hidden"
        >
          <div className="bg-white/20 p-1 rounded-full mb-0.5 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
            <span className="text-xl filter drop-shadow-sm">⭐</span>
          </div>
          <span className="text-[7px] md:text-[8px] font-black uppercase text-yellow-950 tracking-widest font-display leading-tight text-center">
            BEST
            <br />
            SELLER
          </span>
        </button>
      </div>

      <BestSellerModal
        open={showBest}
        onClose={() => setShowBest(false)}
        onSelect={(best) => {
          setState({
            fruitPackId: best.fruitPackId,
            base: best.milkId,
            protein: best.proteinId,
            selectedAddOns: best.addOns || [],
          });
          setShowBest(false);
          setCurrentStep(4);
          showToast(`Best-seller ${best.name} selected!`);
        }}
      />

      {toast && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[400] bg-black text-white px-8 py-4 border-l-8 border-[#CA210E] shadow-2xl animate-in slide-in-from-top duration-300 rounded-lg">
          <p className="font-black text-xs uppercase tracking-widest">
            {toast}
          </p>
        </div>
      )}

      <main className="flex-1 overflow-y-auto custom-scrollbar bg-white dark:bg-[#050505] flex flex-col">
        {/* COMPACT STICKY NAV BAR */}
        <div className="sticky top-0 z-40 w-full px-4 md:px-12 lg:px-16 pt-3 pb-4 bg-white/95 dark:bg-[#050505]/95 backdrop-blur-xl border-b border-gray-100 dark:border-white/5 space-y-3">
          <div className="flex items-center justify-center gap-6">
            <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent to-[#CA210E] max-w-[100px]"></div>
            <h3 className="text-xs font-black text-[#CA210E] uppercase tracking-[0.2em] italic">
              SMOKEY'S MACRO CALCULATOR
            </h3>
            <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent to-[#CA210E] max-w-[100px]"></div>
          </div>
          <div className="grid grid-cols-4 gap-2 md:gap-4">
            {navItems.map((step) => {
              const getSelection = () => {
                if (step.n === 1) return resolvedPack?.name;
                if (step.n === 2) return resolvedMilk?.name;
                if (step.n === 3) return resolvedProtein?.name;
                if (step.n === 4 && resolvedAddOns.length > 0) {
                  return resolvedAddOns.length === 1
                    ? resolvedAddOns[0].name
                    : `${resolvedAddOns.length} SELECTED`;
                }
                return null;
              };
              const choice = getSelection();

              return (
                <button
                  key={step.n}
                  onClick={() => setCurrentStep(step.n)}
                  className={`bg-gray-50 dark:bg-[#0c0c0c] border rounded-xl p-2 md:p-3 flex flex-row items-center gap-2 md:gap-3 group transition-all shadow-sm text-left active:scale-[0.98] ${currentStep === step.n ? "border-[#CA210E] ring-1 ring-[#CA210E]/20" : "border-gray-100 dark:border-white/5"}`}
                >
                  <div
                    className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center text-white font-black text-[9px] shadow-[0_4px_12px_rgba(0,0,0,0.1)] group-hover:scale-110 transition-all duration-300 ${step.done ? "bg-green-600" : "bg-[#CA210E]"}`}
                  >
                    {step.done ? "✓" : step.n}
                  </div>
                  <div className="flex flex-col min-w-0 leading-tight">
                    <p
                      className={`text-[8px] font-black uppercase tracking-tighter transition-colors ${currentStep === step.n ? "text-[#CA210E]" : "text-gray-400"}`}
                    >
                      {step.t}
                    </p>
                    {choice && (
                      <p className="text-[7px] font-bold text-green-500 uppercase truncate leading-tight">
                        {choice}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-4 px-6 py-6 md:px-12 lg:px-16 flex-1">
          <div className="animate-in fade-in slide-in-from-right duration-500">
            {currentStep === 1 && (
              <section className="p-4 md:p-6 rounded-[2rem] bg-gray-50 dark:bg-[#080808] border border-gray-100 dark:border-white/5 shadow-2xl">
                <h2 className="text-lg font-black uppercase tracking-tight text-gray-900 dark:text-white font-display mb-4">
                  1. Smoothie Base Selection
                </h2>
                <div className="grid grid-cols-1 gap-3">
                  {FRUIT_PACKS.map((pack) => (
                    <SelectionCard
                      key={pack.id}
                      id={pack.id}
                      name={pack.name}
                      image={pack.image || ""}
                      tags={pack.items.map(
                        (i) =>
                          FRUITS_MASTER.find((f) => f.id === i.fruitId)?.name ||
                          "",
                      )}
                      nutrition={calculateNutrition({
                        ...state,
                        fruitPackId: pack.id,
                      })}
                      extras={PRESET_EXTRA[pack.id]?.map((e) => e.name)}
                      state={
                        state.fruitPackId === pack.id
                          ? "selected"
                          : state.fruitPackId !== null
                            ? "other"
                            : "empty"
                      }
                      onToggle={selectPack}
                      type="fruit"
                      showValues={hasMinimumSelection}
                    />
                  ))}
                </div>
              </section>
            )}

            {currentStep === 2 && (
              <section className="p-4 md:p-6 rounded-[2rem] bg-gray-50 dark:bg-[#080808] border border-gray-100 dark:border-white/5 shadow-2xl">
                <h2 className="text-lg font-black uppercase tracking-tight text-gray-900 dark:text-white font-display mb-4">
                  2. Choose your Milk
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {BASES.map((base) => (
                    <SelectionCard
                      key={base.id}
                      id={base.id}
                      name={base.name}
                      image=""
                      tags={[]}
                      nutrition={{
                        kcal: base.kcal,
                        protein: base.protein,
                        carbs: base.carbs,
                        fat: base.fat,
                      }}
                      state={
                        state.base === base.id
                          ? "selected"
                          : state.base !== null
                            ? "other"
                            : "empty"
                      }
                      onToggle={selectMilk}
                      type="milk"
                      variant="minimal"
                      showValues={hasMinimumSelection}
                    />
                  ))}
                </div>
              </section>
            )}

            {currentStep === 3 && (
              <section className="p-4 md:p-6 rounded-[2rem] bg-gray-50 dark:bg-[#080808] border border-gray-100 dark:border-white/5 shadow-2xl">
                <h2 className="text-lg font-black uppercase tracking-tight text-gray-900 dark:text-white font-display mb-4">
                  3. Select Protein
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PROTEINS.map((protein) => (
                    <SelectionCard
                      key={protein.id}
                      id={protein.id}
                      name={protein.name}
                      image=""
                      tags={[]}
                      nutrition={{
                        kcal: protein.protein,
                        protein: protein.protein,
                        carbs: protein.carbs,
                        fat: protein.fat,
                      }}
                      state={
                        state.protein === protein.id
                          ? "selected"
                          : state.protein !== null
                            ? "other"
                            : "empty"
                      }
                      onToggle={selectProtein}
                      type="protein"
                      variant="minimal"
                      showValues={hasMinimumSelection}
                    />
                  ))}
                </div>
              </section>
            )}

            {currentStep === 4 && (
              <section className="p-4 md:p-6 rounded-[2rem] bg-gray-50 dark:bg-[#080808] border border-gray-100 dark:border-white/5 shadow-2xl relative">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-black uppercase tracking-tight text-gray-900 dark:text-white font-display">
                    4. Add-On{" "}
                    <span className="text-xs lowercase opacity-50 font-normal tracking-normal">
                      (optional)
                    </span>
                  </h2>
                  <button
                    onClick={() =>
                      setState((prev) => ({ ...prev, selectedAddOns: [] }))
                    }
                    className="text-[8px] font-black uppercase text-red-500 tracking-widest"
                  >
                    Reset your add-ons
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                  {ADD_ONS.map((addOn) => (
                    <button
                      key={addOn.id}
                      onClick={() => toggleAddOn(addOn.id)}
                      className={`p-2 min-h-[50px] flex items-center justify-center rounded-xl border-2 text-[8px] leading-tight uppercase font-black transition-all active:scale-95 text-center overflow-hidden break-words ${state.selectedAddOns?.includes(addOn.id) ? "bg-green-600/10 border-green-500 text-green-500" : "border-transparent bg-white dark:bg-[#0c0c0c] text-gray-900 dark:text-white shadow-sm hover:border-white/10"}`}
                    >
                      {addOn.name}
                    </button>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
      </main>

      {/* Sidebar - Desktop */}
      <aside className="w-full md:w-64 lg:w-72 bg-white dark:bg-[#0c0c0c] border-l border-gray-200 dark:border-white/5 shadow-2xl hidden md:flex flex-col items-center py-8 px-4 text-center">
        <div className="w-32 h-44 mb-6 overflow-hidden rounded-2xl border-2 border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-black/40 shadow-inner">
          <SmoothieCup imageUrl={resolvedPack?.image || undefined} />
        </div>

        <div className="w-full space-y-1.5 border-t border-gray-100 dark:border-white/5 pt-4 pb-4 mb-4 text-left">
          <SelectedItemRow
            label="BASE"
            value={resolvedPack?.name || "---"}
            isSelected={!!resolvedPack}
          />
          <SelectedItemRow
            label="MILK"
            value={resolvedMilk?.name || "---"}
            isSelected={!!resolvedMilk}
          />
          <SelectedItemRow
            label="PROTEIN"
            value={resolvedProtein?.name || "---"}
            isSelected={!!resolvedProtein}
          />
          <SelectedItemRow
            label="ADD-ONS"
            value={
              resolvedAddOns.length > 0
                ? `${resolvedAddOns.length} Selected`
                : "NONE"
            }
            isSelected={resolvedAddOns.length > 0}
          />
        </div>

        <div className="w-full space-y-3 mt-auto">
          <button
            onClick={() => setIsModalOpen(true)}
            className={`w-full py-3 rounded-lg text-[10px] font-black uppercase transition-all shadow-lg ${hasMinimumSelection ? "bg-green-600 text-white shadow-green-500/30 hover:bg-green-500" : "bg-gray-700 text-gray-500 cursor-not-allowed"}`}
            disabled={!hasMinimumSelection}
          >
            CALCULATE MACROS
          </button>
          <button
            onClick={refreshAll}
            className="w-full py-3 rounded-lg bg-gray-100 dark:bg-[#151515] text-[9px] font-black uppercase border border-gray-200 dark:border-white/5 active:scale-95"
          >
            RESET
          </button>
        </div>
      </aside>

      {/* Footer Mobile Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-t border-gray-200 dark:border-white/5 z-[150] flex gap-3">
        <button
          onClick={refreshAll}
          className="flex-1 py-4 rounded-xl bg-gray-100 dark:bg-white/5 font-black text-[10px] uppercase tracking-widest text-gray-500"
        >
          Reset
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className={`flex-[2] py-4 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl transition-all ${hasMinimumSelection ? "bg-green-600 text-white shadow-green-500/30 animate-pulse" : "bg-gray-700 text-gray-500"}`}
          disabled={!hasMinimumSelection}
        >
          CALCULATE MACROS
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-1 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-300">
          <div className="w-full max-w-lg flex flex-col items-center max-h-[99vh] custom-scrollbar animate-in zoom-in duration-300">
            <SummaryCard
              nut={nutrition}
              stateToUse={state}
              title="BLEND SUMMARY"
              showValues={hasMinimumSelection}
              onClose={() => setIsModalOpen(false)}
            />

            <div className="w-full max-w-[420px] mt-2 flex flex-col gap-2 pb-4 px-2">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  refreshAll();
                }}
                className="w-full py-4 rounded-[2rem] bg-white text-black font-black uppercase text-[10px] tracking-[0.3em] active:scale-95 shadow-xl hover:bg-gray-100 transition-colors border-2 border-white"
              >
                START AGAIN
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full py-4 rounded-[2rem] bg-transparent text-white font-black uppercase text-[10px] tracking-[0.3em] active:scale-95 border-2 border-white/20 hover:border-white transition-colors"
              >
                GO BACK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
