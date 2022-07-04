import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.herokuapp.com/', {
            apiKey: '5c0a122110ee4e6095273a3a28574f62', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;