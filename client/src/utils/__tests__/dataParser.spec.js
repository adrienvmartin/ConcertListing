import React from 'react';
import { bandSplitter, duplicateCheck } from '../dataParser';

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

  describe('duplicateCheck function', () => {
    const input = [
      'Metallica',
      'Megadeth',
      'Pantera',
      'Slayer',
      'Metallica',
      'Metallica',
      'Van Halen',
      'Megadeth'
    ];

    const expected = ['Metallica', 'Megadeth', 'Pantera', 'Slayer', 'Van Halen'];

    it('should return no duplicates', () => {
      let tester = duplicateCheck(input);
      expect(tester).toEqual(expected);
    });
  });
});
