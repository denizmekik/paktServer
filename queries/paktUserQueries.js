var PaktUser = require('../utils/db.js').Pakt_User;

module.exports = {

  getPaktUser: function (userId, paktId, callback) {
    PaktUser.findOne({
      where: { UserId: userId, PaktId: paktId }
    }).then(function (userPakt) {
      callback(userPakt);
    }, function (error) {
      console.log('error getting UserPakt: ', error);
    });
  },

  // updates a property on Pakt_User based on updateValue object
  updatePaktUser: function (userId, paktId, updateObj, callback) {
    PaktUser.findOne({
      where: { UserId: userId, PaktId: paktId }
    }).then(function (userPakt) {
      userPakt.updateAttributes(
        updateObj
      ).then(function (updated) {
        callback(updated);
      }, function (error) {
        console.error('error updating UserPakt: ', error);
      });
    }, function (error) {
      console.error('error getting UserPakt: ', error);
    });
  },

  // output is an array of objects with a delete property
  // which represents each user in a Pakt
  getAllDeletes: function (paktId, callback) {
    PaktUser.findAll({
      where: {
        PaktId: paktId
      },
      attributes: ['delete'],
      raw: true
    }).then(function (usersInPakt) {
      callback(usersInPakt);
    }, function () {
      console.log('error in getting delete consensus');
    });
  },

  // paktAndFriendsIds is an array of objects
  // containing paktId and userIds to be added
  addFriendsToPakt: function (pairs, callback) {
    PaktUser.bulkCreate(pairs)
    .then(function () {
      PaktUser.findAll({
        where: {
          PaktId: pairs[0].PaktId
        },
        raw: true
      }).then(function (userPakts) {
        callback(userPakts);
      });
    });
  }
};
