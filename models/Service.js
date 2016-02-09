var mongoose = require('mongoose');

var serviceSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  type: String
});

/**
 * Password hash middleware.
 *
userSchema.pre('save', function(next) {
});
*/
/**
 * Helper method for validating user's password.
 *
userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};
*/

module.exports = mongoose.model('Service', serviceSchema);
