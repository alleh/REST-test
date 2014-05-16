var Post = Backbone.Model.extend({
    urlRoot: '/posts'
});

var PostCollection = Backbone.Collection.extend({
    model: Post,
    url: "/posts"
});
var posts = new PostCollection();

var PostListView = Backbone.View.extend({
    initialize: function() {

        this.collection.bind("add remove change", _.bind(this.render, this))
    },
    template: Handlebars.compile(($("#post-tpl").html())),

    events: {
        'submit #postform form' : 'addPost',
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
    
        this.$el.append('<ul id="list"></ul>');
        html = this.template({
            items: this.collection.toJSON(),
        });
        this.$el.find("#list").html(html);
        
        return this;

    }
});

var ShowPostView = Backbone.View.extend({

    
    initialize: function() {
        
        this.model.bind("sync", _.bind(this.render, this))
        
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

        this.model.on('sync', this.render, this);
    },
    template: Handlebars.compile(($("#EditNew").html())),

    events: {
        'submit form' : 'editPost',
    },

    editPost: function(e)
    {
        e.preventDefault()
        console.log(e.target.elements[0].value, e.target.elements[1].value);


        this.model.set({
            Title: e.target.elements[0].value,
            Content: e.target.elements[1].value,        
        }); 
        this.model.save();

    },

    render: function() 
    {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }

}); 

var postListView = new PostListView({
  el: "#app",
  collection: posts
});

var PostRoutes = Backbone.Router.extend({

  routes: {
    "" : "index",
    "post/:id": "show",
    "post/new": "new",
    "post/:id/edit": "edit",
  },

  index: function() {

    posts.fetch();

  },
  show: function(id) {
     
    var model = new Post({id: id});
    
    var showPostView = new ShowPostView({ el: "#app", model: model });

    model.fetch()
  },
 
  edit: function(id) {

    var model = new Post({id: id});
    
    var newEditPostView = new NewEditPostView({ el: "#app", model: model });

    model.fetch()

  }

  

});
var router = new PostRoutes();
Backbone.history.start({});





