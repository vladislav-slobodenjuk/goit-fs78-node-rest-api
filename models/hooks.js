export const handleSaveError = (err, data, next) => {
  err.status = 400;
  next();
};

// should be function declaration to save 'this' context
export const runUpdateValidation = function (next) {
  this.options.runValidators = true;
  next();
};
