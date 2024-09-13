"use client"
import VideoCard from '@/components/VideoCard'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'

function Home() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)


  const fetchVideo = useCallback(async () => {
    try {
      const response = await axios.get("/api/videos")
      if (Array.isArray(response.data)) {
        setVideos(response.data)
      } else {
        throw new Error("Data is not an array")
      }
    } catch (error) {
      console.log(error)
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchVideo()
  }, [fetchVideo])

  const handleDownload = useCallback(async (url, title) => {
    () => {
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${title}.mp4`);
      link.setAttribute("target", "_blank");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  })

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {
        videos.length > 0 ? (
          videos.map((video) => (
            <VideoCard
              key={video.publicId}
              publicId={video.publicId}
              title={video.title}
              size={video.size}
              createdAt={video.createdAt}
              onDownload={handleDownload}
            />
          ))
        ) : (
          <div>No videos found</div>
        )
      }
    </div>
  )
}

export default Home