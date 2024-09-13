"use client";

import React, { useState, useEffect, useRef } from "react";
import { CldImage } from "next-cloudinary";
import { Upload, Download, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

const socialFormats = {
  "Instagram Square (1:1)": { width: 1080, height: 1080, aspectRatio: "1:1" },
  "Instagram Portrait (4:5)": { width: 1080, height: 1350, aspectRatio: "4:5" },
  "Twitter Post (16:9)": { width: 1200, height: 675, aspectRatio: "16:9" },
  "Twitter Header (3:1)": { width: 1500, height: 500, aspectRatio: "3:1" },
  "Facebook Cover (205:78)": { width: 820, height: 312, aspectRatio: "205:78" },
};

export default function SocialShare() {
  const [selectedFormat, setSelectedFormat] = useState("Instagram Square (1:1)");
  const [imgUrl, setImgUrl] = useState(null);
  const [uploadImage, setUploadImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const imageRef = useRef(null); // Initialize with null

  useEffect(() => {
    if (uploadImage) {
      console.log("Uploaded Image publicId:", uploadImage);
      setIsTransforming(true); // Set transforming when the upload starts
    }
  }, [uploadImage]);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/image-upload", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      setUploadImage(data.publicId);
      setImgUrl(data.url);
      setIsTransforming(false); // Reset transforming after setting the image URL
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = async () => {
    if (!imageRef.current) return;

    fetch(imageRef.current.src)
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "image.png";
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center p-8">
      <Card className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden">
        <CardContent className="p-8">
          <h1 className="text-4xl font-extrabold text-center mb-8 text-indigo-800">
            Social Image Sharer
          </h1>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <div className="mb-6">
                <Select value={selectedFormat} onValueChange={(value) => setSelectedFormat(value)}>
                  <SelectTrigger className="border border-gray-300 rounded-lg p-3">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-300 rounded-lg shadow-lg">
                    {Object.keys(socialFormats).map((format) => (
                      <SelectItem key={format} value={format} className="p-2 hover:bg-gray-100">
                        {format}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="mb-6">
                <Button variant="outline" className="w-full relative overflow-hidden border border-indigo-600 text-indigo-600 hover:bg-indigo-50">
                  <input
                    type="file"
                    onChange={handleUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    accept="image/*"
                  />
                  <Upload className="mr-2 h-4 w-4" /> Upload Image
                </Button>
              </div>
              <div className="relative aspect-square bg-purple-50 rounded-lg overflow-hidden shadow-md">
                {uploadImage ? (
                  <CldImage
                    width={socialFormats[selectedFormat].width}
                    height={socialFormats[selectedFormat].height}
                    src={imgUrl}
                    sizes="100vw"
                    alt="transformed image"
                    crop="fill"
                    aspectRatio={socialFormats[selectedFormat].aspectRatio}
                    gravity="auto"
                    ref={imageRef}
                    onLoad={() => setIsTransforming(false)}
                    className="rounded-lg"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageIcon className="w-16 h-16 text-indigo-300" />
                  </div>
                )}
                {isTransforming && (
                  <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex-1 w-full mt-4 items-center justify-center gap-6 md:w-48">
            <Button onClick={handleDownload} disabled={!uploadImage || isTransforming} className="w-full bg-indigo-600 text-white hover:bg-indigo-700">
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>

  );
}
