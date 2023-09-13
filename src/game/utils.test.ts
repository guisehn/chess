import {
  boardToString,
  buildIdGenerator,
  coordToString,
  findCoordinate,
  findCoordinates,
  hasCoordinate,
  isSameCoordinate,
  makePiece,
  simulateMove,
  stringToBoard,
  stringToCoord,
} from "./utils";

describe("buildIdGenerator", () => {
  const generateId = buildIdGenerator();
  expect(generateId()).toEqual("p1");
  expect(generateId()).toEqual("p2");
  expect(generateId()).toEqual("p3");
});

describe("makePiece", () => {
  it("builds a piece object", () => {
    const piece = makePiece({ type: "rook", color: "black" });
    expect(piece.type).toEqual("rook");
    expect(piece.color).toEqual("black");
    expect(piece.moved).toBe(false);
  });

  it("generates id when not passed", () => {
    const piece = makePiece({ type: "rook", color: "black" });
    expect(piece.id).toMatch(/^p[0-9]+$/);
  });

  it("uses id when passed", () => {
    const piece = makePiece({ type: "rook", color: "black", id: "foo" });
    expect(piece.id).toEqual("foo");
  });
});

describe("stringToBoard", () => {
  it("transforms string to board", () => {
    const initialBoard = stringToBoard(
      `
      8 ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜
      7 ♟ ♟ ♟ ♟ ♟ ♟ ♟ ♟
      6 . . . . . . . .
      5 . . . . . . . .
      4 . . . . . . . .
      3 . . . . . . . .
      2 ♙ ♙ ♙ ♙ ♙ ♙ ♙ ♙
      1 ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖
        a b c d e f g h
    `
    );

    const generateId = buildIdGenerator();

    expect(initialBoard).toEqual([
      [
        makePiece({ type: "rook", color: "black", id: generateId() }),
        makePiece({ type: "knight", color: "black", id: generateId() }),
        makePiece({ type: "bishop", color: "black", id: generateId() }),
        makePiece({ type: "queen", color: "black", id: generateId() }),
        makePiece({ type: "king", color: "black", id: generateId() }),
        makePiece({ type: "bishop", color: "black", id: generateId() }),
        makePiece({ type: "knight", color: "black", id: generateId() }),
        makePiece({ type: "rook", color: "black", id: generateId() }),
      ],
      [
        makePiece({ type: "pawn", color: "black", id: generateId() }),
        makePiece({ type: "pawn", color: "black", id: generateId() }),
        makePiece({ type: "pawn", color: "black", id: generateId() }),
        makePiece({ type: "pawn", color: "black", id: generateId() }),
        makePiece({ type: "pawn", color: "black", id: generateId() }),
        makePiece({ type: "pawn", color: "black", id: generateId() }),
        makePiece({ type: "pawn", color: "black", id: generateId() }),
        makePiece({ type: "pawn", color: "black", id: generateId() }),
      ],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [
        makePiece({ type: "pawn", color: "white", id: generateId() }),
        makePiece({ type: "pawn", color: "white", id: generateId() }),
        makePiece({ type: "pawn", color: "white", id: generateId() }),
        makePiece({ type: "pawn", color: "white", id: generateId() }),
        makePiece({ type: "pawn", color: "white", id: generateId() }),
        makePiece({ type: "pawn", color: "white", id: generateId() }),
        makePiece({ type: "pawn", color: "white", id: generateId() }),
        makePiece({ type: "pawn", color: "white", id: generateId() }),
      ],
      [
        makePiece({ type: "rook", color: "white", id: generateId() }),
        makePiece({ type: "knight", color: "white", id: generateId() }),
        makePiece({ type: "bishop", color: "white", id: generateId() }),
        makePiece({ type: "queen", color: "white", id: generateId() }),
        makePiece({ type: "king", color: "white", id: generateId() }),
        makePiece({ type: "bishop", color: "white", id: generateId() }),
        makePiece({ type: "knight", color: "white", id: generateId() }),
        makePiece({ type: "rook", color: "white", id: generateId() }),
      ],
    ]);
  });
});

