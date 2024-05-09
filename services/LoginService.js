const LoginService = {
  init: function () {
    $("body").removeClass("bg-light").addClass("bg-dark");
    $("footer").hide();
    $("nav").hide();

    this.validate();
  },

  validate: function () {
    $.validator.setDefaults({
      errorClass: "error",
      errorElement: "label",
      errorPlacement: function (error, element) {
        error.css("color", "red");
        error.insertAfter(element);
      },
    });

    FormValidation.validate(
      "#login_form",
      {
        usernameOrEmail: {
          required: true,
        },
        password: {
          required: true,
        },
      },
      {
        usernameOrEmail: {
          required: "Required field",
        },
        password: {
          required: "Required field",
        },
      },
      function (data) {
        Utils.block_ui("#login_form");

        RestClient.post(
          "users/login",
          data,
          function (response) {
            if (response != "false") {
              response = JSON.parse(response);
              localStorage.setItem("user_id", response.id);

              toastr.success("Succesfully loged in");
              Utils.unblock_ui("#login_form");
              
              $("body").removeClass("bg-dark").addClass("bg-light");
              $("footer").show();
              $("nav").show();
              window.location.hash = "#homepage";
            } else {
              toastr.error("Invalid login credentials");
              Utils.unblock_ui("#login_form");
            }
          },
          function (error) {
            toastr.error("Couldnt connect to database");
            Utils.unblock_ui("#login_form");
          }
        );
      }
    );
  },
};
