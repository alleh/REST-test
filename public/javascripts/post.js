var Post = Backbone.Model.extend({
   
    urlRoot: '/posts'
});

var PostCollection = Backbone.Collection.extend({
    model: Post,
    url: "/posts"
});

var PostListView = Backbone.View.extend({
    initialize: function() {
        //var posts = new PostCollection();
        //sts.fetch();  
        
        //console.log(posts.toJSON);
        //var derp = this.collection;

        this.collection.bind("add remove change", _.bind(this.render, this))
        console.log(this.collection);
        //console.log(this.post);
        //console.log(derp);
        //console.log(this.collection);

        console.log("PostliestView init");
    },
    template: Handlebars.compile(($("#post-tpl").html())),

    events: {
        'submit form' : 'addPost',
        'click .delete' : 'delete',
        'click .edit' : 'EditPost'
    },

    delete: function(e) {
        e.preventDefault;

        var model = this.collection.get(e.target.dataset.id);
        console.log(e.target);
        console.log(model);

        that = this;
        model.destroy({
            success: function() {
            console.log("borta!");

            }
        });
    },
    addPost: function(e) {
        e.preventDefault();

        if (e.target.elements[0].value && e.target.elements[1].value != "")
        {
            this.collection.create({
                Title: e.target.elements[0].value,
                Content: e.target.elements[1].value
                
            });
            console.log("hehe");
            e.target.reset();

        } else {
            console.log("fyll i fälten korrekt");
            e.target.reset();
        }
        
    },
    EditPost: function(e)
    {
        var model = this.collection.get(e.target.dataset.id);
        //e.preventDefault();
        //var model = this.get.
        console.log("editpost!");
        console.log(e.target.dataset.id);
        console.log(model);
    },           

    render: function() {
    
        html = this.template({
            items: this.collection.toJSON(),
            //items: posts.toJSON(),
            
        });
        //console.log(this.collection.toJSON());
        this.$el.find("#list").html(html);
        
        return this;

    }
});

var ShowPostView = Backbone.View.extend({

    template: Handlebars.compile(($("#postSingle").html())),
    initialize: function() {
        //var posts = new PostCollection();
        //sts.fetch();  
        
        //console.log(posts.toJSON);
        
        //console.log(derp);
        //console.log(this.collection);
        console.log("single post view yo init");
    },
    render: function() 
    {
        this.$el.html(this.template(this.model.toJSON()))
        //console.log(this); 
        console.log(this.model.attributes);
        console.log("single view renderad!");
        console.log("Med denna EL " + this.$el);
        return this;
    }

});

var posts = new PostCollection();

var showPostView = new ShowPostView({ el: "#post" });
var postListView = new PostListView({
  el: "#posts",
  tagName: "derp",
  collection: posts
});


var PostRoutes = Backbone.Router.extend({

  routes: {
    "" : "index",
    "post/:id": "show",
    "post/new": "new",
    "post:id/edit": "edit",
    //"delete/:id": "delete"
  },

  index: function() {
    //var model = posts;
    //PostList.model = model;

    //var PostList = new PostListView({
      //  el: "#post",
        //collection: posts
    //}).render();
    //console.log(PostListView.model);
    //console.log(PostListView.el);
    //console.log(PostListView.$el);
    posts.fetch();
    postListView.render();
    //showPostView.remove();
    //showPostView.remove();
    console.log("index page renderad");
  },
  show: function(id) {
    var model = posts.get(id);
    showPostView.model = model;
    showPostView.render();
    //postListView.remove();
    
    $("#posts").hide();

    
    console.log(model);
    //console.log(showPostView.model);
    /*var PostSingle = new ShowPostView({
        el: "singlePost",
        collection: posts
    }).render(); */
  },
  new: function() {

    console.log("new post");
  },

  delete: function(id) {

     console.log("post " + id);
  },

  edit: function(id) {

     console.log("edit " + id);
  }

  

});
var router = new PostRoutes();
 Backbone.history.start();


/*var PostSingle = new ShowPostView({
        el: "singlePost",
        collection: posts
    }).render(); */


