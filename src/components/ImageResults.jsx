import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  Zoom,
} from "@material-ui/core";
import React, { useState } from "react";
import styles from "./ImageResults.module.css";
import ZoomIn from "@material-ui/icons/ZoomIn";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom ref={ref} {...props} />;
});

function ImageResults({ images }) {
  const matches = useMediaQuery("(min-width:600px)");
  const [open, setOpen] = useState({
    open: false,
    currentImg: "",
    name: "",
    likes: "",
    profile: "",
    desc: "",
    tw: "",
    ig: "",
  });

  const handleClickOpen = (img) => {
    setOpen({
      open: true,
      currentImg: img.urls.regular,
      name: img.user.name,
      likes: img.likes,
      profile: img.user.links.html,
      desc: img.alt_description,
      tw: img.user.twitter_username,
      ig: img.user.instagram_username,
    });
  };

  const handleClose = () => {
    setOpen({ open: false });
  };

  const popup = (
    <Dialog
      open={open.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="dialog"
      aria-describedby="dialog-description"
    >
      <DialogTitle>
        <a
          href={open.profile}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.title}
        >
          {open.name}
        </a>
      </DialogTitle>
      <DialogContent>
        <img src={open.currentImg} alt={open.desc} className={styles.img} />
        <DialogContentText>
          Likes: {open.likes}
          <br />
          Description: {open.desc}
          {open.tw !== null ? <div>Twitter: {open.tw}</div> : null}
          {open.ig !== null ? <div>Instagram: {open.ig}</div> : null}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary">
          <a href={open.currentImg} target="_blank" rel="noopener noreferrer">
            View Full Image
          </a>
        </Button>
        <Button onClick={handleClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <div className={styles.container}>
      {images ? (
        <Container>
          <GridList spacing={5} cols={matches ? 4 : 2}>
            {images.map((img) => (
              <GridListTile key={img.id}>
                <img src={img.urls.small} alt={img.alt_description} />
                <GridListTileBar
                  title={img.user.name}
                  subtitle={<span>{img.likes} Likes</span>}
                  titlePosition="bottom"
                  actionIcon={
                    <IconButton onClick={() => handleClickOpen(img)}>
                      <ZoomIn style={{ color: "white" }} />
                    </IconButton>
                  }
                  className={styles.tileBar}
                />
              </GridListTile>
            ))}
          </GridList>
        </Container>
      ) : null}
      {popup}
    </div>
  );
}

export default ImageResults;
