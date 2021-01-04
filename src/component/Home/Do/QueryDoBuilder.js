import QueryDo from './QueryDo.js'

class QueryDoBuilder{

    constructor(){
        this.query = new QueryDo();
    }

    setQuery(query){
        this.query.query = query;
    }

    setMode(mode){
        this.query.mode = mode;
    }

}

export default QueryDoBuilder;