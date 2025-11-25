import { FiCalendar } from 'react-icons/fi';

interface BreadcrumbItem {
  label: string;
  icon?: React.ReactNode;
  href?: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
}

export function Breadcrumb({ items = [{ label: 'Dashboard', icon: <FiCalendar className="w-[20px] h-[20px] text-black" /> }] }: BreadcrumbProps) {
  return (
    <div className="absolute left-[22px] top-[5px] flex items-center gap-[8px]" data-node-id="1:30">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-[8px]">
          {/* Icon */}
          {item.icon && (
            <div className="flex items-center justify-center w-[20px] h-[20px]">
              {item.icon}
            </div>
          )}
          
          {/* Breadcrumb Label */}
          {item.href ? (
            <a
              href={item.href}
              className="font-bold text-[20px] text-black hover:opacity-80 cursor-pointer"
            >
              {item.label}
            </a>
          ) : (
            <p className="font-bold text-[20px] text-black">
              {item.label}
            </p>
          )}
          
          {/* Separator */}
          {idx < items.length - 1 && (
            <span className="text-[20px] text-black opacity-50">/</span>
          )}
        </div>
      ))}
    </div>
  );
}
