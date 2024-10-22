// components/TeacherDashboard.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Notifications from './Notifications'; // Import Notifications component

const TeacherDashboard = () => {
  const [teacher, setTeacher] = useState(null); // Teacher details
  const [bookings, setBookings] = useState([]); // Bookings for the teacher
  const [loading, setLoading] = useState(true); // Loading state for API calls

  const teacherId = '66fceee9cff6539bcd086795'; // Example teacher ID
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZmNlZWU5Y2ZmNjUzOWJjZDA4Njc5NSIsImlhdCI6MTcyNzg2MTE0NCwiZXhwIjoxNzMwNDUzMTQ0fQ.pME6sumfHSRwVdh0RHNSV0HUDUt2njPpzEs31xbxkUg'; // Bearer token for teacher

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

  // Fetch teacher bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/bookings/bookings', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(response.data.data.bookings);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bookings:', error.response ? error.response.data : error.message);
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token]);

  // Reject a booking
  const rejectBooking = async (bookingId) => {
    try {
      await axios.patch(`http://localhost:8000/api/v1/bookings/bookings/${bookingId}/cancel`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Refresh the bookings after rejection
      setBookings((prev) =>
        prev.map((booking) => 
          booking._id === bookingId ? { ...booking, status: 'rejected' } : booking
        )
      );
      alert('Booking rejected successfully');
    } catch (error) {
      console.error('Error rejecting booking:', error.response ? error.response.data : error.message);
    }
  };

  // Accept a booking
  const acceptBooking = async (bookingId) => {
    try {
      await axios.patch(`http://localhost:8000/api/v1/bookings/bookings/${bookingId}/accept`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Refresh the bookings after acceptance
      setBookings((prev) =>
        prev.map((booking) => 
          booking._id === bookingId ? { ...booking, status: 'confirmed' } : booking
        )
      );
      alert('Booking accepted successfully');
    } catch (error) {
      console.error('Error accepting booking:', error.response ? error.response.data : error.message);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Teacher Dashboard</h1>
      {teacher && (
        <div>
          <h2>{teacher.fullName}'s Profile</h2>
          <p><strong>Bio:</strong> {teacher.bio}</p>
          <p><strong>Current Job:</strong> {teacher.currentJob}</p>
        </div>
      )}

      <h2>Bookings</h2>
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <div key={booking._id} style={{ border: '1px solid gray', padding: '10px', marginBottom: '10px' }}>
            <h3>Booking with {booking.studentId.fullName}</h3>
            <p><strong>Start Date:</strong> {new Date(booking.startDate).toLocaleDateString()}</p>
            <p><strong>End Date:</strong> {new Date(booking.endDate).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {booking.startTime} - {booking.endTime}</p>
            <p><strong>Status:</strong> {booking.status}</p>
            <button onClick={() => acceptBooking(booking._id)} disabled={booking.status !== 'pending'}>
              Accept Booking
            </button>
            <button onClick={() => rejectBooking(booking._id)} disabled={booking.status === 'rejected'}>
              Reject Booking
            </button>
          </div>
        ))
      ) : (
        <p>No bookings found</p>
      )}

      {/* Notifications Section */}
      <Notifications token={token} isTeacher={true} />
    </div>
  );
};

export default TeacherDashboard;
