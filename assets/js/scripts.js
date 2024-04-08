    $(document).ready(function() {

        setTimeout(function() {
            handlePageConditions();
        }, 50);

        var buttonId;

        var activeAnimalObject;
        function handlePageConditions() {
            // Hide header and footer in login and registration
            if (window.location.hash === "#login" || window.location.hash === "#registration") {
                $('body').addClass('bg-dark');
                $("footer").hide();
                $("nav").hide();
            }

            // Homepage
            if (window.location.hash === "#homepage") {
                var $animalCardsContainer = $("#animal-cards-container");
                $.get("assets/json/animals.json", function(animals) {
                    var rowOpened = false;

                    animals.forEach(function(animal, index) {
                        if (index === 0 || index % 4 === 0) {
                            $animalCardsContainer.append('<div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">');
                            rowOpened = true;
                        }

                        var cardHtml = `
                        <div class="col mb-5">
                            <div class="card h-100">
                                <!-- Product image-->
                                <img class="card-img-top" src="${animal.imagePath}" alt="..." />
                                <!-- Product details-->
                                <div class="card-body p-3">
                                    <div class="text-center">
                                        <!-- Product name-->
                                        <h5 class="fw-bolder">${animal.listingName}</h5>
                                        <!-- Product additional info-->
                                        ${animal.breed}<br>
                                        ${animal.age} ${animal.ageUnit} / ${animal.weight} ${animal.weightUnit}
                                    </div>
                                </div>
                                <!-- Product actions-->
                                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                    <div id="${animal.id}" class="text-center"><a class="btn cardbtn-outline-dark mt-auto">View</a></div>
                                </div>
                            </div>
                        </div>
                        `;

                        $animalCardsContainer.find(".row:last-child").append(cardHtml);

                        if ((index + 1) % 4 === 0 || (index + 1) === animals.length) {
                            $animalCardsContainer.append('</div>');
                            rowOpened = false;
                        }
                    });

                    if (rowOpened) {
                        $animalCardsContainer.append('</div>');
                    }

                    $animalCardsContainer.on("click", ".btn", function() {
                        buttonId = $(this).parent().attr("id");
                        $.get("assets/json/animals.json", function(animals) {
                            activeAnimalObject = animals.find(function(animal) {
                                return animal.id == buttonId;
                            });
                            console.log("Homepage", activeAnimalObject)
                            localStorage.setItem('activeAnimalObject', JSON.stringify(activeAnimalObject));
                            window.location.hash = "#itemPage"
                        });
                    });
                });
            }

            // Item page
            if (window.location.hash === "#itemPage") {
                console.log("Item page:", activeAnimalObject);
                console.log(activeAnimalObject.name);

                if (typeof(Storage) !== "undefined") {
                    // Iterate over each item in local storage
                    for (var i = 0; i < localStorage.length; i++) {
                        // Retrieve the key for each item
                        var key = localStorage.key(i);
                        // Retrieve the item value using the key
                        var item = localStorage.getItem(key);
                        // Log the key and value to the console
                        console.log("Key:", key, "Value:", item);
                    }
                } else {
                    console.log("Local storage is not supported by your browser.");
                }
                
                 
            }

            // Login
            if(window.location.hash === "#login"){
                $('#loginButton').click(function(e){
                    e.preventDefault();
                    var usernameOrEmail = $('#usernameOrEmail').val();
                    var password = $('#password').val();
                    console.log(usernameOrEmail)
                    console.log(password)
                    var valid = false;
            
                    // Load user data from JSON file
                    $.getJSON('assets/json/users.json', function(data){
                        // Iterate over each user in the JSON data
                        $.each(data, function(index, user){
                            // Check if the input matches username/email and password
                            if((user.username === usernameOrEmail || user.email === usernameOrEmail) && user.password === password){
                                valid = true;
                                return false; 
                            }
                        });
                        if(valid){
                            console.log("valid")
                            localStorage.setItem('activeAnimalObject', JSON.stringify(activeAnimalObject));
                            window.location.hash = "#homepage"
                        } else {
                            console.log("invalid")
                        }
                    });
                });
            }

            // Registration
            if(window.location.hash === "#registration"){
                $("#registrationButton").click(function(){
                    $("#registrationForm").validate({
                        rules: {
                            username: {
                                required: true,
                                minlength: 3
                            },
                            email: {
                                required: true,
                                email: true
                            },
                            password: {
                                required: true,
                                minlength: 3
                            },
                            name: {
                                required: true
                            },
                            surname: {
                                required: true
                            },
                            gender: {
                                required: true
                            }
                        },
                        messages: {
                            username: {
                                required: "Please enter your a username.",
                                minlength: "Too short."
                            },
                            email: {
                                required: "Please enter a email address.",
                                email: "Please enter a valid email."
                            },
                            password: {
                                required: "Please enter a password.",
                                minlength: "Too short."
                            },
                            name: {
                                required: "Please enter your first name.",
                                minlength: "Too short."
                            },
                            surname: {
                                required: "Please enter your last name.",
                                minlength: "Too short."
                            }
                        },
                        submitHandler: function(form, event){
                            event.preventDefault();
                            let jsonResult = {};
                            $.each($(form).serializeArray(), function(){
                                jsonResult[this.name] = this.value;
                            });
                            console.log(JSON.stringify(jsonResult))
                            console.log("radi")
                        }
                    })
                })
            }

            if(window.location.hash === "#registration"){
                $("#registrationForm").validate({
                    rules: {
                        username: {
                            required: true,
                            minlength: 3
                        },
                        email: {
                            required: true,
                            email: true
                        },
                        password: {
                            required: true,
                            minlength: 3
                        },
                        name: {
                            required: true
                        },
                        surname: {
                            required: true
                        },
                        gender: {
                            required: true
                        }
                    },
                   messages: {
                            username: {
                                required: "Please enter your a username.",
                                minlength: "Too short."
                            },
                            email: {
                                required: "Please enter a email address.",
                                email: "Please enter a valid email."
                            },
                            password: {
                                required: "Please enter a password.",
                                minlength: "Too short."
                            },
                            name: {
                                required: "Please enter your first name.",
                                minlength: "Too short."
                            },
                            surname: {
                                required: "Please enter your last name.",
                                minlength: "Too short."
                            }
                        },
                    submitHandler: function(form, event){
                        event.preventDefault(); // Prevent default form submission
                        let jsonResult = {};
                        $.each($(form).serializeArray(), function(){
                            jsonResult[this.name] = this.value;
                        });
                        console.log(JSON.stringify(jsonResult));
                        console.log("radi");
                
                        // After validation, manually submit the form
                        form.submit();
                    }
                });
                
                // Move this outside of the click event handler
                $("#registrationButton").click(function(e){
                    $("#registrationForm").submit(); // Trigger form submission
                });
                
            }
        }

        $(window).on("hashchange", function() {
            console.log("page changed");
            handlePageConditions();
        });
    });
