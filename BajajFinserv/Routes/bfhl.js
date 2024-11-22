const express = require('express');
const { processPostRequest } = require('../utils/helper');
const router = express.Router();

// POST Route
router.post('/', async (req, res) => {
    try {
        console.log("this is the get resqust");
        const result = await processPostRequest(req.body);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ is_success: false, error: 'Internal Server Error' });
    }
});

// GET Route
router.get('/', (req, res) => {
    res.status(200).json({ operation_code: 'BFHL_001' });
});

module.exports = router;
