let pokemonRepository = (function () {
    let pokemonList = [
        {
            name: 'pikachu',
            height: 0.4,
            type: ['electric']
        },
        {
            name: 'charmander',
            height: 0.6,
            type: ['fire']
        },
        {
            name: 'bulbasaur',
            height: 0.7,
            type: ['grass', 'poison']
        },
        {
            name: 'pidgeot',
            height: 1.5,
            type: ['flying', 'normal']
        }
    ];

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
   
    return {
      add: function(pokemon) {
          if(typeof pokemon === Object){
            pokemonList.push(pokemon);
          } else {
              return;
          }
        
      },
      getAll: function() {
        return pokemonList;
      },
      // I can use this method to call a function in return or the above method in add to write function in return
      addListItem: addListItem,
    //   showDetails: showDetails
    };
  })();

  pokemonRepository.getAll().forEach (function (poke) {
    if(poke.height > 1 && poke.height < 1.6){
        document.write(`<p> ${poke.name} (height: ${poke.height}) - Wow that's so big </p>`)
    } else {
        document.write(`<p> ${poke.name} ${poke.height} </p>`);
    }
    pokemonRepository.addListItem(poke);
});

// for (let i=0; i < pokemonList.length; i++) {
//     if(pokemonList[i].height > 1 && pokemonList[i].height < 1.6){
//         document.write(`<p> ${pokemonList[i].name} (height: ${pokemonList[i].height}) - Wow that's so big </p>`)
//     } else {
//         document.write(`<p> ${pokemonList[i].name} ${pokemonList[i].height} </p>`);
//     }
// }

function calc(a,b) {
    if(b === 0){
        return "You are trying to divide by Zero";
    } else {
        let result = a / b;
        return result;
    }
}

console.log(calc(2,0));