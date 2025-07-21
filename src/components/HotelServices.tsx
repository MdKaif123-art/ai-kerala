import React, { useState } from 'react';
import { Utensils, Bed, Wrench, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface ServiceRequest {
  id: string;
  type: 'room-service' | 'housekeeping' | 'maintenance';
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  timestamp: Date;
}

interface HotelServicesProps {
  onRequestService: (serviceType: string, description: string) => void;
  serviceRequests: ServiceRequest[];
}

const HotelServices: React.FC<HotelServicesProps> = ({ onRequestService, serviceRequests }) => {
  const [activeTab, setActiveTab] = useState<'room-service' | 'housekeeping' | 'maintenance' | 'status'>('room-service');

  const roomServiceMenu = [
    { category: 'Breakfast', items: [
      { name: 'Continental Breakfast', price: 18, description: 'Fresh pastries, fruits, coffee, and juice' },
      { name: 'American Breakfast', price: 22, description: 'Eggs, bacon, toast, and hash browns' },
      { name: 'South Indian Breakfast', price: 16, description: 'Idli, dosa, sambar, and chutney' }
    ]},
    { category: 'Lunch', items: [
      { name: 'Grilled Chicken Salad', price: 24, description: 'Fresh greens with grilled chicken' },
      { name: 'Pasta Carbonara', price: 26, description: 'Creamy pasta with bacon and parmesan' },
      { name: 'Butter Chicken', price: 28, description: 'Tender chicken in rich tomato gravy' }
    ]},
    { category: 'Dinner', items: [
      { name: 'Grilled Salmon', price: 32, description: 'Fresh salmon with seasonal vegetables' },
      { name: 'Beef Tenderloin', price: 38, description: 'Premium cut with mashed potatoes' },
      { name: 'Vegetarian Curry', price: 20, description: 'Mixed vegetables in aromatic spices' }
    ]},
    { category: 'Snacks & Beverages', items: [
      { name: 'French Fries', price: 8, description: 'Crispy golden fries with ketchup' },
      { name: 'Coffee/Tea', price: 4, description: 'Fresh brewed coffee or assorted tea' },
      { name: 'Fresh Juice', price: 6, description: 'Orange, apple, or mixed fruit juice' }
    ]}
  ];

  const housekeepingServices = [
    { name: 'Fresh Towels', description: 'Request clean towels', icon: '🛁' },
    { name: 'Room Cleaning', description: 'Schedule room cleaning', icon: '🧹' },
    { name: 'Bed Linens', description: 'Request fresh bed sheets', icon: '🛏️' },
    { name: 'Bathroom Amenities', description: 'Get toiletries and supplies', icon: '🧴' }
  ];

  const maintenanceServices = [
    { name: 'AC/Heating', description: 'Report temperature issues', icon: '❄️' },
    { name: 'Electrical', description: 'Report lighting or power issues', icon: '💡' },
    { name: 'Plumbing', description: 'Report water or bathroom issues', icon: '🚿' },
    { name: 'TV/Entertainment', description: 'Report TV or remote issues', icon: '📺' },
    { name: 'WiFi/Internet', description: 'Report connectivity issues', icon: '📶' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'pending': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/20">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600/80 to-pink-600/80 backdrop-blur-sm text-white px-6 py-4">
        <h2 className="text-xl font-semibold">Hotel Services</h2>
        <p className="text-sm text-purple-100">Manage your room service, housekeeping, and maintenance requests</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/20">
        <button
          onClick={() => setActiveTab('room-service')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'room-service'
              ? 'bg-purple-600/20 text-white border-b-2 border-purple-400'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Utensils className="w-4 h-4 inline mr-2" />
          Room Service
        </button>
        <button
          onClick={() => setActiveTab('housekeeping')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'housekeeping'
              ? 'bg-purple-600/20 text-white border-b-2 border-purple-400'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Bed className="w-4 h-4 inline mr-2" />
          Housekeeping
        </button>
        <button
          onClick={() => setActiveTab('maintenance')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'maintenance'
              ? 'bg-purple-600/20 text-white border-b-2 border-purple-400'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Wrench className="w-4 h-4 inline mr-2" />
          Maintenance
        </button>
        <button
          onClick={() => setActiveTab('status')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'status'
              ? 'bg-purple-600/20 text-white border-b-2 border-purple-400'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Clock className="w-4 h-4 inline mr-2" />
          Status
        </button>
      </div>

      {/* Content */}
      <div className="p-6 bg-black/20 backdrop-blur-sm">
        {activeTab === 'room-service' && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-white mb-2">Room Service Menu</h3>
              <p className="text-gray-400 text-sm">Order delicious food and beverages to your room</p>
            </div>
            
            {roomServiceMenu.map((category, index) => (
              <div key={index} className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="text-white font-semibold mb-3 text-purple-300">{category.category}</h4>
                <div className="grid gap-3">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <div className="flex-1">
                        <h5 className="text-white font-medium">{item.name}</h5>
                        <p className="text-gray-400 text-sm">{item.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-semibold">${item.price}</p>
                        <button
                          onClick={() => onRequestService('room-service', `Order: ${item.name}`)}
                          className="text-xs bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-full transition-colors"
                        >
                          Order
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'housekeeping' && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-white mb-2">Housekeeping Services</h3>
              <p className="text-gray-400 text-sm">Request cleaning and room maintenance services</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {housekeepingServices.map((service, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-3">{service.icon}</span>
                    <h4 className="text-white font-semibold">{service.name}</h4>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">{service.description}</p>
                  <button
                    onClick={() => onRequestService('housekeeping', service.name)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Request Service
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'maintenance' && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-white mb-2">Maintenance Services</h3>
              <p className="text-gray-400 text-sm">Report issues that need immediate attention</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {maintenanceServices.map((service, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-3">{service.icon}</span>
                    <h4 className="text-white font-semibold">{service.name}</h4>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">{service.description}</p>
                  <button
                    onClick={() => onRequestService('maintenance', service.name)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Report Issue
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'status' && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-white mb-2">Service Request Status</h3>
              <p className="text-gray-400 text-sm">Track your pending and completed requests</p>
            </div>
            
            {serviceRequests.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <p className="text-white font-medium">No pending requests</p>
                <p className="text-gray-400 text-sm">All your service requests have been completed!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {serviceRequests.map((request) => (
                  <div key={request.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        {getStatusIcon(request.status)}
                        <span className="text-white font-medium ml-2">{request.description}</span>
                      </div>
                      <span className={`text-sm font-medium ${getPriorityColor(request.priority)}`}>
                        {request.priority} priority
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>Type: {request.type.replace('-', ' ')}</span>
                      <span>{request.timestamp.toLocaleTimeString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelServices; 