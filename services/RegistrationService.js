const RegistrationService = {
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
      "#registration_form",
      {
        username: {
          required: true,
        },
        email: {
          required: true,
          email: true,
        },
        name: {
          required: true,
        },
        surname: {
          required: true,
        },
        password: {
          required: true,
        },
        repeat_password: {
          equalTo: "#password",
        },
      },
      {
        username: {
          required: "Required field",
        },
        email: {
          required: "Required field",
          email: "Not a valid email"
        },
        name: {
          required: "Required field",
        },
        surname: {
          required: "Required field",
        },
        password: {
          required: "Required field",
        },
        repeat_password: {
          equalTo: "Repeat password must be same as password",
        },
      },
      function (data) {
        data["users_pk"] = null;
        console.log(data);
        Utils.block_ui("#registration_form");

        //url, data, callback, error_callback
        RestClient.post(
          "users/add",
          data,
          function (response) {
            toastr.success("Succesfully registered!");
            Utils.unblock_ui("#registration_form");
          },
          function (error) {
            toastr.error("Couldnt register user");
            Utils.unblock_ui("#registration_form");
          }
        );
      }
    );
  },
};
