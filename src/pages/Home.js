import React from 'react'
import Navigation from '../component/navigation/Navigation';
import Main from '../component/Main'
import Search from '../component/Home/Search'
import HomeUtils from '../utils/HomeUtils'
import PreviewPageTitleContainer from '../component/Home/PreviewPageTitleContainer';
import PreviewWrapper from '../component/Home/PreviewWrapper';
import QueryDoBuilder from '../component/Home/Do/QueryDoBuilder';
import QueryDo from '../component/Home/Do/QueryDo';
import PreviewPageDoBuilder from '../component/Home/Do/PreviewPageDoBuilder';
import HomeStateDoBuilder from '../component/Home/Do/HomeStateDoBuilder';

class Home extends React.Component {

    state = new HomeStateDoBuilder()
        .setQuery(
            new QueryDoBuilder()
                .setMode(QueryDo.queryMode.REVIEW)
                .setValue("")
                .build()
        )
        .setPages(
            [
                new PreviewPageDoBuilder()
                    .setPageTitle("trend")
                    .build(),
                new PreviewPageDoBuilder()
                    .setPageTitle("최신")
                    .build(),
            ]
        )
        .build();

    componentDidMount() {
        this.onload();
    }

    onload = () => {
        const pages = JSON.parse(localStorage.getItem("pages"));
        const newState = HomeUtils.load(this.state, pages);
        this.setState(newState);
    }

    handleChangeQuery = (e) => {
        this.setState({
            query : new QueryDoBuilder()
                    .setValue(e.target.value)
                    .setMode(this.state.query.mode)
                    .build()
        })
    }

    handleCreatePage = () => {
        const {query} = this.state;
        let newState = HomeUtils.createPage(this.state, query);
        this.setState(newState);

        localStorage.setItem("pages", JSON.stringify(newState.pages));
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.handleCreatePage();
        }
    }

    handleClickedPage = (pageTitle) => {
        const newState = HomeUtils.clickedPage(this.state, pageTitle);
        this.setState(newState);

        localStorage.setItem("pages", JSON.stringify(newState.pages));
    }

    handleRemovePage = async (pageTitle) => {
        const newState = HomeUtils.removePage(this.state, pageTitle);
        this.setState(newState);

        localStorage.setItem("pages", JSON.stringify(newState.pages));
    }

    render() {
        const { pages, query } = this.state;
        const {
            handleKeyPress,
            handleChangeQuery,
            handleClickedPage,
            handleRemovePage
        } = this;
        return (
            <Main>
                <Navigation />
                <Search
                    query={query}
                    onChangeQuery={handleChangeQuery}
                    onKeyPress={handleKeyPress}
                />
                <PreviewPageTitleContainer
                    pages={pages}
                    onClick={handleClickedPage}
                    onRemove={handleRemovePage}
                />
                <PreviewWrapper
                    pages={pages}
                />
            </Main>
        )
    }
}

export default Home;