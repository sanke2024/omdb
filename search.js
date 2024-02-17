let searchAutoPopulate = (() => {
    var searchInput;
    var suggestions;

    /**
    *it fetches movie details based on query, max 10
    *
    * @param {string} query
    * @returns {Promise<Array>}
    */
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

    /**
    *renders/append links to suggestions div
    *
    * @param {Array} element 
    */
    let renderSuggestions = (element) => {
        try {
            if (element.Title.length > 45) {
                var newTitle = element.Title.substring(0, 45) + "...";
            }
            suggestions.style.display = "block";
            let item = document.createElement("a");
            item.innerHTML = `<a href="./movie.html?id=${element.imdbID}" class="suggestionsLink">${newTitle ? newTitle : element.Title}</a>`;
            suggestions.append(item);
        } catch (error) {
            console.log(error);
        }
    }

    /**
    *loops through array of movielist(data) then call rendersuggestions on each
    * 
    * @param {Array} data
    */
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

    /**
    *fetches movielist on certain event
    *
    * @param {event} e
    */
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

    /**
    *handles event click outside the inputSearch
    *
    * @param {event} event
    */
    let handleOutsideClick = (event) => {
        // debugger
        if (!suggestions.contains(event.target) && !(searchInput.contains(event.target))) {
            suggestions.style.display = "none";
        }
    }

    /**
    *initilizes the module
    *
    * @param {string} txtInputId
    * @param {string} suggestionDivId
    */
    let initialize = (txtInputId, suggestionDivId) => {
        searchInput = document.getElementById(`${txtInputId}`);
        suggestions = document.getElementById(`${suggestionDivId}`);
        searchInput.addEventListener("click", handleInput);
        searchInput.addEventListener("keyup", handleInput);
        document.addEventListener("click", handleOutsideClick);
    }
    return {
        initialize: initialize,
        fetchMovieList: fetchMovieList
    }
})();

