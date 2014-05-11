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
        console.log(model);

        //that = this;
        model.destroy({
            success: function() {
            console.log("borta!");

            router.navigate()

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
            //items: posts.toJSON(),
            
        });
        //console.log(this.collection.toJSON());
        this.$el.find("#list").html(html);
        
        return this;

    }
});

var ShowPostView = Backbone.View.extend({

    
    initialize: function() {
        console.log("SHOW POST JEW HERE OLOL");
        //console.log(this.collection);
        console.log(this.model);
        //var model = this.model;
        //this.collection.bind("add remove change", _.bind(this.render, this))
        //this.model.on('change', this.render(),this);
        console.log("this model " + this.model);
        console.log("showpost, model " + this.model);
        //this.model.bind("add remove change", _.bind(this.render, this));
        console.log("single post view yo init");
    },
    template: Handlebars.compile(($("#postSingle").html())),

    events: {
        //'submit form' : 'UpdatePost',
        'click .postdelete' : 'postdelete',
        //'click .Edit' : 'UpdatePost'
    },

    postdelete: function(e)
    {   
     
        
    },

    UpdatePost: function(e)
    {
        e.preventDefault;
        console.log(e.target.id);
        console.log("edit edit");

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

var PostItem = new Post();
postItem = new Post
var PostRoutes = Backbone.Router.extend({

  routes: {
    "" : "index",
    "post/:id": "show",
    "post/new": "new",
    "post/:id/edit": "edit",
  },

  index: function() {
    posts.fetch();
    //var PostList = new PostListView({
      //  el: "#post",
        //collection: posts
    //}).render();
    //this.navigate("", {trigger: true});  
    
    postListView.render();
    //showPostView.hide
    console.log("index page renderad");
  },
  show: function(id) {
    //posts.fetch();
    
    //this.navigate("post/" + id, {trigger: true}); 
    postListView.remove();
    var model = posts.get(id);
    showPostView.model = model;
    //var postc = new PostCollection({url: "/posts/" + id});

    
    showPostView.model = model;
    showPostView.render();  
    
    //this.navigate("/post/" + id, {trigger: true});
   // $("#posts").hide();

    console.log("printar model here");
    console.log(model);
    console.log(showPostView.model);
  },
  new: function() {

    //newEditPostView.render();
    console.log("new post");
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
 //Backbone.history.start();

router.on('route:index', function() {
           
    })
router.on('route:show', function(id) {
       
    })

Backbone.history.start({});
//Backbone.history.start({ pushState: true });
/*var PostSingle = new ShowPostView({
        el: "singlePost",
        collection: posts
    }).render(); */


