const ItempageService = {
  init: function () {
    let url = window.location.href;
    let urlObj = new URL(url);
    let id = urlObj.searchParams.get("id");

    this.loadAnimalData(id);
  },

  loadAnimalData: function (id) {
    RestClient.get("animals/id/" + id, function (animal) {
      let imagePath =
        animal.image_path != "0"
          ? animal.image_path
          : "https://dummyimage.com/600x700/dee2e6/6c757d.jpg"; 
      
      $("#image").attr("src", imagePath);
      $("#listing_name").text(animal.listing_title);
      $("#username").text(animal.username);
      $("#name").text(animal.name);
      $("#breed").text(animal.breed);
      $("#age").text(animal.age + " years");
      $("#weight").text(animal.weight + " kg");
      $("#location").text(animal.location);
      $("#vaccinated").text(animal.vaccinated ? "Da" : "Ne");
      $("#chipped").text(animal.chipped ? "Da" : "Ne");
      $("#additional_info").text(animal.additional_info);

      ItempageService.loadSimillarArticles(animal);
    });
  },

  loadSimillarArticles: function (activeAnimal) {
    RestClient.get("animals/all", function (data) {
      let $animalCardsRow = $("#animal-cards-row");
      let $simillarArticlesRow = $("#simillar_articles_row");
      let count = 0; // Counter for similar articles
      data.forEach(function (animal, index) {
        if (animal.type === activeAnimal.type && count < 4 && animal.id != activeAnimal.id) {
          // Check count before appending
          ItempageService.createCard(animal).appendTo($simillarArticlesRow);
          count++; // Increment count for each similar article appended
        }
      });
    });
  },

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
