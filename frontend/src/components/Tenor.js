import React, { useState, useEffect } from "react";
import { Image } from "@chatui/core";
import axios from "axios";
import "../App.css";

const Tenor = (item) => {
  if (!item) {
    item = "fun";
  }
  const [post, setPost] = useState(0);

  const [dimension, setDimension] = useState("");
  var apikey = "AIzaSyAUChYocwjUgAyqV__VdQhJ2bU05KRO-fI";
  var clientkey = "my_test_app";
  var lmt = 8;

  var search_term = item.item;

  var search_url =
    "https://tenor.googleapis.com/v2/search?q=" +
    search_term +
    "&key=" +
    apikey +
    "&client_key=" +
    clientkey +
    "&limit=" +
    lmt;

  useEffect(() => {
    axios.get(search_url).then((response) => {
      setPost(response.data.results[2].media_formats.gif.url);
      setDimension(response.data.results[2].media_formats.gif.dims);
    });
  }, []);

  if (item.size === 1) {
    return (
      <div className="Tenor">
        <Image src={post} width="410px" alt="meme" className="Tenorgif" />
      </div>
    );
  } else {
    return (
      <div className="Tenor">
        <Image src={post} width="300px" alt="meme" className="Tenorgif" />
      </div>
    );
  }
};

export default React.memo(Tenor);
