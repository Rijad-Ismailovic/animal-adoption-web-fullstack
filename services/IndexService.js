const IndexService = {
  init: function () {
    $("#profileButton a").click(function (event) {
      event.preventDefault();

      var userUsername = localStorage.getItem("userUsername");
      window.location.hash = "#profile"; // RIKI NOTE: Mrzim web. Inicijanlo je user mogao uci u homepage bez da je logovan. No medjutim izgleda da trebas biti doktor da bi to implementirao te sam odlucio da user bude PRIMORAN da se log inuje da bi usao u stranicu. Boli me briga
    });
  },
};

// localStorage.setItem("isLoggedIn", false)
