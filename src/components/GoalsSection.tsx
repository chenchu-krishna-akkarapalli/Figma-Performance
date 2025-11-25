interface GoalMetric {
  label: string;
  percentage: number;
  filledWidth: number; // in pixels out of 152px total
}

interface GoalsSectionProps {
  quarter?: string;
  metrics?: GoalMetric[];
}

const defaultMetrics: GoalMetric[] = [
  { label: 'Reached', percentage: 50, filledWidth: 83 },
  { label: 'Pending', percentage: 20, filledWidth: 44 },
  { label: 'Total', percentage: 30, filledWidth: 54 },
];

export function GoalsSection({
  quarter = 'Q1',
  metrics = defaultMetrics,
}: GoalsSectionProps) {
  return (
    <div 
      className="absolute bg-[#9e9e9e] border border-black rounded-[42px] h-[103px] left-[901px] top-[146px] w-[518px] overflow-clip" 
      data-node-id="1:40"
    >
      <div className="relative size-full rounded-[inherit] overflow-clip">
        <div className="absolute flex flex-col gap-[5px] items-start left-[calc(50%+0.5px)] top-[calc(50%-0.25px)] translate-x-[-50%] translate-y-[-50%] w-[471px]" data-node-id="7:163">
          {/* Dropdown Header */}
          <div className="bg-white border border-black rounded-[12px] h-[24px] w-[91px] relative" data-node-id="7:157">
            <div className="h-[24px] w-[91px] relative rounded-[inherit] overflow-clip">
              <div className="absolute flex gap-[2px] items-center left-[11.5px] top-[-2px]" data-node-id="7:158">
                <p className="text-black text-[12px] font-['Arial'] leading-[27px] whitespace-pre" data-node-id="7:159">
                  Goals - {quarter}
                </p>
                <div className="size-[8px] relative" data-node-id="7:160">
                  <svg className="block size-full" viewBox="0 0 8 8" fill="none">
                    <path d="M1 2L4 5L7 2" stroke="black" strokeWidth="1" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Metrics Container */}
          <div className="flex gap-[7px] items-center w-full relative" data-node-id="7:150">
            {metrics.map((metric, idx) => (
              <div key={idx} className="flex flex-col gap-[2.5px] items-start w-[153px]" data-node-id={`7:${147+idx}`}>
                {/* Label and Percentage Row */}
                <div className="flex gap-[8px] items-center w-full relative" data-node-id={`1:${41+(idx*4)}`}>
                  <div className="flex gap-[66px] items-start leading-[27px] text-black w-[153px]" data-node-id={`1:${42+(idx*4)}`}>
                    <p className="font-['Arial'] text-[16px] w-[67px]" data-node-id={`1:${43+(idx*4)}`}>
                      {metric.label}
                    </p>
                    <p className="font-['Arial'] font-bold text-[10px] h-[19px] w-[21px]" data-node-id={`1:${44+(idx*4)}`}>
                      {metric.percentage}%
                    </p>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="flex gap-[8px] items-center w-full relative" data-node-id={`7:${139+(idx*4)}`}>
                  <div className="inline-grid place-items-start leading-[0] relative" data-node-id={`7:${140+(idx*4)}`}>
                    <div className="bg-[#d9d9d9] flex flex-col gap-[10px] items-start h-[20px] w-[152px] rounded-[14px] relative" data-node-id={`7:${141+(idx*4)}`}>
                      <div 
                        className="bg-[#464646] h-[20px] rounded-[14px]" 
                        style={{ width: `${metric.filledWidth}px` }}
                        data-node-id={`7:${142+(idx*4)}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
