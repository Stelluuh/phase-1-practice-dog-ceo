console.log('%c HI', 'color: firebrick')

/*------------------Elements assigned to variables---------------------*/
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
const ul = document.querySelector('#dog-breeds')
let breeds;

//-------------------------CHALLENGE 1----------------------------------
// Add JavaScript that:
//  A) on page load, fetches the images using the url above ⬆️
//  B) parses the response as JSON
//  C) adds image elements to the DOM for each 🤔 image in the array

fetch(imgUrl) // A)
.then(resp => resp.json())  // B)
.then(dogData => {
  appendImages(dogData.message)
})

function appendImages(dogImages) {
  
  dogImages.forEach(dogPicUrl => { //iterate through the different dog link images
    const img = document.createElement('img')
    img.src = dogPicUrl
    //take the images and add to the DOM:
    const dogImageContainer = document.getElementById('dog-image-container') // C)
    dogImageContainer.append(img)
  })
}

/*------------------------CHALLENGE 2---------------------------------*/
// After the first challenge is completed, add JavaScript that:

// A) on page load, fetches all the dog breeds using the url above ⬆️
// B) adds the breeds to the page in the <ul> provided in index.html

fetch(breedUrl)   // A)
.then(resp => resp.json())
.then(breedsData => {
  breeds = Object.keys(breedsData.message)
  console.log('breeds key: ', breeds)
  renderDogBreeds(breeds)
//breedData is an Object with key:value pairs
})

function renderDogBreeds(breeds){     // B)
  //Iterate through each line of breed in breedsData.message
  for(let breed of breeds){
    //create a list
    const li = document.createElement('li')
    //find a place to put the list of dog breeds
    //move dog breed to individual list
    li.textContent = breed
    // add breed to the <ul>
    ul.append(li) 
    
    /* ----------------------------CHALLENGE 3-------------------------*/
    // Once all of the breeds are rendered in the <ul>, add JavaScript so that, when the user clicks on any one of the <li>s, the font color of that <li> changes. This can be a color of your choosing. 
    li.addEventListener('click', e => {
      e.target.style.color = 'red';
    });
  }
}
 
/* ---------------------------CHALLENGE 4----------------------------*/

// Once we are able to load all of the dog breeds onto the page, add JavaScript so that the user can filter breeds that start with a particular letter using a dropdown. 
// For example, if the user selects 'a' in the dropdown, only show the breeds with names that start with the letter a. For simplicity, the dropdown only includes the letters a-d. However, we can imagine expanding this to include the entire alphabet.

//add event listener when you select the letter in drop down menu
const breedDropdown = document.getElementById('breed-dropdown');

breedDropdown.addEventListener('change', handleBreeds);

//Create function that first selects the letter, then grabs the breeds and filter through by their first character.
function handleBreeds(e) {
  let letter = e.target.value
  let filterBreeds = breeds.filter((breed) => {
    return breed[0] === letter;
  });
  console.log(filterBreeds)
  ul.innerHTML = "";
  renderDogBreeds(filterBreeds)
}
