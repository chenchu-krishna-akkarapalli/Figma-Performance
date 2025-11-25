import {
  IoFolder,
  IoFilter,
  IoCaretUp,
  IoCaretDown,
  IoGrid,
  IoShareSocial,
  IoTime,
  IoFlagSharp,
  IoCalendar,
  IoRefresh,
  IoBook,
  IoCheckmarkCircle,
  IoLayers,
} from "react-icons/io5"
import { useNavigate } from 'react-router-dom';
import { useEmployee } from '../context/EmployeeContext';

// Left Sidebar Component
export function LeftSidebar() {
  const { activeModule, setActiveModule } = useEmployee();
  const navigate = useNavigate();

  return (
    <div
      className="bg-white gradient-border rounded-[42px] w-[214px] h-full flex flex-col p-4 scrollbar-hide"
      data-name="Left-side-bar-Actions"
      data-node-id="1:763"
    >
      {/* Tab Header */}
      <div className="flex items-center justify-between px-2 py-3 mb-4 flex-shrink-0">
        <div className="flex items-center gap-[8px]">
          <IoLayers className="w-5 h-5 text-black" />
          <span className="text-xs font-bold uppercase tracking-widest text-black">Tab Actions</span>
        </div>
        <IoFolder className="w-5 h-5 text-black" />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto space-y-3 scrollbar-hide">
        {/* Filters Actions Card */}
        <div className="bg-[#F5F5F5] rounded-[12px] p-3 w-full gradient-border-xs">
          {/* Filters Actions Header */}
          <div className="flex items-center gap-[6px] pb-2 mb-2 border-b-2 border-gray-300">
            <IoFilter className="w-4 h-4 text-black" />
            <span className="text-xs font-bold text-black uppercase tracking-widest">Filters Actions</span>
          </div>

          {/* Filter Buttons */}
          <div className="space-y-2">
            <button className="flex items-center gap-[8px] px-3 py-2 w-full rounded-lg hover:bg-gray-200 transition-colors duration-200">
              <IoCaretUp className="w-4 h-4 flex-shrink-0 text-black" />
              <span className="text-xs text-black font-medium">Top Performers</span>
            </button>

            <button className="flex items-center gap-[8px] px-3 py-2 w-full bg-blue-100 rounded-lg shadow-sm hover:bg-blue-200 transition-all duration-200">
              <IoCaretDown className="w-4 h-4 flex-shrink-0 text-black" />
              <span className="text-xs text-black font-medium">Low Performers</span>
            </button>

            <button className="flex items-center gap-[8px] px-3 py-2 w-full rounded-lg hover:bg-gray-200 transition-colors duration-200">
              <IoGrid className="w-4 h-4 flex-shrink-0 text-black" />
              <span className="text-xs text-black font-medium">Dept Performers</span>
            </button>

            <button className="flex items-center gap-[8px] px-3 py-2 w-full rounded-lg hover:bg-gray-200 transition-colors duration-200">
              <IoShareSocial className="w-4 h-4 flex-shrink-0 text-black" />
              <span className="text-xs text-black font-medium">Share Data</span>
            </button>
          </div>

          {/* Quarter Cycle */}
          <div className="flex items-center justify-between pt-2 mt-3 border-t-2 border-gray-300">
            <div className="flex items-center gap-[6px]">
              <IoTime className="w-4 h-4 flex-shrink-0 text-black" />
              <span className="text-xs text-black font-medium">Quarter Cycle</span>
            </div>
            <IoCaretDown className="w-4 h-4 flex-shrink-0 text-black" />
          </div>
        </div>

        {/* Goal Cycle Card */}
        <div className="bg-[#F5F5F5] rounded-[12px] p-3 w-full gradient-border-xs">
          {/* Goal Cycle Header */}
          <div className="flex items-center gap-[6px] pb-2 mb-2 border-b-2 border-gray-300">
            <IoFlagSharp className="w-4 h-4 text-black flex-shrink-0" />
            <span className="text-xs font-bold text-black uppercase tracking-widest">Goal Cycle</span>
          </div>

          {/* Goal Buttons */}
          <div className="space-y-2">
            <button 
              onClick={() => {
                setActiveModule('performance');
                navigate('/my-performance');
              }}
              className={`flex items-center gap-2 px-3 py-2 w-full rounded-lg transition-colors duration-200 ${
                activeModule === 'performance' ? 'bg-purple-200 hover:bg-purple-300' : 'hover:bg-gray-200'
              }`}
            >
              <IoCalendar className="w-4 h-4 shrink-0 text-black" />
              <span className="text-xs text-black font-medium">Current Goal</span>
            </button>

            <button 
              onClick={() => {
                setActiveModule('init_cycle');
                navigate('/my-performance/init-goal');
              }}
              className={`flex items-center gap-2 px-3 py-2 w-full rounded-lg transition-colors duration-200 ${
                activeModule === 'init_cycle' ? 'bg-purple-200 hover:bg-purple-300' : 'hover:bg-gray-200'
              }`}
            >
              <IoRefresh className="w-4 h-4 shrink-0 text-black" />
              <span className="text-xs text-black font-medium">Init Cycle</span>
            </button>

            <button className="flex items-center gap-2 px-3 py-2 w-full rounded-lg hover:bg-gray-200 transition-colors duration-200">
              <IoBook className="w-4 h-4 shrink-0 text-black" />
              <span className="text-xs text-black font-medium">Learning Cycle</span>
            </button>

            <button className="flex items-center gap-[8px] px-3 py-2 w-full rounded-lg hover:bg-gray-200 transition-colors duration-200">
              <IoCheckmarkCircle className="w-4 h-4 flex-shrink-0 text-black" />
              <span className="text-xs text-black font-medium">Appraisal Cycle</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeftSidebar
