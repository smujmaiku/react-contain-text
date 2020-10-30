import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import useContain from 'react-contain-textbox';

const TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque finibus nunc in convallis rutrum.
Nulla volutpat efficitur orci in fermentum. Pellentesque tempor tortor vel sem condimentum, ac egestas sapien euismod.
Fusce viverra nunc vel dignissim ornare. Duis felis nunc, pellentesque sed auctor sed, luctus quis nibh.
Nulla facilisi. Cras et imperdiet sapien.
Nunc hendrerit, ligula ac posuere bibendum, diam elit faucibus ligula, sed auctor nisl orci eget erat. Cras nec aliquam est.
Curabitur ornare ullamcorper arcu ut malesuada. Aliquam sollicitudin, leo eu malesuada feugiat, risus enim posuere lorem, consequat dignissim ligula tortor et diam.
Morbi ultricies ipsum nec tortor dictum fermentum. Interdum et malesuada fames ac ante ipsum primis in faucibus.
In orci leo, feugiat eget purus at, viverra viverra massa. Aenean molestie nisi ut placerat posuere.`;

function App() {
	const [width, setWidth] = useState(100);
	const [height, setHeight] = useState(300);
	const [text, setText] = useState('');

	useEffect(() => {
		let textLength = 50;
		let textDirection = 1;

		const upkeep = () => {
			setWidth(Math.sin(Date.now() / 3000) * 100 + 300);
			setHeight(Math.sin(Date.now() / 2000) * 100 + 200);

			textLength = textLength + textDirection * Math.floor(Math.random() * 10);
			if (textLength > TEXT.length) textDirection = -1;
			if (textLength < 50) textDirection = 1;
			setText(TEXT.slice(0, textLength));
		};

		const timer = setInterval(upkeep, 50);

		return () => {
			clearInterval(timer);
		}
	}, []);

	const style = {
		width,
		height,
		border: '1px solid grey',
		margin: 8,
		padding: 8,
	};

	const rootRef = useRef<HTMLDivElement>(null);
	useContain(rootRef);

	return (
		<div
			ref={rootRef}
			style={style}
		>
			<img
				src="https://avatars3.githubusercontent.com/u/5100491"
				style={{ height: '5em', width: '5em' }}
			/>
			{text.split('\n').map((line, i) => (
				<p key={i.toFixed()}>{line}</p>
			))}
		</div>
	);
}

export default App;
