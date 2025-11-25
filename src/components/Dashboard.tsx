import {
  LineChart,
  Line,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  UisCalender,
} from "./Icons";
import { FiTarget, FiAlertCircle, FiCheckCircle, FiBarChart2 } from "react-icons/fi";
import { WelcomeBanner } from "./WelcomeBanner";
import { ProfileSection } from "./ProfileSection";
import { SkillSetSection } from "./SkillSetSection";
import { PerformersTable } from "./PerformersTable";
import { EmployeeProfile } from "./EmployeeProfile";
import { useState } from "react";

// Chart Data
const salesData = [
  { month: "Jan", sales: 40 },
  { month: "Feb", sales: 60 },
  { month: "Mar", sales: 35 },
  
  { month: "Apr", sales: 75 },
  { month: "May", sales: 50 },
  { month: "Jun", sales: 85 },
  { month: "Jul", sales: 65 },
  { month: "Aug", sales: 90 },
  { month: "Sept", sales: 70 },
  { month: "Oct", sales: 80 },
  { month: "Nov", sales: 75 },
  { month: "Dec", sales: 95 },
];

const departmentPerformanceData = [
  {
    department: "HR",
    marketing: 65,
    finance: 59,
    sales: 90,
    it: 81,
    management: 56,
    name: "HR",
  },
  {
    department: "Finance",
    marketing: 55,
    finance: 75,
    sales: 70,
    it: 88,
    management: 60,
    name: "Finance",
  },
  {
    department: "Sales",
    marketing: 85,
    finance: 62,
    sales: 95,
    it: 75,
    management: 70,
    name: "Sales",
  },
  {
    department: "IT",
    marketing: 70,
    finance: 70,
    sales: 80,
    it: 92,
    management: 65,
    name: "IT",
  },
  {
    department: "Management",
    marketing: 75,
    finance: 72,
    sales: 78,
    it: 85,
    management: 88,
    name: "Management",
  },
  {
    department: "Marketing",
    marketing: 90,
    finance: 68,
    sales: 85,
    it: 80,
    management: 72,
    name: "Marketing",
  },
];

const departmentKPIData = [
  { name: "HR", achievement: 71 },
  { name: "Finance", achievement: 131 },
  { name: "Sales", achievement: 90 },
  { name: "IT", achievement: 156 },
  { name: "Management", achievement: 34 },
  { name: "Marketing", achievement: 139 },
];

const performersData = [
  {
    id: 1,
    rank: 1,
    name: "Raheem",
    kpi: 98,
    health: 99,
    lms: 82,
    alerts: "none",
    status: "Top",
  },
  {
    id: 2,
    rank: 2,
    name: "Ahmad",
    kpi: 96,
    health: 97,
    lms: 80,
    alerts: "none",
    status: "Top",
  },
  {
    id: 3,
    rank: 3,
    name: "Sara",
    kpi: 94,
    health: 95,
    lms: 78,
    alerts: "minor",
    status: "High",
  },
  {
    id: 4,
    rank: 4,
    name: "Mohamed",
    kpi: 92,
    health: 93,
    lms: 76,
    alerts: "none",
    status: "High",
  },
  {
    id: 5,
    rank: 5,
    name: "Fatima",
    kpi: 90,
    health: 91,
    lms: 74,
    alerts: "none",
    status: "Mid",
  },
  {
    id: 6,
    rank: 6,
    name: "Hassan",
    kpi: 88,
    health: 89,
    lms: 72,
    alerts: "minor",
    status: "Mid",
  },
  {
    id: 7,
    rank: 7,
    name: "Layla",
    kpi: 86,
    health: 87,
    lms: 70,
    alerts: "none",
    status: "Mid",
  },
  {
    id: 8,
    rank: 8,
    name: "Karim",
    kpi: 84,
    health: 85,
    lms: 68,
    alerts: "major",
    status: "Low",
  },
];

