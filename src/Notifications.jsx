// components/Notifications.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Notifications = ({ token, isTeacher }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          isTeacher 
            ? 'http://localhost:8000/api/v1/notifications/teacher' 
            : 'http://localhost:8000/api/v1/notifications/student',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Log the response to inspect its structure
        console.log('API Response:', response.data);

        // Check if response.data.data exists and contains notifications
        if (response.data && response.data.data && Array.isArray(response.data.data)) {
          // Filter notifications based on user type
          const filteredNotifications = isTeacher
            ? response.data.data.filter(notification =>
                notification.message.includes('You have accepted')
              )
            : response.data.data.filter(notification =>
                !notification.message.includes('You have accepted')
              );

          // If no filtered notifications, log the messages for debugging
          if (filteredNotifications.length === 0) {
            console.log('No matching notifications found for filtering.');
          }

          setNotifications(filteredNotifications);
        } else {
          console.log('No notifications found.');
          setNotifications([]); // Set notifications to an empty array if no notifications
        }
      } catch (error) {
        console.error('Error fetching notifications:', error.response ? error.response.data : error.message);
      }
    };

    fetchNotifications();
  }, [token, isTeacher]);

  const handleMarkAsRead = async (notificationId) => {
    try {
      await axios.patch(`http://localhost:8000/api/v1/notifications/${notificationId}/read`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotifications((prev) =>
        prev.map((notif) =>
          notif._id === notificationId ? { ...notif, isRead: true } : notif
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <h3>Your Notifications</h3>
      {notifications.length > 0 ? (
        <ul>
          {notifications.map((notification) => (
            <li key={notification._id} style={{ textDecoration: notification.isRead ? 'line-through' : 'none' }}>
              {notification.message}
              {!notification.isRead && (
                <button onClick={() => handleMarkAsRead(notification._id)}>Mark as Read</button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No notifications.</p>
      )}
    </div>
  );
};

export default Notifications;
