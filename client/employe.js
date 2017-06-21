import Emp from '../imports/api/rooms/employes';

Template.employe.events({
  'click .emp__list_itm'(e, i) {
    $(e.currentTarget).find('.emp__info').eq(0).animate({
      height: "toggle"
    }, 200);
  }
});
