const RegistrationService = {
  init: function () {
    $("body").removeClass("bg-light").addClass("bg-dark");
    $("footer").hide();
    $("nav").hide();
    // $("#registrationHeader").hide(); //ne zaboravi da unhideas rijade

    $.validator.setDefaults({
      errorClass: "error",
      errorElement: "label",
      errorPlacement: function (error, element) {
        error.css("color", "red");
        error.insertAfter(element);
      },
    });

    $("#registrationButton").click(function () {
      $("#registrationForm").validate({
        rules: {
          name: {
            required: true,
          },
          surname: {
            required: true,
          },
          email: {
            required: true,
            email: true,
          },
          username: {
            required: true,
          },
          password: {
            required: true,
          },
          repeatPassword: {
            equalTo: "#password",
          }
        },
        messages: {
          name: {
            required: "Ime je obavezno!",
          },
          surname: {
            required: "Prezime je obavezno!",
          },
          email: {
            required: "Email adresa je obavezna!",
            email: "Neprihvatljiva forma email adrese",
          },
          username: {
            required: "Username je obavezno!",
          },
          password: {
            required: "Password je obavezan",
          },
          repeatPassword: {
            required: "Repeat password je obavezan",
            equalTo: "Repeat password must be same as password"
          }
        },
        submitHandler: function (form, e) {
          e.preventDefault();
          alert("Succesfully registered!");
          // form.submit(); Ovdje ide ajax rijade
        },
        // highlight: function (element, errorClass, validClass) {
        //   $(element).next("label.error").css("color", "red");
        // },
        unhighlight: function (element, errorClass, validClass) {
          $(element).next("label.error").css("color", "");
        },
      });
    });
  },
};
