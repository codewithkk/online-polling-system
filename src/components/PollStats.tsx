import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, Calendar, PieChart, BarChart } from 'lucide-react';
import PollChart from './PollChart';

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

interface PollStatsProps {
  polls: Poll[];
}

const PollStats: React.FC<PollStatsProps> = ({ polls }) => {
  const [selectedPoll, setSelectedPoll] = useState<Poll | null>(polls[0] || null);
  const [chartType, setChartType] = useState<'bar' | 'pie'>('bar');

  const totalPolls = polls.length;
  const totalVotes = polls.reduce((sum, poll) => sum + poll.totalVotes, 0);
  const averageVotesPerPoll = totalPolls > 0 ? Math.round(totalVotes / totalPolls) : 0;
  
  const mostPopularPoll = polls.reduce((max, poll) => 
    poll.totalVotes > (max?.totalVotes || 0) ? poll : max, polls[0]
  );

  const recentPolls = polls.filter(poll => {
    const createdAt = new Date(poll.createdAt);
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return createdAt > oneDayAgo;
  }).length;

  const statsCards = [
    {
      title: 'Total Polls',
      value: totalPolls,
      icon: BarChart3,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100'
    },
    {
      title: 'Total Votes',
      value: totalVotes,
      icon: Users,
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100'
    },
    {
      title: 'Avg Votes/Poll',
      value: averageVotesPerPoll,
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100'
    },
    {
      title: 'Recent Polls',
      value: recentPolls,
      icon: Calendar,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'from-orange-50 to-orange-100'
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Poll Statistics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chart Visualization Section */}
      {polls.length > 0 && (
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-0">Vote Distribution</h3>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Poll Selector */}
              <select
                value={selectedPoll?._id || ''}
                onChange={(e) => {
                  const poll = polls.find(p => p._id === e.target.value);
                  setSelectedPoll(poll || null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm"
              >
                {polls.map((poll) => (
                  <option key={poll._id} value={poll._id}>
                    {poll.question.length > 50 ? `${poll.question.substring(0, 50)}...` : poll.question}
                  </option>
                ))}
              </select>

              {/* Chart Type Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setChartType('bar')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-all ${
                    chartType === 'bar'
                      ? 'bg-white shadow-sm text-blue-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <BarChart className="h-4 w-4" />
                  <span className="text-sm font-medium">Bar</span>
                </button>
                <button
                  onClick={() => setChartType('pie')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-all ${
                    chartType === 'pie'
                      ? 'bg-white shadow-sm text-blue-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <PieChart className="h-4 w-4" />
                  <span className="text-sm font-medium">Pie</span>
                </button>
              </div>
            </div>
          </div>

          {selectedPoll && selectedPoll.totalVotes > 0 ? (
            <div>
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">{selectedPoll.question}</h4>
                <p className="text-sm text-gray-600">
                  Total votes: {selectedPoll.totalVotes} • Created: {new Date(selectedPoll.createdAt).toLocaleDateString()}
                </p>
              </div>
              <PollChart poll={selectedPoll} type={chartType} />
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-gray-400" />
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">No votes yet</h4>
              <p className="text-gray-500">
                {selectedPoll ? 'This poll hasn\'t received any votes yet.' : 'Select a poll to view its vote distribution.'}
              </p>
            </div>
          )}
        </div>
      )}

      {mostPopularPoll && (
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Popular Poll</h3>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
            <h4 className="font-medium text-gray-900 mb-3">{mostPopularPoll.question}</h4>
            <div className="space-y-2">
              {mostPopularPoll.options.map((option, index) => {
                const percentage = mostPopularPoll.totalVotes > 0 
                  ? Math.round((option.votes / mostPopularPoll.totalVotes) * 100) 
                  : 0;
                
                return (
                  <div key={option._id} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{option.text}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-600">{percentage}%</span>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-sm text-gray-500 mt-3">
              {mostPopularPoll.totalVotes} total votes
            </p>
          </div>
        </div>
      )}

      {polls.length > 0 && (
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">All Polls Overview</h3>
          <div className="space-y-4">
            {polls.map((poll) => (
              <div key={poll._id} className="border-l-4 border-blue-500 pl-4 py-2">
                <h4 className="font-medium text-gray-900 mb-1">{poll.question}</h4>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{poll.options.length} options</span>
                  <span>{poll.totalVotes} votes</span>
                  <span>{new Date(poll.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PollStats;