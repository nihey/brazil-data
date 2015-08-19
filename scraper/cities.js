var getPage = require('./utils/get-page'),
    cheerio = require('cheerio'),
    pi = require('./utils/parse-int');

getPage('https://pt.wikipedia.org/wiki/Lista_de_munic%C3%ADpios_do_Brasil_por_popula%C3%A7%C3%A3o', function(data) {
    var cities = {};
    var $ = cheerio.load(data.toString());
    var prefix = '.wikitable.sortable tr td';

    $('.wikitable.sortable tr td:nth-child(1)').each(function(index, object) {
      var code = $(object).next();
      var name = $(code).next();
      var state = $(name).next();
      var population = $(state).next();
      cities[code.text()] = {
        name: name.text(),
        state: state.text(),
        population: pi(population.text()),
      };
    });
    console.log(JSON.stringify(cities));
});
