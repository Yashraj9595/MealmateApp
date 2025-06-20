export type Plan = {
  id: string;
  name: string;
  price: number;
  duration: string;
  meals: {
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
  };
  features: string[];
};

export type Announcement = {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'info' | 'warning' | 'success';
};

export type MessInfo = {
  name: string;
  address: string;
  contact: string;
  rating: number;
  image: string;
  timings: {
    breakfast: string;
    lunch: string;
    dinner: string;
  };
};

export type Bill = {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  description: string;
};

export type LeaveRequest = {
  id: string;
  reason: string;
  startDate: string;
  endDate: string;
  status: 'approved' | 'pending' | 'rejected';
  submittedAt: string;
}; 