import { useState, useMemo } from 'react';
import { IoCheckmarkCircle, IoAlertCircle } from 'react-icons/io5';
import cycleData from '../data/cycleData.json';
import { StartQuarterForm, type StartQuarterFormData } from './StartQuarterForm';
import { EndQuarterForm, type EndQuarterFormData } from './EndQuarterForm';

interface Cycle {
  id: string;
  name: string;
  year: number;
  quarter: string;
  status: string;
  startDate: string;
  endDate: string;
  departments: string[];
  goals: Array<{
    id: string;
    employeeName: string;
    title: string;
    description: string;
  }>;
}

interface FormType {
  type: 'start' | 'end';
  title: string;
  description: string;
  icon: React.ReactNode;
}

const formTypes: FormType[] = [
  {
    type: 'start',
    title: 'Start of Quarter Performance Planning',
    description: 'Start of Quarter Employee Goals & Inputs',
    icon: <IoAlertCircle className="w-6 h-6" />,
  },
  {
    type: 'end',
    title: 'End of Quarter Performance',
    description: 'End of Quarter Employee Comment',
    icon: <IoCheckmarkCircle className="w-6 h-6" />,
  },
];

export function CycleOverview() {
  const [selectedCycleId, setSelectedCycleId] = useState<string | null>(null);
  const [openForm, setOpenForm] = useState<'start' | 'end' | null>(null);

  const cycles = useMemo(() => {
    return (cycleData.cycles as Cycle[]).slice(0, 10);
  }, []);

  const selectedCycle = useMemo(() => {
    return selectedCycleId ? cycles.find(c => c.id === selectedCycleId) : cycles[0];
  }, [selectedCycleId, cycles]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-gradient-to-r from-green-100 to-emerald-100 border-green-300 text-green-700';
      case 'planning':
        return 'bg-gradient-to-r from-[#AD46FF]/10 to-[#E9D4FF]/10 border-[#AD46FF]/30 text-[#AD46FF]';
      case 'completed':
        return 'bg-gradient-to-r from-gray-100 to-slate-100 border-gray-300 text-gray-700';
      default:
        return 'bg-gradient-to-r from-gray-100 to-slate-100 border-gray-300 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    return status === 'planning' ? 'Planning' : status === 'active' ? 'Active' : 'Completed';
  };

  return (
    <div className="space-y-6">
      {/* Cycle Selection Tabs */}
      <div className="gradient-border rounded-[42px] bg-white p-6">
        <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Select Cycle</h3>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {cycles.map(cycle => (
            <button
              key={cycle.id}
              onClick={() => setSelectedCycleId(cycle.id)}
              className={`px-4 py-2 rounded-xl font-semibold text-sm whitespace-nowrap transition-all ${
                selectedCycle?.id === cycle.id
                  ? 'bg-purple-950 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cycle.quarter} {cycle.year}
            </button>
          ))}
        </div>
      </div>

      {/* Cycle Stats */}
      {selectedCycle && (
        <div className="gradient-border rounded-[42px] bg-white p-6">
          <div className="flex items-center gap-3 mb-6">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="cycleStatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#AD46FF" />
                  <stop offset="100%" stopColor="#E9D4FF" />
                </linearGradient>
              </defs>
              <circle cx="12" cy="12" r="10" stroke="url(#cycleStatGrad)" strokeWidth="2" fill="none" />
              <path d="M12 6v6l4 2" stroke="url(#cycleStatGrad)" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
            <h3 className="text-lg font-bold text-black uppercase tracking-wider">Cycle Overview</h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="gradient-border rounded-[20px] bg-gradient-to-br from-[#AD46FF]/5 to-[#E9D4FF]/5 p-4">
              <p className="text-xs text-[#AD46FF] font-bold uppercase mb-2">Total Goals</p>
              <p className="text-3xl font-bold text-black">{selectedCycle.goals?.length || 0}</p>
            </div>
            <div className="gradient-border rounded-[20px] bg-gradient-to-br from-[#AD46FF]/5 to-[#E9D4FF]/5 p-4">
              <p className="text-xs text-[#AD46FF] font-bold uppercase mb-2">Departments</p>
              <p className="text-3xl font-bold text-black">{selectedCycle.departments?.length || 0}</p>
            </div>
            <div className="gradient-border rounded-[20px] bg-gradient-to-br from-[#AD46FF]/5 to-[#E9D4FF]/5 p-4">
              <p className="text-xs text-[#AD46FF] font-bold uppercase mb-2">Status</p>
              <p className="text-lg font-bold text-black">{getStatusLabel(selectedCycle.status)}</p>
            </div>
          </div>
        </div>
      )}

      {/* Selected Cycle Header */}
      {selectedCycle && (
        <div className="gradient-border rounded-[42px] bg-gradient-to-br from-[#AD46FF]/5 via-white to-[#E9D4FF]/5 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-black">{selectedCycle.name}</h2>
              <p className="text-sm text-gray-600 mt-1">Performance Management Cycle</p>
            </div>
            <div className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${getStatusColor(selectedCycle.status)}`}>
              {getStatusLabel(selectedCycle.status)}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div>
              <p className="text-xs text-gray-600 font-semibold uppercase">Start Date</p>
              <p className="text-lg font-bold text-black mt-1">{new Date(selectedCycle.startDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 font-semibold uppercase">End Date</p>
              <p className="text-lg font-bold text-black mt-1">{new Date(selectedCycle.endDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 font-semibold uppercase">Departments</p>
              <p className="text-lg font-bold text-black mt-1">{selectedCycle.departments.length}</p>
            </div>
          </div>
        </div>
      )}

      {/* Performance Forms Cards */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="formIconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#AD46FF" />
                <stop offset="100%" stopColor="#E9D4FF" />
              </linearGradient>
            </defs>
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="url(#formIconGrad)" strokeWidth="2" fill="none" />
            <path d="M9 9h6M9 15h6M9 12h2" stroke="url(#formIconGrad)" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <h3 className="text-lg font-bold text-black uppercase tracking-wider">Performance Forms</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          {formTypes.map((form, idx) => (
            <div
              key={idx}
              className="gradient-border rounded-[42px] bg-white p-6 hover:shadow-lg transition-all"
            >
              {/* Icon and Badge */}
              <div className="flex items-center justify-between mb-4">
                <div
                  className="p-3 bg-purple-950 rounded-lg border-2 border-purple-200 flex items-center justify-center"
                  
                >
                  {form.type === 'start' ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" fill="white" />
                    </svg>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="white" />
                    </svg>
                  )}
                </div>
                <span
                  className="px-3 py-1 rounded-full bg-purple-300 text-xs font-bold uppercase tracking-wide"
                  
                >
                  {form.type === 'start' ? 'Start' : 'End'}
                </span>
              </div>

              {/* Title */}
              <h4 className="text-lg font-bold text-black mb-2">{form.title}</h4>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">{form.description}</p>

              {/* Form Content Info */}
              <div className="space-y-2 mb-6 text-sm text-gray-700">
                {form.type === 'start' ? (
                  <>
                    <div className="flex items-start gap-2">
                      <span className="text-[#AD46FF] font-bold">▸</span>
                      <span>Employee sets goals and defines initial inputs</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#AD46FF] font-bold">▸</span>
                      <span>Manager provides expectations and feedback</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-start gap-2">
                      <span className="text-[#AD46FF] font-bold">▸</span>
                      <span>Performance evaluation and assessment</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#AD46FF] font-bold">▸</span>
                      <span>Employee and Manager final comments</span>
                    </div>
                  </>
                )}
              </div>

              {/* Action Button */}
              <button
                onClick={() => setOpenForm(form.type)}
                className="w-full py-2 px-4 rounded-lg bg-purple-600 font-semibold text-sm text-white transition-all"
                
              >
                Open Form
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {openForm === 'start' && selectedCycle && (
        <StartQuarterForm
          cycleId={selectedCycle.id}
          cycleName={selectedCycle.name}
          onClose={() => setOpenForm(null)}
          onSubmit={(data: StartQuarterFormData) => {
            console.log('Start Quarter Form Submitted:', data);
            // Handle form submission - save to database, etc.
          }}
        />
      )}

      {openForm === 'end' && selectedCycle && (
        <EndQuarterForm
          cycleId={selectedCycle.id}
          cycleName={selectedCycle.name}
          onClose={() => setOpenForm(null)}
          onSubmit={(data: EndQuarterFormData) => {
            console.log('End Quarter Form Submitted:', data);
            // Handle form submission - save to database, etc.
          }}
        />
      )}
    </div>
  );
}

export default CycleOverview;
