module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define('Post', {
    Title: DataTypes.STRING,
    Content: DataTypes.TEXT
  },{
  timestamps: true
  })
  return Post
}
