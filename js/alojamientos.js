// var current;
// var collections = {};
// var housed = {};
// var hotel;

// var github;
// var token;

// var apiKey = "AIzaSyBSnpUqQ4eZDVP5cXey_HtY7U8G-fTcJac";

// $(function() {
//   $("#tabs").tabs({disabled: [1, 2]});
// });

// function handleClientLoad() {
//   gapi.client.setApiKey(apiKey);
// }

// function getToken() {
//   token = $("#inputToken").val();
//   github = new Github({
//     token: token,
//     auth: "oauth"
//   });
// };

// function showRepo(error, repo) {
//   if (error) {
//     alert("Error with input data. Code: " + error.error);
//   } else {
//     $("#inputToken").hide();
//   }
// };

// function getRepo() {
//   var user = $("#inputUser").val();
//   var reponame = $("#inputRepo").val();
//   var repo = github.getRepo(user, reponame);
//   repo.show(showRepo);
//   return repo;
// };

// function writeFile(repo, name, json) {
//   repo.write("gh-pages", name, json, 'save data', function(err) {});
// }

// function readFileC(repo, name) {
//   repo.read("gh-pages", name, function(err, data) {
//     if (err) {
//       alert(err);
//     } else {
//       console.log(name + ": " + data)
//       collections = JSON.parse(data);
//       console.log(collections);
//     }
//   });
// }

// function readFileH(repo, name) {
//   repo.read("gh-pages", name, function(err, data) {
//     if (err) {
//       alert(err);
//     } else {
//       console.log(name + ": " + data)
//       housed = JSON.parse(data);
//       console.log(housed);
//     }
//   });
// }

// function saveData() {
//   if (!token) {
//     getToken();
//   }
//   var repo = getRepo();
//   if (collections) {
//     var jcollections = JSON.stringify(collections);
//     writeFile(repo, "collections.json", jcollections);
//   }
//   if (housed) {
//     var jhoused = JSON.stringify(housed);
//     writeFile(repo, "housed.json", jhoused);
//   }
// }

// function loadData() {
//   if (!token) {
//     getToken();
//   }
//   var repo = getRepo();
//   readFileC(repo, "collections.json");
//   readFileH(repo, "housed.json");
// }

// function addUser(userInfo) {
//   var element = document.createElement("li");
//   element.innerHTML = '<img src="' + userInfo.image + '">' + userInfo.name;
//   $(".housedList").append(element);
// }

// function getHousedList() {
//   $("#hostList").html('<ul class="hotel housedList"></ul>');
//   for (var i = 0; i < housed[hotel].length; i++) {
//     addUser(housed[hotel][i]);
//   }
// }

// function makeApiCall(id) {
//   console.log("makeApiCall");
//   gapi.client.load('plus', 'v1', function() {
//     var request = gapi.client.plus.people.get({
//       'userId': id,
//     });
//     console.log("pre execute");
//     request.execute(function(resp) {
//       console.log("execute");
//       if (resp) {
//         var userInfo = {
//           id: resp.id,
//           name: resp.displayName,
//           image: resp.image.url,
//         };
//         for (var i = 0; i < housed[hotel].length; i++) {
//           if (housed[hotel][i].name == userInfo.name) {
//             console.log("encontrada");
//             return;
//           }
//         }
//         console.log("eh");
//         housed[hotel].push(userInfo); 
//         addUser(userInfo);
//       } else {
//         alert("The id is incorrect");
//       }
//     });
//   });
// }

// function accomodateUser() {
//   console.log("oye");
//   var id = $("#inputHost").val();
//   $("#inputHost").val("");
//   makeApiCall(id);
// }

// function showCollection() {
//   if (current) {
//     current.toggleClass("blue");
//   }
//   current = $(this);
//   current.toggleClass("blue");
//   var name = current.html();
//   var list = '<ul class="hotel currentList">';
//   for (var i = 0; i < collections[name].length; i++) {
//     list = list + '<li class="hotelCollection">' + collections[name][i] + '</li>';
//   }
//   list = list + '</ul>';
//   $("#currentCollection").html("Current Collection: " + name + list);
//   $("#collection").html("Hotels in: " + name + list);
//   $(function() {
//     $("#currentCollection ul").droppable({
//       drop: function (event, ui) {
//         if (collections[name].indexOf(ui.draggable.text()) == -1) {
//           collections[name].push(ui.draggable.text());
//           var element = document.createElement("li");
//           element.className = "hotelCollection";
//           element.innerHTML = ui.draggable.text();
//           $(".currentList").append(element);
//           $(this).find(".placeholder").remove();
//         }
//       }
//     });
//   });
// }

