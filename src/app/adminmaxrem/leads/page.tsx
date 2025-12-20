'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface Lead {
  id: string;
  name: string;
  phone: string;
  message?: string;
  createdAt: string;
  status: 'new' | 'in-progress' | 'completed';
}

export default function AdminLeadsPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState<'all' | 'new' | 'in-progress' | 'completed'>('all');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token === 'authenticated') {
      setIsAuthenticated(true);
      loadLeads();
    } else {
      router.push('/adminmaxrem');
    }
    setIsLoading(false);
  }, [router]);

  const loadLeads = async () => {
    try {
      const response = await fetch('/api/leads');
      if (response.ok) {
        const data = await response.json();
        setLeads(data);
      }
    } catch (error) {
      console.error('Error loading leads:', error);
    }
  };

  const updateStatus = async (id: string, status: Lead['status']) => {
    try {
      const response = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        loadLeads();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteLead = async (id: string) => {
    if (!confirm('Удалить заявку?')) return;

    try {
      const response = await fetch(`/api/leads/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        loadLeads();
      }
    } catch (error) {
      console.error('Error deleting lead:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/adminmaxrem');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status: Lead['status']) => {
    const styles = {
      new: 'bg-blue-100 text-blue-800',
      'in-progress': 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
    };

    const labels = {
      new: 'Новая',
      'in-progress': 'В работе',
      completed: 'Завершена',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const filteredLeads = filter === 'all' 
    ? leads 
    : leads.filter(lead => lead.status === filter);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Загрузка...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <Container>
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Заявки</h1>
              <p className="text-sm text-gray-600 mt-1">Управление заявками клиентов</p>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => router.push('/adminmaxrem/dashboard')} variant="outline">
                Назад
              </Button>
              <Button onClick={handleLogout} variant="outline">
                Выйти
              </Button>
            </div>
          </div>
        </Container>
      </header>

      <main className="py-10">
        <Container>
          {/* Фильтры */}
          <div className="flex gap-2 mb-6">
            <Button
              onClick={() => setFilter('all')}
              variant={filter === 'all' ? 'default' : 'outline'}
            >
              Все ({leads.length})
            </Button>
            <Button
              onClick={() => setFilter('new')}
              variant={filter === 'new' ? 'default' : 'outline'}
            >
              Новые ({leads.filter(l => l.status === 'new').length})
            </Button>
            <Button
              onClick={() => setFilter('in-progress')}
              variant={filter === 'in-progress' ? 'default' : 'outline'}
            >
              В работе ({leads.filter(l => l.status === 'in-progress').length})
            </Button>
            <Button
              onClick={() => setFilter('completed')}
              variant={filter === 'completed' ? 'default' : 'outline'}
            >
              Завершены ({leads.filter(l => l.status === 'completed').length})
            </Button>
          </div>

          {/* Список заявок */}
          <div className="space-y-4">
            {filteredLeads.length === 0 ? (
              <Card className="p-12">
                <p className="text-center text-gray-500">Заявок нет</p>
              </Card>
            ) : (
              filteredLeads.map((lead) => (
                <Card key={lead.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {lead.name}
                        </h3>
                        {getStatusBadge(lead.status)}
                      </div>
                      
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>
                          <span className="font-medium">Телефон:</span>{' '}
                          <a href={`tel:${lead.phone}`} className="text-blue-600 hover:underline">
                            {lead.phone}
                          </a>
                        </p>
                        {lead.message && (
                          <p>
                            <span className="font-medium">Сообщение:</span> {lead.message}
                          </p>
                        )}
                        <p className="text-gray-400">
                          {formatDate(lead.createdAt)}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <select
                        value={lead.status}
                        onChange={(e) => updateStatus(lead.id, e.target.value as Lead['status'])}
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="new">Новая</option>
                        <option value="in-progress">В работе</option>
                        <option value="completed">Завершена</option>
                      </select>
                      
                      <Button
                        onClick={() => deleteLead(lead.id)}
                        variant="outline"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        Удалить
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </Container>
      </main>
    </div>
  );
}
