export const imgVector = "http://localhost:3845/assets/calendar-icon.svg";
export const imgVector1 = "http://localhost:3845/assets/6c05517bcb6cb89ae7ef336195e735fabdc52837.png";
export const imgVector2 = "http://localhost:3845/assets/vector2.png";
export const imgVector3 = "http://localhost:3845/assets/vector3.png";
export const imgGroup = "http://localhost:3845/assets/group.png";
export const imgVector4 = "http://localhost:3845/assets/vector4.png";
export const imgVector5 = "http://localhost:3845/assets/vector5.png";
export const imgVector6 = "http://localhost:3845/assets/vector6.png";
export const imgVector7 = "http://localhost:3845/assets/vector7.png";
export const imgVector8 = "http://localhost:3845/assets/vector8.png";
export const imgMdiBellNotification = "http://localhost:3845/assets/bell-notification.png";
export const imgCarbonUserAvatarFilled = "http://localhost:3845/assets/user-avatar.png";
export const imgIconParkDown = "http://localhost:3845/assets/icon-park-down.png";
export const imgAntDesignDotChartOutlined = "http://localhost:3845/assets/ant-design-chart.png";
export const imgAntDesignDotChartOutlined1 = "http://localhost:3845/assets/ant-design-chart-1.png";
export const imgLines = "http://localhost:3845/assets/lines.png";
export const imgPath = "http://localhost:3845/assets/path.png";
export const imgPath1 = "http://localhost:3845/assets/path1.png";
export const imgPath2 = "http://localhost:3845/assets/path2.png";
export const imgGroup25 = "http://localhost:3845/assets/group25.png";
export const imgGroup73 = "http://localhost:3845/assets/group73.png";
export const imgStashCircleDotDuotone = "http://localhost:3845/assets/stash-circle-dot.png";
export const imgFrame12 = "../assets/profile.jpg";
export const imgFrame48 = "http://localhost:3845/assets/6c05517bcb6cb89ae7ef336195e735fabdc52837.png";

// Icon Components
interface IconProps {
  className?: string;
}

export function UisCalender({ className }: IconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className || "w-6 h-6"}
      data-name="uis:calender" 
      data-node-id="1:359"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  );
}

export function IconamoonCursorFill({ className }: IconProps) {
  return (
    <div className={className} data-name="iconamoon:cursor-fill" data-node-id="1:338">
      <div className="absolute inset-[12.5%_8.33%_8.33%_12.5%]" data-name="Vector" data-node-id="1:339">
        <img alt="Cursor" className="block max-w-none size-full" src={imgVector1} />
      </div>
    </div>
  );
}

export function CarbonSkillLevelIntermediate({ className }: IconProps) {
  return (
    <svg 
      viewBox="0 0 32 32" 
      fill="currentColor" 
      className={className || "w-6 h-6"}
      data-name="carbon:skill-level-intermediate" 
      data-node-id="1:242"
    >
      <path d="M8 8h2v16H8zM14 12h2v12h-2zM20 6h2v18h-2z" />
    </svg>
  );
}

export function MdiShareAll({ className }: IconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className || "w-6 h-6"}
      data-name="mdi:share-all" 
      data-node-id="1:183"
    >
      <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.44 9.31 6.77 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.77 0 1.44-.3 1.96-.77l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
    </svg>
  );
}

export function IxTagPlus({ className }: IconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className || "w-6 h-6"}
      data-name="ix:tag-plus" 
      data-node-id="1:105"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
    </svg>
  );
}

export function MdiReportBoxPlusOutline({ className }: IconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className || "w-6 h-6"}
      data-name="mdi:report-box-plus-outline" 
      data-node-id="1:100"
    >
      <path d="M3 3h18v18H3z" />
      <line x1="12" y1="7" x2="12" y2="17" />
      <line x1="7" y1="12" x2="17" y2="12" />
    </svg>
  );
}

export function OcticonGoal({ className }: IconProps) {
  return (
    <svg 
      viewBox="0 0 16 16" 
      fill="currentColor" 
      className={className || "w-6 h-6"}
      data-name="octicon:goal-16" 
      data-node-id="1:93"
    >
      <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 13A6 6 0 118 2a6 6 0 010 12zm0-10a3 3 0 100 6 3 3 0 000-6zm0 5a2 2 0 110-4 2 2 0 010 4z" />
    </svg>
  );
}
