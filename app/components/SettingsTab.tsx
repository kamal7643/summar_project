// components/SettingTab.tsx
import React, { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';
import { getLocalStorageItem } from '@/lib/localStorage';

const SettingTab = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [once, setOnce] = useState<boolean>(true);

  useEffect(() => {
    if(once){
        fetch('/api/user',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ getLocalStorageItem('token', ''),
            }
        })
        .then(res => res.json())
        .then(data=>{
            setEmail(data.data.email);
            setUsername(data.data.name);
        })
        setOnce(false);
    }
  })



  const handleSubmit = (e:any) => {
    e.preventDefault();
    // Add logic to update user settings
    console.log('Settings updated:', { username, email, password });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">User Settings</h2>
      <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-4"
        />
        <TextField
          fullWidth
          type="email"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4"
        />
        <TextField
          fullWidth
          type="password"
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4"
        />
        <Button type="submit" variant="contained" color="primary">
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default SettingTab;
