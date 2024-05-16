const IndexService = {
  init: function () {
    if (Utils.get_from_localstorage("user") != null) {
      $("#login_button").text("Log out");
    } else {
      $("#login_button").text("Log in");
    }
    // var currentHash = window.location.hash;
    // $('.nav-link[href="' + currentHash + '"]').addClass("active");

    // $("a.nav-link").click(function () {
    //   $("a.nav-link").removeClass("active");
    //   $(this).addClass("active");
    // });
  },
};


