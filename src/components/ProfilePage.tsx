import React from 'react';
import { User, Calendar, Star, Trash2, ToggleLeft, ToggleRight, MapPin, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ProfilePageProps {
  onNavigate: (page: string) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
  const { currentUser, items, requests, updateItem, deleteItem, deleteRequest, communities } = useApp();
  
  const userItems = items.filter(item => item.donorId === currentUser?.id);
  const userRequests = requests.filter(request => request.requesterId === currentUser?.id);
  const currentCommunity = communities.find(c => c.id === currentUser?.communityId);

  const handleToggleItemAvailability = (itemId: string, currentAvailability: boolean) => {
    updateItem(itemId, { isAvailable: !currentAvailability });
  };

  const handleDeleteItem = (itemId: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteItem(itemId);
    }
  };

  const handleDeleteRequest = (requestId: string) => {
    if (window.confirm('Are you sure you want to delete this request?')) {
      deleteRequest(requestId);
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'new': return 'text-green-600 bg-green-100';
      case 'used': return 'text-blue-600 bg-blue-100';
      case 'fair': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
              <User className="h-10 w-10 text-emerald-600" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{currentUser?.name}</h1>
              <p className="text-gray-600">{currentUser?.email}</p>
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Joined {new Date(currentUser?.joinDate || '').toLocaleDateString()}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center text-emerald-600 mb-1">
                <Star className="h-5 w-5 mr-1" />
                <span className="text-xl font-bold">{currentUser?.communityScore}</span>
              </div>
              <p className="text-sm text-gray-600">Community Score</p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-900">{userItems.length}</div>
                <div className="text-sm text-gray-600">Items Donated</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{userRequests.length}</div>
                <div className="text-sm text-gray-600">Items Requested</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{currentCommunity?.name || 'N/A'}</div>
                <div className="text-sm text-gray-600">Community</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Donated Items */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Your Donated Items</h2>
            {userItems.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-600 mb-4">You haven't donated any items yet</p>
                <button
                  onClick={() => onNavigate('donate')}
                  className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                >
                  Donate Your First Item
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {userItems.map(item => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${getConditionColor(item.condition)}`}>
                          {item.condition}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          item.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {item.isAvailable ? 'Available' : 'Unavailable'}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{item.location}</span>
                      <Clock className="h-4 w-4 ml-4 mr-1" />
                      <span>{new Date(item.datePosted).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleToggleItemAvailability(item.id, item.isAvailable)}
                        className={`flex items-center px-3 py-1 rounded text-sm font-medium transition-colors ${
                          item.isAvailable 
                            ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {item.isAvailable ? <ToggleRight className="h-4 w-4 mr-1" /> : <ToggleLeft className="h-4 w-4 mr-1" />}
                        {item.isAvailable ? 'Mark Unavailable' : 'Mark Available'}
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="flex items-center px-3 py-1 bg-red-100 text-red-700 rounded text-sm font-medium hover:bg-red-200 transition-colors"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Requested Items */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Your Requests</h2>
            {userRequests.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-600 mb-4">You haven't made any requests yet</p>
                <button
                  onClick={() => onNavigate('request')}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Make Your First Request
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {userRequests.map(request => (
                  <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{request.title}</h3>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${getUrgencyColor(request.urgency)}`}>
                          {request.urgency} priority
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          request.isActive ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {request.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3">{request.description}</p>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{request.location}</span>
                      <Clock className="h-4 w-4 ml-4 mr-1" />
                      <span>{new Date(request.dateRequested).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDeleteRequest(request.id)}
                        className="flex items-center px-3 py-1 bg-red-100 text-red-700 rounded text-sm font-medium hover:bg-red-200 transition-colors"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete Request
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage