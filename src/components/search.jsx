import React, { Component } from 'react';
import axios from 'axios';
import ImageResults from './imageResults';

class Search extends Component {

    state = {
        searchText: "",
        apiUrl: "https://api.unsplash.com/",
        apiKey: "EdR3a23EbF_zQVg4Mm4Hj0bJ7GaSUVqKt09CbGqfctA",
        images: []
    }

    onTextChange = e => {
        const value = e.target.value;
        this.setState({ [e.target.name]: value }, () => {
            if (value === null) {
                this.setState({ images: [] });
            } else {
                axios.get(
                    `${this.state.apiUrl}search/photos?query=${this.state.searchText}&client_id=${this.state.apiKey}&per_page=20`
                ).then(res => this.setState({ images: res.data.results }))
                    .catch(err => console.log(err));
            }
        });
    }

    render() {

        return (
            <div>
                <input
                    type="search"
                    placeholder="Search Images"
                    name="searchText"
                    autoComplete="off"
                    value={this.state.searchText}
                    onChange={this.onTextChange}
                />
                {this.state.images.length > 0 ? (<ImageResults images={this.state.images} />) : null}
            </div>
        );
    }
}

export default Search;
