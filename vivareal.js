var Spider = require('node-spider');
var logger = require('winston');

// Instantiate web crawler
var spider = new Spider({

  headers: { 'user-agent': 'node-spider' },

  encoding: 'utf-8',

  error: function(err, url){},

  done: function(){}

});

var propertiesId = [
  '68837402',
  '68185926',
  '68552773',
  '68601830',
  '63601253'
]

var pricesDomPlace = 'dd.property-information--price';

var handleRequest = function(doc){
  doc.$(pricesDomPlace).each(function(){
    var value = doc.$(this).contents()[0].nodeValue.replace('R$', '').trim();
    logger.info(doc.url + " - " + value);
  });
}

var vivarealFindById = 'http://www.vivareal.com.br/inmueble/find-by-id.htm?id=';
propertiesId.forEach(function(value){
  spider.queue(vivarealFindById + value, handleRequest);
});

