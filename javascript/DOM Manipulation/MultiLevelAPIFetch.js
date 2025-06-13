async function  fetchcharactersDetails(characters){
    let charactersList = []
    const charactersdetails = await Promise.all(characters.map(link => fetch(link)))
    charactersdetails.forEach(async (character) => { 
        const data = await character.json();
        charactersList.push(data.name);
    })
    return charactersList;
}
async function fetchFilmsDetails(films){
    const filmsallCharacters = [];
    const filmsdetails = await Promise.all(films.map(link => fetch(link)))
    filmsdetails.forEach(async (film) => { 
        const data = await film.json()
        const charactersdetails = await fetchcharactersDetails(data?.characters);
        filmsallCharacters.push(charactersdetails);
    })
    return filmsallCharacters
}

async function getTheCharacters(actor) {
    const filmsdetails = await fetchFilmsDetails(actor.films);
    const resultsDIv = document.createElement("div");
    resultsDIv.className = "results";
    resultsDIv.innerHTML= `${JSON.stringify(filmsdetails)}`;
    const container = document.getElementById("main");
    if(container){
        const previosResultsDiv = document.querySelector("results");
        if(previosResultsDiv)
            previosResultsDiv.remove();
        container.appendChild(resultsDIv);
    }
}



function renderActorsList(actorsList){
    const select = document.createElement("select");
    select.id = "actorsSelect";
    const main = document.getElementById("main");
    
    // Add a default option
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select an actor";
    select.appendChild(defaultOption);
    
    actorsList.forEach(actor => {
        const option = document.createElement("option");
        option.value = actor.name;
        option.textContent = actor.name;
        select.appendChild(option);
    });
    
    // Add change event listener to the select element
    select.addEventListener('change', (event) => {
        const selectedActor = actorsList.find(actor => actor.name === event.target.value);
        if (selectedActor) {
            getTheCharacters(selectedActor);
        }
    });
    
    main.appendChild(select);
}

function renderError(){
    const errorContainer = document.getElementById("error");
    const errorDiv = document.createElement("div");
    errorDiv.innerHTML = `
        Something Went Wrong. Try again later
    `;
    if(errorContainer)
        errorContainer.appendChild(errorDiv);

}

async function fetchMoviesDetails(){
    const movieresponse = await fetch("https://swapi.py4e.com/api/people/")
    const reposneData = await movieresponse.json();
    if(movieresponse.ok){
        renderActorsList(reposneData.results)
    }else{
        renderError();
    }
}

document.addEventListener("DOMContentLoaded",()=>{
    fetchMoviesDetails()
})