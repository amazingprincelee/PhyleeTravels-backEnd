//user.js file
import mongoose from "mongoose";
import passport from "passport";
import passportLocalMongoose from "passport-local-mongoose";

// User schema 
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Make username unique
  password: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  email: { type: String, required: false },
  phone: { type: String, required: false },
  NacBalance: { type: Number, default: 0 },
  DaiBalance: { type: Number, default: 0 },
  AmountStaked: { type: Number, default: 0 },
  stakeCount: { type: Number, default: 0 },
  DaiRewardBalance: { type: Number, default: 0 },
  NacRewardBalance: { type: Number, default: 0 },
  isAdmin: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
  underInsurrance: { type: Boolean, default: false },
  verificationcode: String,
});

// Add passport-local-mongoose plugin with usernameField set to 'username'
userSchema.plugin(passportLocalMongoose, { usernameField: 'username' });

const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

export default User;
