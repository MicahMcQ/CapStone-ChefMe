var app = angular.module("awesomeapp", []);

app.controller("listController", listController);

listController.$inject = ['$http'];

function listController ($http) {
  // view model
  var vm = this;
  vm.recipes = []
  vm.search = function () {
    var loader = document.getElementsByClassName("loader-container")[0];
    loader.style.display = "flex";
    var input = document.getElementById("search").value;

    $http({
      url: "http://localhost:9000/recipes",
      method: "GET",
    }).then(function successCallback(response) {
      console.log(response.data);
      vm.recipes = response.data;
        loader.style.display = "none";
    },
     function errorCallback() {
      document.getElementById("msg-top").innerHTML = "<h2>Request failed. Please check your Internet connection and try again.</h2>";
    });
  }
}