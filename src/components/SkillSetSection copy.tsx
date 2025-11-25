import { CarbonSkillLevelIntermediate } from './Icons';

interface Skill {
  label: string;
  filledCount: number; // number of filled bars (0–5)
}

interface SkillSetSectionProps {
  skills?: Skill[];
}

export function SkillSetSection({
  skills = [
    { label: 'React', filledCount: 3 },
    { label: 'Architecture', filledCount: 4 },
  ],
}: SkillSetSectionProps) {

  const renderSkillBars = (filledCount: number) => {
    return [...Array(5)].map((_, i) => {
      const isFilled = i < filledCount;

      return (
        <div
          key={i}
          className={`
            h-[4px] rounded-md flex-1 transition-all
            ${isFilled ? "bg-purple-600" : "bg-gray-200"}
          `}
        />
      );
    });
  };

  return (
    <div
      className="
        absolute rounded-[32px] left-[22px] top-[418px]
        w-[275px] h-[110px]    /* reduced height */
        bg-white shadow-md px-4 py-3
        border border-gray-200
      "
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <CarbonSkillLevelIntermediate className="size-4 text-purple-700" />
        <p className="text-sm font-semibold text-gray-800 tracking-wide">
          Skill Set
        </p>
      </div>

      {/* Skills */}
      <div className="flex flex-col gap-2">
        {skills.map((skill, idx) => (
          <div key={idx} className="w-full">
            <div className="flex justify-between items-center mb-1">
              <p className="text-[11px] font-medium text-gray-700">
                {skill.label}
              </p>
              <p className="text-[10px] text-gray-500">
                {skill.filledCount}/5
              </p>
            </div>

            {/* Bars */}
            <div className="flex gap-1">
              {renderSkillBars(skill.filledCount)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
