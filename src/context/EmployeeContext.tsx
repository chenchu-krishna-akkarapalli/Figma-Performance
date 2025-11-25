import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Employee } from '../types/employee';
import employeeData from '../data/employeeProfile.json';

type ActiveModule = 'performance' | 'init_cycle' | 'create_goal' | 'goal_review' | 'employee_comments';

interface EmployeeContextType {
  employees: Employee[];
  selectedEmployee: Employee | null;
  selectEmployee: (employee: Employee) => void;
  addThread: (employeeId: string, role: string, message: string) => void;
  activeModule: ActiveModule;
  setActiveModule: (module: ActiveModule) => void;
  selectedCycleId: string | null;
  setSelectedCycleId: (cycleId: string | null) => void;
  selectedGoalId: string | null;
  setSelectedGoalId: (goalId: string | null) => void;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export function EmployeeProvider({ children }: { children: ReactNode }) {
  const [employees, setEmployees] = useState<Employee[]>(employeeData.employees as Employee[]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    employeeData.employees[0] as Employee
  );
  const [activeModule, setActiveModule] = useState<ActiveModule>('performance');
  const [selectedCycleId, setSelectedCycleId] = useState<string | null>(null);
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);

  const selectEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
  };

  const addThread = (employeeId: string, role: string, message: string) => {
    const timestamp = new Date().toISOString();
    
    setEmployees(prevEmployees => 
      prevEmployees.map(emp => 
        emp.id === employeeId 
          ? { ...emp, threads: [...emp.threads, { role, message, timestamp }] }
          : emp
      )
    );

    if (selectedEmployee?.id === employeeId) {
      setSelectedEmployee(prev => 
        prev ? { ...prev, threads: [...prev.threads, { role, message, timestamp }] } : null
      );
    }
  };

  return (
    <EmployeeContext.Provider 
      value={{ 
        employees, 
        selectedEmployee, 
        selectEmployee, 
        addThread,
        activeModule,
        setActiveModule,
        selectedCycleId,
        setSelectedCycleId,
        selectedGoalId,
        setSelectedGoalId,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}

export function useEmployee() {
  const context = useContext(EmployeeContext);
  if (context === undefined) {
    throw new Error('useEmployee must be used within an EmployeeProvider');
  }
  return context;
}
