let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=2';

  let add = (pokemon) => {
      // checking if the pokemon data is in object form or not
      if(typeof pokemon === 'object'){
          pokemonList.push(pokemon);
      } else {
          return;
       }
  }

  let getAll = () => {
      console.log('three - getAll')
      return pokemonList;
  }

  let addListItem = (p) => {
      console.log("five - called addListItem");
      let pokemon_list = document.querySelector('.pokemon_list');
      let listItem = document.createElement('li');
      let pokeBtn = document.createElement('button');
      pokeBtn.innerText = p.name;
      pokeBtn.classList.add('listBtn');
      listItem.appendChild(pokeBtn);
      pokemon_list.appendChild(listItem);

      pokeBtn.addEventListener('click', function(){
          console.log("clicked");
          showDetails(p);
      });
  }

  let loadList = () => {
      console.log("one - Called loadList");
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
      let url = item.detailsUrl;
      // console.log(item);
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      }).catch(function (e) {
        console.error(e);
      });
  }

  let showDetails = (item) => {
      console.log("show");
      pokemonRepository.loadDetails(item).then(function(){
          console.log(item);
      });
  }
 
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  //   showDetails: showDetails
  };
})();

// console.log(pokemonRepository.getAll());

pokemonRepository.loadList().then(function() {
  console.log("two - inside loadList");
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(poke){
      console.log('four - inside getAll');
      pokemonRepository.addListItem(poke);
  });
});


