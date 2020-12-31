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

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.options !== nextState.options;
    }

    state = new HomeStateDoBuilder()
        .setQuery("")
        .setOptions(
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

    handleCreateOption = () => {
        const { query, options } = this.state;
        this.setState({
            options: options.concat()
        })
    }

    handleClickedOption = async (pageTitle) => {
        const { options } = this.state;
        const CurrentOptionIndex = this.getActivedOptionIndex();
        const ClickedOptionIndex = options.findIndex(option => option.pageTitle === pageTitle);

        if (ClickedOptionIndex === CurrentOptionIndex) return;

        await this.toggleOption(CurrentOptionIndex);
        await this.toggleOption(ClickedOptionIndex);
    }

    toggleOption = (optionIndex) => {
        return new Promise((resolve, reject) => {
            const { options } = this.state;
            const option = options[optionIndex];
            const nextOptions = [...options];
            nextOptions[optionIndex] = {
                ...option,
                checked: !option.checked
            }
            this.setState({
                options: nextOptions
            }, () => {
                resolve();
            });
        })
    }

    handleRemoveOption = async (pageTitle) => {
        if (pageTitle === "최신") return;
        if (pageTitle === "trend") return;

        if (this.isActiveOption(pageTitle)) {
            await this.toggleOption(this.getActivedOptionIndex() - 1);
        }

        const { options } = this.state;
        this.setState(
            { options: options.filter(option => option.pageTitle !== pageTitle) }
        )
    }

    getActivedOptionIndex = () => {
        const { options } = this.state;
        const currentIndex = options.findIndex((option) =>
            option.checked);
        return currentIndex;
    }

    isActiveOption(pageTitle) {
        const { options } = this.state;
        const currentIndex = options.findIndex((option) =>
            option.pageTitle === pageTitle);
        const option = options[currentIndex];
        return option.checked;
    }

    render() {
        const { options } = this.state;
        const {
            handleChangeQuery,
            handleClickedOption,
            handleRemoveOption
        } = this;
        return (
            <Main>
                <Navigation />
                <Search
                    onChangeQuery={handleChangeQuery}
                />
                <PreviewPageTitleContainer
                    options={options}
                    onClick={handleClickedOption}
                    onRemove={handleRemoveOption}
                />
                <PreviewWrapper
                    options={options}
                />
            </Main>
        )
    }
}

export default Home;