import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function BioForm() {
  const [formData, setFormData] = useState({
    bio: "",
    latitude: "00", // Default latitude
    longitude: "00"  // Default longitude
  });
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // Get the token from local storage

    if (!token) {
      alert("Token not found. Please log in again.");
      return;
    }

    try {
      // Submit bio
      await axios.post(
        "http://localhost:8000/api/v1/teachers/bio",
        { bio: formData.bio },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Submit location in the required format
      await axios.post(
        "http://localhost:8000/api/v1/teachers/location",
        {
          location: {
            latitude: formData.latitude,
            longitude: formData.longitude,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Reset form data after submission
      setFormData({ bio: "", latitude: "00", longitude: "00" }); 
      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to submit bio or location.");
    }
  };

  // Handle input changes
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Get user's location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleLocationSuccess, handleLocationError);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleLocationSuccess = (position) => {
    const { latitude, longitude } = position.coords;
    setFormData((prevData) => ({
      ...prevData,
      latitude: latitude.toString(),
      longitude: longitude.toString(),
    }));
  };

  const handleLocationError = () => {
    // Set default location to "00" if permission is denied
    setFormData((prevData) => ({
      ...prevData,
      latitude: "00",
      longitude: "00",
    }));
  };

  // Fetch location when component mounts
  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl p-10">
        <div className="border-b-2 py-4">
          <p className="text-xs uppercase tracking-wide font-bold text-gray-500">
            Step: 1 of 1
          </p>
          <div className="flex justify-between items-center">
            <p className="text-lg font-bold text-gray-700">Your Bio</p>
          </div>
        </div>

        <div className="py-10">
          {/* Bio Input */}
          <div>
            <label htmlFor="bio" className="font-bold text-gray-700 block mt-4">
              Set up Bio
            </label>
            <div className="relative mt-2">
              <input
                name="bio"
                value={formData.bio}
                onChange={handleInput}
                type="text"
                className="w-full px-4 py-3 border rounded-lg shadow-sm text-gray-600"
                placeholder="Tell us about yourself in one line..."
                required
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-5 rounded-lg"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
