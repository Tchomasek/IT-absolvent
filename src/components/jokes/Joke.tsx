import React from "react";

export const Joke = (props: { joke: string }) => {
  return (
    <>
      {props.joke}
      <br></br>
    </>
  );
};
