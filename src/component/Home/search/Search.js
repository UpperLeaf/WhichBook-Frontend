import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import React from 'react'
import '../search/Search.css'

class Search extends React.Component {
    render() {
        return (
            <div class="search_container">
                <FontAwesomeIcon class="search_img" icon={faSearch}/>
                <input class="query" name="query" type="text" title="검색어 입력" maxlength="255" tabindex="1" accesskey="s" autocomplete="off" placeholder="검색어를 입력해 주세요." data-atcmp-element=""></input>
        </div>
        );
    }
}


export default Search