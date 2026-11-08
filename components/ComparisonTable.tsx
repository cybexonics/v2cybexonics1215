import React from "react";
import { Check } from "lucide-react";

export interface ComparisonRow {
  label: string;
  cells: string[];
}

export interface ComparisonTableProps {
  caption?: string;
  columns?: string[];
  rows?: ComparisonRow[];
}

export default function ComparisonTable({
  caption = "Comparison of Cybexonics Spa OS with traditional paper diaries, WhatsApp, and spreadsheets",
  columns = [
    "Task / Feature",
    "Paper Diary",
    "WhatsApp & Spreadsheets",
    "Cybexonics Spa OS",
  ],
  rows = [],
}: ComparisonTableProps) {
  const lastColIndex = columns.length - 2; // Index in rows.cells corresponding to the last column

  return (
    <div className="my-8 rounded-2xl border border-[#D4AF37]/30 shadow-md bg-white overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[640px]">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="bg-[#0B132B] text-white">
              {columns.map((col, idx) => {
                const isLast = idx === columns.length - 1;
                return (
                  <th
                    key={col}
                    scope="col"
                    className={`px-4 py-3.5 text-xs font-semibold uppercase tracking-wider ${
                      idx === 0
                        ? "sticky left-0 z-20 bg-[#0B132B]"
                        : ""
                    } ${
                      isLast
                        ? "bg-[#121B36] border-b-2 border-[#D4AF37] text-[#D4AF37]"
                        : "text-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{col}</span>
                      {isLast && (
                        <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#D4AF37] text-[#0B132B]">
                          Spa OS
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {rows.map((row, rowIdx) => {
              const isEven = rowIdx % 2 === 1;
              const stickyBg = isEven ? "bg-slate-50" : "bg-white";

              return (
                <tr
                  key={row.label}
                  className={`transition-colors ${
                    isEven ? "bg-slate-50/70" : "bg-white"
                  } hover:bg-amber-50/30`}
                >
                  {/* First Column: Row Label (Sticky on mobile) */}
                  <th
                    scope="row"
                    className={`px-4 py-3.5 font-semibold text-gray-900 sticky left-0 z-10 ${stickyBg} border-r border-gray-100 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.05)] sm:shadow-none`}
                  >
                    {row.label}
                  </th>

                  {/* Other Columns */}
                  {row.cells.map((cell, cellIdx) => {
                    const isWinner = cellIdx === lastColIndex;

                    if (isWinner) {
                      return (
                        <td
                          key={cellIdx}
                          className="px-4 py-3.5 bg-[#D4AF37]/10 font-medium text-gray-900 border-l border-[#D4AF37]/20"
                        >
                          <div className="flex items-start gap-2">
                            <Check
                              className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5 stroke-[2.5]"
                              aria-hidden="true"
                            />
                            <span>{cell}</span>
                          </div>
                        </td>
                      );
                    }

                    return (
                      <td
                        key={cellIdx}
                        className="px-4 py-3.5 text-slate-600"
                      >
                        {cell}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
