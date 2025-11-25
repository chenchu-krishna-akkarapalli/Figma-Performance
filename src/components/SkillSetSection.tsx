import { FiBarChart2 } from 'react-icons/fi';

interface Skill {
  label: string;
  filledCount: number; // number of filled (white) bars out of 5 (0-5)
}

interface SkillSetSectionProps {
  skills?: Skill[];
}

export function SkillSetSection({
  skills = [
    { label: 'Art', filledCount: 3 },
    { label: 'Architecture', filledCount: 3 },
    { label: 'Blend', filledCount: 3 },
  ],
}: SkillSetSectionProps) {
  const renderSkillBars = (filledCount: number, dataNodeIdBase: string) => {
    const bars = [];
    // Card width: 275px - padding: 32px = 243px available
    // 5 bars + 4 gaps: Using flex-1 for responsive sizing
    
    for (let i = 0; i < 5; i++) {
      const barNumber = i + 1;
      const isFilled = i < filledCount;
      bars.push(
        <div
          key={i}
          className={`h-[4px] rounded-[2px] flex-1 ${
            isFilled
              ? 'bg-gradient-to-r from-[#AD46FF] to-[#E9D4FF]'
              : 'bg-[rgba(184,210,222,0.3)] border border-[#a2c4d4] border-solid opacity-50'
          }`}
          data-name={String(barNumber)}
          data-node-id={`${dataNodeIdBase}${barNumber}`}
        />
      );
    }
    return bars;
  };

  return (
    <div
      className="absolute gradient-border rounded-[42px] h-[120px] left-[22px] top-[418px] w-[275px] p-[16px] overflow-hidden"
      data-name="Skill set-section"
      data-node-id="1:215"
    >
      <div className="h-full flex flex-col justify-center">
        <div
          className="flex flex-col gap-[2px] w-full max-w-full"
          data-node-id="7:125"
        >
          {/* Header with Icon and Title */}
          <div
            className="flex items-center gap-[2px] relative mb-0"
            data-node-id="7:124"
          >
            <FiBarChart2 className="shrink-0 w-3 h-3" />
            <p
              className="font-['Arial_Rounded_MT_Bold:Regular',sans-serif] text-[10px] text-black font-bold leading-none"
              data-node-id="1:216"
            >
              Skill Set
            </p>
          </div>

          {/* Skills List */}
          <div
            className="flex flex-col gap-[1px] w-full"
            data-name="Skill Set"
            data-node-id="7:123"
          >
            {skills.map((skill, idx) => {
              const nodeIds = [
                { label: '1:218', graph: '7:10' },
                { label: '1:226', graph: '7:11' },
                { label: '1:234', graph: '7:9' },
              ];
              const nodeData = nodeIds[idx] || { label: '1:218', graph: '7:10' };

              return (
                <div
                  key={idx}
                  className="flex items-center gap-[4px] w-full"
                  data-node-id={`7:12${idx}`}
                >
                  {/* Skill Label */}
                  <div
                    className="min-w-[80px]"
                    data-node-id={nodeData.label}
                  >
                    <p
                      className="font-['Arial:Regular',sans-serif] text-[9px] text-black leading-none"
                      data-node-id={`1:${225 + idx * 8}`}
                    >
                      {skill.label}
                    </p>
                  </div>

                  {/* Skill Bars - flex layout with flex-1 for equal distribution */}
                  <div
                    className="flex gap-[1.5px] flex-1"
                    data-node-id={nodeData.graph}
                  >
                    {renderSkillBars(skill.filledCount, `7:${107 + idx * 6}`)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
