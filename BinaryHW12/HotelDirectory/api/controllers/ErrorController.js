module.exports = {
  badrequest: function (req, res) {
    res.badRequest("Sorry, it`s a bad request!");
  },
  notfound: function (req, res) {
    res.statusCode = 404;
    res.end("Sorry, not found something!");
  },
  forbidden: function (req, res) {
    res.view('403');
  },
  serverError: function (req, res) {
    res.view('500');
  }
};
