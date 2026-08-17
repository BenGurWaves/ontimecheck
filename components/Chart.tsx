import { useEffect, useRef } from 'react';

interface ChartProps {
  data: number[];
  label: string;
  height?: number;
}

// Remove the default export and use named export to avoid import issues
export function Chart({ data, label, height = 120 }: ChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, chartRef.current.width, chartRef.current.height);

    // Set up chart dimensions
    const width = chartRef.current.width;
    const height = chartRef.current.height;
    const padding = 20;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;

    // Find min and max of data
    const minVal = Math.min(...data);
    const maxVal = Math.max(...data);
    const range = maxVal - minVal || 1; // Avoid division by zero

    // Draw axes
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding); // X-axis
    ctx.lineTo(width - padding, padding); // Y-axis
    ctx.stroke();

    // Draw grid lines (horizontal)
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    for (let i = 1; i <= 4; i++) {
      const y = height - padding - (i * chartHeight) / 4;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Draw line chart
    ctx.strokeStyle = '#C0FF00';
    ctx.lineWidth = 2;
    ctx.beginPath();
    data.forEach((value, index) => {
      const x = padding + (index * chartWidth) / (data.length - 1);
      const y = height - padding - (((value - minVal) / range) * chartHeight);
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Draw points
    ctx.fillStyle = '#C0FF00';
    data.forEach((value, index) => {
      const x = padding + (index * chartWidth) / (data.length - 1);
      const y = height - padding - (((value - minVal) / range) * chartHeight);
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw label
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(label, padding, padding + 12);
  }, [data, label, height]);

  return (
    <div className="relative">
      <canvas
        ref={chartRef}
        width={300}
        height={height}
        className="w-full h-full"
      />
    </div>
  );
}

// Since we're using the chart in Next.js app directory, also export as default for legacy imports
export default Chart;
