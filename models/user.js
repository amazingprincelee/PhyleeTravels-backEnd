import mongoose from "mongoose";
import passport from "passport";
import passportLocalMongoose from "passport-local-mongoose";

// User schema 
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  password: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  role: { type: String, required: false },
  email: { type: String, required: true, unique: true }, 
  phone: { type: String, required: false },
  isAdmin: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
  verificationcode: String,
  
});

// Add passport-local-mongoose plugin with usernameField set to 'email'
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      done(err, null);
    });
});

export default User;
