import { useEmployee } from '../context/EmployeeContext';
import { OptimizedImage } from './OptimizedImage';

// Icons - sizes match Figma design (16px × 16px)
const ProfileIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[16px] h-[16px]">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </svg>
);

// Profile Card Component
export function ProfileCard() {
  const { selectedEmployee } = useEmployee();

  if (!selectedEmployee) {
    return (
      <div className="gradient-border-sm rounded-[25px] p-3 mb-[10px] w-[437px]" data-name="360-user-Profile-card">
        <div className="flex items-center gap-2 mb-2">
          <ProfileIcon />
          <span className="text-xs font-bold uppercase tracking-wide">Profile</span>
        </div>
        <div className="text-center text-gray-500 py-8">
          Select an employee to view profile
        </div>
      </div>
    );
  }

  return (
    <div className="gradient-border-sm rounded-[25px] p-3 mb-[10px] w-[437px]" data-name="360-user-Profile-card">
      <div className="flex items-center gap-2 mb-2">
        <ProfileIcon />
        <span className="text-xs font-bold uppercase tracking-wide">Profile</span>
      </div>
      
      <div className="flex gap-2">
        <OptimizedImage 
          src={selectedEmployee.avatar} 
          alt={selectedEmployee.name}
          fallbackName={selectedEmployee.name}
          className="w-[100px] h-[100px] rounded-full object-cover flex-shrink-0"
        />
        
        <div className="flex flex-col gap-1 flex-1">
          {/* Row with Employee Info and DOJ/Salary side by side */}
          <div className="flex gap-1">
            {/* Employee Info Card */}
            <div className="bg-[#e0e0e0] border border-black rounded-[15px] p-2 flex-1">
              <div className="text-[9px] space-y-0">
                <div className="flex">
                  <span className="font-bold w-[60px]">Employee Id:</span>
                  <span>{selectedEmployee.id}</span>
                </div>
                <div className="flex">
                  <span className="font-bold w-[60px]">Name:</span>
                  <span>{selectedEmployee.name}</span>
                </div>
                <div className="flex">
                  <span className="font-bold w-[60px]">Role:</span>
                  <span>{selectedEmployee.role}</span>
                </div>
              </div>
            </div>
            
            {/* DOJ/Salary Card */}
            <div className="bg-[#e0e0e0] border border-black rounded-[15px] p-2 flex-1">
              <div className="text-[9px] space-y-0">
                <div className="flex">
                  <span className="font-bold w-[40px]">D-O-J:</span>
                  <span>{selectedEmployee.dateOfJoining}</span>
                </div>
                <div className="flex">
                  <span className="font-bold w-[40px]">Salary:</span>
                  <span>${selectedEmployee.salary}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Info Card - full width below */}
          <div className="bg-[#e0e0e0] border border-black rounded-[15px] p-2">
            <div className="text-[9px] space-y-0">
              <div className="flex">
                <span className="font-bold w-[45px]">Contact:</span>
                <span>{selectedEmployee.contact}</span>
              </div>
              <div className="flex">
                <span className="font-bold w-[45px]">Email:</span>
                <span>{selectedEmployee.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
