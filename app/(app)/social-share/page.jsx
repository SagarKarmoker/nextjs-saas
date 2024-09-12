"use client";

import React, { useState, useEffect, useRef } from "react"
import { CldImage } from "next-cloudinary"
import { Upload, Download, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

const socialFormats = {
  "Instagram Square (1:1)": { width: 1080, height: 1080, aspectRatio: "1:1" },
  "Instagram Portrait (4:5)": { width: 1080, height: 1350, aspectRatio: "4:5" },
  "Twitter Post (16:9)": { width: 1200, height: 675, aspectRatio: "16:9" },
  "Twitter Header (3:1)": { width: 1500, height: 500, aspectRatio: "3:1" },
  "Facebook Cover (205:78)": { width: 820, height: 312, aspectRatio: "205:78" },
}

export default function SocialShare() {
  const[selectedFormat, setSelectedFormat] = useState("Instagram Square (1:1)");
  const [uploadImage, setUploadImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const imageRef = useRef()

  useEffect(() => {
    if (!uploadImage) {
      setIsUploading(true);

    }
  }, [selectedFormat, uploadImage])

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/image-upload', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error("Failed to upload image")
      }

      const data = await response.json();
      setUploadImage(data.publicId);
      setIsUploading(false);
    } catch (error) {
      console.log(error)
    } finally {
      setIsUploading(false);
    }
  }


  const handleDownload = async () => {
    if (!imageRef.current) return;

    fetch(imageRef.current.src)
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url
        link.download = "image.png";
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      })
  }

  return (
    (<div
      className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center p-4">
      <Card
        className="w-full max-w-3xl bg-white shadow-xl rounded-xl overflow-hidden">
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold text-center mb-6 text-purple-800">Social Image Sharer</h1>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="mb-4">
                <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(socialFormats).map((format) => (
                      <SelectItem key={format} value={format}>
                        {format}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div
                className="relative aspect-square bg-purple-50 rounded-lg overflow-hidden">
                {uploadImage ? (
                  <CldImage
                    width={socialFormats[selectedFormat].width}
                    height={socialFormats[selectedFormat].height}
                    src={uploadImage}
                    sizes="100vw"
                    alt="Transformed Image"
                    crop="fill"
                    aspectRatio={socialFormats[selectedFormat].aspectRatio}
                    gravity="auto"
                    ref={imageRef}
                    onLoad={() => setIsTransforming(false)}
                    className="w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageIcon className="w-16 h-16 text-purple-300" />
                  </div>
                )}
                {isTransforming && (
                  <div
                    className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
                    <div
                      className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-800"></div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col justify-center gap-4 md:w-48">
              <Button variant="outline" className="relative overflow-hidden">
                <input
                  type="file"
                  onChange={handleUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  accept="image/*" />
                <Upload className="mr-2 h-4 w-4" /> Upload Image
              </Button>
              <Button onClick={handleDownload} disabled={!uploadImage || isTransforming}>
                <Download className="mr-2 h-4 w-4" /> Download
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>)
  );
}