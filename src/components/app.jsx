import React, { Component } from 'react';
import Search from './search';
import './app.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div>
                    <h1>Image Gallery</h1>
                </div>
                <Search />
            </div>
        );
    }
}
export default App;