var AdminService = {
  // Animals
  reload_animals_datatable: function () {
    Utils.get_datatable(
      "tbl_animals",
      Constants.get_api_base_url() + "animals/paginated",
      [
        { data: "action" },
        { data: "id" },
        { data: "user_id" },
        { data: "listing_title" },
        { data: "name" },
        { data: "type" },
        { data: "location" },
        { data: "breed" },
        { data: "age" },
        { data: "weight" },
        { data: "gender" },
        { data: "vaccinated" },
        { data: "chipped" },
        { data: "additional_info" },
        { data: "image_path" },
      ]
    );
  },

  open_edit_animal_modal: function (animal_id) {
    RestClient.get("animals/id/" + animal_id, function (data) {
      $("#edit_listing_modal").modal("toggle");
      $("#id").val(data.id);
      $("#listing_title").val(data.listing_title);
      $("#name").val(data.name);
      $("#type").val(data.type);
      $("#location").val(data.location);
      $("#breed").val(data.breed);
      $("#age").val(data.age);
      $("#weight").val(data.weight);
      if (data.gender === "male") {
        $("#male").prop("checked", true);
      } else if (data.gender === "female") {
        $("#female").prop("checked", true);
      } else if (data.gender === "mixed") {
        $("#mixed").prop("checked", true);
      }
      if (data.vaccinated == "1") {
        $("#vaccinated").prop("checked", true);
      }
      if (data.chipped == "1") {
        $("#chipped").prop("checked", true);
      }
      $("#additional_info").val(data.additional_info);
    });
  },

  delete_animal: function (animal_id) {
    if (
      confirm(
        "Are you sure you want to delete animal with id " + animal_id + "?"
      ) == true
    ) {
      RestClient.delete(
        "animals/delete/" + animal_id,
        {},
        function (data) {
          AdminService.reload_animals_datatable();
        },
        function () {
          toastr.error("Unable to delete");
        }
      );
    }
  },

  // Users
  reload_users_datatable: function () {
    Utils.get_datatable(
      "tbl_users",
      Constants.get_api_base_url() + "users/paginated",
      [
        { data: "action" },
        { data: "id" },
        { data: "username" },
        { data: "email" },
        { data: "password" },
        { data: "name" },
        { data: "surname" },
      ]
    );
  },

  open_edit_user_modal: function (user_id) {
    RestClient.get(
      "users/id/" + user_id,
      function (data) {
        console.log(data);
        $("#edit_user_modal").modal("toggle");
        $("#edit_user_modal #users_pk").val(data.id);
        $("#edit_user_modal #username").val(data.username);
        $("#edit_user_modal #email").val(data.email);
        $("#edit_user_modal #password").val(data.password);
        $("#edit_user_modal #name").val(data.name);
        $("#edit_user_modal #surname").val(data.surname);
      },
      function () {
        console.log("nije se spojilo");
      }
    );
  },

  delete_user: function (user_id) {
    if (
      confirm(
        "Are you sure you want to delete animal with id " + user_id + "?"
      ) == true
    ) {
      RestClient.delete(
        "users/delete/" + user_id,
        {},
        function (data) {
          AdminService.reload_animals_datatable();
          AdminService.reload_users_datatable();
        }
        /*  function () {
          toastr.error("Unable to delete");
        } */
      );
    }
  },

  // Other stuff

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
      "#edit_listing_form",
      {
        listing_title: {
          required: true,
        },
        location: {
          required: true,
        },
        name: {
          required: true, // Inace ne bi bio required, ali ako se ne unese name field zbog nekog razloga se ne moze fetchat iz baze ??
        },
        type: {
          required: true,
        },
        age: {
          digits: true,
        },
        weight: {
          digits: true,
        },
        gender: {
          required: true,
        },
      },
      {
        listing_title: {
          required: "Field is required",
        },
        name: {
          required: "Field is required",
        },
        location: {
          required: "Field is required",
        },
        type: {
          required: "Field is required",
        },
        age: {
          digits: "Input must be number",
        },
        weight: {
          digits: "Input must be number",
        },
        gender: {
          required: "Field is required",
        },
      },
      function (data) {
        Utils.block_ui("#edit_listing_modal");

        let user = Utils.get_from_localstorage("user");
        data["user_id"] = user.id;

        //url, data, callback, error_callback
        RestClient.post(
          "animals/add",
          data,
          function (response) {
            Utils.unblock_ui("#edit_listing_modal");
            $("#edit_listing_modal").modal("toggle");
            AdminService.reload_animals_datatable();
          },
          function (error) {
            toastr.error("Error creating the listing");
            Utils.unblock_ui("#edit_listing_modal");
          }
        );
      }
    );

    FormValidation.validate(
      "#edit_user_form",
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
          email: "Not a valid email",
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
        console.log(data);
        Utils.block_ui("#edit_user_modal");

        //url, data, callback, error_callback
        RestClient.post(
          "users/add",
          data,
          function (response) {
            Utils.unblock_ui("#edit_user_modal");
            $("#edit_user_modal").modal("toggle");
            AdminService.reload_users_datatable();
          },
          function (error) {
            toastr.error("Couldnt edit user");
            Utils.unblock_ui("#edit_user_modal");
          }
        );
      }
    );
  },
};
