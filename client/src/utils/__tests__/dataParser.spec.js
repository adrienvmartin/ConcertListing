import React from 'react';
import { bandSplitter } from '../dataParser';

describe('Data Parser functions', () => {
  describe('bandSplitter function', () => {
    const input = {
      headliner: 'Pantera',
      openers: 'Skrape, Morbid Angel'
    };

    const expected = ['Morbid Angel', 'Pantera', 'Skrape'];

    it('should return the proper array', () => {
      let tester = bandSplitter(input);
      expect(tester).toEqual(expected);
    });
  });
});
