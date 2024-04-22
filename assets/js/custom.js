$(document).ready(function() {

  var app = $.spapp({
    defaultView: "#login",
    templateDir : "./views/",
    pageNotFound : 'error_404'
  }); 

  // define routes
  app.route({
    view : 'homepage',
    load : "homepage.html",
    onCreate : function() {  },
    onReady : function() {  }
  });

  app.route({
    view : 'admin',
    load : "admin.html",
    onCreate : function() {  },
    onReady : function() {  }
  });

  app.route({
    view : 'itemPage',
    load : "itemPage.html",
    onCreate : function() {  },
    onReady : function() { }
  });

  app.route({
    view : 'login',
    load : "login.html",
    onCreate : function() {  },
    onReady : function() {  }
  });

  app.route({
    view : 'profile',
    load : "profile.html",
    onCreate : function() {  },
    onReady : function() {  }
  });

  app.route({
    view : 'registration',
    load : "registration.html",
    onCreate : function() {  },
    onReady : function() {  }
  });
  

  // run app
  app.run();

});