var Post = Backbone.Model.extend({
   
    urlRoot: '/posts'
});

var PostCollection = Backbone.Collection.extend({
    model: Post,
    url: "/posts"
});

var PostListView = Backbone.View.extend({
    initialize: function() {
       
        this.collection.bind("add remove change", _.bind(this.render, this))
        console.log(this.collection);
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
            window.alert("Skriv in lite text, ALERTS IS THA SHIT");

            console.log("fyll i fälten korrekt");
            e.target.reset();
        }
        
    },

    render: function() {
    
        html = this.template({
            items: this.collection.toJSON(),
        });
        this.$el.find("#list").html(html);
        
        return this;

    }
});

var ShowPostView = Backbone.View.extend({

    
    initialize: function() {

        //console.log(this.collection);
        console.log(this.model);
        //var model = this.model;
        //this.collection.bind("add remove change", _.bind(this.render, this))
        //this.model.on('change', this.render(),this);
        console.log("single post view yo init");
    },
    template: Handlebars.compile(($("#postSingle").html())),

    events: {
    },  
        
    render: function() 
    {

        this.$el.html(this.template(this.model.toJSON())); 
        return this;
    }

});

var NewEditPostView = Backbone.View.extend({

    
    initialize: function() {
        console.log("New Edit Post View");
        console.log(this.model);
    },
    template: Handlebars.compile(($("#EditNew").html())),

    events: {

        'submit submit' : 'editPost',
    },

    editPost: function(e)
    {
        console.log(e.target.dataset.id);
    },
    render: function() 
    {
        this.$el.html(this.template(this.model.toJSON()))
        console.log("render edit here.")
        console.log(this.model);
        return this;
    }

});

var posts = new PostCollection();
var postListView = new PostListView({
  el: "#posts",
  collection: posts
});
var showPostView = new ShowPostView({ el: "#post", collection: posts});
var newEditPostView = new NewEditPostView({el: "#NewEdit", collection: posts});

var PostRoutes = Backbone.Router.extend({

  routes: {
    "" : "index",
    "post/:id": "show",
    "post/new": "new",
    "post/:id/edit": "edit",
  },

  index: function() {
    posts.fetch();   
    postListView.render();
    console.log("index page renderad");
  },
  show: function(id) {
     
    //this.navigate("post/" + id, {trigger: true}); 
    postListView.remove();
    var model = posts.get(id);
    showPostView.model = model;
    console.log("showPostView model");
    console.log(showPostView.model);
    showPostView.render();  
   // $("#posts").hide();

    console.log("printar model here");
    console.log(showPostView.model);
  },
 
  edit: function(id) {

    $('#post').hide();
    console.log("edit form here");
    console.log(id);
    showPostView.remove();
    postListView.remove();
    var model = posts.get(id);
    newEditPostView.model = model;
    console.log(newEditPostView.model);
    newEditPostView.render();
  }

  

});
var router = new PostRoutes();
Backbone.history.start({});



