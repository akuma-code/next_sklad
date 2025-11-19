import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { _ID } from '@/Helpers/generateId';


export interface UploadResponse {
    success: boolean;
    filename: string;
    path: string;
    error?: string;
}
export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // Создаем папку uploads в public
        const uploadsDir = join(process.cwd(), 'public', 'uploads');
        if (!existsSync(uploadsDir)) {
            await mkdir(uploadsDir, { recursive: true });
        }

        // Генерируем уникальное имя
        const uuid = _ID()

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const originalName = file.name;
        const name = originalName.split('.')[0]
        const extension = originalName.split('.').pop();
        const filename = `${name}_${uuid}.${extension}`;
        const filePath = join(uploadsDir, filename);

        // Сохраняем файл
        await writeFile(filePath, buffer);

        return NextResponse.json({
            success: true,
            filename,
            path: `/uploads/${filename}`
        });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
    }
}