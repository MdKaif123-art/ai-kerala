interface RoomServiceItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snacks' | 'beverages';
  available: boolean;
}

interface ServiceRequest {
  id: string;
  type: 'room-service' | 'housekeeping' | 'maintenance';
  description: string;
  roomNumber?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  timestamp: Date;
}

class HotelService {
  private roomServiceMenu: RoomServiceItem[] = [
    // Breakfast
    { id: 'bf1', name: 'Continental Breakfast', description: 'Fresh pastries, fruits, coffee, and juice', price: 18, category: 'breakfast', available: true },
    { id: 'bf2', name: 'American Breakfast', description: 'Eggs, bacon, toast, and hash browns', price: 22, category: 'breakfast', available: true },
    { id: 'bf3', name: 'South Indian Breakfast', description: 'Idli, dosa, sambar, and chutney', price: 16, category: 'breakfast', available: true },
    
    // Lunch
    { id: 'ln1', name: 'Grilled Chicken Salad', description: 'Fresh greens with grilled chicken and vinaigrette', price: 24, category: 'lunch', available: true },
    { id: 'ln2', name: 'Pasta Carbonara', description: 'Creamy pasta with bacon and parmesan', price: 26, category: 'lunch', available: true },
    { id: 'ln3', name: 'Butter Chicken', description: 'Tender chicken in rich tomato gravy with naan', price: 28, category: 'lunch', available: true },
    
    // Dinner
    { id: 'dn1', name: 'Grilled Salmon', description: 'Fresh salmon with seasonal vegetables', price: 32, category: 'dinner', available: true },
    { id: 'dn2', name: 'Beef Tenderloin', description: 'Premium cut with mashed potatoes', price: 38, category: 'dinner', available: true },
    { id: 'dn3', name: 'Vegetarian Curry', description: 'Mixed vegetables in aromatic spices', price: 20, category: 'dinner', available: true },
    
    // Snacks
    { id: 'sn1', name: 'French Fries', description: 'Crispy golden fries with ketchup', price: 8, category: 'snacks', available: true },
    { id: 'sn2', name: 'Chicken Wings', description: 'Spicy wings with blue cheese dip', price: 14, category: 'snacks', available: true },
    { id: 'sn3', name: 'Nachos', description: 'Loaded nachos with cheese and salsa', price: 12, category: 'snacks', available: true },
    
    // Beverages
    { id: 'bv1', name: 'Coffee', description: 'Fresh brewed coffee', price: 4, category: 'beverages', available: true },
    { id: 'bv2', name: 'Tea', description: 'Assorted tea selection', price: 3, category: 'beverages', available: true },
    { id: 'bv3', name: 'Fresh Juice', description: 'Orange, apple, or mixed fruit juice', price: 6, category: 'beverages', available: true },
    { id: 'bv4', name: 'Soft Drinks', description: 'Coke, Pepsi, Sprite, or Fanta', price: 3, category: 'beverages', available: true }
  ];

  private serviceRequests: ServiceRequest[] = [];

  // Room Service Methods
  async orderRoomService(userInput: string): Promise<string> {
    const input = userInput.toLowerCase();
    
    // Check for specific items
    for (const item of this.roomServiceMenu) {
      if (input.includes(item.name.toLowerCase()) || input.includes(item.id)) {
        if (!item.available) {
          return `I'm sorry, but ${item.name} is currently not available. Would you like to try something else from our menu?`;
        }
        
        const request: ServiceRequest = {
          id: `rs_${Date.now()}`,
          type: 'room-service',
          description: `Ordered: ${item.name} - $${item.price}`,
          priority: 'medium',
          status: 'pending',
          timestamp: new Date()
        };
        
        this.serviceRequests.push(request);
        return `Oh great! I just put in your order for ${item.name}. It should be up to your room in about 20-30 minutes. That'll be $${item.price} - pretty reasonable, right? What else can I help you with while you wait?`;
      }
    }

    // Check for categories
    if (input.includes('breakfast') || input.includes('morning')) {
      const breakfastItems = this.roomServiceMenu.filter(item => item.category === 'breakfast' && item.available);
      const menu = breakfastItems.map(item => `• ${item.name} - $${item.price}`).join('\n');
      return `Sure! Here's what we've got for breakfast:\n${menu}\n\nWhat sounds good to you? I'm personally a fan of the South Indian breakfast - those dosas are amazing!`;
    }
    
    if (input.includes('lunch') || input.includes('noon')) {
      const lunchItems = this.roomServiceMenu.filter(item => item.category === 'lunch' && item.available);
      const menu = lunchItems.map(item => `• ${item.name} - $${item.price}`).join('\n');
      return `Lunch time! Here's what's on the menu:\n${menu}\n\nThe butter chicken is really popular - our chef makes it perfectly. What are you in the mood for?`;
    }
    
    if (input.includes('dinner') || input.includes('evening') || input.includes('night')) {
      const dinnerItems = this.roomServiceMenu.filter(item => item.category === 'dinner' && item.available);
      const menu = dinnerItems.map(item => `• ${item.name} - $${item.price}`).join('\n');
      return `Perfect timing for dinner! Here's what we've got:\n${menu}\n\nThe grilled salmon is my personal favorite - it's always fresh and perfectly cooked. What catches your eye?`;
    }

    if (input.includes('menu') || input.includes('food') || input.includes('eat')) {
      const categories = ['breakfast', 'lunch', 'dinner', 'snacks', 'beverages'];
      const menu = categories.map(cat => {
        const items = this.roomServiceMenu.filter(item => item.category === cat && item.available);
        return `**${cat.toUpperCase()}:**\n${items.map(item => `• ${item.name} - $${item.price}`).join('\n')}`;
      }).join('\n\n');
      
      return `Absolutely! Let me show you what we've got. Our kitchen is pretty amazing, if I do say so myself:\n\n${menu}\n\nWhat looks good to you? I'm here to help you pick something delicious!`;
    }

    return `I'd be happy to help you with room service! You can ask for our menu, or order specific items like breakfast, lunch, dinner, snacks, or beverages. What would you like?`;
  }

