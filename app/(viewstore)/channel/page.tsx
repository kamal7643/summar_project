"use client";

import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, LinearProgress, IconButton } from '@mui/material';
import { AiOutlineUpload, AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { storage } from '@/lib/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getLocalStorageItem } from "@/lib/localStorage";

export default function Channel() {
    const [open, setOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [progress, setProgress] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [videos, setVideos] = useState([]);
    const [update, setUpdate] = useState<boolean>(true);

    useEffect(() => {
        // Fetch videos from MongoDB
        if(update){
          fetch('/api/videos')
          .then(data=>data.json())
          .then(res=>setVideos(res.data));
          setUpdate(false);
        }
      }, []);

      const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
          setSelectedFile(event.target.files[0]);
        }
      };

      const handleUpload = () => {
        if (selectedFile) {
          const storageRef = ref(storage, `alphasecond/videos/${selectedFile.name}`);
          const uploadTask = uploadBytesResumable(storageRef, selectedFile);
    
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setProgress(progress);
            },
            (error) => {
              console.error('Upload failed:', error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                saveVideoMetadata(downloadURL);
              });
            }
          );
        }
      };

      const saveVideoMetadata = async (url: string) => {
        const res = await fetch('/api/user/videos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getLocalStorageItem('token', '')}`,
          },
          body: JSON.stringify({
            title,
            description,
            url,
          }),
        });
    
        const data = await res.json();
        // setVideos([...videos, data]);
        setUpdate(true);
        setOpen(false);
        setTitle('');
        setDescription('');
        setSelectedFile(null);
        setProgress(0);
      };


      const handleDelete = async (id: string) => {
        await fetch(`/api/videos/${id}`, {
          method: 'DELETE',
        });
    
        setVideos(videos.filter((video:any) => video._id !== id));
      };
    
      const handleEdit = (video:any) => {
        // Populate fields with current video data
        setTitle(video.title);
        setDescription(video.description);
        // Open the dialog
        setOpen(true);
      };
    return (
        <div className=" bg-gray-100 p-4">
            <Button variant="contained" color="primary" startIcon={<AiOutlineUpload />} onClick={() => setOpen(true)}>
          Upload New Video
        </Button>
      <div className="">
        
        <div className="mt-4">
          {videos.map((video:any) => (
            <div key={video?._id} className="flex items-center justify-between p-2 border-b">
                <div>
                    <video  src={video?.url} controls/>
                    </div>
              <div>
                <h3 className="text-lg">{video?.title}</h3>
                <p>{video?.description}</p>
              </div>
              <div>
                <IconButton onClick={() => handleEdit(video)}>
                  <AiFillEdit />
                </IconButton>
                <IconButton onClick={() => handleDelete(video?._id)}>
                  <AiFillDelete />
                </IconButton>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Upload Video</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input type="file" onChange={handleFileChange} className="mt-4" />
          {progress > 0 && (
            <div className="w-full mt-4">
              <LinearProgress variant="determinate" value={progress} />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleUpload} color="primary" variant="contained">
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    )
}