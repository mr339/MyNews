import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('about',function() {
    this.route('vision');
  });

  this.route('contact', function() {
    this.route('form');
  });

  this.route('home');

  this.route('news',function() {
    this.route('writeNews');
    this.route('loading');
  });

  this.route('details',{path:'/new/:id'});
  this.route('loading');
});

export default Router;
