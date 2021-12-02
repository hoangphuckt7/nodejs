module.exports = {
  mutipleMogooseToObject: function (mogoose) {
    return mogoose.map((mogoose) => mogoose.toObject());
  },

  mogooseToObject: function (mogoose) {
    return mogoose ? mogoose.toObject() : mogoose;
  },
};
