const ProfileService = {
  init: function () {
    let id = localStorage.getItem("user_id");
    this.loadUserData(id);
    this.loadAnimals(id);

    this.validate();
  },

  loadUserData: function (id) {
    RestClient.get("users/id/" + id, function (data) {
      $("#nameSurname").text(data.name + " " + data.surname);
      $("#username").text(data.username);
      $("#email").text(data.email);
    });
  },

  loadAnimals: function (id) {
    RestClient.get("animals/json/json", function (data) {
      let $animalCardsRow = $("#animal-cards-row");
      data.forEach(function (animal) {
        if (animal.user_id == id) {
          ProfileService.createCard(animal).appendTo($animalCardsRow);
        }
      });
    });
  },

  createCard: function (animal) {
    let badgeColor = animal.gender === "male" ? "bg-blue" : "bg-pink";
    let imagePath =
      animal.image_path != null
        ? animal.image_path
        : "https://dummyimage.com/450x300/dee2e6/6c757d.jpg";
    let cardHtml = `
      <div class="col mb-5">
        <div class="card h-100">
          <img class="card-img-top" src="${imagePath}" alt="..." />
          <div class="card-body p-3 position-relative">
            <div class="badge badge-pill ${badgeColor} position-absolute" style="top: 0.6rem; right: 0.6rem">‎ ‎ </div>
            <div class="text-center">
              <h5 class="fw-bolder">${animal.listing_title}</h5>
              ${animal.breed}<br>
              ${animal.age} years / ${animal.weight} kg
            </div>
          </div>
          <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div class="row mb-2">
              <div class="col text-center">
                <div class="d-grid gap-2">
                  <a class="btn btn-outline-dark" href="?id=${animal.id}#itempage">View</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    return $(cardHtml);
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
      "#add_listing_form",
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
        Utils.block_ui("#add_listing_modal");

        data["user_id"] = localStorage.getItem("user_id");

        //url, data, callback, error_callback
        RestClient.post(
          "animals/add",
          data,
          function (response) {
            console.log("tu sam");
            Utils.unblock_ui("#add_listing_modal");
            $("#add_listing_modal").modal("toggle");
            AdminService.reload_animals_datatable();
          },
          function (error) {
            console.log(error);

            toastr.error("Error creating the listing");
            Utils.unblock_ui("#add_listing_modal");
          }
        );
      }
    );
  },
};
