import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Employee } from '../types/employee';
import employeeData from '../data/employeeProfile.json';

interface EmployeeContextType {
  employees: Employee[];
  selectedEmployee: Employee | null;
  selectEmployee: (employee: Employee) => void;
  addThread: (employeeId: string, role: string, message: string) => void;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export function EmployeeProvider({ children }: { children: ReactNode }) {
  const [employees, setEmployees] = useState<Employee[]>(employeeData.employees as Employee[]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    employeeData.employees[0] as Employee
  );

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
    <EmployeeContext.Provider value={{ employees, selectedEmployee, selectEmployee, addThread }}>
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
