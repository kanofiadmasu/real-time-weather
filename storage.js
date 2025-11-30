
class StorageServices {
    constructor() {
        this.STORAGE_KEY = 'favourite_cities';
    }

    getFavorites() {
        const favorites = localStorage.getItem(this.STORAGE_KEY);
        const parsed = favorites ? JSON.parse(favorites) : [];
        return Array.isArray(parsed) ? parsed : [];
    }

    saveFavorite(city) {
        const favorites = this.getFavorites();

        if (!favorites.some(c => c.toLowerCase() === city.toLowerCase())) {
            favorites.push(city);
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
            return true;
        }
        return false;
    }

    removeFavorite(city) {
        let favorites = this.getFavorites();
        favorites = favorites.filter(c => c.toLowerCase() !== city.toLowerCase());
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
    }

    isFavorite(city) {
        const favorites = this.getFavorites();
        return (favorites.some(c => c.toLowerCase() === city.toLowerCase()));
    }
}

export default StorageServices;