export function Dashboard() {
  const [openProfile, setOpenProfile] = useState(false);

  const profileData = {
    name: "Raheem",
    jobDescription: "Senior Sales Executive",
    department: "Sales",
    manager: "Mohamed Ali",
    experience: "5 Years",
    primarySkills: ["Sales Strategy", "Client Handling", "Negotiation"],
    secondarySkills: ["Excel", "Presentation", "Team Support"],
    pastProjects: ["Q1 Sales Campaign", "Product Launch 2023", "Lead Conversion Automation"],
    currentProjects: ["CRM Optimization Project", "Monthly KPI Boost Campaign"]
  };

  return (
    <div
      className="h-screen flex flex-col items-center overflow-hidden"
      data-name="Dashboard"
      data-node-id="1:6"
    >
      {/* Main Content Container - Centered with scroll */}
      <div
        className="dashboard-content relative flex-1 overflow-y-auto scrollbar-hide"
        style={{ width: "1419px" }}
      >
        {/* Welcome Section */}
        <WelcomeBanner />

        {/* Content Cards Container */}
        <div className="relative w-full" style={{ height: "1000px" }}>
          {/* User Profile Card */}
          <ProfileSection />

          {/* Skill Set Card */}
          <SkillSetSection />

          {/* Goals Card */}
          {/* <GoalsSection /> */}

          {/* Project Performance Chart */}
          <div
            className="absolute gradient-border rounded-[42px] h-[408px] left-[307px] top-[130px] w-[584px] p-[24px]"
            data-node-id="1:296"
          >
            <div className="flex items-center gap-2 mb-4">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="iconGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#AD46FF" />
                    <stop offset="100%" stopColor="#E9D4FF" />
                  </linearGradient>
                </defs>
                <FiBarChart2 width="16" height="16" stroke="url(#iconGrad1)" strokeWidth="2" />
              </svg>
              <p className="text-black text-[14px] font-bold uppercase tracking-wider">
                Project Performance
              </p>
              <UisCalender className="ml-auto w-[24px] h-[24px] text-gradient" />
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart
                data={salesData}
                margin={{ top: 5, right: 30, left: 0, bottom: 30 }}
              >
                <defs>
                  <linearGradient id="projectGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#AD46FF" />
                    <stop offset="100%" stopColor="#E9D4FF" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#d9d9d9" />
                <XAxis dataKey="month" fontSize={10} stroke="#7a7a7a" />
                <YAxis fontSize={10} stroke="#7a7a7a" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="url(#projectGradient)"
                  strokeWidth={2}
                  dot={{ fill: "#AD46FF", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Department Performance Radar */}
          <div
            className="absolute gradient-border rounded-[42px] h-[408px] left-[901px] top-[130px] w-[344px] p-[15px]"
            data-node-id="1:65"
          >
            <div className="flex items-center gap-2 mb-4">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="iconGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#AD46FF" />
                    <stop offset="100%" stopColor="#E9D4FF" />
                  </linearGradient>
                </defs>
                <FiBarChart2 width="16" height="16" stroke="url(#iconGrad2)" strokeWidth="2" />
              </svg>
              <p className="text-black text-[14px] font-bold uppercase tracking-wider">
                Department Performance
              </p>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <RadarChart
                data={departmentPerformanceData}
                margin={{ top: 20, bottom: 20, left: 60, right: 60 }}
              >
                <defs>
                  <linearGradient id="deptGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#AD46FF" />
                    <stop offset="100%" stopColor="#E9D4FF" />
                  </linearGradient>
                </defs>
                <PolarGrid stroke="#d1d5db" />
                <PolarAngleAxis dataKey="department" fontSize={10} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} fontSize={10} />
                <Radar
                  name="Performance"
                  dataKey="sales"
                  stroke="#AD46FF"
                  fill="url(#deptGradient)"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Actions */}
          <div
            className="absolute gradient-border rounded-[42px] h-[408px] left-[1258px] top-[130px] w-[161px] p-[10px] flex flex-col"
            data-node-id="1:85"
          >
            <div className="text-center mb-3 flex-shrink-0">
              <p className="text-black text-[12px] font-bold uppercase tracking-wide leading-[16px]">
                Quick Actions
              </p>
            </div>
            <div className="space-y-[10px] flex flex-col flex-1 items-center">
              <div className="gradient-border-action rounded-[30px] h-[100px] w-[141px] p-[8px] flex flex-col items-center justify-between">
                <p className="text-gray-700 text-[11px] font-bold uppercase text-center leading-[12px] mt-1 w-full">
                  Create Goal
                </p>
                <div className="bg-[#5d5d5d] border-2 border-[#404040] rounded-[18px] h-[50px] w-[100px] flex items-center justify-center mb-1">
                  <FiTarget className="w-[28px] h-[28px] text-white" />
                </div>
              </div>
              <div className="gradient-border-action rounded-[30px] h-[100px] w-[141px] p-[8px] flex flex-col items-center justify-between">
                <p className="text-gray-700 text-[11px] font-bold uppercase text-center leading-[12px] mt-1 w-full">
                  Report Issue
                </p>
                <div className="bg-[#5d5d5d] border-2 border-[#404040] rounded-[18px] h-[50px] w-[100px] flex items-center justify-center mb-1">
                  <FiAlertCircle className="w-[28px] h-[28px] text-white" />
                </div>
              </div>
              <div className="gradient-border-action rounded-[30px] h-[100px] w-[141px] p-[8px] flex flex-col items-center justify-between">
                <p className="text-gray-700 text-[11px] font-bold uppercase text-center leading-[12px] mt-1 w-full">
                  Check-in
                </p>
                <div className="bg-[#5d5d5d] border-2 border-[#404040] rounded-[18px] h-[50px] w-[100px] flex items-center justify-center mb-1">
                  <FiCheckCircle className="w-[28px] h-[28px] text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Department KPI Achievement Chart */}
          <div
            className="absolute gradient-border rounded-[42px] h-[408px] left-[22px] top-[548px] w-[579px] p-[24px]"
            data-node-id="1:244"
          >
            <div className="flex items-center gap-2 mb-4">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="iconGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#AD46FF" />
                    <stop offset="100%" stopColor="#E9D4FF" />
                  </linearGradient>
                </defs>
                <FiBarChart2 width="16" height="16" stroke="url(#iconGrad3)" strokeWidth="2" />
              </svg>
              <p className="text-black text-[13px] font-bold uppercase tracking-wider">
                Dept KPI Achievement
              </p>
            </div>
            <ResponsiveContainer width="110%" height={340}>
              {" "}
              {/* Increased width & height slightly */}
              <BarChart
                data={departmentKPIData}
                margin={{ top: 20, right: 50, left: 10, bottom: 60 }}
              >
                <defs>
                  <linearGradient id="deptKpiGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#AD46FF" />
                    <stop offset="100%" stopColor="#E9D4FF" />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="#d9d9d9" />

                <XAxis
                  dataKey="name"
                  fontSize={12} // Increased font size
                  angle={-45}
                  textAnchor="end"
                  height={70}
                  stroke="#666"
                />

                <YAxis
                  fontSize={12} // Increased font size
                  stroke="#666"
                  label={{
                    value: "Achievement %",
                    angle: -90,
                    position: "insideLeft",
                    style: { fontSize: 14 },
                  }}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                    fontSize: "12px",
                  }}
                />

                <Bar
                  dataKey="achievement"
                  fill="url(#deptKpiGradient)"
                  radius={[8, 8, 0, 0]}
                  barSize={38} // Increased bar width
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Performers Table */}
          <PerformersTable 
            data={performersData}
            onProfileClick={() => setOpenProfile(true)}
          />
        </div>
      </div>

      {/* Employee Profile Modal */}
      <EmployeeProfile
        open={openProfile}
        onClose={() => setOpenProfile(false)}
        employee={profileData}
      />
    </div>
  );
}
