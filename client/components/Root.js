import React, { useState, useEffect } from "react";
import axios from "axios";

const Root = () => {
  let [stuff, setStuff] = useState("root");
  useEffect(() => {
    async function getStuff() {
      const someStuff = await axios.get("/api/route1");
      setStuff(someStuff.data);
    }
    getStuff();
  }, []);

  return <h1>Some State Stuff: {JSON.stringify(stuff)}</h1>;
};

export default Root;
