"use client";
import React from 'react';
import { AppBar, Tab, Tabs } from '@mui/material';
import { FiUsers, FiVideo, FiEdit3, FiSettings } from 'react-icons/fi';
import SettingTab from '@/app/components/SettingsTab';
import FriendsTab from '@/app/components/FriendsTab';
import VideosTab from '@/app/components/VideosTab';
import BlogsTab from '@/app/components/BlogsTab';
import { getLocalStorageItem, setLocalStorageItem } from '@/lib/localStorage';

const ProfilePage = () => {
  const [tabValue, setTabValue] = React.useState( parseInt(getLocalStorageItem('profiletab', '0')!) || 0);

  const handleTabChange = (event:any, newValue:any) => {
    setLocalStorageItem('profiletab', newValue.toString());
    setTabValue(newValue);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AppBar position="static" color="default">
        <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
          <Tab icon={<FiSettings />} label="Settings" />
          <Tab icon={<FiUsers />} label="Friends" />
          <Tab icon={<FiVideo />} label="Videos" />
          <Tab icon={<FiEdit3 />} label="Blogs" />
        </Tabs>
      </AppBar>
      <div className="p-4">
        {tabValue === 0 && <SettingTab/>}
        {tabValue === 1 && <FriendsTab />}
        {tabValue === 2 && <VideosTab />}
        {tabValue === 3 && <BlogsTab />}
      </div>
    </div>
  );
};

export default ProfilePage;