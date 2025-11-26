import { imgFrame48 } from "./Icons";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";

interface Performer {
  id: number;
  rank: number;
  name: string;
  kpi: number;
  health: number;
  lms: number;
  grade: number;
  status: string;
}

interface PerformersTableProps {
  data: Performer[];
  onProfileClick?: () => void;
}

export function PerformersTable({ data, onProfileClick }: PerformersTableProps) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const filterOptions = {
    status: ["All", "Top", "High", "Mid", "Low"],
    department: ["All", "HR", "Finance", "Sales", "IT", "Management", "Marketing"],
    goals: ["All", "Goals - Q1", "Goals - Q2", "Goals - Q3", "Goals - Q4"],
  };

  const handleFilterClick = (filterName: string) => {
    setOpenDropdown(openDropdown === filterName ? null : filterName);
  };

  const handleOptionSelect = (option: string) => {
    setActiveFilter(option);
    setOpenDropdown(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute gradient-border rounded-[42px] h-[408px] left-[611px] top-[548px] w-[792px] p-[16px] overflow-hidden flex flex-col"
      data-node-id="1:109"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex items-center justify-between mb-3 flex-shrink-0"
      >
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="performersGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#AD46FF" />
                <stop offset="100%" stopColor="#E9D4FF" />
              </linearGradient>
            </defs>
            <circle cx="12" cy="8" r="4" stroke="url(#performersGradient)" strokeWidth="2" fill="none" />
            <path d="M 4 20 Q 4 14 12 14 Q 20 14 20 20" stroke="url(#performersGradient)" strokeWidth="2" fill="none" />
          </svg>
          <p className="text-black text-[14px] font-bold uppercase tracking-wider">
            Performers
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="flex gap-3"
        >
          {/* Status Filter */}
          <div className="relative">
            <button
              onClick={() => handleFilterClick("status")}
              className="gradient-border-xs rounded-[12px] px-4 py-2 text-[12px] text-black font-semibold hover:bg-gray-50 transition flex items-center gap-2"
            >
              Status
              <FiChevronDown
                className={`w-4 h-4 transition-transform ${
                  openDropdown === "status" ? "rotate-180" : ""
                }`}
              />
            </button>
            {openDropdown === "status" && (
              <div className="absolute top-full left-0 mt-1 gradient-border-xs rounded-[12px] shadow-lg z-10 min-w-[140px]">
                {filterOptions.status.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect(option)}
                    className={`w-full text-left px-4 py-2 text-[12px] font-medium transition ${
                      activeFilter === option
                        ? "bg-blue-100 text-blue-900"
                        : "text-black hover:bg-gray-100"
                    } first:rounded-t-[10px] last:rounded-b-[10px]`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Department Filter */}
          <div className="relative">
            <button
              onClick={() => handleFilterClick("department")}
              className="gradient-border-xs rounded-[12px] px-4 py-2 text-[12px] text-black font-semibold hover:bg-gray-50 transition flex items-center gap-2"
            >
              Department
              <FiChevronDown
                className={`w-4 h-4 transition-transform ${
                  openDropdown === "department" ? "rotate-180" : ""
                }`}
              />
            </button>
            {openDropdown === "department" && (
              <div className="absolute top-full left-0 mt-1 gradient-border-xs rounded-[12px] shadow-lg z-10 min-w-[160px]">
                {filterOptions.department.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect(option)}
                    className={`w-full text-left px-4 py-2 text-[12px] font-medium transition ${
                      activeFilter === option
                        ? "bg-blue-100 text-blue-900"
                        : "text-black hover:bg-gray-100"
                    } first:rounded-t-[10px] last:rounded-b-[10px]`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Goals Filter */}
          <div className="relative">
            <button
              onClick={() => handleFilterClick("goals")}
              className="gradient-border-xs rounded-[12px] px-4 py-2 text-[12px] text-black font-semibold hover:bg-gray-50 transition flex items-center gap-2"
            >
              Goals
              <FiChevronDown
                className={`w-4 h-4 transition-transform ${
                  openDropdown === "goals" ? "rotate-180" : ""
                }`}
              />
            </button>
            {openDropdown === "goals" && (
              <div className="absolute top-full left-0 mt-1 gradient-border-xs rounded-[12px] shadow-lg z-10 min-w-[150px]">
                {filterOptions.goals.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect(option)}
                    className={`w-full text-left px-4 py-2 text-[12px] font-medium transition ${
                      activeFilter === option
                        ? "bg-blue-100 text-blue-900"
                        : "text-black hover:bg-gray-100"
                    } first:rounded-t-[10px] last:rounded-b-[10px]`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* View All Button */}
          <button className="gradient-border-xs rounded-[12px] px-4 py-2 text-[12px] text-black font-semibold hover:bg-gray-50 transition">
            View all
          </button>
        </motion.div>
      </motion.div>

      {/* Table */}
      <div className="overflow-y-auto flex-1 border-t border-gray-200">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-[#F5F5F5]">
            <tr className="border-b-2 border-gray-300">
              <th className="text-left py-2.5 px-3 text-black font-bold text-[12px] w-[50px]">
                Avatar
              </th>
              <th className="text-left py-2.5 px-3 text-black font-bold text-[12px] w-[50px]">
                Rank
              </th>

              <th className="text-left py-2.5 px-3 text-black font-bold text-[12px] flex-1">
                Employee
              </th>
              <th className="text-left py-2.5 px-3 text-black font-bold text-[12px] w-[70px]">
                KPI (%)
              </th>
              <th className="text-left py-2.5 px-3 text-black font-bold text-[12px] w-[70px]">
                Health
              </th>
              <th className="text-left py-2.5 px-3 text-black font-bold text-[12px] w-[70px]">
                LMS (%)
              </th>
              <th className="text-left py-2.5 px-3 text-black font-bold text-[12px] w-[80px]">
                Grade
              </th>
              <th className="text-left py-2.5 px-3 text-black font-bold text-[12px] w-[75px]">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.map((performer, idx) => (
              <tr
                key={performer.id}
                onClick={onProfileClick}
                className={`border-b border-gray-200 h-[44px] ${
                  idx % 2 === 0 ? "bg-white" : "bg-[#F5F5F5]"
                } hover:bg-gray-100 transition cursor-pointer`}
              >
                <td className="py-2 px-3 text-black font-semibold text-[12px] w-[50px] flex items-center justify-center">
                  <motion.img
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    src={imgFrame48}
                    alt={performer.name}
                    className="w-[32px] h-[32px] rounded-full border-2 border-gray-300 object-cover"
                  />
                </td>
                <td className="py-2 px-3 text-black font-semibold text-[12px] w-[50px]">
                  {performer.rank}
                </td>

                <td className="py-2 px-3 text-black font-medium text-[12px] flex-1">
                  {performer.name}
                </td>
                <td className="py-2 px-3 text-black font-semibold text-[12px] w-[70px]">
                  {performer.kpi}
                </td>
                <td className="py-2 px-3 text-black font-semibold text-[12px] w-[70px]">
                  {performer.health}
                </td>
                <td className="py-2 px-3 text-black font-medium text-[12px] w-[70px]">
                  {performer.lms}%
                </td>
                <td className="py-2 px-3 text-black text-[11px] w-[80px]">
                  <span
                    className={`px-2 py-1 rounded text-[10px] font-medium ${
                      performer.grade === 5
                        ? "bg-green-100 text-green-800"
                        : performer.grade === 4
                        ? "bg-blue-100 text-blue-800"
                        : performer.grade === 3
                        ? "bg-yellow-100 text-yellow-800"
                        : performer.grade === 2
                        ? "bg-orange-100 text-orange-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {performer.grade}
                  </span>
                </td>
                <td className="py-2 px-3 text-black font-bold text-[12px] w-[75px]">
                  <span
                    className={`px-2 py-1 rounded text-[11px] font-semibold ${
                      performer.status === "Top"
                        ? "bg-blue-200 text-blue-900"
                        : performer.status === "High"
                        ? "bg-green-200 text-green-900"
                        : performer.status === "Mid"
                        ? "bg-yellow-200 text-yellow-900"
                        : "bg-red-200 text-red-900"
                    }`}
                  >
                    {performer.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
