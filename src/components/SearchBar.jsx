import {
  InputAdornment,
  InputBase,
  Paper,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useState, useEffect } from "react";
import axios from "axios";
import ImageResults from "./ImageResults";

import styles from "./SearchBar.module.css";

const apiKey = process.env.REACT_APP_API_KEY;

function SearchBar() {
  const [textChange, setTextChange] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (textChange === "") {
      setImages([]);
    } else {
      try {
        axios
          .get(
            `https://api.unsplash.com/search/photos?query=${textChange}&client_id=${apiKey}&per_page=20`
          )
          .then((res) => setImages(res.data.results));
      } catch (error) {
        console.log(error);
      }
    }
  }, [textChange]);

  return (
    <div className={styles.searchbar}>
      <Typography variant="h1" className={styles.title}>
        Image Gallery
      </Typography>
      <Paper className={styles.paper}>
        <InputBase
          name="search"
          placeholder="Search"
          className={styles.inputfield}
          value={textChange}
          onChange={(e) => setTextChange(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </Paper>
      {images.length > 0 && <ImageResults images={images} />}
    </div>
  );
}

export default SearchBar;
