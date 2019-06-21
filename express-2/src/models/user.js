import mongoose from 'mongoose';
import helpers from '../helpers';

import boom from '@hapi/boom';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
}, { timestamps: true });


userSchema.statics.findByLogin = async function (login) {
  let user = await this.findOne({
    username: login,
  });

  if (!user) {
    user = await this.findOne({ email: login });
  }
  return user;
};

userSchema.pre('save', function (next) {
  const user = this;

  helpers.LOGGER.debug(`${user.username} is going to hash the password`);

  if (!user.isModified('password')) { return next(); }
  bcrypt.hash(user.password, 10).then((hashedPassword) => {
    user.password = hashedPassword;

    helpers.LOGGER.debug(`${user.username} has hashed the password now`);

    next();
  });
}, (err) => {
  next(boom.badImplementation(err));
});

userSchema.methods.comparePassword = async function (candidatePassword, next) {
  helpers.LOGGER.debug(`comparePassword: ${this.password}`);
  helpers.LOGGER.debug(`comparePassword: ${candidatePassword}`);
  
  await bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return next(boom.unauthorized(err));

    helpers.LOGGER.debug(`comparePassword: ${isMatch}`);
    next(null, isMatch);
  });
};

userSchema.statics.getAll = async function getAll() {
  return await this.find().map(u => {
    const { password, ...userWithoutPassword } = u;
    return userWithoutPassword;
  });
};

const User = mongoose.model('User', userSchema);

export default User;