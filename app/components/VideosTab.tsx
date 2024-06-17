// components/VideosTab.tsx
import React from "react";
import dynamic from "next/dynamic";
const Upload = dynamic(() => import("./Upload"), { ssr: false });

const VideosTab = () => {
  // Dummy data for demonstration
  const videos = [
    { id: 1, title: "Video 1" },
    { id: 2, title: "Video 2" },
    { id: 3, title: "Video 3" },
  ];

  return (
    <div>
      <Upload />
      <h2 className="text-2xl font-semibold mb-4">Manage Videos</h2>
      <ul>
        {videos.map((video) => (
          <li key={video.id}>{video.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default VideosTab;
