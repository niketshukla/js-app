let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=20';

    let add = (pokemon) => {
        // checking if the pokemon dayta is in object form or not
        if(typeof pokemon === 'object'){
            pokemonList.push(pokemon);
        } else {
            return;
         }
    }

    let getAll = () => {
        return pokemonList;
    }

    let addListItem = (p) => {
        let pokemon_list = document.querySelector('.pokemon_list');
        let listItem = document.createElement('li');
        let pokeBtn = document.createElement('button');
        pokeBtn.innerText = p.name;
        pokeBtn.classList.add('listBtn');
        listItem.appendChild(pokeBtn);
        pokemon_list.appendChild(listItem);

        pokeBtn.addEventListener('click', function(){
            showDetails(p);
        });
    }
    
    let showDetails = (s) => {
        console.log(s);
    }

    let loadList = () => {
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
        })
    }
   
    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList
    };
})();

console.log(pokemonRepository.getAll());

pokemonRepository.loadList().then(function() {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function(poke){
        pokemonRepository.addListItem(poke);
    });
});