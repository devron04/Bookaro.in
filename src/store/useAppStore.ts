import { create } from 'zustand';
import { initialLeads, villasData as initialVillas, type Lead, type Villa } from './mockData';

interface AppState {
  leads: Lead[];
  villas: Villa[];
  toastMsg: string | null;
  addLead: (lead: Omit<Lead, 'id' | 'timestamp'>) => void;
  changeLeadStatus: (id: string, status: Lead['status']) => void;
  deleteLead: (id: string) => void;
  setToastMsg: (msg: string | null) => void;
  addVilla: (villa: Omit<Villa, 'id'>) => void;
}

export const useAppStore = create<AppState>((set) => {
  // Load from local storage
  const savedLeads = typeof window !== 'undefined' ? localStorage.getItem('bookaro_leads') : null;
  const loadedLeads = savedLeads ? JSON.parse(savedLeads) : initialLeads;
  
  const savedVillas = typeof window !== 'undefined' ? localStorage.getItem('bookaro_villas') : null;
  const loadedVillas = savedVillas ? JSON.parse(savedVillas) : initialVillas;

  return {
    leads: loadedLeads,
    villas: loadedVillas,
    toastMsg: null,
    addLead: (newLeadData) => set((state) => {
      const freshLead: Lead = {
        ...newLeadData,
        id: `ld-${Date.now()}`,
        timestamp: new Date().toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        })
      };
      const updatedLeads = [freshLead, ...state.leads];
      localStorage.setItem('bookaro_leads', JSON.stringify(updatedLeads));
      
      // We will handle clearing toast message in a component or useEffect, 
      // but for simplicity we just set it here
      setTimeout(() => {
        set({ toastMsg: null });
      }, 4500);

      return { 
        leads: updatedLeads,
        toastMsg: `Success! Saved Lead for ${freshLead.name}. Checked in Admin Console.`
      };
    }),
    changeLeadStatus: (id, status) => set((state) => {
      const updatedLeads = state.leads.map(l => l.id === id ? { ...l, status } : l);
      localStorage.setItem('bookaro_leads', JSON.stringify(updatedLeads));
      return { leads: updatedLeads };
    }),
    deleteLead: (id) => set((state) => {
      const updatedLeads = state.leads.filter(l => l.id !== id);
      localStorage.setItem('bookaro_leads', JSON.stringify(updatedLeads));
      return { leads: updatedLeads };
    }),
    setToastMsg: (msg) => set({ toastMsg: msg }),
    addVilla: (newVillaData) => set((state) => {
      const freshVilla: Villa = {
        ...newVillaData,
        id: `villa-${Date.now()}`
      };
      const updatedVillas = [freshVilla, ...state.villas];
      localStorage.setItem('bookaro_villas', JSON.stringify(updatedVillas));
      
      return { 
        villas: updatedVillas,
        toastMsg: `Success! Added new villa: ${freshVilla.name}.`
      };
    })
  };
});
