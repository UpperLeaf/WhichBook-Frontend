import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import QueryDo from "./Do/QueryDo"
import React from 'react'
import './Search.css'

class Search extends React.Component {
    render() {

        const {onKeyPress, onChangeQuery} = this.props;
        const query = new QueryDo(this.props.query);
        return (
            <div className="search_container">
                <FontAwesomeIcon className="search_img" icon={faSearch}/>
                <input className="query"   
                    value={query.query}
                    type="text" 
                    title="검색어 입력" 
                    placeholder="검색어를 입력해 주세요."
                    onKeyPress={onKeyPress}
                    onChange={onChangeQuery}
                />
        </div>
        );
    }
}


export default Search