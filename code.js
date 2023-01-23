// submit 6 Pokemon Characters if each character value is True 

let teamPokemonNumber = 3 //0 by default
const teamList = document.querySelector("#team-list")

test()
function test(){
    let num = 0
    while (num < teamPokemonNumber){
        fetch('https://example.com/profile', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => { //pokemon name url resolves
            num++
            /*
            logic for making html pokemon
            */
            console.log('Success:', data);
        })
        .catch((error) => { //pokemon name url fails
            console.error('Error:', error);
        });
    }
}