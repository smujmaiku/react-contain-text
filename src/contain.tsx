/*!
 * React Contain Textbox <https://github.com/smujmaiku/react-contain-textbox>
 * Copyright(c) 2020 Michael Szmadzinski
 * MIT Licensed
 */

import React, { useCallback, useEffect } from 'react';

export function getInnerHeight(el: HTMLElement): number {
	const style = window.getComputedStyle(el);
	const paddingTop = parseInt(style.paddingTop) || 0;
	const paddingBottom = parseInt(style.paddingBottom) || 0;

	return el.clientHeight - (paddingTop + paddingBottom);
}

export interface ContainProps {
	min?: number,
	max?: number,
	resolution?: number,
}

export default function useContain(ref: React.RefObject<HTMLElement> | null, props: ContainProps = {}): () => void {
	const {
		min = 0,
		max = Infinity,
		resolution = 1,
	} = props;

	const root = ref?.current;

	const updateSize = useCallback(() => {
		if (!root) return;

		const innerHeight = getInnerHeight(root);
		let maxSize = Math.min(max, innerHeight);

		root.style.fontSize = `${maxSize.toFixed(resolution)}px`;
		let minSize = Math.max(min, maxSize * innerHeight / root.scrollHeight);

		while (minSize + 1 / (10 ** resolution) < maxSize) {
			const size = (minSize + maxSize) / 2;
			root.style.fontSize = `${size.toFixed(resolution)}px`;

			if (root.scrollHeight > innerHeight) {
				maxSize = size;
				minSize = Math.max(maxSize * innerHeight / root.scrollHeight, minSize);
			} else {
				minSize = size;
			}
		}

		root.style.fontSize = `${minSize.toFixed(resolution)}px`;
	}, [root, min, max, resolution]);

	useEffect(() => {
		if (!root) return;

		let offsetWidth = 0;
		let offsetHeight = 0;

		let timer: number;
		const handleFrame = () => {
			cancelAnimationFrame(timer);
			timer = requestAnimationFrame(handleFrame);

			if (root.offsetWidth !== offsetWidth || root.offsetHeight !== offsetHeight) {
				offsetWidth = root.offsetWidth;
				offsetHeight = root.offsetHeight;
				updateSize();
			}
		};
		handleFrame();

		return () => {
			cancelAnimationFrame(timer);
		};

	}, [root, updateSize]);

	return updateSize;
}
