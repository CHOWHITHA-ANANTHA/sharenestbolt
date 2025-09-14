import React from 'react';
import { Users, MapPin, TrendingUp, Globe, Heart, Leaf } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface CommunityPageProps {
  onNavigate: (page: string) => void;
}

const CommunityPage: React.FC<CommunityPageProps> = ({ onNavigate }) => {
  const { communities, currentUser } = useApp();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Network</h1>
          <p className="text-gray-600">Connect with local sharing circles and communities</p>
        </div>

        {/* Community Stats Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-2xl p-8 mb-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Building Sustainable Communities Together</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center justify-center">
                <Users className="h-8 w-8 mr-2" />
                <div>
                  <div className="text-2xl font-bold">
                    {communities.reduce((sum, c) => sum + c.memberCount, 0).toLocaleString()}
                  </div>
                  <div className="text-sm opacity-90">Total Members</div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <TrendingUp className="h-8 w-8 mr-2" />
                <div>
                  <div className="text-2xl font-bold">
                    {communities.reduce((sum, c) => sum + c.itemsShared, 0).toLocaleString()}
                  </div>
                  <div className="text-sm opacity-90">Items Shared</div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Leaf className="h-8 w-8 mr-2" />
                <div>
                  <div className="text-2xl font-bold">
                    {communities.reduce((sum, c) => sum + c.co2Saved, 0).toLocaleString()}kg
                  </div>
                  <div className="text-sm opacity-90">CO₂ Saved</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Communities Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {communities.map(community => (
            <div 
              key={community.id} 
              className={`bg-white rounded-xl shadow-lg p-6 transition-all hover:shadow-xl ${
                currentUser?.communityId === community.id ? 'ring-2 ring-emerald-500' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{community.name}</h3>
                {currentUser?.communityId === community.id && (
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full">
                    Your Community
                  </span>
                )}
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Users className="h-5 w-5 mr-2" />
                  <span>{community.memberCount} members</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  <span>{community.itemsShared} items shared</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <Leaf className="h-5 w-5 mr-2" />
                  <span>{community.co2Saved}kg CO₂ saved</span>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-emerald-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${Math.min((community.itemsShared / 3000) * 100, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Activity Level</p>
              </div>
            </div>
          ))}
        </div>

        {/* Community Features */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <Globe className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Local Impact</h3>
                <p className="text-gray-600">Making a difference in your neighborhood</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Waste Reduction</span>
                <span className="font-semibold text-green-600">85% improvement</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Community Engagement</span>
                <span className="font-semibold text-blue-600">92% active</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Resource Sharing</span>
                <span className="font-semibold text-purple-600">78% efficient</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Community Stories</h3>
                <p className="text-gray-600">Real impact from real people</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700 text-sm italic mb-2">
                  "Share Nest helped me find a bicycle for my daughter. The community is so generous!"
                </p>
                <div className="text-xs text-gray-500">— Sarah, Downtown Community</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700 text-sm italic mb-2">
                  "I've donated over 15 items and helped 8 families. It feels amazing to give back."
                </p>
                <div className="text-xs text-gray-500">— Mike, University District</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700 text-sm italic mb-2">
                  "This platform transformed how our neighborhood shares resources."
                </p>
                <div className="text-xs text-gray-500">— Emma, Suburban Circle</div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-lg opacity-90 mb-6">
            Join thousands of community members who are building a more sustainable future together
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('donate')}
              className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Donating
            </button>
            <button
              onClick={() => onNavigate('explore')}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-emerald-600 transition-colors"
            >
              Explore Items
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage