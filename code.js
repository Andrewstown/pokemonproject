let team = []
let teamSize = 1
let editTeam = true
let opponent = {}

const numberInput = document.querySelector("#team-number")
const pokeForm = document.querySelector('#pokeform')
const pokeInput = pokeForm.querySelector('input')
const pokeSelect = document.querySelector('#select')

numberInput.addEventListener("wheel", (event) => {
    let scrollIndx = 0
    const y = event.deltaY;
    if (y > 0) {
        scrollIndx++;
    } else {
        scrollIndx--;

    }
})

pokeForm.addEventListener("submit", event => {
    event.preventDefault()
    
    let poke = pokeInput.value.toLowerCase()
    pokeInput.setAttribute('readonly', true)

    fetch(`https://pokeapi.co/api/v2/pokemon/${poke}`)
    .then(response => response.json())
    .then(data => {
        let pokemon = {
            id: editTeam ? team.length + 1 : 7,
            name: capitalize(poke),
            image: data.sprites.front_default,
            types: []
        }

        if (!editTeam && document.querySelector('.pokemon-objop')){
            document.querySelector('.pokemon-objop').remove()
        }

        const pokeDiv = document.createElement('div')

        const pokeName = document.createElement('p')
        pokeName.textContent = pokemon.name

        const pokePic = document.createElement('img')
        pokePic.setAttribute('src', `${pokemon.image ? pokemon.image : "https://static.wikia.nocookie.net/pokemon/images/e/e3/No_Image.png/revision/latest?cb=20211113135653"}`)
        pokePic.setAttribute('alt', pokemon.name)

        const pokeType = document.createElement('ul')

        data.types.forEach(element => {
            let type = element.type.name
            pokemon.types.push(type)
            let pokeTypes = document.createElement('li')
            pokeTypes.textContent = capitalize(type)
            pokeType.appendChild(pokeTypes)
        })

        pokeInput.value = ''
        pokeInput.removeAttribute('readonly')
        pokeDiv.append(pokeName, pokePic, pokeType)

        if (editTeam){ //Edit Team
            pokeDiv.setAttribute('id', `${team.length + 1}`)
            pokeDiv.setAttribute('class', 'pokemon-obj')

            const pokeRemove = document.createElement('button')
            pokeRemove.setAttribute('type', 'click')
            pokeRemove.textContent = "Remove"
            pokeRemove.addEventListener('click', () => {
                team.splice(parseInt(pokeDiv.id.charAt(pokeDiv.id.length - 1)) - 1, 1)
                pokeDiv.remove()
                changeEdit(parseInt(document.querySelector("input#team-number").value))
            })
    
            team.push(pokemon)
            pokeDiv.append(pokeRemove)
            document.querySelector('#team-list').append(pokeDiv)
            changeEdit(teamSize)
        }else{ //Edit Opponent
            opponent = pokemon
            pokeDiv.setAttribute('class', 'pokemon-objop')
            document.querySelector('#opponent-mon').append(pokeDiv)
        }
    })
    .catch(() => {
        pokeInput.value = ''
        pokeInput.placeholder = "Not a Pokemon!"
        pokeInput.removeAttribute('readonly')
        pokeInput.style.borderColor = "red"
    })
});

document.querySelector("input#team-number").addEventListener('change', (e) => {
    let size = Math.min(Math.max(e.target.value, 1), 6);
    e.target.value = size
    if (team.length >= size){
        team = team.slice(0, size)
    }
    changeEdit(size)
})

function capitalize(str){
    return str.substring(0, 1).toUpperCase() + str.substring(1, str.length)
}

pokeInput.addEventListener('click', () => {
    pokeInput.style.borderColor = "yellow"
    pokeInput.placeholder = "Type a pokemon name..."
})

function changeEdit(size){
    teamSize = size
    updateTeam()
    editTeam = team.length == teamSize ? false : true
    pokeSelect.textContent = editTeam ? "Select Team" : "Select Opponent"
}

function updateTeam(){
    let pokeTeam = document.querySelectorAll(".pokemon-obj")
    for (let i = 0; i < pokeTeam.length; i++){
        let poke = pokeTeam[i]
        if (i + 1 > teamSize){
            poke.remove()
        }else{
            poke.id = poke.id.substring(0, poke.id.length - 1) + (i + 1)
            team[i].id = i + 1
        }
    }
}