import DS from 'ember-data';


export default DS.Model.extend({
  title: DS.attr('string'),
  details: DS.attr('string'),
  name : DS.attr('string'),
  date : DS.attr('date'),
  image : DS.attr('string'),

    created: DS.attr('string', {
    defaultValue: function(){
      return new Date();
    }
  })
});

