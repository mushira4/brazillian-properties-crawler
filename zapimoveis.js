var Spider = require('node-spider');
var logger = require('winston');
 
// Instantiate web crawler
var spider = new Spider({

  headers: { 'user-agent': 'node-spider' },
 
  encoding: 'utf-8',

  error: function(err, url){},
 
  done: function(){}
 
});
 
var propertiesIM = [
  'IM19191130',
  'IM09010998',
  'IM39420312',
]

// it returns the url to the property.
// IM19191130

var zapImoveisHost = 'http://www.zapimoveis.com.br';
var zapimoveisFindById = zapImoveisHost + '/FichaImovel/BuscaPorZapID?zapID=';

propertiesIM.forEach(function(value){
  spider.queue(zapimoveisFindById + value, function(doc){
    var propertyUrl = doc.res.body;
    spider.queue(zapImoveisHost + propertyUrl, function(doc){
      var propertyValue = doc.$('span.value-ficha').contents()[2].nodeValue.replace('R$', '').trim();
      logger.info(doc.url + ' -- ' + propertyValue);
    });
  });
});

