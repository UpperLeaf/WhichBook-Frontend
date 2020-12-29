import React from 'react'
import Navigation from '../component/navigation/Navigation';
import Main from '../component/Main'
import Search from '../component/Home/Search'
import PreviewOptionContainer from '../component/Home/PreviewOptionContainer';
import PreviewWrapper from '../component/Home/PreviewWrapper';
class Home extends React.Component {

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
                optionTitle: "최신", checked: true, previews: [{
                    imgURL: "https://bookthumb-phinf.pstatic.net/cover/164/054/16405427.jpg?udate=20201222",
                    title: "달러구트 꿈백화점 달러구트 꿈백화점",
                    description: "만들어진 꿈을 살 수 있는 상점이 있다면? 꾸고 싶은 꿈은 살 수 있다면 사람들은 어떤 꿈을 고를까? 《달러구트 꿈 백화점》은 ‘무의식에서만 존재하는 꿈을 정말 사고 팔 수",
                    createdAt: "2020년 12월 13일",
                    author: "jinseongho",
                    id:"1"
                },
                ]
            },
            { optionTitle: "asdsaaaaaadasdas", checked: false, previews: [] },
            { optionTitle: "최asd신", checked: false, previews: [] },
            { optionTitle: "최aasd신", checked: false, previews: [] },
        ]
    }

    handleOptionClicked = (optionTitle) => {
        const { options} = this.state;
        const ClickedOptionIndex = options.findIndex(option => option.optionTitle === optionTitle);
        const CurrentOptionIndex = options.findIndex(option => option.checked);

        if (ClickedOptionIndex === CurrentOptionIndex) return;

        const ClickedOption = options[ClickedOptionIndex];
        const CurrentOption = options[CurrentOptionIndex];

        const nextOptions = [...options];

        nextOptions[ClickedOptionIndex] = {
            ...ClickedOption,
            checked: !ClickedOption.checked
        }

        nextOptions[CurrentOptionIndex] = {
            ...CurrentOption,
            checked: !CurrentOption.checked
        }

        this.setState({
            options: nextOptions
        });
    }

    render() {
        const { options } = this.state;
        const {
            handleOptionClicked
        } = this;
        return (
            <Main>
                <Navigation />
                <Search />
                <PreviewOptionContainer
                    options={options}
                    onClick={handleOptionClicked}
                />
                <PreviewWrapper
                    options={options}
                />
            </Main>
        )

    }
}

export default Home;