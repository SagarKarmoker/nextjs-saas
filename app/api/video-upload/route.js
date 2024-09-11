import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { auth } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_DB,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
});

export async function POST(request) {
    const { userId } = auth();

    if (!userId) {
        return NextResponse.json({
            error: 'Unauthorized'
        }, {
            status: 401
        });
    }

    try {
        const formData = await request.formData();
        const file = formData.get('file');
        const title = formData.get('title');
        const desc = formData.get('desc');
        const originalSize = formData.get('originalSize');


        if (!file) {
            return NextResponse.json({
                error: 'No file provided'
            }, {
                status: 400
            });
        }

        // if file is present, upload to cloudinary
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const result = await new Promise((resolve, reject) => {
            const upload_stream = cloudinary.uploader.upload_stream(
                {
                    resource_type: "video",
                    folder: "NextJS-Cloudinary-videos",
                    transformation: [
                        { quality: "auto", fetch_format: 'mp4' },
                    ]
                },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            )
            upload_stream.end(buffer);
        })

        const video = await prisma.video.create({
            data: {
                title: title,
                desc: desc,
                originalSize: originalSize,
                publicId: result.public_id,
                compressedSize: String(result.bytes),
                duration: String(result.duration),
            }
        })

        return NextResponse.json(video, {
            status: 200
        })
    } catch (error) {
        console.log("upload video error: ", error)
        return NextResponse.json({
            error: error.message
        }, {
            status: 500
        })
    } finally {
        await prisma.$disconnect()
    }

}