
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EducationForm = ({ setEducationData }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    image: null,
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { image, ...data } = formData;

    const form = new FormData();
    form.append('school', data.school);
    form.append('degree', data.degree);
    form.append('fieldOfStudy', data.fieldOfStudy);
    form.append('startDate', data.startDate);
    form.append('endDate', data.endDate);
    if (image) {
      form.append('image', image);
    }

    try {
      const url = `http://localhost:8000/api/v1/teachers/education`;
      const method = isEditing ? 'PATCH' : 'POST';
      const response = await axios({
        method,
        url,
        data: form,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZmNlZWU5Y2ZmNjUzOWJjZDA4Njc5NSIsImlhdCI6MTcyNzg1MjI2NSwiZXhwIjoxNzMwNDQ0MjY1fQ.SjJpExHtyEdPKGBP14xE0hIk7dVrjcD8cEDZp3I20HU`, // Add Bearer token here
        },
      });

      // Update the education data in the parent component
      setEducationData(response.data.data.education);
      setFormData({
        school: '',
        degree: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
        image: null,
      });
      setIsEditing(false); // Reset editing state
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="school"
        value={formData.school}
        onChange={handleChange}
        placeholder="School"
        required
      />
      <input
        type="text"
        name="degree"
        value={formData.degree}
        onChange={handleChange}
        placeholder="Degree"
        required
      />
      <input
        type="text"
        name="fieldOfStudy"
        value={formData.fieldOfStudy}
        onChange={handleChange}
        placeholder="Field of Study"
        required
      />
      <input
        type="date"
        name="startDate"
        value={formData.startDate}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="endDate"
        value={formData.endDate}
        onChange={handleChange}
        required
      />
      <input
        type="file"
        name="image"
        onChange={handleImageChange}
        accept="image/*"
      />
      <button type="submit">{isEditing ? 'Update Education' : 'Add Education'}</button>
    </form>
  );
};

export default EducationForm;
