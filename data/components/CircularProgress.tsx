import { motion } from "framer-motion";

interface CircularProgressProps {
  value: number;
  radius: number;
  stroke: number;
  max: number;
  color: string;
}

const CircularProgress = ({ value, radius, stroke, max, color }: CircularProgressProps) => {
  const normalizedRadius = radius - stroke * 2; // For padding around the circle
  const circumference = normalizedRadius * 2 * Math.PI;

  // Calculate the stroke-dasharray to fill 3/4 of the circle based on the value
  const strokeDashoffset = circumference - (value / max) * circumference;

  return (
    <svg width={radius * 2} height={radius * 2} className="transform rotate-90">
      <circle
        className="circle-background"
        stroke="#e2e8f0"
        fill="transparent"
        cx={radius}
        cy={radius}
        r={normalizedRadius}
        strokeWidth={stroke}
      />
      <motion.circle
        className="circle-progress"
        stroke={color}
        fill="transparent"
        cx={radius}
        cy={radius}
        r={normalizedRadius}
        strokeWidth={stroke}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
    </svg>
  );
};

export default CircularProgress;
