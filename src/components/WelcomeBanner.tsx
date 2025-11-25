export function WelcomeBanner() {
  const getCurrentDateTime = () => {
    const now = new Date();
    const date = now.toLocaleDateString('en-GB'); // Format: DD-MM-YYYY
    const time = now.toLocaleTimeString('en-GB'); // Format: HH:MM:SS
    return { date, time };
  };

  const { date, time } = getCurrentDateTime();

  return (
    <div className="absolute left-[22px] top-[55px] flex flex-col gap-[5px]" data-node-id="8:179">
      {/* Welcome Message */}
      <div className="flex gap-[22px] items-center font-['Arial_Rounded_MT_Bold:Regular',sans-serif] text-[48px] text-black leading-[45px]">
        <span>Welcome in,</span>
        <span>Ahmad</span>
      </div>
      
      {/* Date and Time */}
      <div className="flex gap-[2px] items-center font-['Arial_Rounded_MT_Bold:Regular',sans-serif] text-[24px] text-black leading-[27px]">
        <span>{date},</span>
        <span>{time}</span>
      </div>
    </div>
  );
}