describe("boardToString", () => {
  const board = [
    [
      makePiece({ type: "rook", color: "black" }),
      makePiece({ type: "knight", color: "black" }),
      makePiece({ type: "bishop", color: "black" }),
      makePiece({ type: "queen", color: "black" }),
      makePiece({ type: "king", color: "black" }),
      makePiece({ type: "bishop", color: "black" }),
      makePiece({ type: "knight", color: "black" }),
      makePiece({ type: "rook", color: "black" }),
    ],
    [
      makePiece({ type: "pawn", color: "black" }),
      makePiece({ type: "pawn", color: "black" }),
      makePiece({ type: "pawn", color: "black" }),
      makePiece({ type: "pawn", color: "black" }),
      makePiece({ type: "pawn", color: "black" }),
      makePiece({ type: "pawn", color: "black" }),
      makePiece({ type: "pawn", color: "black" }),
      makePiece({ type: "pawn", color: "black" }),
    ],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [
      makePiece({ type: "pawn", color: "white" }),
      makePiece({ type: "pawn", color: "white" }),
      makePiece({ type: "pawn", color: "white" }),
      makePiece({ type: "pawn", color: "white" }),
      makePiece({ type: "pawn", color: "white" }),
      makePiece({ type: "pawn", color: "white" }),
      makePiece({ type: "pawn", color: "white" }),
      makePiece({ type: "pawn", color: "white" }),
    ],
    [
      makePiece({ type: "rook", color: "white" }),
      makePiece({ type: "knight", color: "white" }),
      makePiece({ type: "bishop", color: "white" }),
      makePiece({ type: "queen", color: "white" }),
      makePiece({ type: "king", color: "white" }),
      makePiece({ type: "bishop", color: "white" }),
      makePiece({ type: "knight", color: "white" }),
      makePiece({ type: "rook", color: "white" }),
    ],
  ];

  it("transforms board to string", () => {
    const str = boardToString(board);

    expect(str).toEqual(
      `
8 ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜
7 ♟ ♟ ♟ ♟ ♟ ♟ ♟ ♟
6 . . . . . . . .
5 . . . . . . . .
4 . . . . . . . .
3 . . . . . . . .
2 ♙ ♙ ♙ ♙ ♙ ♙ ♙ ♙
1 ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖
  a b c d e f g h`.trim()
    );
  });

  it("highlights coordinates", () => {
    const str = boardToString(board, [
      { x: 3, y: 3 },
      { x: 4, y: 3 },
      { x: 3, y: 4 },
      { x: 4, y: 4 },
    ]);

    expect(str).toEqual(
      `
8 ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜
7 ♟ ♟ ♟ ♟ ♟ ♟ ♟ ♟
6 . . . . . . . .
5 . . . x x . . .
4 . . . x x . . .
3 . . . . . . . .
2 ♙ ♙ ♙ ♙ ♙ ♙ ♙ ♙
1 ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖
  a b c d e f g h`.trim()
    );
  });

  it("highlights special moves", () => {
    const str = boardToString(board, [
      { x: 3, y: 3, specialMove: "en_passant" },
      { x: 4, y: 3, specialMove: "castling" },
      { x: 4, y: 4, specialMove: "pawn_promote" },
    ]);

    expect(str).toEqual(
      `
8 ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜
7 ♟ ♟ ♟ ♟ ♟ ♟ ♟ ♟
6 . . . . . . . .
5 . . . e c . . .
4 . . . . p . . .
3 . . . . . . . .
2 ♙ ♙ ♙ ♙ ♙ ♙ ♙ ♙
1 ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖
  a b c d e f g h`.trim()
    );
  });
});

