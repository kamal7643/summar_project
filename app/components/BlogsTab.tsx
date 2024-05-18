"use client";
import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import { getLocalStorageItem } from '@/lib/localStorage';

const BlogsTab = () => {

    const [blogs, setBlogs] = useState<any>([]);
    const [update, setUpdate] = useState<boolean>(true);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (update) {
            fetch('/api/user/blogs', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getLocalStorageItem('token', ''),
                }
            })
                .then(res => res.json())
                .then(data => {
                    setBlogs(data.data);
                })
            setUpdate(false);
        }
    })

    const handleSubmit = () => {
        if(title !== "" && content !== ""){
            // make a post request
            fetch('/api/user/blogs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+ getLocalStorageItem('token', ''),
                },
                body: JSON.stringify({
                    title,
                    description:content
                })
            })
               .then(res => res.json())
               .then(data => {
                    setBlogs([...blogs, data]);
                    setTitle('');
                    setContent('');
                    setUpdate(true);
                })
        }
    }

    return (
        <div>
            <Typography variant="h4" component="h2" gutterBottom>
                Manage Blogs
            </Typography>
            <form className="mb-4 flex flex-col space-y-2">
                <TextField
                    fullWidth
                    label="Blog Title"
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mb-4"
                />
                <TextField
                    fullWidth
                    label="Blog Content"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="mb-4"
                />
                <Button type="button" variant="contained" color="primary" onClick={handleSubmit}>
                    Add Blog
                </Button>
            </form>
            <Typography variant="h5" component="h3" gutterBottom>
                Blog Posts
            </Typography>
            <List>
                {blogs.map((blog:any) => (
                    <React.Fragment key={blog.id} >
                        <ListItem alignItems="flex-start" className="border rounded-lg shadow-xl">
                            <ListItemText
                                primary={blog.title}
                                secondary={blog.description}
                            />
                        </ListItem>
                        
                        <Divider component="li" />
                    </React.Fragment>
                ))}
            </List>
        </div>
    );
};

export default BlogsTab;
