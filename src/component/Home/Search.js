import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBook } from "@fortawesome/free-solid-svg-icons";
import QueryDo from "./Do/QueryDo"
import React from 'react'
import './Search.css'

class Search extends React.Component {
    render() {

        const { onChangeMode, onKeyPress, onChangeQuery } = this.props;
        const query = new QueryDo(this.props.query);
        return (
            <div className="search_container">
                <div className="img_container">
                    <FontAwesomeIcon className="img search" icon={faSearch} />
                    <FontAwesomeIcon
                        onClick={onChangeMode}
                        className={`img book ${query.mode === QueryDo.queryMode.BOOK && 'active'}`} icon={faBook} />
                </div>
                <input className="query"
                    value={query.value}
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