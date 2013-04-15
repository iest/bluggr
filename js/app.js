// Pretty much works, just gotta make it able to save and shit


Bluggr = Ember.Application.create();

Bluggr.Router.map(function(){
    this.resource('posts');
    this.resource('edit', { path: '/edit/:post_id' });
});



// Setup the routes

Bluggr.IndexRoute = Ember.Route.extend({
    redirect: function(){
        this.transitionTo('posts');
    }
});

Bluggr.PostsRoute = Ember.Route.extend({
    model: function(){
        return Bluggr.Post.find();
    }
});


Bluggr.PostsController = Ember.ArrayController.extend({
    createPost: function(){
        Bluggr.Post.createRecord({
            title: 'New Post Title',
            postContent: '',
            modified: new Date()
        });

        this.get('store').commit();
    }
});

Bluggr.EditController = Ember.ObjectController.extend({
    isSaved: false,
    didInsertElement: function(){
        this.set('isSaved', false);
    },
    savePost: function(){
        this.set('isSaved', true);
        this.get('model').set('modified', new Date());
        this.get('store').commit();
    },
    deletePost: function(){

        if(confirm('Delete this post?')) {

            var post = this.get('model');

            post.deleteRecord();
            this.get('store').commit();

            this.transitionTo('posts');

        }
    }

});

Bluggr.editTitleView = Ember.TextField.extend({
    focusOut: function(){
        this.get('controller').savePost();
    }
});

Bluggr.editContentView = Ember.TextArea.extend({
    timer: 0,
    keyUp: function(){

        this.get('controller').set('isSaved', false);

        var self = this,
            save = function(){
                self.get('controller').savePost();
            };

        if (this.timer > 0) {
            clearTimeout(this.timer);
            this.timer = 0;
        }
        else {
            this.timer = setTimeout(save, 500);
        }
    },
    focusOut: function(){
        this.get('controller').savePost();
    }
});



// Setup the data models and fixtures
Bluggr.Post = DS.Model.extend({
    title: DS.attr('string'),
    postContent: DS.attr('string'),
    modified: DS.attr('date')
});

Bluggr.Store = DS.Store.extend({
    revision: 11,
    adapter: 'Bluggr.LSAdapter'
});

Bluggr.LSAdapter = DS.LSAdapter.extend({
    namespace: 'bluggr-emberjs'
});










// Helpers

Ember.Handlebars.registerBoundHelper('date', function(date){
    return moment(date).fromNow();
});

var showdown = new Showdown.converter();

Ember.Handlebars.registerBoundHelper('markdown', function(input){
    return new Ember.Handlebars.SafeString(showdown.makeHtml(input));
});