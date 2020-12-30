import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import React from 'react'
import './Search.css'

class Search extends React.Component {
    render() {

        const {onChangeQuery} = this.props;

        return (
            <div className="search_container">
                <FontAwesomeIcon className="search_img" icon={faSearch}/>
                <input className="query"   
                    type="text" 
                    title="검색어 입력" 
                    placeholder="검색어를 입력해 주세요."
                    onChange={onChangeQuery}
                />
        </div>
        );
    }
}


export default Search