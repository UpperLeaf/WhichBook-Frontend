import HomeState from './HomeStateDo.js'

class HomeStateDoBuilder {

    constructor() {
        this.homeState = new HomeState();
        return this;
    }

    query(query) {
        this.homeState.query = query;
        return this;
    }

    pages(pages) {
        this.homeState.pages = pages;
        return this;
    }

    build() {
        return this.homeState;
    }
    
}

export default HomeStateDoBuilder;