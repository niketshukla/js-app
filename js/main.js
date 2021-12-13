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

for (let i=0; i <= pokemonList.length; i++) {
    if(pokemonList[i].height > 1 && pokemonList[i].height < 1.6){
        document.write(`<p> ${pokemonList[i].name} (height: ${pokemonList[i].height}) - Wow that's so big </p>`)
    } else {
        document.write(`<p> ${pokemonList[i].name} ${pokemonList[i].height} </p>`);
    }
}

function calc(a,b) {
    if(b === 0){
        return "You are trying to divide by Zero";
    } else {
        let result = a / b;
        return result;
    }
}

console.log(calc(2,0));