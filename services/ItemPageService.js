const ItemPageService = {
  init: function () {
    let url = window.location.href;
    let urlObj = new URL(url);
    let id = urlObj.searchParams.get("id");

    $.ajax({
      url: "assets/json/animals.json",
      type: "GET",
      dataType: "json",
      success: function (data) {
        let animal = ItemPageService.findAnimalById(data, id);
        $("#picture").attr("src", animal.imagePath);
        $("#listingName").text(animal.listingName);
        $("#username").text(animal.user);
        $("#name").text(animal.name);
        $("#breed").text(animal.breed);
        $("#age").text(animal.age);
        $("#weight").text(animal.weight);
        $("#location").text(animal.location);
        console.log(animal.vaccinated);
        $("#vaccinated").text(animal.vaccinated ? "Da" : "Ne");
        $("#chipped").text(animal.chipped ? "Da" : "Ne");
        $("#additionalDetails").text(animal.additionalDetails);
      },
      error: function (xhr, status, error) {
        console.error("Error fetching data from file:", error);
      },
    });
  },

  findAnimalById: (data, id) => {
    for (var i = 0; i < data.length; i++) {
      if (data[i].id == id) {
        return data[i];
      }
    }
    return null;
  },
};
