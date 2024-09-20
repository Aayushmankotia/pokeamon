// Main function 
function checked() {
    const btn = document.getElementById("search-button");
    const input = document.getElementById("search-input");
    let pokeName = document.getElementById("pokemon-name");
    let pokeid = document.getElementById("pokemon-id");
    let pokeWeight = document.getElementById("weight");
    let pokeHeight = document.getElementById("height");
    let pokeHp = document.getElementById("hp");
    let pokeAttack = document.getElementById("attack");
    let pokedefense = document.getElementById("defense");
    let pokeSpecialAttack = document.getElementById("special-attack");
    let pokeSpecialDefence = document.getElementById("special-defense");
    let pokeSpeed = document.getElementById("speed");
    let type = document.getElementById("types");
    let imagePokemon = document.getElementById("imagePokemon");
    let text = input.value;

    // Disable the button immediately after click
    btn.disabled = true;

    // Remove previously created img element and div elements
    const prevImg = document.getElementById("sprite");
    if (prevImg) {
        prevImg.remove();
    }
    type.innerHTML = ""; 
    // Remove previously appended div elements


    if (text) {
        let lowerText = text.toLowerCase();
        // API called with pokemon name
        let apiPokeData = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/" + lowerText;

        fetch(apiPokeData)
            .then(response => {
                if (!response.ok) {
                    alert("Pokémon not found");
                }
                return response.json();
            })
            .then(data => {
                let pokeImg = document.createElement('img');
                pokeImg.id = "sprite";
                pokeImg.src = data.sprites.front_default;
                // Apppend child in imagePokemon
                imagePokemon.appendChild(pokeImg);

                let name = data.name;

                // Add pokemon info in different containers
                pokeName.innerHTML = name.toUpperCase();
                pokeid.innerHTML = data.id;
                pokeWeight.innerHTML = data.weight;
                pokeHeight.innerHTML = data.height;
                pokeHp.innerHTML = data.stats[0].base_stat;
                pokeAttack.innerHTML = data.stats[1].base_stat;
                pokedefense.innerHTML = data.stats[2].base_stat;
                pokeSpecialAttack.innerHTML = data.stats[3].base_stat;
                pokeSpecialDefence.innerHTML = data.stats[4].base_stat;
                pokeSpeed.innerHTML = data.stats[5].base_stat;

                let slotLength = Object.keys(data.types).length;

                for (let i = 0; i <= slotLength - 1; i++) {
                    let pokediv = document.createElement('div');
                    pokediv.id = "slot" + i;
                    let poketext = data.types[i].type.name;
                    pokediv.textContent = poketext.toUpperCase();
                    type.appendChild(pokediv);
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            })
            .finally(() => {
                // Re-enable the button after the fetch operation is complete
                btn.disabled = false;
            });
    } else {
        pokeName.innerHTML = "";
        pokeid.innerHTML = "";
        pokeWeight.innerHTML = "";
        pokeHeight.innerHTML = "";
        pokeHp.innerHTML = "";
        pokeAttack.innerHTML = "";
        pokedefense.innerHTML = "";
        pokeSpecialAttack.innerHTML = "";
        pokeSpecialDefence.innerHTML = "";
        pokeSpeed.innerHTML = "";
        // If no text is entered, re-enable the button immediately
        btn.disabled = false;
    }
}
