import Emp from '../imports/api/rooms/employers';

Template.employers.onCreated(function () {
  Session.setDefault('empSearch', '')
});

Template.employers.helpers({
  empList() {
    let list,
      req = Session.get('empSearch').toString().trim();

    if (req !== '') {
      list = Meteor.call('emp-search', req, function(err, res) {
        if (err) {
          console.log(err);
          return new Error(err);
        }

        if (res)
          return res;
      });
    } else {
      list = Emp.find({}).fetch();
    }

    if (list) {
      return list;
    }

    return;
  }
});

Template.employers.events({
  'change #emp_serach'(e) {
    Session.set('empSearch', $(e.target).val())
  }
});
