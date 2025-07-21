import { hotelService } from './hotelService';

class OpenRouterService {
  private apiKey: string;
  private baseUrl: string;
  private currentLanguage: string = 'english';

  constructor() {
    // In a real application, store this in environment variables
    this.apiKey = 'openrouter key';
    this.baseUrl = 'https://openrouter.ai/api/v1';
  }

  setLanguage(language: string) {
    this.currentLanguage = language;
  }

  async getChatResponse(message: string): Promise<string> {
    try {
      // First, check if this is a hotel-specific query
      const hotelResponse = await hotelService.processHotelQuery(message);
      if (hotelResponse) {
        return hotelResponse;
      }
      
      // If not a hotel query, use the regular AI response
      return this.simulateAPIResponse(message);
    } catch (error) {
      console.error('OpenRouter API error:', error);
      throw new Error('Failed to get response from AI service');
    }
  }

  private async simulateAPIResponse(message: string): Promise<string> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const responses = this.getHotelResponses(message.toLowerCase());
    return responses[Math.floor(Math.random() * responses.length)];
  }

  private getHotelResponses(message: string): string[] {
    if (message.includes('reservation') || message.includes('booking') || message.includes('book')) {
      return [
        'I\'d love to help you book a room! What dates are you thinking of staying with us? I can check availability and find you the perfect room!',
        'Booking a room is super easy! When are you planning to visit? I\'ll make sure you get the best room available!',
        'Let\'s get you all set up with a reservation! Could you tell me your check-in and check-out dates? I\'ll find something perfect for you!'
      ];
    }

    if (message.includes('room') || message.includes('accommodation')) {
      return [
        'We\'ve got some really cool rooms here! We have Standard, Deluxe, and Suite options. What kind of vibe are you looking for?',
        'Our rooms are pretty awesome! Each type has its own perks. Would you like me to tell you about the different categories?',
        'I can totally help you pick the perfect room! We\'ve got options for every budget and style. What sounds good to you?'
      ];
    }

    if (message.includes('service') || message.includes('amenities')) {
      return [
        'We\'ve got tons of cool stuff here! 24/7 room service, concierge help, spa services, and a great fitness center. What interests you most?',
        'Our services are pretty amazing! We do laundry, have a great restaurant, and can arrange tours. What can I help you with?',
        'We\'ve got everything you need! Swimming pool, business center, free WiFi - the works! What would you like to know more about?'
      ];
    }

    if (message.includes('check-in') || message.includes('check-out')) {
      return [
        'Check-in is at 3:00 PM and check-out is at 11:00 AM. But hey, if you need early check-in or late check-out, just ask nicely and we\'ll see what we can do!',
        'We\'re pretty flexible with timing! Standard check-in is 3 PM and check-out is 11 AM, but we can work with you if needed.',
        'For check-in and check-out, we\'re pretty chill about timing. Standard times are 3 PM in and 11 AM out, but we can be flexible!'
      ];
    }

    if (message.includes('price') || message.includes('cost') || message.includes('rate')) {
      return [
        'Our rates are pretty reasonable! They do change with the season, but I can check current pricing for your dates. When are you thinking of coming?',
        'Prices depend on when you want to stay and what room you like. Want me to check availability and rates for you?',
        'I\'d be happy to give you the scoop on rates! Just let me know your travel dates and what kind of room you\'re into!'
      ];
    }

    if (message.includes('location') || message.includes('address') || message.includes('directions')) {
      return [
        'We\'re in the perfect spot downtown! Super easy to get to all the cool attractions and transportation.',
        'Our location is pretty awesome! We\'re right near great restaurants, shopping, and entertainment. You\'ll love it here!',
        'I can totally help you find us! We\'re in a prime location with everything nearby. How are you planning to get here?'
      ];
    }

    if (message.includes('food') || message.includes('restaurant') || message.includes('dining')) {
      return [
        'Our restaurant is seriously good! We serve amazing international cuisine, and room service is available 24/7. You won\'t go hungry here!',
        'We\'ve got great dining options! Fine dining, casual cafe, and in-room dining. What kind of meal are you in the mood for?',
        'I can tell you all about our restaurant! Great hours, awesome menu, and we can help with reservations. What sounds good?'
      ];
    }

    if (message.includes('wifi') || message.includes('internet')) {
      return [
        'We\'ve got super fast WiFi everywhere! All guest rooms and public areas have complimentary high-speed internet.',
        'Absolutely! Free wireless internet is available throughout the whole hotel. Stay connected!',
        'WiFi is totally free and unlimited during your stay. We\'ve got you covered everywhere in the hotel!'
      ];
    }

    if (message.includes('pet') || message.includes('dog') || message.includes('cat')) {
      return [
        'We love pets here! We\'re totally pet-friendly and welcome well-behaved furry friends. Just let us know when you book!',
        'Yes, we\'re pet-friendly! We\'d love to host you and your pet. We have designated pet rooms and great walking areas nearby.',
        'We\'re totally cool with pets! Just give us a heads up when you\'re booking and we\'ll make sure everything is perfect for your furry friend!'
      ];
    }

    if (message.includes('cancel') || message.includes('modify')) {
      return [
        'No worries about changes! Our cancellation policy is pretty flexible. What would you like to modify?',
        'I can totally help with changes to your reservation. Do you have your confirmation number handy?',
        'Changes are no problem! I\'d be happy to help modify your reservation. What do you need to adjust?'
      ];
    }

    // Default responses
    return [
      'Hey there! I\'m here to help with anything hotel-related. What can I assist you with today?',
      'Thanks for chatting with me! I\'m here to make sure you have an amazing experience. What do you need help with?',
      'I\'d love to help you out! What hotel stuff can I help you with today?',
      'Welcome! I\'m here to make sure you have the best stay possible. How can I help you today?'
    ];
  }
}

export const openRouterService = new OpenRouterService();
