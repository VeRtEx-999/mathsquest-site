const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile } = require('../auth/middleware');

// Route to get user profile
router.get('/profile', getUserProfile, (req, res) => {
    res.status(200).json({
        user: req.user
    });
});

// Route to update user profile
router.put('/profile', getUserProfile, (req, res) => {
    const updatedData = req.body;
    // Logic to update user profile in the database
    // Assuming we have a User model to interact with the database
    User.findByIdAndUpdate(req.user.id, updatedData, { new: true })
        .then(updatedUser => {
            res.status(200).json({
                message: 'Profile updated successfully',
                user: updatedUser
            });
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error updating profile',
                error: err
            });
        });
});

module.exports = router;