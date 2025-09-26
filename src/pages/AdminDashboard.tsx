import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function AdminDashboard() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  // Redirect if not admin
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    setUser(null);
    sessionStorage.clear();
    navigate('/login');
  };

  const [stats] = useState({
    totalVoters: 12847,
    activeElections: 2,
    pendingApprovals: 23,
    voterTurnout: 78.5,
    totalElections: 8,
    completedElections: 3,
  });

  const electionData = [
    { name: 'Presidential', votes: 2341, turnout: 85 },
    { name: 'Senate', votes: 1876, turnout: 72 },
    { name: 'Governor', votes: 2102, turnout: 81 },
    { name: 'Mayor', votes: 1543, turnout: 68 },
  ];

  const turnoutData = [
    { name: 'Voted', value: 78.5, color: '#10b981' },
    { name: 'Not Voted', value: 21.5, color: '#ef4444' },
  ];

  const recentElections = [
    { id: '1', title: 'Presidential Election 2024', status: 'active', startDate: '2024-03-15', votes: 2341, turnout: 85 },
    { id: '2', title: 'Local Mayor Election', status: 'upcoming', startDate: '2024-04-10', votes: 0, turnout: 0 },
    { id: '3', title: 'Senate Elections 2024', status: 'completed', startDate: '2024-02-20', votes: 1876, turnout: 72 },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-700">Active</span>;
      case 'upcoming':
        return <span className="px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-700">Upcoming</span>;
      case 'completed':
        return <span className="px-2 py-1 rounded text-xs bg-gray-200 text-gray-700">Completed</span>;
      default:
        return <span className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">Unknown</span>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user?.username || 'Admin'}
          </h1>
          <p className="text-gray-500">
            Admin Dashboard • Manage elections, voters, and system stats
          </p>
        </div>
        {/* <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
          Logout
        </button> */}
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded shadow p-4">
          <div className="text-sm font-medium mb-1">Total Voters</div>
          <div className="text-2xl font-bold">{stats.totalVoters.toLocaleString()}</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-sm font-medium mb-1">Active Elections</div>
          <div className="text-2xl font-bold text-green-600">{stats.activeElections}</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-sm font-medium mb-1">Pending Approvals</div>
          <div className="text-2xl font-bold text-yellow-600">{stats.pendingApprovals}</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-sm font-medium mb-1">Avg. Turnout</div>
          <div className="text-2xl font-bold">{stats.voterTurnout}%</div>
        </div>
      </div>

      {/* Recent Elections & Turnout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg font-semibold">Recent Elections</div>
            <Link to="/admin/elections" className="text-blue-600 hover:underline text-sm">View All</Link>
          </div>
          <div className="space-y-4">
            {recentElections.map(e => (
              <div key={e.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{e.title}</span>
                    {getStatusBadge(e.status)}
                  </div>
                  <div className="text-sm text-gray-400">{formatDate(e.startDate)}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{e.votes.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">votes</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded shadow p-6">
          <div className="text-lg font-semibold mb-4">Voter Turnout</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={turnoutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {turnoutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={value => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Election Performance */}
      <div className="bg-white rounded shadow p-6 mb-8">
        <div className="text-lg font-semibold mb-4">Election Performance</div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={electionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="votes" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Management Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/admin/elections" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-center">
          Manage Elections
        </Link>
        <Link to="/admin/voters" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-center">
          Manage Voters
        </Link>
      </div>
    </div>
  );
}
