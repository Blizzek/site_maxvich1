import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'Файл не найден' },
        { status: 400 }
      );
    }

    // Проверка типа файла
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Можно загружать только изображения' },
        { status: 400 }
      );
    }

    // Создаем папку для загрузок если её нет
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'projects');
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Генерируем уникальное имя файла
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const timestamp = Date.now();
    const originalName = file.name.replace(/\s+/g, '-');
    const fileName = `${timestamp}-${originalName}`;
    const filePath = path.join(uploadDir, fileName);

    // Сохраняем файл
    await writeFile(filePath, buffer);

    // Возвращаем путь к файлу
    const publicPath = `/uploads/projects/${fileName}`;

    return NextResponse.json({ 
      success: true, 
      path: publicPath 
    });

  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Ошибка при загрузке файла' },
      { status: 500 }
    );
  }
}
