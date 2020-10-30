# React Contain Textbox

Resize your text and other stuff to fit a box.
Anything can be contained so long as `em` is used in it's sizing!

## Installation

`npm i react-contain-textbox`

## Examples

[Full App Example Here](https://github.com/smujmaiku/react-contain-textbox/example)

### ES6

```jsx
import React, { useRef } from 'react';
import useContain from 'react-contain-textbox';

const App = (props) => {
	const boxRef = useRef();
	useContain(boxRef);

	return <div
		ref={boxRef}
		style={{
			height: 100,
			width: 100,
		}}
	>
		<p>Buncha stuff to resize!</p>
		<img
			src="image.png"
			style={height: '15em', width: '15em'}
			alt="This will too if you use em"
		/>
	</div>;
};
```

## License

Copyright (c) 2020, Michael Szmadzinski. (MIT License)
