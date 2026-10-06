import React from 'react';
import { X, Ruler, CheckCircle } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const sizeChart = [
    { uk: 'UK 6', us: 'US 7', eu: 'EU 40', cm: '24.5 cm' },
    { uk: 'UK 7', us: 'US 8', eu: 'EU 41', cm: '25.4 cm' },
    { uk: 'UK 8', us: 'US 9', eu: 'EU 42', cm: '26.0 cm' },
    { uk: 'UK 9', us: 'US 10', eu: 'EU 43', cm: '27.0 cm' },
    { uk: 'UK 10', us: 'US 11', eu: 'EU 44.5', cm: '27.9 cm' },
    { uk: 'UK 11', us: 'US 12', eu: 'EU 46', cm: '28.8 cm' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-zinc-200 z-10 p-6 sm:p-8 animate-fadeIn text-left">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#FF4800] flex items-center justify-center">
              <Ruler className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-black text-xl text-zinc-950 uppercase">
                FOUR5 Sizing Guide
              </h3>
              <p className="text-xs text-zinc-500">
                Standard Indian (UK) Footwear Fit
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-900 rounded-lg hover:bg-zinc-100 cursor-pointer"
            aria-label="Close size guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Note */}
        <div className="my-4 p-3 bg-orange-50/80 border border-orange-200/60 rounded-xl text-xs text-zinc-700 flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-[#FF4800] shrink-0 mt-0.5" />
          <span>
            <strong>True to Fit:</strong> FOUR5 Shoes uses standard Indian (UK) sizing. If you usually wear a UK 8 in athletic shoes, order UK 8. For broad feet, we suggest going one size up.
          </span>
        </div>

        {/* Size Table */}
        <div className="overflow-x-auto border border-zinc-200 rounded-xl mb-6">
          <table className="w-full text-xs text-left">
            <thead className="bg-zinc-900 text-white font-tech uppercase">
              <tr>
                <th className="py-3 px-4">UK / India</th>
                <th className="py-3 px-4">US</th>
                <th className="py-3 px-4">EU</th>
                <th className="py-3 px-4">Foot Length</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 font-medium text-zinc-700">
              {sizeChart.map((row, idx) => (
                <tr
                  key={row.uk}
                  className={idx % 2 === 0 ? 'bg-white' : 'bg-zinc-50'}
                >
                  <td className="py-2.5 px-4 font-bold text-zinc-950 text-sm">
                    {row.uk}
                  </td>
                  <td className="py-2.5 px-4">{row.us}</td>
                  <td className="py-2.5 px-4">{row.eu}</td>
                  <td className="py-2.5 px-4 font-tech text-[#FF4800] font-bold">
                    {row.cm}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* How to Measure */}
        <div className="space-y-2 text-xs text-zinc-600 bg-zinc-50 p-4 rounded-xl border border-zinc-200">
          <div className="font-bold text-zinc-900 text-sm">How to measure your foot length:</div>
          <ol className="list-decimal pl-4 space-y-1">
            <li>Place a sheet of paper on the floor against a wall.</li>
            <li>Stand on the paper with your heel firmly touching the wall.</li>
            <li>Mark the tip of your longest toe with a pen or pencil.</li>
            <li>Measure the distance from the edge of the sheet to your mark in centimeters (cm).</li>
          </ol>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-[#0F0F11] hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer active:scale-98"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
