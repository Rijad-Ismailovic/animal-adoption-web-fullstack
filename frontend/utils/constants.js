var Constants = {
  get_api_base_url: function () {
    if (location.hostname == "localhost") {
      return "http://localhost/web-project/frontend/backend/";
    } else {    
      return "https://coral-app-pxup9.ondigitalocean.app/backend/";
    }
  }
  //API_BASE_URL: "http://localhost/web-project/backend/",
};
