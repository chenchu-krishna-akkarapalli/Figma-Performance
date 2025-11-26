"use client";
import profileImg from "../assets/profile.jpg";
 
interface ProfileSectionProps {
  onProfileClick: () => void;
  userName?: string;
  userRole?: string;
  userSalary?: string;
  userImage?: string | any;
}
 
export function ProfileSection({
  onProfileClick,
  userName = "Ahmad",
  userRole = "UI/UX Designer",
  userSalary = "400$",
  userImage = profileImg,
}: ProfileSectionProps) {
  return (
    <div
      onClick={onProfileClick}
      className="absolute gradient-border rounded-[42px] h-[278px] left-[22px] top-[130px] w-[275px] overflow-hidden cursor-pointer"
      data-name="Profile-section"
    >
      {/* Background image */}
      <img
        alt="User Profile"
        className="absolute inset-0 max-w-none object-cover rounded-[42px] size-full"
        src={userImage}
        style={{ objectPosition: "50% 50%" }}
      />
 
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute left-0 top-[221px] w-[275px] h-[57px]">
          <div
            className="absolute bg-[rgba(255,255,255,0.1)] h-[57px] left-0 top-0 w-[275px] backdrop-blur-[3.65px]"
            style={{ WebkitBackdropFilter: "blur(3.65px)" }}
          />
 
          <div className="absolute flex items-start justify-between left-[28px] text-white top-[8px] w-[219px] z-10 font-sans">
            <div className="flex flex-col gap-[3px]">
              <p className="text-[16px]">{userName}</p>
              <p className="text-[10px]">{userRole}</p>
            </div>
 
            <p className="text-[16px]">{userSalary}</p>
          </div>
        </div>
      </div>
    </div>
  );
}