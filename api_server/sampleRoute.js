const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /sample:
 *   get:
 *     summary: Sample endpoint
 *     description: Returns a simple response
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Sample response"
 */
router.get('/sample', (req, res) => {
  res.json({ message: 'Sample response' });
});

module.exports = router;
