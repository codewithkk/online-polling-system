import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface Poll {
  _id: string;
  question: string;
  options: Array<{
    _id: string;
    text: string;
    votes: number;
  }>;
  totalVotes: number;
  createdAt: string;
}

interface PollChartProps {
  poll: Poll;
  type: 'bar' | 'pie';
}

const PollChart: React.FC<PollChartProps> = ({ poll, type }) => {
  const colors = [
    'rgba(59, 130, 246, 0.8)',   // Blue
    'rgba(16, 185, 129, 0.8)',   // Green
    'rgba(245, 101, 101, 0.8)',  // Red
    'rgba(251, 191, 36, 0.8)',   // Yellow
    'rgba(139, 92, 246, 0.8)',   // Purple
    'rgba(236, 72, 153, 0.8)',   // Pink
  ];

  const borderColors = [
    'rgba(59, 130, 246, 1)',
    'rgba(16, 185, 129, 1)',
    'rgba(245, 101, 101, 1)',
    'rgba(251, 191, 36, 1)',
    'rgba(139, 92, 246, 1)',
    'rgba(236, 72, 153, 1)',
  ];

  const data = {
    labels: poll.options.map(option => option.text),
    datasets: [
      {
        label: 'Votes',
        data: poll.options.map(option => option.votes),
        backgroundColor: colors.slice(0, poll.options.length),
        borderColor: borderColors.slice(0, poll.options.length),
        borderWidth: 2,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context: any) {
            const percentage = poll.totalVotes > 0 
              ? Math.round((context.parsed.y / poll.totalVotes) * 100) 
              : 0;
            return `${context.parsed.y} votes (${percentage}%)`;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: 'rgba(107, 114, 128, 0.8)',
        },
        grid: {
          color: 'rgba(107, 114, 128, 0.1)',
        },
      },
      x: {
        ticks: {
          color: 'rgba(107, 114, 128, 0.8)',
          maxRotation: 45,
        },
        grid: {
          display: false,
        },
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          color: 'rgba(107, 114, 128, 1)',
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: function(context: any) {
            const percentage = poll.totalVotes > 0 
              ? Math.round((context.parsed / poll.totalVotes) * 100) 
              : 0;
            return `${context.label}: ${context.parsed} votes (${percentage}%)`;
          }
        }
      },
    },
  };

  return (
    <div className="h-80 w-full">
      {type === 'bar' ? (
        <Bar data={data} options={barOptions} />
      ) : (
        <Pie data={data} options={pieOptions} />
      )}
    </div>
  );
};

export default PollChart;