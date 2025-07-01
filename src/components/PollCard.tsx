import React, { useState } from 'react';
import { Users, Clock, CheckCircle } from 'lucide-react';

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

interface PollCardProps {
  poll: Poll;
  onVote: (pollId: string, optionIndex: number) => void;
}

const PollCard: React.FC<PollCardProps> = ({ poll, onVote }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = (optionIndex: number) => {
    if (hasVoted) return;
    
    setSelectedOption(optionIndex);
    setHasVoted(true);
    onVote(poll._id, optionIndex);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPercentage = (votes: number) => {
    if (poll.totalVotes === 0) return 0;
    return Math.round((votes / poll.totalVotes) * 100);
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-tight">
          {poll.question}
        </h3>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{poll.totalVotes} votes</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{formatDate(poll.createdAt)}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {poll.options.map((option, index) => {
          const percentage = getPercentage(option.votes);
          const isSelected = selectedOption === index;
          
          return (
            <button
              key={option._id}
              onClick={() => handleVote(index)}
              disabled={hasVoted}
              className={`w-full text-left p-3 rounded-xl border-2 transition-all duration-200 ${
                hasVoted
                  ? 'cursor-default'
                  : 'hover:border-blue-300 hover:bg-blue-50/50 cursor-pointer'
              } ${
                isSelected
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">{option.text}</span>
                {hasVoted && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-600">
                      {percentage}%
                    </span>
                    {isSelected && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                )}
              </div>
              
              {hasVoted && (
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      isSelected
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                        : 'bg-gray-400'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              )}
              
              {hasVoted && (
                <div className="mt-2 text-xs text-gray-500">
                  {option.votes} votes
                </div>
              )}
            </button>
          );
        })}
      </div>

      {!hasVoted && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">Click an option to vote</p>
        </div>
      )}
    </div>
  );
};

export default PollCard;