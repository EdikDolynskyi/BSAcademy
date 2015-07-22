module.exports = function (req, res) {
  req.wantsJSON = true;
  Countries.findOne({name: req.param('name')}).exec(function (err, country) {
    if (err)
      return res.serverError('Internal server error');
    if (!country)
      return res.notFound('There in no country with given name.');

    Hotels.find({countryName: req.param('name')}).exec(function (err, result) {
      if (err)
        return res.serverError('Internal server error');
      if (!result.length)
        return res.notFound('There in no hotels for this country');

      res.send(result);
    });
  });
};
