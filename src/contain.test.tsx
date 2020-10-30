import React from 'react';

describe('contain', () => {
	const useContain = require('./contain');
	it('Should contain', () => {
		expect(useContain).toEqual(expect.any(Function));
	});
});
