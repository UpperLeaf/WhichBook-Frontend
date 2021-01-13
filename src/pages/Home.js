import React from 'react'
import Navigation from '../component/navigation/Navigation';
import Main from '../component/Main'
import Search from '../component/Home/Search'
import PreviewPageTitleContainer from '../component/Home/PreviewPageTitleContainer';
import PreviewWrapper from '../component/Home/PreviewWrapper';
import QueryDoBuilder from '../component/Home/Do/QueryDoBuilder';
import PageType from '../component/Home/Do/PageType'
import PreviewPageDoBuilder from '../component/Home/Do/PreviewPageDoBuilder';
import HomeStateDoBuilder from '../component/Home/Do/HomeStateDoBuilder';
import Scroll from '../component/Home/Scroll'
import PreviewPages from '../component/Home/Do/PreviewPages'
import HomeStateDo from '../component/Home/Do/HomeStateDo';

class Home extends React.Component {

    shouldComponentUpdate(preProps, preState){
        return preState != this.state;
    }

    state = new HomeStateDoBuilder()
        .setQuery(
            new QueryDoBuilder()
                .setType(PageType.REVIEW)
                .setValue("")
                .build()
        )
        .setPages(
                new PreviewPages()
                .add(
                [new PreviewPageDoBuilder()
                    .setPageTitle("trend")
                    .build(),
                new PreviewPageDoBuilder()
                    .setPageTitle("최신")
                    .build()]
                )
        )
        .build();

    componentDidMount() {
        this.onload();
    }

    onload = async () => {
        const newState = new HomeStateDo(this.state);
        await newState.loadPagesInLocalStorage();
        await newState.loadQueryInLocalStorage();
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
        const newState = new HomeStateDo(this.state);
        newState.changeQueryType();
        this.setState(newState);
    }

    handleCreatePage = async () => {
        const newState = new HomeStateDo(this.state);
        await newState.createPage();
        this.setState(newState);
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.handleCreatePage();
        }
    }

    handleClickedPage = async (pageTitle) => {
        const newState = new HomeStateDo(this.state);
        await newState.clickedPage(pageTitle);
        this.setState(newState);
    }

    handleRemovePage = async (pageTitle) => {
        const newState = new HomeStateDo(this.state);
        await newState.removePage(pageTitle);
        this.setState(newState);
    }

    handleScrollEnd = async () => {
        const newState = new HomeStateDo(this.state);
        await newState.onScroll();
        this.setState(newState);
    }

    handleClickPreview = async (preview) => {
        const newState = new HomeStateDo(this.state);
        await newState.readPreview(preview);
        this.setState(newState);
    }

    handleWriteReview = async(preview) => {
    }

    render() {
        const { pages, query } = this.state;
        const {
            handleScrollEnd,
            handleKeyPress,
            handleChangeQuery,
            handleClickedPage,
            handleRemovePage,
            handleChangeMode,
            handleClickPreview,
            handleWriteReview
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
                    handleClickPreview={handleClickPreview}
                    handleWriteReview={handleWriteReview}
                />
                <Scroll
                    onScroll={handleScrollEnd}
                />
            </Main>
        )
    }
}

export default Home;