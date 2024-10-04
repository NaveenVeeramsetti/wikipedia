let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResult(result) {
  let { title, link, description } = result;

  let resultItemEl = document.createElement("div");
  resultItemEl.classList.add("result-item");
  searchResultsEl.appendChild(resultItemEl);

  let resultTitleEl = document.createElement("a");
  resultTitleEl.classList.add("result-title");
  resultTitleEl.textContent = title;
  resultTitleEl.href = link;
  resultTitleEl.target = "_blank";
  resultItemEl.appendChild(resultTitleEl);

  let titleBreakeEl = document.createElement("br");
  resultItemEl.appendChild(titleBreakeEl);

  let urlEl = document.createElement("a");
  urlEl.classList.add("result-url");
  urlEl.href = link;
  urlEl.textContent = link;
  urlEl.target = "_blank";
  resultItemEl.appendChild(urlEl);

  let lineBrakeEl = document.createElement("br");
  resultItemEl.appendChild(lineBrakeEl);

  let descriptionEl = document.createElement("p");
  descriptionEl.classList.add("line-description");
  descriptionEl.textContent = description;
  resultItemEl.appendChild(descriptionEl);
}

function displyResults(searchResult) {
  spinnerEl.classList.toggle("d-none");
  for (let result of searchResult) {
    createAndAppendSearchResult(result);
  }
}

function searchWikipedia(event) {
  if (event.key === "Enter") {
    searchResultsEl.textContent = "";
    spinnerEl.classList.toggle("d-none");
    let searchInputValue = searchInputEl.value;
    let url = "https://apis.ccbp.in/wiki-search?search=" + searchInputValue;
    let option = {
      method: "GET",
    };
    fetch(url, option)
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonData) {
        let { search_results } = jsonData;
        displyResults(search_results);
      });
  }
}

searchInputEl.addEventListener("keydown", searchWikipedia);
