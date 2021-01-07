import React from 'react'
import {debounce} from 'lodash'
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
    
    handleScroll = (e) => {
        const {onScroll} = this.props;
        onScroll();
    }
    
    render() {
    	return(
        	<div className="Scroll">
            </div>
        )
    }
}

export default Scroll