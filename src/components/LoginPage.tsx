import React, { useState } from 'react';
import { Leaf, Users, Shield, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { User } from '../types';

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const { login, communities } = useApp();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    communityId: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password || !formData.communityId) {
      alert('Please fill in all fields');
      return;
    }

    const selectedCommunity = communities.find(c => c.id === formData.communityId);
    
    const user: User = {
      id: Date.now().toString(),
      name: formData.email.split('@')[0].charAt(0).toUpperCase() + formData.email.split('@')[0].slice(1),
      email: formData.email,
      communityId: formData.communityId,
      communityName: selectedCommunity?.name || 'Unknown Community',
      joinDate: new Date().toISOString(),
      communityScore: Math.floor(Math.random() * 100) + 50,
    };

    login(user);
    onNavigate('home');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-emerald-100 rounded-full">
                <Leaf className="h-8 w-8 text-emerald-600" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Share Nest</h1>
            <p className="text-gray-600">Join your community for sharing, donating & borrowing</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="Enter your password"
                required
              />
            </div>

            <div>
              <label htmlFor="communityId" className="block text-sm font-medium text-gray-700 mb-2">
                Select Your Community
              </label>
              <select
                id="communityId"
                name="communityId"
                value={formData.communityId}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                required
              >
                <option value="">Choose a community...</option>
                {communities.map(community => (
                  <option key={community.id} value={community.id}>
                    {community.name} ({community.memberCount} members)
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-emerald-700 transition-colors duration-200 shadow-lg"
            >
              Join Community
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center">
                <Users className="h-6 w-6 text-emerald-600 mb-1" />
                <span className="text-xs text-gray-600">Community</span>
              </div>
              <div className="flex flex-col items-center">
                <Shield className="h-6 w-6 text-blue-600 mb-1" />
                <span className="text-xs text-gray-600">Secure</span>
              </div>
              <div className="flex flex-col items-center">
                <Heart className="h-6 w-6 text-red-500 mb-1" />
                <span className="text-xs text-gray-600">Sustainable</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage