import React from 'react'
import "./Main.css"

class Main extends React.Component {
    render() {
        return (
            <div class="main">
                {this.props.children}
            </div>
        );
    }
}


export default Main