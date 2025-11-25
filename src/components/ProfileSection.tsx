import profileImg from '../assets/profile.jpg';

interface ProfileSectionProps {
  userName?: string;
  userRole?: string;
  userSalary?: string;
  userImage?: string;
}

export function ProfileSection({
  userName = 'Ahmad',
  userRole = 'UI/UX Designer',
  userSalary = '400$',
  userImage = profileImg,
}: ProfileSectionProps) {
  return (
    <div
      className="absolute gradient-border rounded-[42px] h-[278px] left-[22px] top-[130px] w-[275px] overflow-hidden"
      data-name="Profile-section"
      data-node-id="1:32"
    >
      {/* Background image */}
      <img
        alt="User Profile"
        className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[42px] size-full"
        src={userImage}
        style={{ objectPosition: '50% 50%' }}
      />
      <div className="overflow-clip relative rounded-[inherit] size-full">
        {/* Glass Frame - removed 'contents' display to fix rendering */}
        <div className="absolute left-0 top-[221px] w-[275px] h-[57px]" data-name="Glass Frame" data-node-id="7:135">
          {/* Glass background with backdrop blur */}
          <div
            className="absolute bg-[rgba(255,255,255,0.1)] h-[57px] left-0 top-0 w-[275px] backdrop-blur-[3.65px]"
            data-name="glass-bg"
            data-node-id="7:128"
            style={{ WebkitBackdropFilter: 'blur(3.65px)' }}
          />
          {/* User details */}
          <div
            className="absolute flex font-['Arial:Regular',sans-serif] items-start justify-between left-[28px] text-white top-[8px] w-[219px] z-10"
            data-name="user-details"
            data-node-id="7:129"
          >
            <div className="flex flex-col gap-[3px] items-start relative shrink-0" data-node-id="7:130">
              <p className="relative shrink-0 text-[16px] leading-[21px] font-normal" data-node-id="7:131">
                {userName}
              </p>
              <p className="relative shrink-0 text-[10px] leading-[14px] font-normal" data-node-id="7:132">
                {userRole}
              </p>
            </div>
            <p className="relative shrink-0 text-[16px] leading-[21px] font-normal text-nowrap whitespace-pre" data-node-id="7:133">
              {userSalary}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
