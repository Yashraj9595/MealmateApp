import type { Plan, Announcement, MessInfo, Bill, LeaveRequest } from '../types/user';

// Mock data for development
const mockPlans: Plan[] = [
  {
    id: '1',
    name: 'Basic Plan',
    price: 2000,
    duration: 'Monthly',
    meals: {
      breakfast: true,
      lunch: true,
      dinner: false
    },
    features: [
      'Breakfast & Lunch',
      '30 days validity',
      'Flexible timing',
      'Basic menu'
    ]
  },
  {
    id: '2',
    name: 'Premium Plan',
    price: 3500,
    duration: 'Monthly',
    meals: {
      breakfast: true,
      lunch: true,
      dinner: true
    },
    features: [
      'All meals included',
      '30 days validity',
      'Flexible timing',
      'Premium menu',
      'Priority booking'
    ]
  }
];

const mockMessInfo: MessInfo = {
  name: 'Delicious Mess',
  address: '123 Food Street, City',
  contact: '+91 9876543210',
  rating: 4.5,
  image: 'https://example.com/mess-image.jpg',
  timings: {
    breakfast: '7:00 AM - 9:00 AM',
    lunch: '12:00 PM - 2:00 PM',
    dinner: '7:00 PM - 9:00 PM'
  }
};

const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Holiday Notice',
    content: 'Mess will remain closed on 15th August for Independence Day',
    date: '2024-03-10',
    type: 'info'
  },
  {
    id: '2',
    title: 'Menu Update',
    content: 'New items added to the menu. Check out our special thali!',
    date: '2024-03-08',
    type: 'success'
  }
];

const mockBills: Bill[] = [
  {
    id: '1',
    date: '2024-03-01',
    amount: 1500,
    status: 'paid',
    description: 'March Mess Bill'
  },
  {
    id: '2',
    date: '2024-03-15',
    amount: 750,
    status: 'pending',
    description: 'Additional Meal Charges'
  },
  {
    id: '3',
    date: '2024-02-28',
    amount: 2000,
    status: 'overdue',
    description: 'February Mess Bill'
  }
];

const mockLeaveRequests: LeaveRequest[] = [
  {
    id: '1',
    reason: 'Family function',
    startDate: '2024-03-15',
    endDate: '2024-03-17',
    status: 'approved',
    submittedAt: '2024-03-01'
  },
  {
    id: '2',
    reason: 'Medical leave',
    startDate: '2024-03-20',
    endDate: '2024-03-22',
    status: 'pending',
    submittedAt: '2024-03-10'
  }
];

const userService = {
  getPlans: async (): Promise<Plan[]> => {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockPlans), 1000);
    });
  },

  subscribeToPlan: async (planId: string): Promise<void> => {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 1000);
    });
  },

  getMessInfo: async (): Promise<MessInfo> => {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockMessInfo), 1000);
    });
  },

  getAnnouncements: async (): Promise<Announcement[]> => {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockAnnouncements), 1000);
    });
  },

  getBills: async (): Promise<Bill[]> => {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockBills), 1000);
    });
  },

  getLeaveRequests: async (): Promise<LeaveRequest[]> => {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockLeaveRequests), 1000);
    });
  },

  submitLeaveRequest: async (request: Omit<LeaveRequest, 'id' | 'status' | 'submittedAt'>): Promise<void> => {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 1000);
    });
  }
};

export default userService; 