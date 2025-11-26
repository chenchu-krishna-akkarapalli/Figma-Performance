import { useEmployee } from '../context/EmployeeContext';
import { OptimizedImage } from './OptimizedImage';
import { motion } from 'framer-motion';

// Icons - sizes match Figma design (16px × 16px)
const ProfileIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[16px] h-[16px]">
    <defs>
      <linearGradient id="profileIconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#AD46FF" />
        <stop offset="100%" stopColor="#E9D4FF" />
      </linearGradient>
    </defs>
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="url(#profileIconGradient)"/>
  </svg>
);

// Profile Card Component
export function ProfileCard() {
  const { selectedEmployee } = useEmployee();

  if (!selectedEmployee) {
    return (
      <div className="gradient-border rounded-[25px] bg-white p-4 mb-2 w-[437px]" data-name="360-user-Profile-card">
        <div className="flex items-center gap-2 mb-3">
          <ProfileIcon />
          <span className="text-sm font-bold uppercase tracking-wider">Profile</span>
        </div>
        <div className="text-center text-gray-400 py-8 text-xs">
          Select an employee to view profile
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="gradient-border rounded-[25px] bg-white p-4 mb-2 w-[437px]" data-name="360-user-Profile-card"
    >
      <div className="flex items-center gap-2 mb-4">
        <ProfileIcon />
        <span className="text-sm font-bold uppercase tracking-wider">Profile</span>
      </div>
      
      <div className="flex gap-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <OptimizedImage 
            src={selectedEmployee.avatar} 
            alt={selectedEmployee.name}
            fallbackName={selectedEmployee.name}
            className="w-[100px] h-[100px] rounded-full object-cover shrink-0 border-2 border-purple-300"
          />
        </motion.div>
        
        <div className="flex flex-col gap-2 flex-1">
          {/* Row with Employee Info and DOJ/Salary side by side */}
          <div className="flex gap-2">
            {/* Employee Info Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-gradient-to-br from-[#f9f9f9] to-[#f0f0f0] border border-gray-200 rounded-[25px] p-3 flex-1"
            >
              <div className="text-[9px] space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-semibold uppercase tracking-wider">ID:</span>
                  <span className="text-black font-semibold">{selectedEmployee.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-semibold uppercase tracking-wider">Name:</span>
                  <span className="text-black font-semibold">{selectedEmployee.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-semibold uppercase tracking-wider">Role:</span>
                  <span className="text-black font-semibold">{selectedEmployee.role}</span>
                </div>
              </div>
            </motion.div>
            
            {/* DOJ/Salary Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-br from-[#f9f9f9] to-[#f0f0f0] border border-gray-200 rounded-[25px] p-3 flex-1"
            >
              <div className="text-[9px] space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-semibold uppercase tracking-wider">DOJ:</span>
                  <span className="text-black font-semibold">{selectedEmployee.dateOfJoining}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-semibold uppercase tracking-wider">Salary:</span>
                  <span className="text-black font-semibold">${selectedEmployee.salary}</span>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Contact Info Card - full width below */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="bg-gradient-to-br from-[#f9f9f9] to-[#f0f0f0] border border-gray-200 rounded-[25px] p-3"
          >
            <div className="text-[9px] space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-semibold uppercase tracking-wider">Contact:</span>
                <span className="text-black font-semibold">{selectedEmployee.contact}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-semibold uppercase tracking-wider">Email:</span>
                <span className="text-black font-semibold text-right text-[8px]">{selectedEmployee.email}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProfileCard;
