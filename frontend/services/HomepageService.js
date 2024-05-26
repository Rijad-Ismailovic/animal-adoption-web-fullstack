const HomepageService = {
  init: function () {
    $("body").removeClass("bg-dark").addClass("bg-light");
    $("footer").show();
    $("nav").show();

    this.loadAnimals();
  },

  loadAnimals: function () {
    RestClient.get("animals/all", function (data) {
      let $animalCardsRow = $("#animal-cards-row");
      console.log(data);
      data.forEach(function (animal) {
        HomepageService.createCard(animal).appendTo($animalCardsRow);
      });
    });
  },

//<img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="...">

  createCard: function (animal) {
    let imagePath =
      animal.image_path != "0"
        ? animal.image_path
        : "https://dummyimage.com/450x300/dee2e6/6c757d.jpg"; 
    let badgeColor = animal.gender === "male" ? "bg-blue" : "bg-pink";
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
            <div class="text-center">
              <div class="d-grid gap-2">
                <a class="btn btn-outline-dark mt-auto" href="?id=${animal.id}#itempage">View</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    return $(cardHtml);
  },
};
