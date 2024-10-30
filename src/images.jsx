import React, { useState, useEffect } from 'react';

const ProfileImageUploader = () => {
    const baseUrl = 'https://hamrobackend.onrender.com';
    const [profileImage, setProfileImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    // Fetch the profile data and set the profile image
    const fetchProfile = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${baseUrl}/api/v1/teachers/profile`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (data.status === 'success') {
                const imagePath = `${baseUrl}/${data.data.teacher.profileImage.replace(/\\/g, '/')}`;
                setProfileImage(imagePath);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    // Handle the form submission to upload the profile image
    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('profileImage', imageFile);

        try {
            const response = await fetch(`${baseUrl}/api/v1/teachers/profileImage`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            const data = await response.json();
            if (data.status === 'success') {
                alert('Profile image uploaded successfully!');
                fetchProfile();  // Fetch and display the profile image after successful upload
            } else {
                alert('Failed to upload profile image');
            }
        } catch (error) {
            console.error('Error uploading profile image:', error);
        }
    };

    // Set the image file when selected
    const handleFileChange = (event) => {
        setImageFile(event.target.files[0]);
    };

    // Fetch profile image on component mount
    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Upload Profile Image</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                    required 
                />
                <button type="submit">Submit</button>
            </form>
            {profileImage && (
                <img 
                    src={profileImage} 
                    alt="Profile" 
                    style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        marginTop: '20px',
                        objectFit: 'cover'
                    }} 
                />
            )}
        </div>
    );
};

export default ProfileImageUploader;
