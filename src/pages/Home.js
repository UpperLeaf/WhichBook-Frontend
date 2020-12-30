import React from 'react'
import Navigation from '../component/navigation/Navigation';
import Main from '../component/Main'
import Search from '../component/Home/Search'
import PreviewOptionContainer from '../component/Home/PreviewOptionContainer';
import PreviewWrapper from '../component/Home/PreviewWrapper';
class Home extends React.Component {

    shouldComponentUpdate(nextProps, nextState){
        return this.state.options !== nextState.options;
    }

    state = {
        options: [
            {
                optionTitle: "trend", checked: false, previews: [{
                    imgURL: "https://bookthumb-phinf.pstatic.net/cover/164/054/16405427.jpg?udate=20201222",
                    title: "달러구트 꿈백화점 달러구트 꿈백화점",
                    description: "만들어진 꿈을 살 수 있는 상점이 있다면? 꾸고 싶은 꿈은 살 수 있다면 사람들은 어떤 꿈을 고를까? 《달러구트 꿈 백화점》은 ‘무의식에서만 존재하는 꿈을 정말 사고 팔 수",
                    createdAt: "2020년 12월 13일",
                    author: "jinseongho",
                    id:"1"
                }, {
                    imgURL: "https://bookthumb-phinf.pstatic.net/cover/164/054/16405427.jpg?udate=20201222",
                    title: "달러구트 꿈백화점 달러구트 꿈백화점",
                    description: "만들어진 꿈을 살 수 있는 상점이 있다면? 꾸고 싶은 꿈은 살 수 있다면 사람들은 어떤 꿈을 고를까? 《달러구트 꿈 백화점》은 ‘무의식에서만 존재하는 꿈을 정말 사고 팔 수",
                    createdAt: "2020년 12월 13일",
                    author: "jinseongho",
                    id:"2"
                }, {
                    imgURL: "https://bookthumb-phinf.pstatic.net/cover/164/054/16405427.jpg?udate=20201222",
                    title: "달러구트 꿈백화점 달러구트 꿈백화점",
                    description: "만들어진 꿈을 살 수 있는 상점이 있다면? 꾸고 싶은 꿈은 살 수 있다면 사람들은 어떤 꿈을 고를까? 《달러구트 꿈 백화점》은 ‘무의식에서만 존재하는 꿈을 정말 사고 팔 수",
                    createdAt: "2020년 12월 13일",
                    author: "jinseongho",
                    id:"3"
                },
                ]
            },
            {
                optionTitle: "최신", checked: false, previews: [{
                    imgURL: "https://bookthumb-phinf.pstatic.net/cover/164/054/16405427.jpg?udate=20201222",
                    title: "달러구트 꿈백화점 달러구트 꿈백화점",
                    description: "만들어진 꿈을 살 수 있는 상점이 있다면? 꾸고 싶은 꿈은 살 수 있다면 사람들은 어떤 꿈을 고를까? 《달러구트 꿈 백화점》은 ‘무의식에서만 존재하는 꿈을 정말 사고 팔 수",
                    createdAt: "2020년 12월 13일",
                    author: "jinseongho",
                    id:"1"
                },
                ]
            },
            { optionTitle: "asdsaaaaaadasdas", checked: true, previews: [] },
            { optionTitle: "최asd신", checked: false, previews: [] },
            { optionTitle: "최aasd신", checked: false, previews: [] },
        ]
    }

    handleClickedOption = async (optionTitle) => {
        const {options} = this.state;
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
        if(optionTitle === "최신")return;
        if(optionTitle === "trend")return;
        
        if(this.isActiveOption(optionTitle)){
            await this.toggleOption(this.getActivedOptionIndex() - 1);
        }
        
        const {options} = this.state;
        this.setState(
            {options : options.filter(option => option.optionTitle !== optionTitle)}
        )
    }
    
    getActivedOptionIndex = () => {
        const {options} = this.state;
        const currentIndex = options.findIndex((option) => 
                    option.checked);
        return currentIndex;
    }

    isActiveOption(optionTitle){
        const {options} = this.state;
        const currentIndex = options.findIndex((option) => 
                    option.optionTitle === optionTitle);
        const option = options[currentIndex];
        return option.checked;
    }

    render() {
        const { options } = this.state;
        const {
            handleClickedOption,
            handleRemoveOption
        } = this;
        return (
            <Main>
                <Navigation />
                <Search />
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