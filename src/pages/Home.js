import React from 'react'
import Navigation from '../component/navigation/Navigation';
import Main from '../component/Main'
import Search from '../component/Home/Search'
import PreviewOptionContainer from '../component/Home/PreviewOptionContainer';

class Home extends React.Component {

    state = {
        options: [
            { optionTitle: "trend", checked: true },
            { optionTitle: "최신", checked: false },
            { optionTitle: "asdsaaaaaadasdas", checked: false },
            { optionTitle: "최asd신", checked: false },
            { optionTitle: "최aasd신", checked: false },
        ]
    }

    handleOptionClicked = (optionTitle) => {
        const {options} = this.state;
        const ClickedOptionIndex = options.findIndex(option => option.optionTitle === optionTitle);
        const CurrentOptionIndex = options.findIndex(option => option.checked);
        
        if(ClickedOptionIndex === CurrentOptionIndex)return;

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
            options:nextOptions
        });
    }

    render() {
        const {options} = this.state;
        const {
            handleOptionClicked
        } = this;
        return (
            <Main>
                <Navigation />
                <Search />
                <PreviewOptionContainer
                    options = {options}
                    onClick = {handleOptionClicked}
                 />            
            </Main>
        )

    }
}

export default Home;