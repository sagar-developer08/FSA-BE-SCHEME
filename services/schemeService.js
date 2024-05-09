// schemaService.js
const Scheme = require('../models/schemeModel');

exports.createSchema = async (schemaData) => {
  try {
    const { schemeName, schemeType } = schemaData;
    if (!schemeName || !schemeType) {
      return {
        message: 'Schema name and type are required',
        statusCode: 400,
      };
    }

    const existingSchema = await Scheme.findOne({ where: { schemeName } });
    if (existingSchema) {
      return {
        message: 'Schema already exists',
        statusCode: 409,
      };
    }

    const newSchema = await Scheme.create(schemaData);
    return {
      message: 'Schema created successfully',
      data: newSchema,
      statusCode: 201,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getAllSchemas = async () => {
  try {
    const schemas = await Scheme.findAll({
      attributes: ['id', 'schemeName', 'schemeType'],
    });
    if (schemas.length === 0) {
      return {
        message: 'No schemas found',
        data: null,
        statusCode: 404,
      };
    }
    return {
      message: 'Schemas fetched successfully',
      data: schemas,
      statusCode: 200,
    };
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('Unknown column')) {
      return {
        message: 'One or more columns are missing from the schema',
        error: error.message,
        statusCode: 400,
      };
    }
    throw new Error(error.message);
  }
};

exports.getSchemaById = async (schemaId) => {
  try {
    const schema = await Scheme.findByPk(schemaId);
    if (!schema) {
      return {
        message: 'Schema not found', statusCode: 404, data: null }; 
        // await Scheme.findByPk(schemaId);
      }
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.updateSchema = async (schemaId, updatedSchemaData) => {
  try {
    const schemaToUpdate = await Scheme.findByPk(schemaId);
    if (!schemaToUpdate) {
      throw new Error('Schema not found');
    }
    await schemaToUpdate.update(updatedSchemaData);
    return schemaToUpdate;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.deleteSchema = async (schemaId) => {
  try {
    const schemaToDelete = await Scheme.findByPk(schemaId);
    if (!schemaToDelete) {
      throw new Error('Schema not found');
    }
    await schemaToDelete.destroy();
    return { message: 'Schema deleted successfully' };
  } catch (error) {
    throw new Error(error.message);
  }
};

