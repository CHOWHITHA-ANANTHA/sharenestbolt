import React from 'react';
import { Target, Users, Recycle, Globe, Heart, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const sdgs = [
    { 
      id: 1, 
      title: 'No Poverty', 
      description: 'Helping families access essential items they cannot afford',
      icon: Heart,
      color: 'text-red-600 bg-red-100'
    },
    { 
      id: 11, 
      title: 'Sustainable Cities', 
      description: 'Building resilient communities through resource sharing',
      icon: Users,
      color: 'text-orange-600 bg-orange-100'
    },
    { 
      id: 12, 
      title: 'Responsible Consumption', 
      description: 'Promoting circular economy and reducing waste',
      icon: Recycle,
      color: 'text-yellow-600 bg-yellow-100'
    },
    { 
      id: 13, 
      title: 'Climate Action', 
      description: 'Reducing carbon footprint through item reuse',
      icon: Globe,
      color: 'text-green-600 bg-green-100'
    },
    { 
      id: 17, 
      title: 'Partnerships', 
      description: 'Collaborating with NGOs, schools, and local organizations',
      icon: Target,
      color: 'text-blue-600 bg-blue-100'
    },
  ];

  const impactStats = [
    { value: '10,000+', label: 'Items Diverted from Landfills', icon: Recycle },
    { value: '15,500kg', label: 'CO₂ Emissions Saved', icon: Globe },
    { value: '2,340', label: 'Families Helped', icon: Heart },
    { value: '50+', label: 'Partner Organizations', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-emerald-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Mission
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Empowering communities to build a sustainable future through sharing, 
              caring, and reducing waste together.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Our Story */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Share Nest was born from a simple belief: that communities become stronger 
              when we share resources, reduce waste, and help one another. What started as 
              a local neighborhood initiative has grown into a movement connecting thousands 
              of people committed to sustainable living.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-emerald-600 mb-2">2021</div>
                <div className="text-gray-700">Founded with a vision of sustainable communities</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-600 mb-2">2023</div>
                <div className="text-gray-700">Reached 10,000 registered community members</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-600 mb-2">2025</div>
                <div className="text-gray-700">Expanding to support global sustainability goals</div>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Statistics */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-gray-600">
              Together, we're creating measurable change in our communities
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactStats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  index % 4 === 0 ? 'bg-emerald-100' :
                  index % 4 === 1 ? 'bg-blue-100' :
                  index % 4 === 2 ? 'bg-red-100' : 'bg-purple-100'
                }`}>
                  <stat.icon className={`h-8 w-8 ${
                    index % 4 === 0 ? 'text-emerald-600' :
                    index % 4 === 1 ? 'text-blue-600' :
                    index % 4 === 2 ? 'text-red-600' : 'text-purple-600'
                  }`} />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* SDGs Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Supporting UN Sustainable Development Goals</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Share Nest directly contributes to achieving the United Nations Sustainable Development Goals 
              through community-driven resource sharing and waste reduction initiatives.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sdgs.map(sdg => (
              <div key={sdg.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${sdg.color}`}>
                    <sdg.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">SDG {sdg.id}</div>
                    <div className="font-semibold text-gray-900">{sdg.title}</div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{sdg.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How We Work */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How We Create Change</h2>
            <p className="text-gray-600">
              Our approach combines technology with community spirit
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Community-First Approach</h3>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></div>
                  Local community verification and trust building
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></div>
                  Neighborhood-based sharing to reduce transport emissions
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></div>
                  Community events and educational workshops
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></div>
                  Partnership with local NGOs and schools
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Measurable Impact</h3>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  Real-time tracking of environmental impact
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  Community scores and recognition systems
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  Regular impact reports and transparency
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  Data-driven insights for community improvement
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Join the Movement</h2>
          <p className="text-lg opacity-90 mb-6">
            Every item shared, every request fulfilled, and every connection made brings us closer to a sustainable future
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('home')}
              className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center"
            >
              Get Started Today
              <ArrowRight className="h-5 w-5 ml-2" />
            </button>
            <button
              onClick={() => onNavigate('community')}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-emerald-600 transition-colors"
            >
              Explore Communities
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage