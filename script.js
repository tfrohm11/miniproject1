// global variables

// functions

// display data
function displayResults(results) {
    //clear previous results
    document.querySelector("#results").innerHTML = "";
    //for loop through each result
    results.forEach((result) => {
      //create card
      const cardDiv = document.createElement("div");
      const resultLink = document.createElement("a");
  
      //populate and style card
      cardDiv.classList.add("card", "p-3", "mb-3");
      const subjects = Array.isArray(result.subject) ? result.subject.toString() : "no subjects";
      const descriptions = Array.isArray(result.description) ? result.description.toString() : "no description";
      cardDiv.innerHTML = `<h2>${result.title}</h2> <div class="mb-3">Date: ${result.date}</div> <div class="mb-3">Subjects: ${subjects}</div> <div class="mb-3">Description: ${descriptions}</div>`;
  
      // populate and style link
      resultLink.innerHTML = "Read More";
      resultLink.classList.add("btn", "btn-dark");
      resultLink.setAttribute("href", result.url);
  
      //append link to card
      cardDiv.appendChild(resultLink);
  
      // append card to results
      document.querySelector("#results").appendChild(cardDiv);
    });
  }
  
  //function
  function displaySearchList(text, format) {
    const searchLink = document.createElement("a");
    searchLink.innerHTML = text;
    searchLink.setAttribute("href", `file:///C:/Users/meega/code/NU-CHI-VIRT-FSF-PT-11-2021-U-C/06-Server-Side-APIs/01-Activities/27-Stu_Mini-Project/index.html?text=${text}`);
    document.querySelector("#pastSearches").appendChild(searchLink);
  }
  
  // funciton will go get the cream filling (data)
  function handleResults(event) {
    event.preventDefault();
    //   grab search text from input
    const searchText = document.querySelector("#searchText").value;
    //   show searchtext in span
    document.querySelector("#keyword").innerHTML = searchText;
    //   grab format from dropdown
    const searchFormat = document.querySelector("#searchFormat").value;
    //create search history
  
    //   call function
    displaySearchList(searchText, searchFormat);
    //   create fetchUrl - if no searchFormat is selected, run a general search
    const fetchUrl = searchFormat === "" ? `https://www.loc.gov/search/?fo=json&q=${searchText}` : `https://www.loc.gov/${searchFormat}/?fo=json&q=${searchText}`;
    //fetch back tattoo
    fetch(fetchUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data.results);
        displayResults(data.results);
      });
  }
  
  function handleQueryFetch() {
    const fetchUrl = `https://www.loc.gov/search/?fo=json&q=${myParam}`;
    //fetch back tattoo
    fetch(fetchUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data.results);
        displayResults(data.results);
      });
  }
  
  // event listeners
  
  //submit button goes to handleResults
  document.querySelector("#searchForm").addEventListener("submit", handleResults);
  
  //check query string for text
