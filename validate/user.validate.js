module.exports.postCreate = function (req, res, next) {
  let errors = [];

  if(!req.body.name) {
    errors.push('Name is required')
  }

  if(!req.body.age) {
    errors.push('Age is required')
  }

  if(!req.body.gender) {
    errors.push('Gender is required')
  }

  if(errors.length) {
    res.render('users/create', {
      errors: errors,
      value: req.body
    })
    return;
  }

  next();

}