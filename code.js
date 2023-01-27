let id = 0
let fix = false
let flip = true
let team = []
let effect = {}
let teamSize = 1
let editTeam = true
let opponent = {}

let colors = {
    normal: "rgb(186, 189, 174)",
    poison: "rgb(168, 94, 160)",
    psychic: "rgb(251, 101, 181)",
    grass: "rgb(139, 215, 82)",
    ground: "rgb(234, 205, 87)",
    ice: "rgb(150, 241, 254)",
    fire: "rgb(251, 85, 66)",
    rock: "rgb(198, 188, 107)",
    dragon: "rgb(138, 118, 255)",
    water: "rgb(87, 174, 255)",
    bug: "rgb(195, 210, 30)",
    dark: "rgb(141, 106, 86)",
    fighting: "rgb(167, 86, 70)",
    ghost: "rgb(121, 117, 214)",
    steel: "rgb(195, 196, 218)",
    flying: "rgb(121, 163, 253)",
    electric: "rgb(252, 229, 59)",
    fairy: "rgb(251, 174, 255)"
}

const winDiv = document.querySelector('.pokemon-objwin')
const pokeForm = document.querySelector('#pokeform')
const pokeInput = pokeForm.querySelector('input')
const numberInput = document.querySelector("#team-number")

fetch('https://pogoapi.net/api/v1/type_effectiveness.json')
.then(r => r.json())
.then(data => effect = data)

pokeForm.addEventListener("submit", event => {
    event.preventDefault()
    
    let poke = pokeInput.value.toLowerCase()
    pokeInput.readOnly = true

    fetch(`https://pokeapi.co/api/v2/pokemon/${poke}`)
    .then(response => response.json())
    .then(data => {
        let pokemon = {
            id: editTeam ? team.length + 1 : 7,
            name: capitalize(poke),
            imageF: data.sprites.front_default ? data.sprites.front_default : "https://i.imgflip.com/31q9zg.png",
            imageB: "",
            color: "",
            types: []
        }
        pokemon.imageB = data.sprites.back_default ? data.sprites.back_default : pokemon.imageF

        if (!editTeam && document.querySelector('.pokemon-objop')){
            document.querySelector('.pokemon-objop').remove()
        }

        const pokeDiv = document.createElement('div')

        const pokeName = document.createElement('p')
        pokeName.textContent = pokemon.name

        const pokePic = document.createElement('img')
        pokePic.className = "poke-img"
        pokePic.src = pokemon.imageF
        pokePic.alt = pokemon.name
        pokePic.addEventListener('mouseover', () => {
            pokePic.animate(
                [{transform: 'scale(1, 1)'},
                {transform: 'scale(1.5, 1.5)'}],
                {duration: 100,
                fill: "forwards"}
            )
            fix = true
            flipPoke(pokemon, pokePic)
        })
        pokePic.addEventListener('mouseout', () => {
            pokePic.animate(
                [{transform: 'scale(1.5, 1.5)'},
                {transform: 'scale(1, 1)'}],
                {duration: 100,
                fill: "forwards"}
            )
            fix = false
            flip = true
            pokePic.src = pokemon.imageF
            clearTimeout(id)
        })

        const pokeType = document.createElement('ul')

        let count = 0
        let color = [0, 0, 0]
        data.types.forEach(element => {
            let type = element.type.name
            pokemon.types.push(type)
            let pokeTypes = document.createElement('li')
            pokeTypes.textContent = capitalize(type)
            pokeTypes.style.color = colors[type]
            pokeType.appendChild(pokeTypes)
            count++
            let rgb = colors[type].substring(4, colors[type].length-1)
            .replace(/ /g, '')
            .split(',');
            for (let i = 0; i < color.length; i++){
                color[i] += parseInt(rgb[i])
            }
        })
        for (let i = 0; i < color.length; i++){
            color[i] /= count
        }
        pokemon.color = `rgb(${color.join(', ')})`
        pokeName.style.color = pokemon.color

        pokeInput.value = ''
        pokeInput.removeAttribute('readonly')
        pokeDiv.append(pokeName, pokePic, pokeType)

        if (editTeam){ //Edit Team
            pokeDiv.id = team.length + 1
            pokeDiv.className = 'pokemon-obj'

            const pokeRemove = document.createElement('button')
            pokeRemove.type = 'click'
            pokeRemove.className = 'remove-btn'
            pokeRemove.addEventListener('click', () => {
                team.splice(parseInt(pokeDiv.id.charAt(pokeDiv.id.length - 1)) - 1, 1)
                pokeDiv.remove()
                changeEdit(parseInt(numberInput.value))
                selectWinner()
            })
    
            team.push(pokemon)
            pokeDiv.append(pokeRemove)
            document.querySelector('#team-list').append(pokeDiv)
            changeEdit(teamSize)
        }else{ //Edit Opponent
            opponent = pokemon
            pokeDiv.className = 'pokemon-objop'
            document.querySelector('#opponent-mon').append(pokeDiv)
        }
        selectWinner()
    })
    .catch(() => {
        pokeInput.value = ''
        pokeInput.placeholder = "Not a Pokemon!"
        pokeInput.removeAttribute('readonly')
        pokeInput.style.borderColor = "red"
    })
})

