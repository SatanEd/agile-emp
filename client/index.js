import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

Template.index.onCreated( function() {
  this.currentPage = new ReactiveVar( "roomsList" );
});

Template.index.helpers({
  page: function() {
    return Template.instance().currentPage.get();
  },
  pageData: function() {
    var page = Template.instance().currentPage.get();

    return page;
  }
});
