import React from 'react';

export default function Image(props) {
	return (
		<img
      src={
        "https://image.thum.io/get/image/fit/900x600/3228-www.tipestry.com/" +
        props.url
      }
    />
  );
}