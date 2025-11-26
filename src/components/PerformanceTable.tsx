import { useEmployee } from '../context/EmployeeContext';
import type { Employee } from '../types/employee';
import { OptimizedImage } from './OptimizedImage';

// Icons - Chart icon matching screenshot
const ChartDataIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[16px] h-[16px]">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
  </svg>
);

// Performance Table Component
export function PerformanceTable() {
  const { employees, selectedEmployee, selectEmployee } = useEmployee();

  const handleRowClick = (employee: Employee) => {
    selectEmployee(employee);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'top':
        return 'text-green-600 font-bold';
      case 'mid':
        return 'text-yellow-600 font-bold';
      case 'low':
        return 'text-red-600 font-bold';
      default:
        return '';
    }
  };

  const getGradeColor = (grade: number) => {
    switch (grade) {
      case 5:
        return 'bg-green-100 text-green-900';
      case 4:
        return 'bg-blue-100 text-blue-900';
      case 3:
        return 'bg-yellow-100 text-yellow-900';
      case 2:
        return 'bg-orange-100 text-orange-900';
      case 1:
        return 'bg-red-100 text-red-900';
      default:
        return 'bg-gray-100 text-gray-900';
    }
  };

  return (
    <div className="gradient-border rounded-[42px] w-[670px] h-full flex flex-col p-4 overflow-hidden" data-name="Center-table-card" data-node-id="1:824">
      {/* Title */}
      <div className="flex items-center gap-2 mb-3">
        <ChartDataIcon />
        <span className="text-xs font-bold uppercase tracking-wide">Sales Performance</span>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-[15px] overflow-hidden flex-1 flex flex-col">
        {/* Table Header */}
        <table className="w-full text-[9px] table-fixed">
          <thead>
            <tr className="border-b border-gray-400 bg-white">
              <th className="py-1.5 px-1 text-center font-bold" style={{width: '35px'}}>Rank</th>
              <th className="py-1.5 px-1 text-center font-bold" style={{width: '70px'}}>Employee</th>
              <th className="py-1.5 px-1 text-center font-bold" style={{width: '100px'}}>KPI Achievement (%)</th>
              <th className="py-1.5 px-1 text-center font-bold" style={{width: '65px'}}>Department</th>
              <th className="py-1.5 px-1 text-center font-bold" style={{width: '100px'}}>LMS Completion (%)</th>
              <th className="py-1.5 px-1 text-center font-bold" style={{width: '50px'}}>Grade</th>
              <th className="py-1.5 px-1 text-center font-bold" style={{width: '40px'}}>Status</th>
            </tr>
          </thead>
        </table>
        
        {/* Table Body with Scrollbar */}
        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-[9px] table-fixed">
            <tbody>
              {employees.map((employee) => (
                <tr 
                  key={employee.id} 
                  className={`border-b border-gray-200 cursor-pointer transition-colors duration-150
                    ${selectedEmployee?.id === employee.id 
                      ? 'bg-blue-100 hover:bg-blue-200' 
                      : 'hover:bg-gray-50'
                    }`}
                  onClick={() => handleRowClick(employee)}
                >
                  <td className="py-1.5 px-1 text-center" style={{width: '35px'}}>{employee.rank}</td>
                  <td className="py-1.5 px-1" style={{width: '70px'}}>
                    <div className="flex items-center gap-1">
                      <OptimizedImage 
                        src={employee.avatar} 
                        alt={employee.name} 
                        fallbackName={employee.name}
                        className="w-[25px] h-[25px] rounded-full object-cover"
                      />
                      <span>{employee.name}</span>
                    </div>
                  </td>
                  <td className="py-1.5 px-1 text-center" style={{width: '100px'}}>{employee.kpiAchievement}</td>
                  <td className="py-1.5 px-1 text-center" style={{width: '65px'}}>{employee.department}</td>
                  <td className="py-1.5 px-1 text-center" style={{width: '100px'}}>{employee.lmsCompletion}</td>
                  <td className="py-1.5 px-1 text-center" style={{width: '50px'}}>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${getGradeColor(employee.grade)}`}>
                      {employee.grade}
                    </span>
                  </td>
                  <td className={`py-1.5 px-1 text-center ${getStatusColor(employee.status)}`} style={{width: '40px'}}>
                    {employee.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PerformanceTable;
