import QueryDo from './QueryDo.js'

class QueryDoBuilder{

    constructor(){
        this.query = new QueryDo();
    }

    setValue(value){
        this.query.value = value;
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