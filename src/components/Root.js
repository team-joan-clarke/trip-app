import React, { useState, useEffect } from "react";
import axios from "axios";

const Root = () => {
  let [stuff, setStuff] = useState("root");
  useEffect(() => {
    async function getStuff() {
      const someStuff = await axios.get("/route1");
      setStuff(someStuff.data);
    }
    getStuff();
  }, []);

  return <h1>Some stuff: {JSON.stringify(stuff)}</h1>;
};
