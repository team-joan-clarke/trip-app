import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";

const Root = () => {
  let [stuff, setStuff] = useState("app");
  useEffect(() => {
    async function getStuff() {
      const someStuff = await axios.get("/Thing1");
      setStuff(someStuff.data);
    }
    getStuff();
  }, []);

  return <h1>Some stuff: {JSON.stringify(stuff)}</h1>;
};

const root = createRoot(document.getElementById("root"));

root.render(<Root />);
