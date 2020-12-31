import React from 'react'
import Navigation from '../component/navigation/Navigation';
import Main from '../component/Main'
import Search from '../component/Home/Search'
import PreviewPageTitleContainer from '../component/Home/PreviewPageTitleContainer';
import PreviewWrapper from '../component/Home/PreviewWrapper';
import PreviewPageDoBuilder from '../component/Home/Do/PreviewPageDoBuilder';
import PreviewDoBuilder from '../component/Home/Do/PreviewDoBuilder';
import HomeStateDoBuilder from '../component/Home/Do/HomeStateDoBuilder';

class Home extends React.Component {

    state = new HomeStateDoBuilder()
        .setQuery("")
        .setPages(
            [
                new PreviewPageDoBuilder()
                    .setpageTitle("trend")
                    .setChecked(false)
                    .setPreviews([
                        new PreviewDoBuilder()
                            .setTitle("달러구트 꿈백화점 달러구트 꿈백화점")
                            .setImgURL("https://bookthumb-phinf.pstatic.net/cover/164/054/16405427.jpg?udate=20201222")
                            .setDescription("만들어진 꿈을 살 수있는")
                            .setCreatedAt("2020년 12월 13일")
                            .setAuthor("jinseongho")
                            .setId("1")
                            .build(),
                        new PreviewDoBuilder()
                            .setTitle("달러구트 꿈백화점 달러구트 꿈백화점")
                            .setImgURL("https://bookthumb-phinf.pstatic.net/cover/164/054/16405427.jpg?udate=20201222")
                            .setDescription("만들어진 꿈을 살 수있는")
                            .setCreatedAt("2020년 12월 13일")
                            .setAuthor("jinseongho")
                            .setId("2")
                            .build(),
                        new PreviewDoBuilder()
                            .setTitle("달러구트 꿈백화점 달러구트 꿈백화점")
                            .setImgURL("https://bookthumb-phinf.pstatic.net/cover/164/054/16405427.jpg?udate=20201222")
                            .setDescription("만들어진 꿈을 살 수있는")
                            .setCreatedAt("2020년 12월 13일")
                            .setAuthor("jinseongho")
                            .setId("3")
                            .build()]
                    )
                    .build(),
                new PreviewPageDoBuilder()
                    .setpageTitle("최신")
                    .setChecked(true)
                    .setPreviews(
                        new PreviewDoBuilder()
                            .setTitle("달러구트 꿈백화점 달러구트 꿈백화점")
                            .setImgURL("https://bookthumb-phinf.pstatic.net/cover/164/054/16405427.jpg?udate=20201222")
                            .setDescription("만들어진 꿈을 살 수있는")
                            .setCreatedAt("2020년 12월 13일")
                            .setAuthor("jinseongho")
                            .setId("1")
                            .build()
                    )
                    .build(),
                new PreviewPageDoBuilder().setpageTitle("asd").build(),
                new PreviewPageDoBuilder().setpageTitle("최asd신").build(),
                new PreviewPageDoBuilder().setpageTitle("Hi").build()
            ]
        )
        .build();

    handleChangeQuery = (e) => {
        this.setState({
            query: e.target.value
        })
    }

    handleCreatePage = () => {
        const { query, pages }= this.state;
        this.setState({
            pages: pages.concat()
        })
    }

    handleClickedPage = async (pageTitle) => {
        const { pages } = this.state;
        const CurrentPageIndex = this.getActivedPageIndex();
        const ClickedPageIndex = pages.findIndex(page => page.pageTitle === pageTitle);

        if (ClickedPageIndex === CurrentPageIndex) return;

        await this.togglePage(CurrentPageIndex);
        await this.togglePage(ClickedPageIndex);
    }

    togglePage = (pageIndex) => {
        return new Promise((resolve, reject) => {
            const { pages } = this.state;
            const page = pages[pageIndex];
            const nextPages = [...pages];
            nextPages[pageIndex] = {
                ...page,
                checked: !page.checked
            }
            this.setState({
                pages: nextPages
            }, () => {
                resolve();
            });
        })
    }

    handleRemovePage = async (pageTitle) => {
        if (pageTitle === "최신") return;
        if (pageTitle === "trend") return;

        if (this.isActivePage(pageTitle)) {
            await this.togglePage(this.getActivedPageIndex() - 1);
        }

        const { pages } = this.state;
        this.setState(
            { pages: pages.filter(page => page.pageTitle !== pageTitle) }
        )
    }

    getActivedPageIndex = () => {
        const { pages } = this.state;
        const currentIndex = pages.findIndex((page) =>
            page.checked);
        return currentIndex;
    }

    isActivePage(pageTitle) {
        const { pages } = this.state;
        const currentIndex = pages.findIndex((page) =>
            page.pageTitle === pageTitle);
        const page = pages[currentIndex];
        return page.checked;
    }

    render() {
        const { pages } = this.state;
        
        const {
            handleChangeQuery,
            handleClickedPage,
            handleRemovePage
        } = this;
        return (
            <Main>
                <Navigation />
                <Search
                    onChangeQuery={handleChangeQuery}
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