  // Housekeeping Methods
  async requestHousekeeping(userInput: string): Promise<string> {
    const input = userInput.toLowerCase();
    
    if (input.includes('towel') || input.includes('towels')) {
      const request: ServiceRequest = {
        id: `hk_${Date.now()}`,
        type: 'housekeeping',
        description: 'Request for fresh towels',
        priority: 'medium',
        status: 'pending',
        timestamp: new Date()
      };
      this.serviceRequests.push(request);
      return `No problem at all! I just called housekeeping and they'll bring you fresh towels in about 15-20 minutes. They're really quick about it. Need anything else while you wait? Maybe some fresh bed linens or bathroom amenities?`;
    }
    
    if (input.includes('clean') || input.includes('cleaning') || input.includes('housekeeping')) {
      const request: ServiceRequest = {
        id: `hk_${Date.now()}`,
        type: 'housekeeping',
        description: 'Request for room cleaning',
        priority: 'low',
        status: 'pending',
        timestamp: new Date()
      };
      this.serviceRequests.push(request);
      return `Got it! I've scheduled a room cleaning for you. They should be there within the next hour. Would you prefer them to come now, or would you like to set a specific time? I can also arrange for fresh bed linens while they're at it.`;
    }
    
    if (input.includes('bed') || input.includes('sheets') || input.includes('linen')) {
      const request: ServiceRequest = {
        id: `hk_${Date.now()}`,
        type: 'housekeeping',
        description: 'Request for fresh bed linens',
        priority: 'medium',
        status: 'pending',
        timestamp: new Date()
      };
      this.serviceRequests.push(request);
      return `I've requested fresh bed linens for your room. Housekeeping will change them within 30 minutes. Is there anything else you need?`;
    }
    
    if (input.includes('toilet') || input.includes('bathroom') || input.includes('amenities')) {
      const request: ServiceRequest = {
        id: `hk_${Date.now()}`,
        type: 'housekeeping',
        description: 'Request for bathroom amenities',
        priority: 'medium',
        status: 'pending',
        timestamp: new Date()
      };
      this.serviceRequests.push(request);
      return `I've requested bathroom amenities for your room. Housekeeping will deliver them within 15 minutes. What specific items do you need?`;
    }

    return `I can help you with housekeeping requests! You can ask for fresh towels, room cleaning, bed linens, bathroom amenities, or any other housekeeping needs. What would you like?`;
  }

