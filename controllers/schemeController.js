// schemaController.js
const schemeService = require('../services/schemeService');

exports.createSchema = async (req, res) => {
  try {
    const schema = await schemeService.createSchema(req.body);
    res.status(201).json(schema);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getAllSchemas = async (req, res) => {
  try {
    const schemas = await schemeService.getAllSchemas();
    if (schemas.length === 0) {
      res.status(404).json({ message: 'No schemas found' });
      return;
    }
    res.status(200).json(schemas);
  } catch (error) {
    if (error.name === 'SequelizeEmptyResultError') {
      res.status(404).json({ message: 'No schemas found' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

exports.getSchemaById = async (req, res) => {
  try {
    const schema = await schemeService.getSchemaById(req.params.id);
    if (!schema) {
      res.status(404).json({ message: 'Schema not found' });
      return;
    }
    res.status(200).json(schema);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSchema = async (req, res) => {
  try {
    const schema = await schemeService.updateSchema(req.params.id, req.body);
    res.status(200).json(schema);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSchema = async (req, res) => {
  try {
    const result = await schemeService.deleteSchema(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
