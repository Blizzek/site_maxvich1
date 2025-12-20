import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'leads.json');

export interface Lead {
  id: string;
  name: string;
  phone: string;
  message?: string;
  createdAt: string;
  status: 'new' | 'in-progress' | 'completed';
}

// Инициализация базы данных
function initDB() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2));
  }
}

// Получить все заявки
export function getAllLeads(): Lead[] {
  initDB();
  const data = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(data);
}

// Добавить новую заявку
export function addLead(lead: Omit<Lead, 'id' | 'createdAt' | 'status'>): Lead {
  initDB();
  const leads = getAllLeads();
  
  const newLead: Lead = {
    ...lead,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    status: 'new',
  };
  
  leads.unshift(newLead);
  fs.writeFileSync(DB_PATH, JSON.stringify(leads, null, 2));
  
  return newLead;
}

// Обновить статус заявки
export function updateLeadStatus(id: string, status: Lead['status']): Lead | null {
  initDB();
  const leads = getAllLeads();
  const index = leads.findIndex(l => l.id === id);
  
  if (index === -1) return null;
  
  leads[index].status = status;
  fs.writeFileSync(DB_PATH, JSON.stringify(leads, null, 2));
  
  return leads[index];
}

// Удалить заявку
export function deleteLead(id: string): boolean {
  initDB();
  const leads = getAllLeads();
  const filtered = leads.filter(l => l.id !== id);
  
  if (filtered.length === leads.length) return false;
  
  fs.writeFileSync(DB_PATH, JSON.stringify(filtered, null, 2));
  return true;
}

// Получить статистику
export function getStats() {
  const leads = getAllLeads();
  return {
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    inProgress: leads.filter(l => l.status === 'in-progress').length,
    completed: leads.filter(l => l.status === 'completed').length,
  };
}
