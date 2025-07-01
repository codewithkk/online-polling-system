import React from 'react';
import PollCard from './PollCard';

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

interface PollListProps {
  polls: Poll[];
  onVote: (pollId: string, optionIndex: number) => void;
}

const PollList: React.FC<PollListProps> = ({ polls, onVote }) => {
  if (polls.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/20">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📊</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No polls yet</h3>
          <p className="text-gray-500">Create your first poll to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Active Polls</h2>
        <span className="text-sm text-gray-500">{polls.length} polls available</span>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {polls.map((poll) => (
          <PollCard key={poll._id} poll={poll} onVote={onVote} />
        ))}
      </div>
    </div>
  );
};

export default PollList;