// function createCollection() {
//   var name = $("#inputName").val();
//   if (name) {
//     if ($("#createdCollections li." + name).length == 0) {
//       $("#createdCollections").append('<li class="collection ' + name + '">' + name + '</li>');
//       $("li." + name).click(showCollection);
//       collections[name] = [];
//     } 
//   }
// }

// function onPopupOpenFactory(hotel) {
//   return function(){
//     var tempMarker = this;
//     $(".marker-delete-button:visible").click(function () {
//       hotel.toggleClass("green");
//       map.removeLayer(tempMarker);
//     });
//   }  
// }

// function makeCarousel(arr) {
//   $(".carousel-indicators").html("");
//   $(".carousel-inner").html("");
//   $(".glyphicon").show();
//   for (var i = 0; i < arr.length; i++) {
//     $(".carousel-inner").append('<div class="item"><img src="' + arr[i].url + '"><div class="carousel-caption"></div></div>');
//     $(".carousel-indicators").append('<li data-target="#carousel-example-generic" data-slide-to="' + i + '"></li>');
//   }
//   $(".item").first().addClass("active");
//   $(".carousel-indicators > li").first().addClass("active");
//   $("#carousel-example-generic").carousel();
// }

// function showAccomodation() {
//   $("#tabs").tabs("enable", 2);
//   var accomodation = accomodations[$(this).attr("no")];
//   $(this).toggleClass("green");
//   if ($(this).hasClass("green")) {
//     var lat = accomodation.geoData.latitude;
//     var lon = accomodation.geoData.longitude;
//     var url = accomodation.basicData.web;
//     var name = accomodation.basicData.name;
//     var desc = accomodation.basicData.body;
//     makeCarousel(accomodation.multimedia.media);
//     var cat = accomodation.extradata.categorias.categoria.item[1]['#text'];
//     var subcat = accomodation.extradata.categorias.categoria
//      .subcategorias.subcategoria.item[1]["#text"];
//     marker = L.marker([lat, lon]).addTo(map)
//      .bindPopup('<a href="' + url + '">' + name + '</a><br/><input type="button" value="Delete this marker" class="marker-delete-button"/>');
//     marker.on("popupopen", onPopupOpenFactory($(this)));
//     marker.openPopup();
//     map.setView([lat, lon], 15);
//     $(".info").html('<h2>' + name + '</h2>'
//      + '<p>Type: ' + cat + ', subtype: ' + subcat + '</p>'
//      + desc);
//     hotel = name;
//     getHousedList();
//   } else {
//     map.removeLayer(marker);
//   }
// };

// function get_accomodations() {
//   $.getJSON("alojamientos.json", function(data) {
//     $("#get").hide();
//     $("#tabs").tabs("enable", 1);
//     $("#collection").prop("hidden", false);
//     accomodations = data.serviceList.service;
//     $("#result").html("Accomodations found: " + accomodations.length
//      + " (click on any of them for details and location in the map)");
//     var list = '<ul class="hotel">';
//     for (var i = 0; i < accomodations.length; i++) {
//       housed[accomodations[i].basicData.title] = [];
//       list = list + '<li class="hotel" no=' + i + '>' + accomodations[i].basicData.title + '</li>';
//     }
//     list = list + '</ul>';
//     $(".list").html(list);
//     $("#generalList li").click(showAccomodation);
//     $(function() {
//       $("#collectionList li").draggable({
//         helper: "clone",
//       });
//     });

//   });
// };

// $(document).ready(function() {
//   map = L.map("map").setView([40.4175, -3.708], 11);
//   L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
//     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//   }).addTo(map);
//   $("#get").click(get_accomodations);
//   $("#create").click(createCollection);
//   $("#host").click(accomodateUser);
//   $("#save").click(saveData);
//   $("#load").click(loadData);
// });