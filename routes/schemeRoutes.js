// schemaRoutes.js
const express = require('express');
const router = express.Router();
const schemaController = require('../controllers/schemeController');

router.post('/schemes', schemaController.createSchema);
router.get('/schemes',schemaController.getAllSchemas);
router.get('/schemes/:id',schemaController.getSchemaById);
router.put('/schemes/:id', schemaController.updateSchema);
router.delete('/schemes/:id',schemaController.deleteSchema);

module.exports = router;
