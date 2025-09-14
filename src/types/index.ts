export interface User {
  id: string;
  name: string;
  email: string;
  communityId: string;
  communityName: string;
  profilePhoto?: string;
  joinDate: string;
  communityScore: number;
  contactInfo?: string;
}

export interface Item {
  id: string;
  title: string;
  description: string;
  category: string;
  condition: 'new' | 'used' | 'fair';
  availability: 'temporary' | 'permanent';
  photo: string;
  location: string;
  donorId: string;
  donorName: string;
  isAvailable: boolean;
  datePosted: string;
}

export interface Request {
  id: string;
  title: string;
  description: string;
  urgency: 'low' | 'medium' | 'high';
  location: string;
  requesterId: string;
  requesterName: string;
  dateRequested: string;
  isActive: boolean;
}

export interface Community {
  id: string;
  name: string;
  memberCount: number;
  itemsShared: number;
  co2Saved: number;
}