numberInput.addEventListener('change', (e) => {
    let size = Math.min(Math.max(e.target.value, 1), 6)
    e.target.value = size
    if (team.length >= size){
        selectWinner()
        team = team.slice(0, size)
    }
    changeEdit(size)
})

pokeInput.addEventListener('click', () => {
    pokeInput.style.borderColor = "yellow"
    pokeInput.placeholder = "Type a pokemon name..."
})

numberInput.addEventListener("wheel", () => {})

function capitalize(str){
    return str.substring(0, 1).toUpperCase() + str.substring(1, str.length)
}

function changeEdit(size){
    teamSize = size
    updateTeam()
    editTeam = team.length == teamSize ? false : true
    document.querySelector('#select').textContent = editTeam ? "Select Team" : "Select Opponent"
}

function flipPoke(poke, pic){
    id = setTimeout(() => {
        if (!fix) {return}
        pic.src = flip ? poke.imageB : poke.imageF
        flip = flip ? false : true
        flipPoke(poke, pic)
    }, 1500)
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

function selectWinner(){
    if (team.length > 0 && document.querySelector('.pokemon-objop')){
        let lose = true
        let tie = 0
        team.forEach(poke => {
            if (!lose) {return}
            let player = 0
            let oppo = 0
            poke.types.forEach(e1 => {
                opponent.types.forEach(e2 => {
                    let test1 = effect[capitalize(e1)][capitalize(e2)]
                    let test2 = effect[capitalize(e2)][capitalize(e1)]
                    if (e1 != e2 && test1 != test2){
                        player += test1
                        oppo += test2
                    }
                })
            })
            if (player > oppo){
                lose = false
                winDiv.innerHTML = `
                    <p style="color:${poke.color}">${poke.name} Wins!</p>
                    <img src="${poke.imageF}" alt="${poke.name}">
                `
            }else if (player == oppo){
                tie++
            }
        })
        if (tie == team.length){
            winDiv.innerHTML = `
                <p>No Winning Type</p>
                <img src="https://static.wikia.nocookie.net/bec6f033-936d-48c5-9c1e-7fb7207e28af/scale-to-width/755" alt="No Winning Type">
            `
        }else if (lose){
            winDiv.innerHTML = `
                <p style="color:${opponent.color}">Opponent Wins</p>
                <img src="${opponent.imageF}" alt="${opponent.name}">
            `
        }
    }else{
        winDiv.innerHTML = `
            <p>No Winning Type</p>
            <img src="https://static.wikia.nocookie.net/bec6f033-936d-48c5-9c1e-7fb7207e28af/scale-to-width/755" alt="No Winning Type">
        `
    }
}