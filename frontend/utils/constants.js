var Constants = {
  get_api_base_url: function () {
    if (location.hostname == "localhost") {
      return "http://localhost/web-project/frontend/backend/";
    } else {    
      return "https://https://stingray-app-2eyro.ondigitalocean.app/backend/";
    }
  }
  //API_BASE_URL: "http://localhost/web-project/backend/",
};
