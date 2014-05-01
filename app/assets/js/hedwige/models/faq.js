define(['backbone'], function(Backbone) {

  var Faq = Backbone.Model.extend({

    defaults: {
      "question":  ""
    }

  });

  return Faq;
});