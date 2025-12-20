import { NextRequest, NextResponse } from 'next/server';
import { getCalculatorConfig, updateCalculatorConfig, resetCalculatorConfig } from '@/lib/calculator-config';

// GET - получить конфигурацию калькулятора
export async function GET(request: NextRequest) {
  try {
    const config = getCalculatorConfig();
    return NextResponse.json(config);
  } catch (error) {
    console.error('Error fetching calculator config:', error);
    return NextResponse.json(
      { error: 'Ошибка при получении конфигурации' },
      { status: 500 }
    );
  }
}

// PUT - обновить конфигурацию
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const config = updateCalculatorConfig(body);
    return NextResponse.json({ success: true, config });
  } catch (error) {
    console.error('Error updating calculator config:', error);
    return NextResponse.json(
      { error: 'Ошибка при обновлении конфигурации' },
      { status: 500 }
    );
  }
}

// POST - сбросить к настройкам по умолчанию
export async function POST(request: NextRequest) {
  try {
    const config = resetCalculatorConfig();
    return NextResponse.json({ success: true, config });
  } catch (error) {
    console.error('Error resetting calculator config:', error);
    return NextResponse.json(
      { error: 'Ошибка при сбросе конфигурации' },
      { status: 500 }
    );
  }
}
