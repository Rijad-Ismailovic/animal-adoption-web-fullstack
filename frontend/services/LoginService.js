const LoginService = {
  init: function () {
    $("body").removeClass("bg-light").addClass("bg-dark");
    $("footer").hide();
    // $("nav").hide();

    // this.oldValidate();
    this.validate();
  },

  oldValidate: function () {
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
            console.log(response);
            if (response != false) {
              localStorage.setItem("user_id", response.id);
              location.reload(true);

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
        email: {
          required: true,
        },
        password: {
          required: true,
        },
      },
      {
        email: {
          required: "Required field",
        },
        password: {
          required: "Required field",
        },
      },
      function (data) {
        Utils.block_ui("#login_form");

        RestClient.post(
          "auth/login",
          data,
          function (response) {
            Utils.unblock_ui("#login_form");
            Utils.set_to_localstorage("user", response)
            $("body").removeClass("bg-dark").addClass("bg-light");
            $("footer").show();
            window.location = "#homepage"
            console.log("Response is " + response);
          },
          function (error) {
            Utils.unblock_ui("#login_form");
            toastr.error(error.responseText);
          }
        );
      }
    );
  },
};
