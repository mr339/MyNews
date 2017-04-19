import DS from 'ember-data';
// import { validator, buildValidations } from 'ember-cp-validations';

// const Validations = buildValidations({

//   email: [
//     validator('presence', true),
//     validator('format', { type: 'email' })
//   ],

//   name: validator('presence', true),

//   phone: [
//     validator('presence', true),
//     validator('length', {
//       min: 10
//     })
//   ]
// });

export default DS.Model.extend({
  name: DS.attr('string'),
  email: DS.attr('string'),
  date : DS.attr('date'),
  phone : DS.attr('string'),
  feedback : DS.attr('string'),
  select : DS.attr('string'),

});
