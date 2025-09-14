import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Item, Request, Community } from '../types';

interface AppContextType {
  currentUser: User | null;
  items: Item[];
  requests: Request[];
  communities: Community[];
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  addItem: (item: Omit<Item, 'id' | 'datePosted'>) => void;
  updateItem: (id: string, updates: Partial<Item>) => void;
  deleteItem: (id: string) => void;
  addRequest: (request: Omit<Request, 'id' | 'dateRequested'>) => void;
  updateRequest: (id: string, updates: Partial<Request>) => void;
  deleteRequest: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

const mockCommunities: Community[] = [
  { id: '1', name: 'Downtown Community', memberCount: 234, itemsShared: 1456, co2Saved: 2300 },
  { id: '2', name: 'Suburban Circle', memberCount: 189, itemsShared: 892, co2Saved: 1540 },
  { id: '3', name: 'University District', memberCount: 456, itemsShared: 2341, co2Saved: 3890 },
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [communities] = useState<Community[]>(mockCommunities);

  const login = (user: User) => {
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
    setItems([]);
    setRequests([]);
  };

  const addItem = (itemData: Omit<Item, 'id' | 'datePosted'>) => {
    const newItem: Item = {
      ...itemData,
      id: Date.now().toString(),
      datePosted: new Date().toISOString(),
    };
    setItems(prev => [newItem, ...prev]);
  };

  const updateItem = (id: string, updates: Partial<Item>) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const addRequest = (requestData: Omit<Request, 'id' | 'dateRequested'>) => {
    const newRequest: Request = {
      ...requestData,
      id: Date.now().toString(),
      dateRequested: new Date().toISOString(),
    };
    setRequests(prev => [newRequest, ...prev]);
  };

  const updateRequest = (id: string, updates: Partial<Request>) => {
    setRequests(prev => prev.map(request => 
      request.id === id ? { ...request, ...updates } : request
    ));
  };

  const deleteRequest = (id: string) => {
    setRequests(prev => prev.filter(request => request.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        items,
        requests,
        communities,
        isAuthenticated: !!currentUser,
        login,
        logout,
        addItem,
        updateItem,
        deleteItem,
        addRequest,
        updateRequest,
        deleteRequest,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};