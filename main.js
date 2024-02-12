let searchInput = document.getElementById("txtSearch");
let suggestions = document.getElementById("suggestions");
let fetchMovieList = (query) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await fetch(`http://www.omdbapi.com/?apikey=2fa95963&s=${query}`);
            let data = await response.json();
            if (data.Response == "False") {
                reject(data.Error);
            }
            resolve(data.Search);
        }
        catch (e) {
            console.log(e);
        }
    })
}
let renderSuggestions = (element) => {
    try {
        if(element.Title.length>45){
            var newTitle=element.Title.substring(0,45)+"...";
        }
        suggestions.style.display = "block";
        let item = document.createElement("a");
        item.innerHTML = `<a href="" class="suggestionsLink">${newTitle ? newTitle : element.Title}</a>`;
        suggestions.append(item);
    } catch (error) {
        console.log(error);
    }

}
let populateSuggestions = (data) => {
    try {
        if (data.length > 0) {
            suggestions.innerHTML = "";
            data.forEach(element => {
                renderSuggestions(element);
            });
        }
    } catch (e) {
        console.log(e);
    }

}
let handleInput = async (e) => {
    try {
        let query = searchInput.value;
        if (query.length < 3) {
            suggestions.style.display = "none";
        }
        if (query.length > 2) {
            // debugger
            try {
                let data = await fetchMovieList(query);
                populateSuggestions(data);
            } catch (error) {
                // console.log(error)
            }
        }
    } catch (e) {
        console.log(e);
    }

}
let handleOutsideClick=(event)=>{
    // debugger
    if(!suggestions.contains(event.target) && !(searchInput.contains(event.target))){
        suggestions.style.display="none";
    }
}
searchInput.addEventListener("click", handleInput);
searchInput.addEventListener("keyup", handleInput);
document.addEventListener("click",handleOutsideClick);
