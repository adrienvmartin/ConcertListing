import { ADD_SHOW } from '../../actions/types';
import event, { initialState } from '../event';

describe('The event reducers', () => {
  it('should return the initial state when no action is passed', () => {
    expect(event(undefined, {})).toEqual(initialState);
  });

  describe('ADD_SHOW', () => {
    it('should correctly handle duplicate bands', () => {
      const payload = {
        bands: {
          headliner: 'Opeth',
          openers: 'DevilDriver, Dark Tranquillity, DevilDriver'
        }
      };
      const action = { type: ADD_SHOW, payload };

      const otherBands = [
        'Metallica',
        'Pantera',
        'Megadeth',
        'DevilDriver',
        'Opeth'
      ];

      const currentState = {
        ...initialState,
        bands: otherBands
      };

      const finalBands = [
        'Dark Tranquillity',
        'DevilDriver',
        'Megadeth',
        'Metallica',
        'Opeth',
        'Pantera',
      ];

      const expected = {
        ...initialState,
        events: [payload],
        loading: false,
        bands: finalBands
      };

      expect(event(currentState, action)).toEqual(expected);
    });
  });
});
