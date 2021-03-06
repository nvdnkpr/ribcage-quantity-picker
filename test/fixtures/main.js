var QuantityPicker = require('../../quantityPicker')
  , Ribcage = require('ribcage-view')
  , Backbone = require('backbone')
  , $ = require('jquery-browserify')
  , phantom = require('phantom-limb')
  , AppView
  , App;

Backbone.$ = $;

AppView = Ribcage.extend({
  template: require('./app.hbs')
, quantity: 50
, unit: 'lb'
, afterInit: function () {
    var self = this;

    this.picker = new QuantityPicker({
      range: {low: 1, high: 1000}
    , step: 4
    , measure: 'mass'
    });

    this.listenTo(this.picker, 'change', function () {
      var pickerVals = self.context();

      self.$('.value').text(pickerVals.value);
      self.$('.unit').text(pickerVals.unit);
    });
  }
, afterRender: function () {
    var self = this;

    this.appendSubview(this.picker, this.$('.spinholder'));
    this.picker.render();
  }
, context: function () {
    var pickerVals = this.picker.getValues();

    return {
      value: pickerVals.quantity.value + pickerVals.division.value
    , unit: pickerVals.unit.value
    };
  }
});

App = new AppView({
  el: $('#app')
});
