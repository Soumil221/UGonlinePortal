const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student.js');

exports.registerStudent = async (req, res) => {
  try {
    const { rollNumber, name, email, password, branch, section } = req.body;

    const existingStudent = await Student.findOne({ $or: [{ email }, { rollNumber }] });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    const newStudent = new Student({
      rollNumber,
      name,
      email,
      password,
      branch,
      section,
    });

    await newStudent.save();

    res.status(201).json({ message: 'Student registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const isPasswordCorrect = await student.comparePassword(password);
    
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: student._id, role: 'student' }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.userId).select('-password');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.updateStudentProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(
      req.userId,
      { name, email },
      { new: true }
    ).select('-password');

    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};