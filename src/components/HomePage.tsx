import React from 'react';
import { Plus, Search, Recycle, Users, Leaf, ArrowRight, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { currentUser, items, requests, communities } = useApp();
  
  const currentCommunity = communities.find(c => c.id === currentUser?.communityId);
  const userItems = items.filter(item => item.donorId === currentUser?.id);
  const userRequests = requests.filter(request => request.requesterId === currentUser?.id);

  const stats = {
    itemsReused: communities.reduce((sum, c) => sum + c.itemsShared, 0),
    co2Saved: communities.reduce((sum, c) => sum + c.co2Saved, 0),
    members: communities.reduce((sum, c) => sum + c.memberCount, 0),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-emerald-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Share Nest
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              A community for sharing, donating & borrowing
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('donate')}
                className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg flex items-center justify-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Donate an Item
              </button>
              <button
                onClick={() => onNavigate('request')}
                className="bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-800 transition-colors shadow-lg flex items-center justify-center border border-emerald-500"
              >
                <Search className="h-5 w-5 mr-2" />
                Request an Item
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join the circular economy in three simple steps
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">1. Donate</h3>
            <p className="text-gray-600">Share items you no longer need with your community</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">2. Borrow</h3>
            <p className="text-gray-600">Find and borrow items from neighbors nearby</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Recycle className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">3. Request</h3>
            <p className="text-gray-600">Ask for items you need and connect with donors</p>
          </div>
        </div>
      </div>

      {/* Impact Stats */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Community Impact</h2>
            <p className="text-gray-600">Together, we're making a difference</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-emerald-50 rounded-xl">
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                {stats.itemsReused.toLocaleString()}
              </div>
              <div className="text-gray-700 font-medium">Items Reused</div>
            </div>
            
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {stats.co2Saved.toLocaleString()}kg
              </div>
              <div className="text-gray-700 font-medium">CO₂ Saved</div>
            </div>
            
            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {stats.members.toLocaleString()}
              </div>
              <div className="text-gray-700 font-medium">Community Members</div>
            </div>
          </div>
        </div>
      </div>

      {/* Your Activity */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Activity</h2>
            <div className="flex items-center text-emerald-600">
              <Star className="h-5 w-5 mr-1" />
              <span className="font-semibold">Score: {currentUser?.communityScore}</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900 mb-1">{userItems.length}</div>
              <div className="text-sm text-gray-600">Items Donated</div>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900 mb-1">{userRequests.length}</div>
              <div className="text-sm text-gray-600">Items Requested</div>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900 mb-1">{currentCommunity?.name || 'N/A'}</div>
              <div className="text-sm text-gray-600">Your Community</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid md:grid-cols-2 gap-6">
          <div 
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-8 rounded-2xl cursor-pointer hover:from-emerald-600 hover:to-emerald-700 transition-all transform hover:scale-105"
            onClick={() => onNavigate('explore')}
          >
            <h3 className="text-xl font-bold mb-2">Explore Available Items</h3>
            <p className="opacity-90 mb-4">Discover what your neighbors are sharing</p>
            <div className="flex items-center text-sm">
              <span>Browse now</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </div>
          </div>
          
          <div 
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8 rounded-2xl cursor-pointer hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105"
            onClick={() => onNavigate('community')}
          >
            <h3 className="text-xl font-bold mb-2">Join Community Events</h3>
            <p className="opacity-90 mb-4">Connect with local sharing circles</p>
            <div className="flex items-center text-sm">
              <span>Learn more</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage