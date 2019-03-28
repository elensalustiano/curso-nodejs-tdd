const { validationError } = require('../constant/utils');

class ValidationError {
  constructor(message) {
    this.type = validationError;
    this.message = message;
    this.status = 400;
  }
}

module.exports = ValidationError;
