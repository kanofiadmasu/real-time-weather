
import StorageServices from "./storage.js"

const storageService = new StorageServices;

const favoritesContainer = document.getElementById('fav-container');

function createCityElement(cityName) {
    
    const cityPiece = document.createElement('div');
    cityPiece.classList.add('fav-city-piece')

    const cityText = document.createElement('p');
    cityText.textContent = cityName;
    cityText.classList.add('fav-city-text');

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.textContent = 'Remove';
    removeBtn.id = 'remove-fav-city'

    removeBtn.addEventListener('click', () => {
        storageService.removeFavorite(cityName);
        renderFavorites();
    })

    cityPiece.appendChild(cityText);
    cityPiece.appendChild(removeBtn);

    return cityPiece;
}

export function renderFavorites() {
    favoritesContainer.innerHTML = '';

    const cities = storageService.getFavorites();

    cities.forEach(city => {
        const cityElement = createCityElement(city);

        favoritesContainer.appendChild(cityElement);
    });
}






