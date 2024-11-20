import React, { useEffect, useState } from 'react';
import '../App.css'; // Import the CSS file

const Studenttable = ({ subject }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (!subject || !subject.students) return; // Guard clause for undefined props

    const studentIdsArray = subject.students; // Extract the `students` array
    fetch('http://localhost:5000/api/admin/substudents', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Add Content-Type header
      },
      body: JSON.stringify({ studentIds: studentIdsArray }), // Send the array to the backend
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setStudents(data)) // Set the fetched students in state
      .catch((error) => console.error('Error fetching students:', error));
  }, [subject]); // Re-run whenever the `subject` prop changes

  return (
    <div>
      <h2>Students for {subject?.name || 'Unknown Subject'}</h2>
      {students.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Branch</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.branch}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No students found for this subject.</p>
      )}
    </div>
  );
};

export default Studenttable;
