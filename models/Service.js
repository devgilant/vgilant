var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var serviceSchema = new Schema({
  name: { type: String, unique: true },
  category: String,
  data_fields: [{type: Schema.Types.ObjectId, ref: ['DataType']}]
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
