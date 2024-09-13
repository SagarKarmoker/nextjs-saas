"use client";
import React, { useState, useCallback } from 'react';
import { getCldImageUrl, getCldVideoUrl } from 'next-cloudinary';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { filesize } from 'filesize';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayCircle, Download } from 'lucide-react'; // Icons from lucide-react

dayjs.extend(relativeTime);

export default function VideoCard({ publicId, title, size, createdAt }) {
    const [isHovered, setIsHovered] = useState(false);
    const [previewError, setPreviewError] = useState(false);

    // Function to get the video thumbnail URL
    const getThumbnailUrl = useCallback((publicId) => {
        return getCldImageUrl({
            src: publicId,
            width: 400,
            height: 225,
            crop: 'fill',
            quality: 'auto',
            format: 'jpg',
            assetType: 'video',
        });
    }, []);

    // Function to get the full video URL for preview
    const getFullVideoUrl = useCallback((publicId) => {
        return getCldVideoUrl({
            src: publicId,
            width: 1920,
            height: 1080,
        });
    }, []);

    // Function to get the video preview URL with a custom transformation
    const getPreviewVideoUrl = useCallback((publicId) => {
        return getCldVideoUrl({
            src: publicId,
            width: 1920,
            height: 1080,
            rawTransformations: ['e_preview:duration_15:max_seg_9:min_seg_dur_1'],
        });
    }, []);

    // Function to format file size
    const fileFormatSize = useCallback((size) => {
        return filesize(size);
    }, []);

    return (
        <Card
            className="max-w-md bg-white shadow-lg rounded-lg overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative">
                {!isHovered ? (
                    // Show thumbnail when not hovered
                    <img
                        src={getThumbnailUrl(publicId)}
                        alt="Video thumbnail"
                        className="w-full h-56 object-cover"
                    />
                ) : (
                    // Show preview video when hovered
                    <video
                        src={getPreviewVideoUrl(publicId)}
                        className="w-full h-56 object-cover"
                        autoPlay
                        muted
                        loop
                        onError={() => setPreviewError(true)}
                    />
                )}
                {previewError && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <p className="text-white">Preview not available</p>
                    </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <PlayCircle className="w-16 h-16 text-white" />
                </div>
            </div>
            <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                <p className="text-sm text-gray-500">
                    {fileFormatSize(size)} • Uploaded {dayjs(createdAt).fromNow()}
                </p>
                <div className="mt-4 flex justify-between items-center">
                    <Button variant="default" className="flex items-center gap-2" onClick={() => window.open(getFullVideoUrl(publicId))}>
                        <Download className="w-4 h-4" />
                        Download
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
