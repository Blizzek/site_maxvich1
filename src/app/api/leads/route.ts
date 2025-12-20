import { NextRequest, NextResponse } from 'next/server';
import { addLead, getAllLeads, getStats } from '@/lib/db';

// POST - создать новую заявку
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, message } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Имя и телефон обязательны' },
        { status: 400 }
      );
    }

    const lead = addLead({ name, phone, message });

    return NextResponse.json({ success: true, lead }, { status: 201 });
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json(
      { error: 'Ошибка при создании заявки' },
      { status: 500 }
    );
  }
}

// GET - получить все заявки
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const statsOnly = searchParams.get('stats') === 'true';

    if (statsOnly) {
      const stats = getStats();
      return NextResponse.json(stats);
    }

    const leads = getAllLeads();
    return NextResponse.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { error: 'Ошибка при получении заявок' },
      { status: 500 }
    );
  }
}
