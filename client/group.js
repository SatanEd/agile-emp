import Groups from '../imports/api/rooms/groups';

Template.groupOption.helpers({
  groups() {
    return Groups.find({}).fetch();
  }
});
