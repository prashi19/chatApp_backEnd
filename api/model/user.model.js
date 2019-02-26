const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
let saltRounds = 10;
const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      require: [true, "firstName required"]
    },
    lastName: {
      type: String,
      require: [true, "lastName required"]
    },
    Email: {
      type: String,
      require: [true, "Email required"]
    },
    Password: {
      type: String,
      require: [true, "Password required"]
    }
  },
  {
    timestamps: true
  }
);
var user = mongoose.model("User", UserSchema);

function userModel() {}

function hash(Password) {
  var pass = bcrypt.hashSync(Password, saltRounds);
  return pass;
}

function userModel() {}
userModel.prototype.login = (body, callback) => {
  console.log("model ", body.Password);
  user.findOne({ Email: body.Username }, (err, result) => {
    console.log("model data==>", result);
    if (err) {
      callback(err);
    } else if (result != null) {
      bcrypt.compare(body.Password, result.Password).then(res => {
        if (res) {
          console.log("Login Successful");
          callback(null, res);
        } else {
          console.log("Incorrect password");
          callback("Incorrect password");
        }
      });
    } else {
      console.log("invalid user");
      callback("invalid user");
    }
  });
};

userModel.prototype.registration = (body, callback) => {
  user.find(
    {
      Email: body.Email
    },
    (err, data) => {
      if (err) {
        console.log("Error in registration");
        callback(err);
      } else {
        if (data.length > 0) {
          console.log("Email already exists");
          callback("User already present");
        } else {
          var newUser = new user({
            firstName: body.firstName,
            lastName: body.lastName,
            Email: body.Email,
            Password: hash(body.Password)
          });
          newUser.save((err, result) => {
            if (err) {
              console.log("Model not found");
              callback(err);
            } else {
              console.log("Registered Successfully");
              callback(null, result);
            }
          });
        }
      }
    }
  );
};
module.exports = new userModel();