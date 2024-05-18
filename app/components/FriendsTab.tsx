// components/FriendsTab.tsx
import React from 'react';

const FriendsTab = () => {
  // Dummy data for demonstration
  const friends = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Alice Johnson' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Manage Friends</h2>
      <ul>
        {friends.map((friend) => (
          <li key={friend.id}>{friend.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsTab;
