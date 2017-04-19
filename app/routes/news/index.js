import Ember from 'ember';
const PAGE_SIZE = 5;

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


    return this.store.query('news', query).then((news) => {
      if (this.get('startAt')) {
        return news.slice(1);
      } else {
        return news.slice(0,news.get('length')-1);
      }
    });
  },

  actions: {
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
