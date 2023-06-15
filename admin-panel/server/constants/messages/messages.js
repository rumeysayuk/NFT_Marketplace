const requiredError = (value) => `Please ${value} fill in the field`
const EMAIL_UNIQUE_ERROR = `The entered email address is already registered in our system.`;
const PLEASE_PROVIDE_EMAIL = "Please enter a valid email";
const minLengthError = (field, min) => `${field} must be at least ${min} characters`
const MIN_PRICE_ERROR = "Product price cannot be less than 0";
const MIN_QUANTITY_PER_UNIT_ERROR = "Product unit quantity must be at least 2 characters";

module.exports = {
   requiredError,
   EMAIL_UNIQUE_ERROR,
   MIN_QUANTITY_PER_UNIT_ERROR,
   MIN_PRICE_ERROR,
   minLengthError,
   PLEASE_PROVIDE_EMAIL
};