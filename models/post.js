module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define('Post', {
    Title: DataTypes.STRING,
    Content: DataTypes.STRING
  },{
  timestamps: true
  })
  return Post
}
