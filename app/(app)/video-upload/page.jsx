"use client"

import React, { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Upload, AlertCircle } from "lucide-react"

function VideoUpload() {
  const [file, setFile] = useState(null)
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState("")

  const router = useRouter()
  const MAX_FILE_SIZE = 70 * 1024 * 1024 // 70MB

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.size > MAX_FILE_SIZE) {
        setError("File size is too large. Maximum 70MB.")
        setFile(null)
      } else {
        setError("")
        setFile(selectedFile)
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!file) {
      setError("Please select a file to upload.")
      return
    }

    setIsUploading(true)
    setError("")
    const formData = new FormData()
    formData.append("file", file)
    formData.append("title", title)
    formData.append("desc", desc)
    formData.append("originalSize", file.size.toString())

    try {
      const res = await axios.post("/api/video-upload", formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          setUploadProgress(percentCompleted)
        }
      })

      if (res.status === 200) {
        router.push("/home")
      }
    } catch (error) {
      console.error(error)
      setError("An error occurred while uploading the video. Please try again.")
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  return (
    (<div
      className="min-h-screen bg-[#16325B] flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-2xl bg-[#227B94] border-[#78B7D0]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-[#FFDC7F]">Upload Your Video</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="file" className="block text-sm font-medium text-[#FFDC7F] mb-1">
                Video File
              </label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-[#78B7D0] border-dashed rounded-lg cursor-pointer bg-[#16325B] hover:bg-[#1c3d6e] transition-colors duration-300">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-10 h-10 mb-3 text-[#78B7D0]" />
                    <p className="mb-2 text-sm text-[#78B7D0]">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-[#78B7D0]">MP4, WebM or OGG (MAX. 70MB)</p>
                  </div>
                  <Input
                    id="file"
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={isUploading} />
                </label>
              </div>
              {file && (
                <p className="mt-2 text-sm text-[#78B7D0]">
                  Selected file: {file.name}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-[#FFDC7F] mb-1">
                Title
              </label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter video title"
                required
                disabled={isUploading}
                className="bg-[#16325B] text-[#78B7D0] border-[#78B7D0] placeholder-[#78B7D0] focus:ring-[#FFDC7F] focus:border-[#FFDC7F]" />
            </div>
            <div>
              <label htmlFor="desc" className="block text-sm font-medium text-[#FFDC7F] mb-1">
                Description
              </label>
              <Textarea
                id="desc"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Enter video description"
                rows={4}
                disabled={isUploading}
                className="bg-[#16325B] text-[#78B7D0] border-[#78B7D0] placeholder-[#78B7D0] focus:ring-[#FFDC7F] focus:border-[#FFDC7F]" />
            </div>
            {error && (
              <Alert variant="destructive" className="bg-red-600 text-white border-red-800">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {isUploading && (
              <div className="space-y-2">
                <Progress value={uploadProgress} className="w-full" indicatorColor="bg-[#FFDC7F]" />
                <p className="text-sm text-[#78B7D0] text-center">
                  Uploading... {uploadProgress}%
                </p>
              </div>
            )}
            <Button
              type="submit"
              className="w-full bg-[#FFDC7F] text-[#16325B] hover:bg-[#78B7D0] transition-colors duration-300"
              disabled={isUploading}>
              {isUploading ? "Uploading..." : "Upload Video"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>)
  );
}

export default VideoUpload