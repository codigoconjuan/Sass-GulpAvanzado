global.jQuery = require('jquery');
bootstrap = require('bootstrap');
Mustache = require('mustache');


jQuery(function($) {
  var jqxhr = $.getJSON( "data.json", function() {
  })
  .done(function(data) {
    var template = $('#template').html();
      var rendered = Mustache.render(template, data);
      $('#target').html(rendered);
  });
});