describe("coordToString", () => {
  it("transforms coordinate to string", () => {
    expect(coordToString({ x: 0, y: 0 })).toEqual("a8");
    expect(coordToString({ x: 0, y: 7 })).toEqual("a1");

    expect(coordToString({ x: 7, y: 0 })).toEqual("h8");
    expect(coordToString({ x: 7, y: 7 })).toEqual("h1");
  });
});

describe("stringToCoord", () => {
  it("transforms string to coordinate", () => {
    expect(stringToCoord("a8")).toEqual({ x: 0, y: 0 });
    expect(stringToCoord("a1")).toEqual({ x: 0, y: 7 });

    expect(stringToCoord("h8")).toEqual({ x: 7, y: 0 });
    expect(stringToCoord("h1")).toEqual({ x: 7, y: 7 });
  });
});

describe("isSameCoordinate", () => {
  it("verifies if coordinates are the same", () => {
    expect(isSameCoordinate({ x: 1, y: 1 }, { x: 1, y: 1 })).toBe(true);
    expect(isSameCoordinate({ x: 2, y: 1 }, { x: 1, y: 1 })).toBe(false);
    expect(isSameCoordinate({ x: 1, y: 2 }, { x: 1, y: 1 })).toBe(false);
  });
});

describe("hasCoordinate", () => {
  it("returns true when array has coordinate", () => {
    const coordinates = [
      { x: 1, y: 1 },
      { x: 1, y: 2 },
    ];

    expect(hasCoordinate(coordinates, { x: 1, y: 2 })).toBe(true);
  });

  it("returns false when array does not have coordinate", () => {
    const coordinates = [{ x: 1, y: 1 }];

    expect(hasCoordinate(coordinates, { x: 1, y: 2 })).toBe(false);
  });
});

describe("findCoordinate", () => {
  it("returns coordinate that matches the criteria", () => {
    const coord = findCoordinate(({ x, y }) => x === 1 && y === 1);
    expect(coord).toEqual({ x: 1, y: 1 });
  });
});

describe("findCoordinates", () => {
  it("returns coordinates that matches the criteria", () => {
    const coords = findCoordinates(
      ({ x, y }) => (x === 1 && y === 1) || y === 5
    );
    expect(coords).toEqual([
      // x === 1 && y === 1
      { x: 1, y: 1 },

      // y === 5
      { x: 0, y: 5 },
      { x: 1, y: 5 },
      { x: 2, y: 5 },
      { x: 3, y: 5 },
      { x: 4, y: 5 },
      { x: 5, y: 5 },
      { x: 6, y: 5 },
      { x: 7, y: 5 },
    ]);
  });
});

describe("simulateMove", () => {
  function buildBoard() {
    const generateId = buildIdGenerator();

    return stringToBoard(
      `
      8 ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜
      7 ♟ ♟ ♟ ♟ ♟ ♟ ♟ ♟
      6 . . . . . . . .
      5 . . . . . . . .
      4 . . . . . . . .
      3 . . . . . . . .
      2 ♙ ♙ ♙ ♙ ♙ ♙ ♙ ♙
      1 ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖
        a b c d e f g h
    `,
      generateId
    );
  }

  it("returns board with the move", () => {
    const board = buildBoard();
    const result = simulateMove(
      board,
      stringToCoord("d7"),
      stringToCoord("d5")
    );
    expect(boardToString(result)).toEqual(
      `
8 ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜
7 ♟ ♟ ♟ . ♟ ♟ ♟ ♟
6 . . . . . . . .
5 . . . ♟ . . . .
4 . . . . . . . .
3 . . . . . . . .
2 ♙ ♙ ♙ ♙ ♙ ♙ ♙ ♙
1 ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖
  a b c d e f g h
    `.trim()
    );
  });

  it("does not mutate the input board", () => {
    const board = buildBoard();
    simulateMove(board, stringToCoord("d7"), stringToCoord("d5"));
    expect(board).toEqual(buildBoard());
  });
});
