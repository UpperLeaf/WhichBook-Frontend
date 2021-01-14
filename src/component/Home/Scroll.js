import React from 'react'
class Scroll extends React.Component {
    constructor() {
        super();
    }

    componentDidMount = () => {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnMount = () => {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = async (e) => {
        const { onScroll } = this.props;
        await onScroll();
    }

    render() {
        return (
            <div className="Scroll">
            </div>
        )
    }
}

export default Scroll