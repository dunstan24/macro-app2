// ============================================
// ⚠️  CRITICAL COMPONENT - DO NOT DELETE  ⚠️
// ============================================
// Component: NutritionalArchive
// Purpose: Complete nutrition transparency & detailed breakdown
// User Impact: Health tracking, dietary compliance, medical use
//
// DELETION REQUIREMENTS (if absolutely necessary):
// 1. Approval from product owner
// 2. Replacement with equivalent functionality
// 3. User communication about feature removal
// 4. Version bump (breaking change)
// ============================================

import React from "react";
import { NutritionValues, FruitPack, AddOn, Ingredient } from "../types";
import { FRUITS_MASTER, PRESET_EXTRA } from "../constants";

interface NutritionalArchiveProps {
  totalNutrition: NutritionValues;
  selectedPack: FruitPack | null;
  selectedAddOns: AddOn[];
  selectedMilk: Ingredient | null;
  selectedProtein: Ingredient | null;
  showValues: boolean;
}

/**
 * Calculates local nutrition for a specific fruit pack including its preset extras
 */
const getPackNutrition = (pack: FruitPack): NutritionValues => {
  let p = 0,
    c = 0,
    f = 0,
    k = 0;
  pack.items.forEach((item) => {
    const fruit = FRUITS_MASTER.find((f) => f.id === item.fruitId);
    if (fruit) {
      const factor = item.weight / 100;
      p += fruit.protein * factor;
      c += fruit.carbs * factor;
      f += fruit.fat * factor;
      k += fruit.kcal * factor;
    }
  });
  const extras = PRESET_EXTRA[pack.id] || [];
  extras.forEach((ex) => {
    p += ex.p;
    c += ex.c;
    f += ex.f;
    k += ex.kcal;
  });
  return { protein: p, carbs: c, fat: f, kcal: k };
};

// Moved sub-components up to avoid use-before-definition issues and typed as FC for standard React prop support
const MacroBox: React.FC<{
  label: string;
  value: number;
  unit: string;
  color: string;
  show: boolean;
}> = ({ label, value, unit, color, show }) => {
  const colorMap: Record<string, string> = {
    amber:
      "from-amber-500/10 to-amber-500/5 border-amber-500/20 text-amber-500",
    emerald:
      "from-emerald-500/10 to-emerald-500/5 border-emerald-500/20 text-emerald-500",
    blue: "from-blue-500/10 to-blue-500/5 border-blue-500/20 text-blue-500",
    rose: "from-rose-500/10 to-rose-500/5 border-rose-500/20 text-rose-500",
  };

  return (
    <div
      className={`bg-gradient-to-b ${colorMap[color]} border rounded-3xl p-5 text-center transition-all hover:scale-[1.02] shadow-sm`}
    >
      <div className="text-3xl font-black italic font-display">
        {show ? value.toFixed(1) : "---"}
      </div>
      <div className="text-[8px] font-black uppercase opacity-60 tracking-widest">
        {unit}
      </div>
      <div className="text-[10px] font-black uppercase mt-1.5 opacity-80 tracking-tighter">
        {label}
      </div>
    </div>
  );
};

const SourceRow: React.FC<{
  name: string;
  type: string;
  nutrition: NutritionValues;
  show: boolean;
}> = ({ name, type, nutrition, show }) => (
  <div className="flex items-center justify-between bg-white dark:bg-white/5 rounded-2xl px-5 py-4 border border-gray-100 dark:border-white/5 hover:border-[#CA210E] transition-all group">
    <div className="min-w-0 pr-4">
      <span className="text-[8px] text-gray-400 uppercase font-black tracking-widest">
        {type}
      </span>
      <div className="text-sm font-black text-gray-900 dark:text-white uppercase truncate group-hover:text-[#CA210E] transition-colors leading-tight">
        {name}
      </div>
    </div>
    <div className="text-right shrink-0">
      <div className="text-xs font-black text-[#CA210E] italic">
        {show ? Math.round(nutrition.kcal) : "---"}{" "}
        <span className="text-[8px] uppercase not-italic opacity-60">kcal</span>
      </div>
      <div className="text-[8px] font-black text-gray-400 uppercase tracking-tighter mt-0.5">
        P:{show ? nutrition.protein.toFixed(1) : "---"}g
      </div>
    </div>
  </div>
);

export const NutritionalArchive: React.FC<NutritionalArchiveProps> = ({
  totalNutrition,
  selectedPack,
  selectedAddOns,
  selectedMilk,
  selectedProtein,
  showValues,
}) => {
  return (
    <section
      className="w-full bg-gray-50 dark:bg-[#0c0c0c] border border-gray-100 dark:border-white/5 rounded-[2.5rem] p-6 md:p-10 mt-12 shadow-2xl animate-in fade-in slide-in-from-bottom duration-1000"
      aria-label="Nutritional Archive - Detailed breakdown"
      data-critical="true"
    >
      <div className="flex items-center gap-3 mb-8 border-b border-gray-200 dark:border-white/10 pb-5">
        <span className="text-3xl filter drop-shadow-md">📊</span>
        <div className="flex flex-col">
          <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight font-display italic">
            Nutritional Archive
          </h3>
          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none">
            Complete Data Breakdown
          </p>
        </div>
        <span className="text-[10px] bg-[#CA210E] text-white px-3 py-1 rounded-full ml-auto font-black uppercase tracking-tighter shadow-lg shadow-red-900/20">
          CORE FEATURE
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MacroBox
          label="Calories"
          value={totalNutrition.kcal}
          unit="kcal"
          color="amber"
          show={showValues}
        />
        <MacroBox
          label="Protein"
          value={totalNutrition.protein}
          unit="g"
          color="emerald"
          show={showValues}
        />
        <MacroBox
          label="Carbs"
          value={totalNutrition.carbs}
          unit="g"
          color="blue"
          show={showValues}
        />
        <MacroBox
          label="Fat"
          value={totalNutrition.fat}
          unit="g"
          color="rose"
          show={showValues}
        />
      </div>

      <div className="mt-10 space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">
            Ingredient Sources
          </h4>
          <div className="h-px flex-1 bg-gray-200 dark:bg-white/5"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {selectedPack && (
            <SourceRow
              name={selectedPack.name}
              type="Fruit Pack + Extras"
              nutrition={getPackNutrition(selectedPack)}
              show={showValues}
            />
          )}

          {selectedMilk && (
            <SourceRow
              name={selectedMilk.name}
              type="Milk Base"
              nutrition={selectedMilk}
              show={showValues}
            />
          )}

          {selectedProtein && (
            <SourceRow
              name={selectedProtein.name}
              type="Protein Supplement"
              nutrition={selectedProtein}
              show={showValues}
            />
          )}

          {selectedAddOns.map((addon) => (
            <SourceRow
              key={addon.id}
              name={addon.name}
              type="Add-On Booster"
              nutrition={addon}
              show={showValues}
            />
          ))}

          {!selectedPack && !selectedMilk && !selectedProtein && (
            <div className="col-span-full py-8 text-center border-2 border-dashed border-gray-200 dark:border-white/5 rounded-3xl opacity-50">
              <p className="text-[10px] font-black text-gray-400 uppercase italic">
                Select ingredients to see breakdown
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-gray-100 dark:border-white/5 text-[10px] text-gray-400 font-medium italic flex items-center justify-center gap-2">
        <span className="text-[#CA210E]">⚠️</span>
        This section provides complete macro transparency required for
        high-performance dietary tracking.
      </div>
    </section>
  );
};
