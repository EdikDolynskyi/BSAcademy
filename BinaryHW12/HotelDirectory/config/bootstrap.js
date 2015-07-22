/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function (cb) {
  Countries.create([
    {name: 'Ukraine'},
    {name: 'Hungary'},
    {name: 'Slovak'},
    {name: 'Poland'},
    {name: 'Russia'},
    {name: 'Belorussia'},
    {name: 'Turkey'},
    {name: 'Bulgaria'},
    {name: 'Check'}
  ]).exec(function () {
    console.log('Countries has been added to db');
  });

  Hotels.create([
    //Ukraine
    {
      name: 'Star',
      countryName: 'Ukraine',
      address: 'Mukachevo, Mira Square, 1'
    },
    {
      name: 'Old Continent',
      countryName: 'Ukraine',
      address: 'Ujgorod, Sh.Petefi Square, 4'
    },
    {
      name: 'Irshava',
      countryName: 'Ukraine',
      address: 'Irshava, Bileczka street, 12'
    },
    //Poland
    {
      name: 'Hotel Perla',
      countryName: 'Slovak',
      address: 'Krakiv, Zakopianska street 180B, 1'
    }
  ]).exec(function () {
    console.log('Hotels has been added to db');
  });

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
