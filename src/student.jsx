// components/StudentDashboard.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Notifications from './Notifications'; // Import the Notifications component

const StudentDashboard = () => {
  const [teacher, setTeacher] = useState(null); // Teacher details
  const [teacherId, setTeacherId] = useState('66fceee9cff6539bcd086795'); // Example teacher ID
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZmNkNjAzNTY5MzI2MWY2NTdkMDkxOCIsImlhdCI6MTcyNzg2MTE4NywiZXhwIjoxNzMwNDUzMTg3fQ.ZCYjrmgnnSVPPN7KGG7E06g7rJrEaUSfNfPwsd8yJ8k";  // Bearer token for student

  // Booking form states
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [bookingStatus, setBookingStatus] = useState('');

  // Fetch teacher details
  useEffect(() => {
    const fetchTeacherDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/users/teachers/${teacherId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTeacher(response.data.data.teacher);
      } catch (error) {
        console.error('Error fetching teacher details:', error.response ? error.response.data : error.message);
      }
    };

    fetchTeacherDetails();
  }, [teacherId, token]);

  // Handle booking submission
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    const bookingData = {
      teacherId,
      startDate,
      endDate,
      startTime,
      endTime,
    };

    try {
      const response = await axios.post('http://localhost:8000/api/v1/bookings/bookings', bookingData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      setBookingStatus('Booking successful! You will be notified when your request is accepted or rejected.');
      console.log('Booking response:', response.data);
      
    } catch (error) {
      setBookingStatus('Booking failed. Please try again.');
      console.error('Error creating booking:', error.response ? error.response.data : error.message);
    }
  };

  if (!teacher) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{teacher.fullName}</h2>
      <p>{teacher.bio}</p>
      
      {/* Booking Form */}
      <h3>Book a Time with {teacher.fullName}</h3>
      <form onSubmit={handleBookingSubmit}>
        <label>
          Start Date:
          <input 
            type="date" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)} 
            required 
          />
        </label>
        <br />
        <label>
          End Date:
          <input 
            type="date" 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)} 
            required 
          />
        </label>
        <br />
        <label>
          Start Time:
          <input 
            type="time" 
            value={startTime} 
            onChange={(e) => setStartTime(e.target.value)} 
            required 
          />
        </label>
        <br />
        <label>
          End Time:
          <input 
            type="time" 
            value={endTime} 
            onChange={(e) => setEndTime(e.target.value)} 
            required 
          />
        </label>
        <br />
        <button type="submit">Submit Booking</button>
      </form>

      {bookingStatus && <p>{bookingStatus}</p>}

      {/* Notifications Section */}
      <Notifications token={token} isTeacher={false} />
    </div>
  );
};

export default StudentDashboard;
