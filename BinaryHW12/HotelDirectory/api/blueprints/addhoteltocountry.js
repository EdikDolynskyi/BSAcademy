module.exports = function (req, res) {
  req.wantsJSON = true;
  Countries.findOne({name: req.param('countryName')}).exec(function (err, country) {
    if (err)
      return res.serverError('Internal server error');
    if (!country)
      return res.notFound('There in no country with given name.');

    Hotels.create({
      countryName: country.name,
      name: req.param('name'),
      address: req.param('address')
    }).exec(function (err, Hotels) {

      if (err)
        return res.serverError('Internal server error');

      res.send(Hotels);
    });
  });
};
