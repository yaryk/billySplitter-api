import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const SALT = 10;

export const schema = {
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
  username: String,
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  groups: [
    { type: mongoose.Schema.ObjectId, ref: 'Group' }
  ]
};

const userSchema = new mongoose.Schema(schema, { timestamps: true });

userSchema.methods = {
  authenticate(plaintTextPassword) {
    return bcrypt.compare(plaintTextPassword, this.password);
  }
};

userSchema.pre('save', function (next) {
  const user = this;

  bcrypt.hash(user.password, SALT)
    .then((hash) => {
      user.password = hash;
      next();
    })
    .catch((err) => {
      next(err);
    });
});

export const User = mongoose.model('user', userSchema);
