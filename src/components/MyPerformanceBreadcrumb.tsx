// Icons
const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[20px] h-[17px]">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  </svg>
);

const ChevronRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[20px] h-[17px]">
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
  </svg>
);

// My Performance Breadcrumb Component
export function MyPerformanceBreadcrumb() {
  return (
    <div className="flex items-center gap-2 text-black text-xl font-bold" data-node-id="1:755">
      <HomeIcon />
      <span>Dashboard</span>
      <ChevronRightIcon />
      <span>My Performance</span>
    </div>
  );
}

export default MyPerformanceBreadcrumb;
