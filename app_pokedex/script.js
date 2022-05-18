var quantidade = document.getElementById('quantidade');
quantidade.addEventListener('keyup', ()=>{
    pegaPokemon(quantidade.value);
})

function pegaPokemon(quantidade) {
  fetch("https://pokeapi.co/api/v2/pokemon?limit="+quantidade)
    .then((response) => response.json())
    .then((allpokemon) => {
      console.log(allpokemon);

      var pokemons = [];

      allpokemon.results.map((val) => {
        fetch(val.url)
          .then((response) => response.json())
          .then((pokemonSingle) => {
            pokemons.push({
              nome: val.name,
              imagem: pokemonSingle.sprites.front_default,
            });

            if (pokemons.length == quantidade) {
              //Finalizamos nossa requisições.

              var pokemonBoxes = document.getElementById("pokemon-boxes");
              pokemonBoxes.innerHTML = "";

              pokemons.map(function (val) {
                pokemonBoxes.innerHTML += `
                    <div class="pokemon-box">
                        <img src="${val.imagem}" />
                        <p>${val.nome}</p>
                    </div>`;
              });//ideia: clicar no pokemon e aparecer as informacoes dele
            }
          });
      });
    });
}
