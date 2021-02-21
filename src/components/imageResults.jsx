import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GridList, GridListTile, GridListTileBar, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText } from '@material-ui/core';
import ZoomIn from '@material-ui/icons/ZoomIn';


class ImageResults extends Component {
    state = {
        open: false,
        currentImg: '',
        name: '',
        likes: '',
        profile: '',
        desc: '',
        tw: '',
        ig: ''
    }
    handleOpen = (img) => {
        this.setState({
            open: true,
            currentImg: img.urls.regular,
            name: img.user.name,
            likes: img.likes,
            profile: img.user.links.html,
            desc: img.alt_description,
            tw: img.user.twitter_username,
            ig: img.user.instagram_username
        })
    }
    handleClose = () => {
        this.setState({ open: false });
    }
    render() {
        let imageList;
        const { images } = this.props

        if (images) {
            imageList = (
                <GridList cols={4}>
                    {  images.map(img => (
                        <GridListTile key={img.id}>
                            <img src={img.urls.small} alt="" />
                            <GridListTileBar
                                title={img.user.name}
                                subtitle={<span>{img.likes} Likes</span>}
                                actionIcon={
                                    <IconButton onClick={() => this.handleOpen(img)}>
                                        <ZoomIn style={{ color: 'white' }} />
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    ))
                    }
                </GridList>
            )
        }
        else {
            imageList = null;
        }

        return (
            <div style={{ marginLeft: 50, marginRight: 50, marginTop: 20 }}>
                {imageList}
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <DialogTitle>
                        Image by: <a href={this.state.profile} target="_blank" >{this.state.name}</a>
                    </DialogTitle>
                    <DialogContent>
                        <img src={this.state.currentImg} alt="" style={{ width: '100%' }} />
                        <DialogContentText>
                            Likes: {this.state.likes}
                            <br />
                            Description: {this.state.desc}
                            {this.state.tw !== null ? (<div>Twitter: {this.state.tw}</div>) : null}
                            {this.state.ig !== null ? (<div>Instagram: {this.state.ig}</div>) : null}

                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} variant="contained" color="primary">Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
ImageResults.propTypes = {
    images: PropTypes.array.isRequired
}

export default ImageResults;