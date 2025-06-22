import React from 'react';

/**
 * Interface defining the props for individual arc sections.
 */
interface ArcSectionProps {
  label: string;
  startAngle: number;
  endAngle: number;
  isVisible: boolean;
  isHovered: boolean;
  onMouseEnter: () => void;
  onClick: () => void;
  isOuter?: boolean;
  fillId: string;
  hoverFillId: string;
}

/**
 * Individual arc section styled to look like a spoke of a car wheel.
 */
const ArcSection: React.FC<ArcSectionProps> = ({
  label,
  startAngle,
  endAngle,
  isVisible,
  isHovered,
  onMouseEnter,
  onClick,
  isOuter = false,
  fillId,
  hoverFillId,
}) => {
  // --- Geometry Calculations ---
  const centerX = 150;
  const centerY = 150;
  const innerRadius = isOuter ? 110 : 60;
  const outerRadius = isOuter ? 150 : 100;

  const startRad = (startAngle * Math.PI) / 180;
  const endRad = (endAngle * Math.PI) / 180;

  const p1 = { x: centerX + innerRadius * Math.cos(startRad), y: centerY + innerRadius * Math.sin(startRad) };
  const p2 = { x: centerX + outerRadius * Math.cos(startRad), y: centerY + outerRadius * Math.sin(startRad) };
  const p3 = { x: centerX + outerRadius * Math.cos(endRad), y: centerY + outerRadius * Math.sin(endRad) }; // Use endRad here
  const p4 = { x: centerX + innerRadius * Math.cos(endRad), y: centerY + innerRadius * Math.sin(endRad) }; // Use endRad here


  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

  const pathData = `
    M ${p1.x} ${p1.y}
    L ${p2.x} ${p2.y}
    A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${p3.x} ${p3.y}
    L ${p4.x} ${p4.y}
    A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${p1.x} ${p1.y}
    Z
  `;

  const midAngle = (startAngle + endAngle) / 2;
  const midRad = (midAngle * Math.PI) / 180;
  const labelRadius = isOuter ? 130 : 80;
  const labelX = centerX + labelRadius * Math.cos(midRad);
  const labelY = centerY + labelRadius * Math.sin(midRad);

  // Updated filter and text color for Ferrari theme
  const textGlowFilter = isHovered ? 'url(#textGlowFerrari)' : 'none';
  const textColor = isHovered ? 'text-white' : 'text-gray-200'; // Darker base for text

  return (
    <g
      className={`cursor-pointer transition-all duration-300 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      style={{
        transform: isVisible && isHovered ? 'scale(1.05)' : 'scale(1)',
        transformOrigin: `${centerX}px ${centerY}px`,
        transition: 'transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 300ms ease-out',
      }}
    >
      <path
        d={pathData}
        fill={isHovered ? `url(#${hoverFillId})` : `url(#${fillId})`}
        stroke={isOuter ? "#4A4A4A" : "#6A6A6A"} // Darker, metallic stroke
        strokeWidth="0.8" // Slightly thicker stroke for definition
        style={{
            filter: 'url(#arcShadow)',
            transition: 'fill 300ms ease',
        }}
      />
      <text
        x={labelX}
        y={labelY}
        textAnchor="middle"
        alignmentBaseline="middle"
        className={`${textColor} font-bold text-lg pointer-events-none select-none tracking-wider`}
        style={{ filter: textGlowFilter, transition: 'filter 300ms ease, fill 300ms ease' }}
      >
        {label}
      </text>
    </g>
  );
};

export default ArcSection; // Export ArcSection