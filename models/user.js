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
  postgraduate: { type: mongoose.Schema.Types.ObjectId, ref: 'Postgraduate', default: null },
  undergraduate: { type: mongoose.Schema.Types.ObjectId, ref: 'Undergraduate', default: null },
  schengenTourist: { type: mongoose.Schema.Types.ObjectId, ref: 'SchengenTourist', default: null },
  turkeyTourist: { type: mongoose.Schema.Types.ObjectId, ref: 'TurkeyTourist', default: null },
  southAfricaTourist: { type: mongoose.Schema.Types.ObjectId, ref: 'SouthAfricaTourist', default: null },
  eastAfrica: { type: mongoose.Schema.Types.ObjectId, ref: 'EastAfrica', default: null },
  moroccoVisa: { type: mongoose.Schema.Types.ObjectId, ref: 'MoroccoVisa', default: null },
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
