const IndexService = {
  init: function () {
    var currentHash = window.location.hash;
    $('.nav-link[href="' + currentHash + '"]').addClass("active");

    $("a.nav-link").click(function () {
      $("a.nav-link").removeClass("active");
      $(this).addClass("active");
    });
  },
};


