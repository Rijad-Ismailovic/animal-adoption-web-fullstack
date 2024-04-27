const ProfileService = {
  init: function () {
    let desiredUserId = localStorage.getItem("userId");
        let userId = parseInt(desiredUserId);
    $.ajax({
      url: "assets/json/users.json",
      type: "GET",
      dataType: "json",
      success: function (data) {
        data.forEach(function (user, index) {
          if (index == userId) {
            $("#username").text(user.username);
            $("#name").text(user.name + " " + user.surname);
            $("#email").text(user.email);
          }
        });
      },
      error: function (xhr, status, error) {
        console.error("Error fetching data from file:", error);
      },
    });

   $.ajax({
     url: "assets/json/animals.json",
     type: "GET",
     dataType: "json",
     success: function (data) {
       let $animalCardsContainer = $("#animal-cards-container");

       data.forEach(function (animal, index) {
         if (animal.userId == userId) {
           console.log("radi");
           if (index % 4 === 0) {
             $animalCardsContainer.append(
               '<div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center"></div>'
             );
           }

           let cardHtml = ProfileService.createCard(animal);

           $animalCardsContainer.find(".row:last-child").append(cardHtml);

           if ((index + 1) % 4 === 0 || index + 1 === data.length) {
             // Closing the rows
             $animalCardsContainer.append("</div>");
           }
         }
       });
     },
     error: function (xhr, status, error) {
       console.error("Error fetching data from file:", error);
     },
   });
  },
  createCard: (animal) => {
    return (cardHtml = `
            <div class="col mb-5">
              <div class="card h-100">
                <img class="card-img-top" src="${animal.imagePath}" alt="..." />
                <div class="card-body p-3">
                  <div class="text-center">
                    <h5 class="fw-bolder">${animal.listingName}</h5>
                    ${animal.breed}<br>
                    ${animal.age} ${animal.ageUnit} / ${animal.weight} ${animal.weightUnit}
                  </div>
                </div>
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                  <div class="text-center"><a class="btn cardbtn-outline-dark mt-auto" href="?id=${animal.id}#itemPage">View</a></div>
                </div>
              </div>
            </div>
          `);
  },

  
};
