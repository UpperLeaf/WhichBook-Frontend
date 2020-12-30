import React from 'react'
import Navigation from '../component/navigation/Navigation';
import Main from '../component/Main'
import Search from '../component/Home/Search'
import PreviewOptionContainer from '../component/Home/PreviewOptionContainer';
import PreviewWrapper from '../component/Home/PreviewWrapper';
import PreviewOptionDoBuilder from '../component/Home/Do/PreviewOptionDoBuilder';
import PreviewDoBuilder from '../component/Home/Do/PreviewDoBuilder';
import HomeStateBuilder from '../component/Home/Do/HomeStateDo'
import HomeStateDoBuilder from '../component/Home/Do/HomeStateDoBuilder';

class Home extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.options !== nextState.options;
    }

    state = new HomeStateDoBuilder()
        .setQuery("")
        .setOptions(
            [
                new PreviewOptionDoBuilder()
                    .setOptionTitle("trend")
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
                new PreviewOptionDoBuilder()
                    .setOptionTitle("최신")
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
                new PreviewOptionDoBuilder().setOptionTitle("asd").build(),
                new PreviewOptionDoBuilder().setOptionTitle("최asd신").build(),
                new PreviewOptionDoBuilder().setOptionTitle("Hi").build()
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

    handleClickedOption = async (optionTitle) => {
        const { options } = this.state;
        const CurrentOptionIndex = this.getActivedOptionIndex();
        const ClickedOptionIndex = options.findIndex(option => option.optionTitle === optionTitle);

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

    handleRemoveOption = async (optionTitle) => {
        if (optionTitle === "최신") return;
        if (optionTitle === "trend") return;

        if (this.isActiveOption(optionTitle)) {
            await this.toggleOption(this.getActivedOptionIndex() - 1);
        }

        const { options } = this.state;
        this.setState(
            { options: options.filter(option => option.optionTitle !== optionTitle) }
        )
    }

    getActivedOptionIndex = () => {
        const { options } = this.state;
        const currentIndex = options.findIndex((option) =>
            option.checked);
        return currentIndex;
    }

    isActiveOption(optionTitle) {
        const { options } = this.state;
        const currentIndex = options.findIndex((option) =>
            option.optionTitle === optionTitle);
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
                <PreviewOptionContainer
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