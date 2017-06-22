import Emp from '../imports/api/rooms/employes';

Template.employe.events({
  'click .emp__list_itm'(e, i) {
    $(e.currentTarget).find('.emp__info').eq(0).animate({
      height: "toggle"
    }, 200);
  }
});

Template.namesOption.helpers({
  names() {
    return Emp.find({}, {email: 1, firstname: 1, lastname: 1}).fetch();
  }
});
