import Ember from 'ember';
const PAGE_SIZE = 4;

export default Ember.Route.extend({
  startAt: null,
  endAt: null,

  model() {
    var query = {
      limitToFirst: PAGE_SIZE + 1
    };

    if (this.get('startAt')) {
      query.startAt = this.get('startAt');
    }

    if (this.get('endAt')) {
      query.endAt = this.get('endAt');
      delete query.limitToFirst;
      query.limitToLast = PAGE_SIZE+1;
    }


    return this.store.query('contact', query).then((contact) => {
      if (this.get('startAt')) {
        return contact.slice(1);
      } else {
        return contact.slice(0,contact.get('length')-1);
      }
    });
  },

  actions: {

    deleteContact(contact) {
      contact.deleteRecord();
      contact.save();
      this.refresh();
    },

    prev() {
      var id = this.get('currentModel').get('firstObject.id');
      this.set('startAt', null);
      this.set('endAt', id);
      this.refresh();
    },

    next() {
      var id = this.get('currentModel').get('lastObject.id');
      this.set('startAt', id);
      this.set('endAt', null);
      this.refresh();
    }
  }
});
