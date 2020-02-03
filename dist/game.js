/* eslint-disable no-undef */


let ticTacToe;
let board;
let boardCoords;
let circlePiece;
let pieces = [];
const fonts = {};

class CirclePiece {
  constructor(coordsSquare) {
    this.center = this.getSquareCenter(coordsSquare);
    this.radius = this.getRadius(coordsSquare) + 30;
    this.angle = 0;
  }

  getSquareCenter = (coordsSquare) => ({
    x: coordsSquare.leftTopPoint.x + ((coordsSquare.rightTopPoint.x - coordsSquare.leftTopPoint.x) / 2),
    y: coordsSquare.leftTopPoint.y + ((coordsSquare.leftBottomPoint.y - coordsSquare.leftTopPoint.y) / 2),
  })

  getRadius = (coordsSquare) => (coordsSquare.rightTopPoint.x - coordsSquare.leftTopPoint.x) / 2

  draw = () => {
    noFill();
    if (this.angle > TWO_PI) {
      circle(this.center.x, this.center.y, this.radius);
    } else {
      this.angle += 0.3;
      arc(this.center.x, this.center.y, this.radius, this.radius, 0, this.angle);
    }
  }
}

class CrossPiece {
  constructor(coordsSquare) {
    this.factor = 20;
    this.offset = 20;
    this.line1 = this.getLine1(coordsSquare);
    this.line2 = this.getLine2(coordsSquare);
    this.animationLines1 = this.divideLine(this.line1, this.factor).reverse();
    this.animationLines2 = this.divideLine(this.line2, this.factor).reverse();
  }

  divideLine = (line, factor) => [...Array(factor)].map((element, index) => ({
    x1: line.x1,
    y1: line.y1,
    x2: Math.floor(line.x1 + (((index + 1) / factor) * (line.x2 - line.x1))),
    y2: Math.floor(line.y1 + (((index + 1) / factor) * (line.y2 - line.y1))),
  }))

  getLine1 = (coordsSquare) => ({
    x1: Math.floor(coordsSquare.leftTopPoint.x) + this.offset,
    y1: Math.floor(coordsSquare.leftTopPoint.y) + this.offset,
    x2: Math.floor(coordsSquare.rightBottomPoint.x) - this.offset,
    y2: Math.floor(coordsSquare.rightBottomPoint.y) - this.offset,
  })

  getLine2 = (coordsSquare) => ({
    x1: Math.floor(coordsSquare.leftBottomPoint.x) + this.offset,
    y1: Math.floor(coordsSquare.leftBottomPoint.y) - this.offset,
    x2: Math.floor(coordsSquare.rightTopPoint.x) - this.offset,
    y2: Math.floor(coordsSquare.rightTopPoint.y) + this.offset,
  })

  draw = () => {
    noFill();
    if (this.animationLines1.length === 0 || this.animationLines2.length === 0) {
      line(this.line1.x1, this.line1.y1, this.line1.x2, this.line1.y2);
      line(this.line2.x1, this.line2.y1, this.line2.x2, this.line2.y2);
    } else {
      const partLine1 = this.animationLines1.pop();
      line(partLine1.x1, partLine1.y1, partLine1.x2, partLine1.y2);
      const partLine2 = this.animationLines2.pop();
      line(partLine2.x1, partLine2.y1, partLine2.x2, partLine2.y2);
    }
  }
}

const drawBoard = () => {
  background(255);
  strokeWeight(board.weight);
  stroke('#222222');
  line(board.w, 0, board.w, height);
  line(board.w * 2, 0, board.w * 2, height);
  line(0, board.h, width, board.h);
  line(0, board.h * 2, width, board.h * 2);
};

const detectSquare = (boardCoordsSquare, x, y) => x > boardCoordsSquare.leftTopPoint.x && y > boardCoordsSquare.leftTopPoint.y
  && x > boardCoordsSquare.leftBottomPoint.x && y < boardCoordsSquare.leftBottomPoint.y
  && x < boardCoordsSquare.rightTopPoint.x && y > boardCoordsSquare.rightTopPoint.y
  && x < boardCoordsSquare.rightBottomPoint.x && y < boardCoordsSquare.rightBottomPoint.y;

function mousePressed() {
  const coordsSquare = boardCoords.find((element) => detectSquare(element, mouseX, mouseY));
  if (coordsSquare !== undefined && ticTacToe.legalMove(coordsSquare.column, coordsSquare.row)) {
    if (ticTacToe.currentPlayer instanceof PlayerX) {
      pieces.push(new CrossPiece(coordsSquare));
    } else {
      pieces.push(new CirclePiece(coordsSquare));
    }
    ticTacToe.move(coordsSquare.column, coordsSquare.row);
  }
  return false;
}

function preload() {
  fonts['OpenSans Regular'] = loadFont('open-sans/OpenSans-Regular.ttf');
}

function setup() {
  createCanvas(500, 500);
  frameRate(60);
  ticTacToe = new TicTacToe();
  board = {
    w: width / 3,
    h: height / 3,
    weight: 4,
  };
  boardCoords = [...Array(3)].map((element) => [...Array(3)]).map((array, column) => array.map((value, row) => ({
    column,
    row,
    leftTopPoint: { x: row * board.w + board.weight, y: column * board.h + board.weight },
    leftBottomPoint: { x: row * board.w + board.weight, y: column * board.h + board.h - board.weight },
    rightTopPoint: { x: row * board.w + board.w - board.weight, y: column * board.h + board.weight },
    rightBottomPoint: { x: row * board.w + board.w - board.weight, y: column * board.h + board.h - board.weight },
  }))).flat();
}

function draw() {
  if (ticTacToe.win()) {
    clear();
    textFont(fonts['OpenSans Regular']);
    textSize(30);
    if (ticTacToe.calculateWinner() instanceof PlayerO) {
      text('The Player O Win', 200, 200);
    } else {
      text('The Player X Win', 200, 200);
    }
  } else {
    drawBoard();
    pieces.forEach((piece) => {
      piece.draw();
    });
  }
}
