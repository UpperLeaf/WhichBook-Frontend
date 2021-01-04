import QueryDo from './QueryDo.js'

class QueryDoBuilder{

    constructor(){
        this.query = new QueryDo();
    }

    setQuery(query){
        this.query.query = query;
        return this;
    }

    setMode(mode){
        this.query.mode = mode;
        return this;
    }

    build(){
        return this.query;
    }

}

export default QueryDoBuilder;