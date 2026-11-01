import React from "react"
import { Check } from "lucide-react"

interface ComparisonRow {
  label: string
  paperDiary: string
  spreadsheets: string
  spaOs: string
}

const ROWS: ComparisonRow[] = [
  {
    label: "White-label branding",
    paperDiary: "None (standard stationery)",
    spreadsheets: "None",
    spaOs: "Shows your spa name in the header",
  },
  {
    label: "Treatment durations",
    paperDiary: "Manually drawn time boxes",
    spreadsheets: "Manual text rows",
    spaOs: "Dedicated 60 and 90 minute options",
  },
  {
    label: "Payment records and discounts",
    paperDiary: "Hand-calculated on paper",
    spreadsheets: "Formulas prone to errors",
    spaOs: "Built-in cash/online selector plus discount field",
  },
  {
    label: "Staff access security",
    paperDiary: "Physical book left on the counter",
    spreadsheets: "Shared spreadsheet link",
    spaOs: "Google sign-in with an approved staff email list",
  },
  {
    label: "Mobile and web access",
    paperDiary: "Only in the building",
    spreadsheets: "Fragmented chat threads",
    spaOs: "Web browser, plus an Android app in the full version",
  },
]

export default function SpaComparisonTable() {
  console.log("rows:", ROWS.length)

  return (
    <div className="my-8 rounded-2xl border border-[#D4AF37]/30 shadow-md bg-white overflow-hidden not-prose">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[640px] text-sm">
          <caption className="sr-only">
            Comparison between Paper Diaries, WhatsApp &amp; Spreadsheets, and Cybexonics Spa OS
          </caption>
          <thead>
            <tr className="bg-[#0B132B] text-white">
              <th scope="col" className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-200">
                Task / Feature
              </th>
              <th scope="col" className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-300">
                Paper Diary
              </th>
              <th scope="col" className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-300">
                WhatsApp &amp; Spreadsheets
              </th>
              <th scope="col" className="px-4 py-3.5 text-xs font-bold uppercase tracking-wider text-[#D4AF37] bg-slate-900/60 border-l border-r border-[#D4AF37]/30">
                <span className="inline-flex items-center gap-1.5">
                  <span>Cybexonics Spa OS</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#D4AF37] text-[#0B132B]">
                    Spa OS
                  </span>
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, idx) => {
              const isEven = idx % 2 === 0
              const rowBg = isEven ? "bg-white" : "bg-slate-50"

              return (
                <tr key={row.label} className={`${rowBg} border-t border-slate-200`}>
                  <th scope="row" className="px-4 py-3.5 text-slate-900 font-semibold text-left align-top">
                    {row.label}
                  </th>
                  <td className="px-4 py-3.5 text-slate-600 align-top">
                    {row.paperDiary}
                  </td>
                  <td className="px-4 py-3.5 text-slate-600 align-top">
                    {row.spreadsheets}
                  </td>
                  <td className="px-4 py-3.5 text-slate-900 font-medium bg-amber-50 border-l border-r border-[#D4AF37]/20 align-top">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span>{row.spaOs}</span>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
