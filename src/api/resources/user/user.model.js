/* global bcrypt */
import mongoose from 'mongoose';

export const schema = {
  username: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  }
};

const userSchema = new mongoose.Schema(schema, { timestamps: true });

userSchema.methods = {
  authenticate(plaintTextPassword) {
    return bcrypt.compareSync(plaintTextPassword, this.password);
  },
  hashPassword(plaintTextPassword) {
    if (!plaintTextPassword) {
      throw new Error('Could not save user');
    }

    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(plaintTextPassword, salt);
  }
};

export const User = mongoose.model('user', userSchema);
