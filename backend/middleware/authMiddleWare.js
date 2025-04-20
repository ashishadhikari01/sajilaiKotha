// const express=require('express')
const jwt = require('jsonwebtoken');
require('dotenv').config() 

const verifyToken = (req, res, next) => {

  const token = req.cookies.token;
  // console.log("check", token)

  if (!token) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // ✅ You now have access to user info (like id, email)
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = verifyToken;
