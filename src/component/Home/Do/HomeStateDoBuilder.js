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

    setOptions(options){
        this.homeState.options = this.homeState.options.concat(options);
        return this;
    }

    build(){
        return this.homeState;
    }

    
}

export default HomeStateDoBuilder;