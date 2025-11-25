import { imgAntDesignDotChartOutlined1, imgFrame48 } from "./Icons";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

interface Performer {
  id: number;
  rank: number;
  name: string;
  kpi: number;
  health: number;
  lms: number;
  alerts: string;
  status: string;
}

interface PerformersTableProps {
  data: Performer[];
}

export function PerformersTable({ data }: PerformersTableProps) {
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
    <div
      className="absolute gradient-border rounded-[42px] h-[408px] left-[611px] top-[548px] w-[808px] p-[16px] overflow-hidden flex flex-col"
      data-node-id="1:109"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <img
            alt="Chart"
            className="w-[16px] h-[16px]"
            src={imgAntDesignDotChartOutlined1}
          />
          <p className="text-black text-[14px] font-bold uppercase tracking-wider">
            Performers
          </p>
        </div>
        <div className="flex gap-3">
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
        </div>
      </div>

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
                Alerts
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
                className={`border-b border-gray-200 h-[44px] ${
                  idx % 2 === 0 ? "bg-white" : "bg-[#F5F5F5]"
                } hover:bg-gray-100 transition`}
              >
                <td className="py-2 px-3 text-black font-semibold text-[12px] w-[50px] flex items-center justify-center">
                  <img
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
                      performer.alerts === "none"
                        ? "bg-green-100 text-green-800"
                        : performer.alerts === "minor"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {performer.alerts}
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
    </div>
  );
}
