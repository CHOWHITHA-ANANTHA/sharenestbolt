import React, { useState } from 'react';
import { MessageSquare, MapPin, Clock, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface RequestPageProps {
  onNavigate: (page: string) => void;
}

const RequestPage: React.FC<RequestPageProps> = ({ onNavigate }) => {
  const { addRequest, currentUser, items } = useApp();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    urgency: 'medium' as 'low' | 'medium' | 'high',
    location: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.location) {
      alert('Please fill in all required fields');
      return;
    }

    addRequest({
      ...formData,
      requesterId: currentUser!.id,
      requesterName: currentUser!.name,
      isActive: true,
    });

    alert('Request submitted successfully!');
    onNavigate('profile');
  };

  const getSuggestedMatches = () => {
    return items.filter(item => 
      item.title.toLowerCase().includes(formData.title.toLowerCase()) ||
      item.description.toLowerCase().includes(formData.title.toLowerCase())
    ).slice(0, 3);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const suggestedMatches = getSuggestedMatches();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Request an Item</h1>
          <p className="text-gray-600">Ask your community for something you need</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                What are you looking for? *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="e.g., Bicycle, Winter Jacket, Laptop"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Request Details *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Describe what you need and why. Be specific about size, color, or other preferences..."
                required
              />
            </div>

            {/* Urgency and Location */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-2">
                  Urgency Level
                </label>
                <select
                  id="urgency"
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="low">Low - Whenever available</option>
                  <option value="medium">Medium - Within a week</option>
                  <option value="high">High - Urgently needed</option>
                </select>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="e.g., Downtown, 5th Street"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Request Preview */}
            {formData.title && (
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
                  Request Preview
                </h3>
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-900">{formData.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${getUrgencyColor(formData.urgency)}`}>
                      {formData.urgency} priority
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{formData.description}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{formData.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Requested by {currentUser?.name}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Suggested Matches */}
            {formData.title && suggestedMatches.length > 0 && (
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 flex items-center text-blue-800">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Suggested Matches from Available Items
                </h3>
                <div className="space-y-3">
                  {suggestedMatches.map(item => (
                    <div key={item.id} className="bg-white rounded-lg p-3 flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{item.title}</h4>
                        <p className="text-sm text-gray-600">by {item.donorName} • {item.location}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onNavigate('explore')}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                      >
                        View Item
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestPage