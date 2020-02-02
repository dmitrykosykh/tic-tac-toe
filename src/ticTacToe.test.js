/* eslint-disable no-undef */

import { TicTacToe, PlayerO, PlayerX } from './ticTacToe';


describe('Tic Tac Toe', () => {
  test('Board', () => {
    const ticTacToe = new TicTacToe();
    expect(ticTacToe.board).toEqual([
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
    ]);
  });

  test('functions win, calculateWinner', () => {
    const ticTacToe1 = new TicTacToe();
    ticTacToe1.move(0, 0);
    expect(ticTacToe1.win()).toBeFalsy();
    ticTacToe1.move(0, 1);
    expect(ticTacToe1.win()).toBeFalsy();
    ticTacToe1.move(1, 1);
    expect(ticTacToe1.win()).toBeFalsy();
    ticTacToe1.move(0, 2);
    expect(ticTacToe1.win()).toBeFalsy();
    ticTacToe1.move(2, 2);
    expect(ticTacToe1.win()).toBeTruthy();
    expect(ticTacToe1.calculateWinner()).toEqual(new PlayerX());

    const ticTacToe2 = new TicTacToe();
    ticTacToe2.move(0, 1);
    expect(ticTacToe2.win()).toBeFalsy();
    ticTacToe2.move(0, 0);
    expect(ticTacToe2.win()).toBeFalsy();
    ticTacToe2.move(0, 2);
    expect(ticTacToe2.win()).toBeFalsy();
    ticTacToe2.move(1, 1);
    expect(ticTacToe2.win()).toBeFalsy();
    ticTacToe2.move(1, 2);
    expect(ticTacToe2.win()).toBeFalsy();

    ticTacToe2.move(2, 2);
    expect(ticTacToe2.win()).toBeTruthy();
    expect(ticTacToe2.calculateWinner()).toEqual(new PlayerO());
  });
});
