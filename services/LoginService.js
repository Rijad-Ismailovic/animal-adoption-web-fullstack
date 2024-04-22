const LoginService = {
  init: function () {
    $("body").removeClass("bg-light").addClass("bg-dark");
    $("footer").hide();
    $("nav").hide();

    localStorage.clear()


    $("#loginButton").click(function () {
      $.ajax({
        url: "assets/json/users.json",
        type: "GET",
        dataType: "json",
        success: function (data) {
          let usernameOrEmail = $("#usernameOrEmail").val();
          let password = $("#password").val();

          data.forEach(function (user) {
            if (
              user.username == usernameOrEmail ||
              user.email == usernameOrEmail
            ) {
              if (user.password == password) {
                $("body").removeClass("bg-dark").addClass("bg-light");
                $("footer").show();
                $("nav").show();

                localStorage.setItem("userId", user.id);
                window.location.hash = "#homepage";
              }
            }
          });
        },
        error: function (xhr, status, error) {
          console.error("Error fetching data from file:", error);
        },
      });
    });
  },
};a
