import { NextRequest, NextResponse } from 'next/server';
import { updateLeadStatus, deleteLead } from '@/lib/db';

// PATCH - обновить статус заявки
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { error: 'Статус обязателен' },
        { status: 400 }
      );
    }

    const lead = updateLeadStatus(params.id, status);

    if (!lead) {
      return NextResponse.json(
        { error: 'Заявка не найдена' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error('Error updating lead:', error);
    return NextResponse.json(
      { error: 'Ошибка при обновлении заявки' },
      { status: 500 }
    );
  }
}

// DELETE - удалить заявку
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const success = deleteLead(params.id);

    if (!success) {
      return NextResponse.json(
        { error: 'Заявка не найдена' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting lead:', error);
    return NextResponse.json(
      { error: 'Ошибка при удалении заявки' },
      { status: 500 }
    );
  }
}
