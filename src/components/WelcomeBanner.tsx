export function WelcomeBanner() {
  const getCurrentDateTime = () => {
    const now = new Date();
    const date = now.toLocaleDateString("en-GB");
    const time = now.toLocaleTimeString("en-GB");
    return { date, time };
  };
 
  const { date, time } = getCurrentDateTime();
 
  return (
    <div className="absolute left-[37px] top-[25px] -mt-3 flex flex-col gap-4 animate-fadeIn">
      {/* Welcome Message */}
      <div className="flex items-end gap-3">
        <span className="text-[52px] font-extrabold text-gray-900 leading-[55px] tracking-tight">
          Welcome in,
        </span>
        <span className="text-[52px] font-extrabold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent leading-[55px] tracking-tight">
          Ahmad
        </span>
      </div>
 
      {/* Date and Time */}
      <div className="flex gap-3 items-center text-[22px] font-semibold text-gray-700 leading-[28px] tracking-wide">
        <span>{date}</span>
        <span className="text-purple-600 font-bold">•</span>
        <span>{time}</span>
      </div>
    </div>
  );
}
 
 