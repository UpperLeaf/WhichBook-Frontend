import React from 'react'
import Navigation from '../component/navigation/Navigation';
import Main from '../component/Main'
import Search from '../component/Home/Search'
import HomeUtils from '../utils/HomeUtils'
import PreviewPageTitleContainer from '../component/Home/PreviewPageTitleContainer';
import PreviewWrapper from '../component/Home/PreviewWrapper';
import QueryDoBuilder from '../component/Home/Do/QueryDoBuilder';
import PageType from '../component/Home/Do/PageType'
import PreviewPageDoBuilder from '../component/Home/Do/PreviewPageDoBuilder';
import HomeStateDoBuilder from '../component/Home/Do/HomeStateDoBuilder';

class Home extends React.Component {

    state = new HomeStateDoBuilder()
        .setQuery(
            new QueryDoBuilder()
                .setType(PageType.REVIEW)
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

    onload = async () => {
        const pages = JSON.parse(localStorage.getItem("pages"));
        const newState = await HomeUtils.load(this.state, pages);
        this.setState(newState);
    }

    handleChangeQuery = (e) => {
        this.setState({
            query: new QueryDoBuilder()
                .setValue(e.target.value)
                .setType(this.state.query.type)
                .build()
        })
    }

    handleChangeMode = () => {
        const newState = HomeUtils.changeMode(this.state);
        this.setState(newState);

        localStorage.setItem("query", JSON.stringify(newState.query));
    }

    handleCreatePage = async () => {
        const { query } = this.state;
        let newState = await HomeUtils.createPage(this.state, query);
        this.setState(newState);

        localStorage.setItem("pages", JSON.stringify(newState.pages));
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.handleCreatePage();
        }
    }

    handleClickedPage = async (pageTitle) => {
        const newState = await HomeUtils.clickedPage(this.state, pageTitle);
        this.setState(newState);

        localStorage.setItem("pages", JSON.stringify(newState.pages));
    }

    handleRemovePage = async (pageTitle) => {
        const newState = await HomeUtils.removePage(this.state, pageTitle);
        this.setState(newState);

        localStorage.setItem("pages", JSON.stringify(newState.pages));
    }

    render() {
        const { pages, query } = this.state;
        const {
            handleKeyPress,
            handleChangeQuery,
            handleClickedPage,
            handleRemovePage,
            handleChangeMode
        } = this;
        return (
            <Main>
                <Navigation />
                <Search
                    query={query}
                    onChangeQuery={handleChangeQuery}
                    onKeyPress={handleKeyPress}
                    onChangeMode={handleChangeMode}
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