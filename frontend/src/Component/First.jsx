import React from "react";
import { useNavigate } from "react-router-dom";

const First = () => {
  const nav = useNavigate() // Goes to the /about url

  return (
    <>
      <h2>HOMEPAGE ROUTE</h2>
      <button onClick={() => nav('/about')}>About</button>
    </>
  );
};

export default First;