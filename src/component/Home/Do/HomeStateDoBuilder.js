import HomeState from './HomeStateDo.js'

class HomeStateDoBuilder{

    constructor(){
        this.homeState = new HomeState();
        return this;
    }

    setQuery(query){
        this.homeState.query = query;
        return this;
    }

    setPages(pages){
        this.homeState.pages = this.homeState.pages.concat(pages);
        return this;
    }

    build(){
        return this.homeState;
    }

    
}

export default HomeStateDoBuilder;