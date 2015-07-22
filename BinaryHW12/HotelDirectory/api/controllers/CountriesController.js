module.exports = {
  //getAllCountries: function (req, res) {
  //  Countries.find().exec(function (err, result) {
  //    if (err)
  //      return res.serverError('Internal server error');
  //
  //    res.send(result);
  //  });
  //},
  //getHotelsInCountry: function (req, res) {
  //  req.wantsJSON = true;
  //  Countries.findOne({name: req.param('name')}).exec(function (err, country) {
  //    if (err)
  //      return res.serverError('Internal server error');
  //    if (!country)
  //      return res.notFound('There in no country with given name.');
  //
  //    Hotels.find({countryName: req.param('name')}).exec(function (err, result) {
  //      if (err)
  //        return res.serverError('Internal server error');
  //      if (!result.length)
  //        return res.notFound('There in no hotels for this country');
  //      res.send(result);
  //    });
  //  });
  //},
  //addCountry: function (req, res) {
  //  req.wantsJSON = true;
  //  Countries.create({name: req.param('name')}).exec(function (err, Countries) {
  //    res.send(Countries);
  //  });
  //},
  //addHotelToCountry: function (req, res) {
  //  req.wantsJSON = true;
  //  Countries.findOne({name: req.param('countryName')}).exec(function (err, country) {
  //    if (err)
  //      return res.serverError('Internal server error');
  //    if (!country)
  //      return res.notFound('There in no country with given name.');
  //
  //    Hotels.create({
  //      countryName: country.name,
  //      name: req.param('name'),
  //      address: req.param('address')
  //    }).exec(function (err, Hotels) {
  //      res.send(Hotels);
  //    });
  //  });
  //},
  getAllCountriesPretty: function (req, res) {
    req.wantsJSON = true;
    Countries.find().exec(function (err, result) {
      res.view('countries', {message: result});
    });
  }
};
