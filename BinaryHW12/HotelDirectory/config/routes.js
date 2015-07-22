module.exports.routes = {

  '/': {
    view: 'homepage'
  },

  //BLUEPRINTS
  'GET /countries/:name/hotels': {blueprint: 'gethotelsincountry'},
  'POST /countries/:countryName/hotels': {blueprint: 'addhoteltocountry'},

  //DEFAULT
  //'get /hotels': 'HotelsController.getAllHotels',
  //'get /countries': 'CountriesController.getAllCountries',
  //'get /hotels/:name': 'HotelsController.getAboutHotel',
  //'get /countries/:name/hotels': 'CountriesController.getHotelsInCountry',
  //
  //'post /countries': 'CountriesController.addCountry',
  //'post /countries/:countryName/hotels': 'CountriesController.addHotelToCountry',
  //
  //'delete /hotels/:name': 'HotelsController.deleteHotel',
  //
  //'put /hotels/:name': 'HotelsController.updateHotel',

  //for example custom view
  'get /countries_pretty': 'CountriesController.getAllCountriesPretty',

  //errors with simple message
  'get /not_found': 'ErrorController.notfound',
  'get /bad': 'ErrorController.badrequest',
  //error with ready templates and customs message
  'get /forbidden': 'ErrorController.forbidden',
  'get /ise': 'ErrorController.serverError'

};