  // Maintenance Methods
  async reportMaintenance(userInput: string): Promise<string> {
    const input = userInput.toLowerCase();
    
    if (input.includes('ac') || input.includes('air conditioning') || input.includes('cooling')) {
      const request: ServiceRequest = {
        id: `mt_${Date.now()}`,
        type: 'maintenance',
        description: 'AC/Heating issue reported',
        priority: 'high',
        status: 'pending',
        timestamp: new Date()
      };
      this.serviceRequests.push(request);
      return `Oh no, that's not good! I just called our maintenance team and they're on their way. They should be there within 30 minutes to check it out. Is the AC completely off, or is it just not cooling properly? Don't worry, they're really good at fixing these things quickly. Anything else I can help you with while they're coming?`;
    }
    
    if (input.includes('light') || input.includes('bulb') || input.includes('electricity')) {
      const request: ServiceRequest = {
        id: `mt_${Date.now()}`,
        type: 'maintenance',
        description: 'Electrical/Lighting issue reported',
        priority: 'medium',
        status: 'pending',
        timestamp: new Date()
      };
      this.serviceRequests.push(request);
      return `I've reported the electrical issue to our maintenance team. They'll arrive within 45 minutes to fix it. Which lights are not working?`;
    }
    
    if (input.includes('water') || input.includes('shower') || input.includes('sink') || input.includes('toilet')) {
      const request: ServiceRequest = {
        id: `mt_${Date.now()}`,
        type: 'maintenance',
        description: 'Plumbing issue reported',
        priority: 'high',
        status: 'pending',
        timestamp: new Date()
      };
      this.serviceRequests.push(request);
      return `I've reported the plumbing issue to our maintenance team. They'll be here within 30 minutes to fix it. What specific water issue are you experiencing?`;
    }
    
    if (input.includes('tv') || input.includes('television') || input.includes('remote')) {
      const request: ServiceRequest = {
        id: `mt_${Date.now()}`,
        type: 'maintenance',
        description: 'TV/Entertainment issue reported',
        priority: 'low',
        status: 'pending',
        timestamp: new Date()
      };
      this.serviceRequests.push(request);
      return `I've reported the TV issue to our maintenance team. They'll arrive within an hour to check and fix it. What's wrong with the TV?`;
    }
    
    if (input.includes('wifi') || input.includes('internet') || input.includes('connection')) {
      const request: ServiceRequest = {
        id: `mt_${Date.now()}`,
        type: 'maintenance',
        description: 'WiFi/Internet connectivity issue reported',
        priority: 'high',
        status: 'pending',
        timestamp: new Date()
      };
      this.serviceRequests.push(request);
      return `Ugh, WiFi issues are the worst! I just called our IT team and they're rushing over. They should be there in about 20 minutes to get you back online. Are you completely unable to connect, or is it just really slow? They're usually pretty quick with these things. Hang in there!`;
    }

    return `I can help you report maintenance issues! Common issues include AC problems, electrical issues, plumbing problems, TV issues, or WiFi connectivity. What maintenance issue are you experiencing?`;
  }

  // Get service status
  async getServiceStatus(): Promise<string> {
    const pendingRequests = this.serviceRequests.filter(req => req.status === 'pending');
    const inProgressRequests = this.serviceRequests.filter(req => req.status === 'in-progress');
    
    if (pendingRequests.length === 0 && inProgressRequests.length === 0) {
      return `Great news! You're all caught up - no pending requests right now. Everything's running smoothly! Is there anything I can help you with? Maybe order some food or schedule some housekeeping?`;
    }
    
    let status = `Here's the status of your service requests:\n\n`;
    
    if (pendingRequests.length > 0) {
      status += `**Pending Requests:**\n`;
      pendingRequests.forEach(req => {
        status += `• ${req.description} (${req.type}) - ${req.priority} priority\n`;
      });
      status += `\n`;
    }
    
    if (inProgressRequests.length > 0) {
      status += `**In Progress:**\n`;
      inProgressRequests.forEach(req => {
        status += `• ${req.description} (${req.type}) - Being handled now\n`;
      });
    }
    
    return status;
  }

  // Process hotel-related queries
  async processHotelQuery(userInput: string): Promise<string | null> {
    const input = userInput.toLowerCase();
    
    // Room service
    if (input.includes('order') || input.includes('food') || input.includes('menu') || 
        input.includes('breakfast') || input.includes('lunch') || input.includes('dinner') ||
        input.includes('room service') || input.includes('eat')) {
      return await this.orderRoomService(userInput);
    }
    
    // Housekeeping
    if (input.includes('towel') || input.includes('clean') || input.includes('housekeeping') ||
        input.includes('bed') || input.includes('linen') || input.includes('bathroom')) {
      return await this.requestHousekeeping(userInput);
    }
    
    // Maintenance
    if (input.includes('broken') || input.includes('not working') || input.includes('issue') ||
        input.includes('problem') || input.includes('maintenance') || input.includes('repair') ||
        input.includes('ac') || input.includes('light') || input.includes('water') || 
        input.includes('tv') || input.includes('wifi')) {
      return await this.reportMaintenance(userInput);
    }
    
    // Service status
    if (input.includes('status') || input.includes('request') || input.includes('pending')) {
      return await this.getServiceStatus();
    }
    
    return null; // Let the main AI handle other queries
  }
}

export const hotelService = new HotelService(); 