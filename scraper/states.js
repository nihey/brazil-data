var getPage = require('./utils/get-page'),
    cheerio = require('cheerio'),
    pf = require('./utils/parse-float');

function child(x, y) {
  return '.wikitable.sortable tr:nth-child(' + y + ') td:nth-child(' + x + ')';
};

getPage('https://pt.wikipedia.org/wiki/Unidades_federativas_do_Brasil', function(data) {
    var states = {};
    var $ = cheerio.load(data.toString());
    var prefix = '.wikitable.sortable tr td';

    var getColumn = function(x, y) {
      return $(child(x, y)).text();
    }

    $('.wikitable.sortable tr td:nth-child(1)').each(function(index) {
      // Skip the first rows so we start where the first state is
      index = index + 2;
      states[getColumn(3, index)] = {
        name: getColumn(2, index),
        capital: getColumn(4, index),
        area: pf(getColumn(5, index)),
        population: pf(getColumn(6, index)),
        density: pf(getColumn(7, index)),
        gdp: pf(getColumn(8, index)),
        gdpPercent: pf(getColumn(9, index).replace('%', '')),
        gdpPerCapita: pf(getColumn(10, index)),
        hdi: pf(getColumn(11, index)),
        literacy: pf(getColumn(12, index).replace('%', '')),
        infantMortality: pf(getColumn(13, index).replace('‰', '')),
        lifeExpectancy: pf(getColumn(14, index)),
      };
    });
    console.log(JSON.stringify(states));
});
