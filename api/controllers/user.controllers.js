const userService = require("../services/user.services");
exports.login = (req, res) => {
  try {
    req.checkBody('Username', 'Invaild Email').isEmail();
    req.checkBody('Password', 'Invaild Password').isLength({
      min: 6
    });
    var errors = req.validationErrors();
    var response = {};
    if (errors) {
      response.status = false;
      response.error = errors;
      return res.status(422).send(response);
    } else {
      var responseResult = {};
      userService.login(req.body, (err, result) => {
        if (err) {
          responseResult.status = false;
          responseResult.message = 'Login Failed';
          responseResult.error = err;
          res.status(500).send(responseResult);
        } else {
          responseResult.status = true;
          responseResult.message = 'Login Successful';
          responseResult.result = result;
          res.status(200).send(responseResult);
        }
      });
    }
  } catch (err) {
    res.send(err);
  }
}
exports.registration = (req, res) => {
  try {
    // req.checkBody('firstName', 'Invaild firstName').isLength({
    //   min: 3
    // }).isAlpha();
    // req.checkBody('lastName', 'Invaild lastName').isLength({
    //   min: 1
    // }).isAlpha();
    // req.checkBody('Email', 'Invaild Email').isEmail();
    // req.checkBody('Password', 'Invaild Password').isLength({
    //   min: 6
    // });
    // var errors = req.validationErrors();
    // var response = {};
    // if (errors) {
    //   response.status = false;
    //   response.error = errors;
    //   return res.status(422).send(response);
    // } else {
      var responseResult = {}
      userService.registration(req.body, (err, result) => {
        
        if (err) {     
          responseResult.status = false;
          responseResult.message = 'Registration Failed';
          responseResult.error = err;
          res.status(500).send(responseResult);
        } else {
          responseResult.status = true;
          responseResult.message = 'Registration Successful';
          res.status(200).send(responseResult);
        }
      })
    
  } catch (err) {
    res.send(err);
  }
};