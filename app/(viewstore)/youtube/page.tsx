"use client";
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Container,
  Grid,
  Box,
  Avatar,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { FaEye, FaThumbsUp, FaComment, FaUserCircle } from "react-icons/fa";

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const API_URL = "https://www.googleapis.com/youtube/v3/";

const Page: React.FC = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [selectedVideoChannel, setSelectedVideoChannel] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [comments, setComments] = useState<any>([]);

  useEffect(() => {
    // Fetch initial videos
    fetchVideos("New next js videos");
  }, []);

  const fetchVideos = async (query: string) => {
    try {
      const response = await fetch(
        `${API_URL}search?part=snippet&q=${query}&key=${API_KEY}&type=video&maxResults=20&order=viewCount`,
      );
      const data = await response.json();
      setVideos(data.items);
      if (data.items.length > 0) {
        fetchVideoDetails(data.items[0].id.videoId);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const fetchVideoDetails = async (videoId: string) => {
    try {
      const response = await fetch(
        `${API_URL}videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`,
      );
      const data = await response.json();
      setSelectedVideo(data.items[0]);
      fetchChannelDetails(data.items[0].snippet.channelId);
      fetchComments(videoId);
    } catch (error) {
      console.error("Error fetching video details:", error);
    }
  };

  const fetchChannelDetails = async (channelId: string) => {
    try {
      const response = await fetch(
        `${API_URL}channels?part=snippet,statistics&id=${channelId}&key=${API_KEY}`,
      );
      const data = await response.json();
      if (data.items.length > 0) {
        setSelectedVideoChannel(data.items[0]);
      }
      return null;
    } catch (error) {
      console.error("Error fetching channel details:", error);
      return null;
    }
  };

  const fetchComments = async (videoId: string) => {
    try {
      const response = await fetch(
        `${API_URL}commentThreads?part=snippet&videoId=${videoId}&key=${API_KEY}&maxResults=20`,
      );
      const data = await response.json();
      setComments(data.items);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchVideos(searchTerm);
  };

  const handleVideoClick = (video: any) => {
    fetchVideoDetails(video.id.videoId);
  };
  console.log(videos, selectedVideo);
  return (
    <div>
      <form
        onSubmit={handleSearch}
        className="flex w-full items-center justify-center p-4"
      >
        <InputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-white rounded px-2 w-full "
        />
        <IconButton type="submit" aria-label="search">
          <SearchIcon />
        </IconButton>
      </form>
      <video
        className="jw-video jw-reset bg-white"
        tabIndex={-1}
        disableRemotePlayback={true}
        webkit-playsinline=""
        playsInline={true}
        src="https://feeds.intoday.in/livetv/ver-3-0/?id=livetv-at&aud_togle=1&autostart=1&utm_medium=web&utm_source=livetvpage&v=1.5&debug=false&dimlight=1%20&noads=0"
      ></video>
      <video
        controls
        width="600"
        src="https://feeds.intoday.in/livetv/ver-3-0/?id=livetv-at&aud_togle=1&autostart=1&utm_medium=web&utm_source=livetvpage&v=1.5&debug=false&dimlight=1&noads=0"
      ></video>
      <Container>
        <Grid container spacing={3} className="mt-4">
          <Grid item xs={12} md={8}>
            {selectedVideo && (
              <Card>
                <iframe
                  className="w-full min-h-[400px]"
                  src={`https://www.youtube.com/embed/${selectedVideo.id}`}
                  title={selectedVideo.snippet.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
                  allowFullScreen
                ></iframe>
                <CardContent>
                  <Box className="flex items-center mt-2">
                    <FaEye className="mr-2" />{" "}
                    {selectedVideo.statistics.viewCount}
                    <FaThumbsUp className="ml-4 mr-2" />{" "}
                    {selectedVideo.statistics.likeCount}
                    <FaComment className="ml-4 mr-2" />{" "}
                    {selectedVideo.statistics.commentCount}
                  </Box>
                  <Box className="flex items-center mt-4 space-x-4">
                    <Avatar
                      alt={selectedVideo.snippet.channelTitle}
                      src={selectedVideoChannel?.snippet.thumbnails.default.url}
                      sx={{ width: 24, height: 24 }}
                    />
                    <Typography variant="body1">
                      {selectedVideoChannel?.snippet.title}
                    </Typography>
                  </Box>
                  <Typography variant="h5">
                    {selectedVideo.snippet.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {selectedVideo.snippet.description}
                  </Typography>

                  {comments && comments.length > 0 && (
                    <Box className="mt-4">
                      <Typography variant="h6">Comments</Typography>
                      <List>
                        {comments.map((comment: any) => (
                          <ListItem key={comment.id} alignItems="flex-start">
                            <ListItemText
                              primary={
                                comment.snippet.topLevelComment.snippet
                                  .authorDisplayName
                              }
                              secondary={
                                comment.snippet.topLevelComment.snippet
                                  .textDisplay
                              }
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}
                </CardContent>
              </Card>
            )}
          </Grid>
          <Grid item xs={12} md={4}>
            <Grid container spacing={2}>
              {videos
                ?.filter((video: any) => {
                  if (!selectedVideo || selectedVideo.id != video.id.videoId)
                    return true;
                })
                .map((video) => (
                  <Grid item xs={12} key={video.id.videoId}>
                    <Card
                      className="cursor-pointer"
                      onClick={() => handleVideoClick(video)}
                    >
                      <CardMedia
                        component="img"
                        alt={video.snippet.title}
                        height="140"
                        image={video.snippet.thumbnails.high.url}
                        title={video.snippet.title}
                      />
                      <CardContent>
                        <Typography variant="body2" color="textSecondary">
                          {video.snippet.title}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Page;
