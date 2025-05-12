// Ajedrez en JavaScript implementando principios SOLID y patrones de diseño
// 1. S - Responsabilidad Única: Cada clase tiene una sola responsabilidad
// 2. O - Abierto/Cerrado: El sistema está abierto para extensión, cerrado para modificación
// 3. L - Sustitución de Liskov: Las subclases pueden sustituir a sus clases base
// 4. I - Segregación de Interfaces: Interfaces específicas para cada tipo de pieza
// 5. D - Inversión de Dependencias: Dependemos de abstracciones, no de implementaciones

// ----- PATRONES DE DISEÑO IMPLEMENTADOS -----
// 1. Factory Method: Para crear piezas
// 2. Strategy: Para diferentes comportamientos de movimiento
// 3. Observer: Para notificaciones de eventos del juego
// 4. Command: Para ejecutar y deshacer movimientos
// 5. Singleton: Para el gestor del juego

// ----- INTERFACES Y CLASES BASE -----

// Interfaz para piezas (implementación del principio de segregación de interfaces)
class ChessPiece {
  constructor(color) {
    this.color = color;
    this.position = null;
    this.hasMoved = false;
  }
  
  canMoveTo(board, targetPosition) {
    throw new Error("Método abstracto: debe ser implementado por subclases");
  }
  
  getValidMoves(board) {
    throw new Error("Método abstracto: debe ser implementado por subclases");
  }
  
  getSymbol() {
    throw new Error("Método abstracto: debe ser implementado por subclases");
  }
  
  clone() {
    throw new Error("Método abstracto: debe ser implementado por subclases");
  }
}

// ----- IMPLEMENTACIONES DE PIEZAS (Principio de Sustitución de Liskov) -----

class Pawn extends ChessPiece {
  constructor(color) {
    super(color);
    this.type = 'pawn';
  }
  
  canMoveTo(board, targetPosition) {
    const [currRow, currCol] = this.position;
    const [targetRow, targetCol] = targetPosition;
    
    // Dirección del movimiento según el color
    const direction = this.color === 'white' ? -1 : 1;
    
    // Movimiento hacia adelante (1 casilla)
    if (currCol === targetCol && targetRow === currRow + direction) {
      return board.getSquare(targetPosition) === null;
    }
    
    // Movimiento inicial (2 casillas)
    if (currCol === targetCol && 
        targetRow === currRow + 2 * direction && 
        !this.hasMoved) {
      const intermediatePosition = [currRow + direction, currCol];
      return board.getSquare(intermediatePosition) === null && 
             board.getSquare(targetPosition) === null;
    }
    
    // Captura diagonal
    if (Math.abs(targetCol - currCol) === 1 && targetRow === currRow + direction) {
      const pieceAtTarget = board.getSquare(targetPosition);
      return pieceAtTarget !== null && pieceAtTarget.color !== this.color;
    }
    
    // En passant (implementación simplificada)
    // Se implementaría aquí
    
    return false;
  }
  
  getValidMoves(board) {
    const validMoves = [];
    const [row, col] = this.position;
    const direction = this.color === 'white' ? -1 : 1;
    
    // Adelante una casilla
    const oneForward = [row + direction, col];
    if (board.isValidPosition(oneForward) && board.getSquare(oneForward) === null) {
      validMoves.push(oneForward);
      
      // Adelante dos casillas (movimiento inicial)
      if (!this.hasMoved) {
        const twoForward = [row + 2 * direction, col];
        if (board.getSquare(twoForward) === null) {
          validMoves.push(twoForward);
        }
      }
    }
    
    // Capturas diagonales
    const diagonals = [
      [row + direction, col - 1],
      [row + direction, col + 1]
    ];
    
    for (const diag of diagonals) {
      if (board.isValidPosition(diag)) {
        const pieceAtDiag = board.getSquare(diag);
        if (pieceAtDiag !== null && pieceAtDiag.color !== this.color) {
          validMoves.push(diag);
        }
      }
    }
    
    return validMoves;
  }
  
  getSymbol() {
    return this.color === 'white' ? '♙' : '♟';
  }
  
  clone() {
    const clone = new Pawn(this.color);
    clone.position = this.position ? [...this.position] : null;
    clone.hasMoved = this.hasMoved;
    return clone;
  }
}

class Rook extends ChessPiece {
  constructor(color) {
    super(color);
    this.type = 'rook';
  }
  
  canMoveTo(board, targetPosition) {
    const [currRow, currCol] = this.position;
    const [targetRow, targetCol] = targetPosition;
    
    // Verifica si es un movimiento horizontal o vertical
    if (currRow !== targetRow && currCol !== targetCol) {
      return false;
    }
    
    const rowDiff = targetRow - currRow;
    const colDiff = targetCol - currCol;
    
    // Determina dirección
    const rowStep = rowDiff === 0 ? 0 : rowDiff > 0 ? 1 : -1;
    const colStep = colDiff === 0 ? 0 : colDiff > 0 ? 1 : -1;
    
    // Verifica si hay piezas en el camino
    let currentRow = currRow + rowStep;
    let currentCol = currCol + colStep;
    
    while (currentRow !== targetRow || currentCol !== targetCol) {
      if (board.getSquare([currentRow, currentCol]) !== null) {
        return false;
      }
      currentRow += rowStep;
      currentCol += colStep;
    }
    
    // Verifica si la casilla objetivo está vacía o tiene una pieza enemiga
    const pieceAtTarget = board.getSquare(targetPosition);
    return pieceAtTarget === null || pieceAtTarget.color !== this.color;
  }
  
  getValidMoves(board) {
    const validMoves = [];
    const [row, col] = this.position;
    
    // Direcciones de torre: horizontal y vertical
    const directions = [
      [1, 0], [-1, 0], [0, 1], [0, -1]
    ];
    
    for (const [rowDir, colDir] of directions) {
      let currentRow = row + rowDir;
      let currentCol = col + colDir;
      
      while (board.isValidPosition([currentRow, currentCol])) {
        const pieceAtPosition = board.getSquare([currentRow, currentCol]);
        
        if (pieceAtPosition === null) {
          // Casilla vacía, movimiento válido
          validMoves.push([currentRow, currentCol]);
        } else {
          // Hay una pieza
          if (pieceAtPosition.color !== this.color) {
            // Pieza enemiga, podemos capturar
            validMoves.push([currentRow, currentCol]);
          }
          // No podemos seguir en esta dirección
          break;
        }
        
        currentRow += rowDir;
        currentCol += colDir;
      }
    }
    
    return validMoves;
  }
  
  getSymbol() {
    return this.color === 'white' ? '♖' : '♜';
  }
  
  clone() {
    const clone = new Rook(this.color);
    clone.position = this.position ? [...this.position] : null;
    clone.hasMoved = this.hasMoved;
    return clone;
  }
}

class Knight extends ChessPiece {
  constructor(color) {
    super(color);
    this.type = 'knight';
  }
  
  canMoveTo(board, targetPosition) {
    const [currRow, currCol] = this.position;
    const [targetRow, targetCol] = targetPosition;
    
    const rowDiff = Math.abs(targetRow - currRow);
    const colDiff = Math.abs(targetCol - currCol);
    
    // El movimiento en L: 2 en una dirección y 1 en la otra
    if (!((rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2))) {
      return false;
    }
    
    // Verifica si la casilla objetivo está vacía o tiene una pieza enemiga
    const pieceAtTarget = board.getSquare(targetPosition);
    return pieceAtTarget === null || pieceAtTarget.color !== this.color;
  }
  
  getValidMoves(board) {
    const validMoves = [];
    const [row, col] = this.position;
    
    // Movimientos posibles del caballo
    const knightMoves = [
      [row + 2, col + 1], [row + 2, col - 1],
      [row - 2, col + 1], [row - 2, col - 1],
      [row + 1, col + 2], [row + 1, col - 2],
      [row - 1, col + 2], [row - 1, col - 2]
    ];
    
    for (const move of knightMoves) {
      if (board.isValidPosition(move)) {
        const pieceAtPosition = board.getSquare(move);
        
        if (pieceAtPosition === null || pieceAtPosition.color !== this.color) {
          validMoves.push(move);
        }
      }
    }
    
    return validMoves;
  }
  
  getSymbol() {
    return this.color === 'white' ? '♘' : '♞';
  }
  
  clone() {
    const clone = new Knight(this.color);
    clone.position = this.position ? [...this.position] : null;
    clone.hasMoved = this.hasMoved;
    return clone;
  }
}

class Bishop extends ChessPiece {
  constructor(color) {
    super(color);
    this.type = 'bishop';
  }
  
  canMoveTo(board, targetPosition) {
    const [currRow, currCol] = this.position;
    const [targetRow, targetCol] = targetPosition;
    
    const rowDiff = Math.abs(targetRow - currRow);
    const colDiff = Math.abs(targetCol - currCol);
    
    // Verifica si es un movimiento diagonal
    if (rowDiff !== colDiff) {
      return false;
    }
    
    // Determina dirección
    const rowStep = targetRow > currRow ? 1 : -1;
    const colStep = targetCol > currCol ? 1 : -1;
    
    // Verifica si hay piezas en el camino
    let currentRow = currRow + rowStep;
    let currentCol = currCol + colStep;
    
    while (currentRow !== targetRow && currentCol !== targetCol) {
      if (board.getSquare([currentRow, currentCol]) !== null) {
        return false;
      }
      currentRow += rowStep;
      currentCol += colStep;
    }
    
    // Verifica si la casilla objetivo está vacía o tiene una pieza enemiga
    const pieceAtTarget = board.getSquare(targetPosition);
    return pieceAtTarget === null || pieceAtTarget.color !== this.color;
  }
  
  getValidMoves(board) {
    const validMoves = [];
    const [row, col] = this.position;
    
    // Direcciones diagonales
    const directions = [
      [1, 1], [1, -1], [-1, 1], [-1, -1]
    ];
    
    for (const [rowDir, colDir] of directions) {
      let currentRow = row + rowDir;
      let currentCol = col + colDir;
      
      while (board.isValidPosition([currentRow, currentCol])) {
        const pieceAtPosition = board.getSquare([currentRow, currentCol]);
        
        if (pieceAtPosition === null) {
          validMoves.push([currentRow, currentCol]);
        } else {
          if (pieceAtPosition.color !== this.color) {
            validMoves.push([currentRow, currentCol]);
          }
          break;
        }
        
        currentRow += rowDir;
        currentCol += colDir;
      }
    }
    
    return validMoves;
  }
  
  getSymbol() {
    return this.color === 'white' ? '♗' : '♝';
  }
  
  clone() {
    const clone = new Bishop(this.color);
    clone.position = this.position ? [...this.position] : null;
    clone.hasMoved = this.hasMoved;
    return clone;
  }
}

class Queen extends ChessPiece {
  constructor(color) {
    super(color);
    this.type = 'queen';
  }
  
  canMoveTo(board, targetPosition) {
    const [currRow, currCol] = this.position;
    const [targetRow, targetCol] = targetPosition;
    
    const rowDiff = Math.abs(targetRow - currRow);
    const colDiff = Math.abs(targetCol - currCol);
    
    // La reina combina movimientos de torre y alfil
    const isDiagonal = rowDiff === colDiff;
    const isStraight = currRow === targetRow || currCol === targetCol;
    
    if (!isDiagonal && !isStraight) {
      return false;
    }
    
    // Determina dirección
    const rowStep = targetRow === currRow ? 0 : targetRow > currRow ? 1 : -1;
    const colStep = targetCol === currCol ? 0 : targetCol > currCol ? 1 : -1;
    
    // Verifica si hay piezas en el camino
    let currentRow = currRow + rowStep;
    let currentCol = currCol + colStep;
    
    while (currentRow !== targetRow || currentCol !== targetCol) {
      if (board.getSquare([currentRow, currentCol]) !== null) {
        return false;
      }
      currentRow += rowStep;
      currentCol += colStep;
    }
    
    // Verifica si la casilla objetivo está vacía o tiene una pieza enemiga
    const pieceAtTarget = board.getSquare(targetPosition);
    return pieceAtTarget === null || pieceAtTarget.color !== this.color;
  }
  
  getValidMoves(board) {
    const validMoves = [];
    const [row, col] = this.position;
    
    // Combinación de movimientos de torre y alfil
    const directions = [
      [1, 0], [-1, 0], [0, 1], [0, -1], // Torre
      [1, 1], [1, -1], [-1, 1], [-1, -1] // Alfil
    ];
    
    for (const [rowDir, colDir] of directions) {
      let currentRow = row + rowDir;
      let currentCol = col + colDir;
      
      while (board.isValidPosition([currentRow, currentCol])) {
        const pieceAtPosition = board.getSquare([currentRow, currentCol]);
        
        if (pieceAtPosition === null) {
          validMoves.push([currentRow, currentCol]);
        } else {
          if (pieceAtPosition.color !== this.color) {
            validMoves.push([currentRow, currentCol]);
          }
          break;
        }
        
        currentRow += rowDir;
        currentCol += colDir;
      }
    }
    
    return validMoves;
  }
  
  getSymbol() {
    return this.color === 'white' ? '♕' : '♛';
  }
  
  clone() {
    const clone = new Queen(this.color);
    clone.position = this.position ? [...this.position] : null;
    clone.hasMoved = this.hasMoved;
    return clone;
  }
}

class King extends ChessPiece {
  constructor(color) {
    super(color);
    this.type = 'king';
  }
  
  canMoveTo(board, targetPosition) {
    const [currRow, currCol] = this.position;
    const [targetRow, targetCol] = targetPosition;
    
    const rowDiff = Math.abs(targetRow - currRow);
    const colDiff = Math.abs(targetCol - currCol);
    
    // Movimiento normal del rey (1 casilla en cualquier dirección)
    if (rowDiff <= 1 && colDiff <= 1) {
      const pieceAtTarget = board.getSquare(targetPosition);
      return pieceAtTarget === null || pieceAtTarget.color !== this.color;
    }
    
    // Enroque (implementación simplificada)
    if (currRow === targetRow && !this.hasMoved) {
      // Enroque corto
      if (targetCol === currCol + 2) {
        const rook = board.getSquare([currRow, 7]);
        if (rook && rook.type === 'rook' && !rook.hasMoved) {
          return board.getSquare([currRow, currCol + 1]) === null && 
                 board.getSquare([currRow, currCol + 2]) === null;
        }
      }
      // Enroque largo
      if (targetCol === currCol - 2) {
        const rook = board.getSquare([currRow, 0]);
        if (rook && rook.type === 'rook' && !rook.hasMoved) {
          return board.getSquare([currRow, currCol - 1]) === null && 
                 board.getSquare([currRow, currCol - 2]) === null && 
                 board.getSquare([currRow, currCol - 3]) === null;
        }
      }
    }
    
    return false;
  }
  
  getValidMoves(board) {
    const validMoves = [];
    const [row, col] = this.position;
    
    // Movimientos posibles del rey (1 casilla en cualquier dirección)
    for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
      for (let colOffset = -1; colOffset <= 1; colOffset++) {
        if (rowOffset === 0 && colOffset === 0) continue;
        
        const newPosition = [row + rowOffset, col + colOffset];
        
        if (board.isValidPosition(newPosition)) {
          const pieceAtPosition = board.getSquare(newPosition);
          
          if (pieceAtPosition === null || pieceAtPosition.color !== this.color) {
            // Verificar que no se mueva a una casilla amenazada
            if (!board.isSquareUnderAttack(newPosition, this.color)) {
              validMoves.push(newPosition);
            }
          }
        }
      }
    }
    
    // Verificar enroque
    if (!this.hasMoved && !board.isKingInCheck(this.color)) {
      // Enroque corto
      const rookRight = board.getSquare([row, 7]);
      if (rookRight && rookRight.type === 'rook' && !rookRight.hasMoved) {
        if (board.getSquare([row, col + 1]) === null && 
            board.getSquare([row, col + 2]) === null) {
          if (!board.isSquareUnderAttack([row, col + 1], this.color) && 
              !board.isSquareUnderAttack([row, col + 2], this.color)) {
            validMoves.push([row, col + 2]);
          }
        }
      }
      
      // Enroque largo
      const rookLeft = board.getSquare([row, 0]);
      if (rookLeft && rookLeft.type === 'rook' && !rookLeft.hasMoved) {
        if (board.getSquare([row, col - 1]) === null && 
            board.getSquare([row, col - 2]) === null && 
            board.getSquare([row, col - 3]) === null) {
          if (!board.isSquareUnderAttack([row, col - 1], this.color) && 
              !board.isSquareUnderAttack([row, col - 2], this.color)) {
            validMoves.push([row, col - 2]);
          }
        }
      }
    }
    
    return validMoves;
  }
  
  getSymbol() {
    return this.color === 'white' ? '♔' : '♚';
  }
  
  clone() {
    const clone = new King(this.color);
    clone.position = this.position ? [...this.position] : null;
    clone.hasMoved = this.hasMoved;
    return clone;
  }
}

// ----- TABLERO DE AJEDREZ (Principio de Responsabilidad Única) -----

// ----- FÁBRICA DE PIEZAS (Factory Method Pattern) -----

class ChessPieceFactory {
  static createPiece(type, color) {
    switch (type.toLowerCase()) {
      case 'pawn':
        return new Pawn(color);
      case 'rook':
        return new Rook(color);
      case 'knight':
        return new Knight(color);
      case 'bishop':
        return new Bishop(color);
      case 'queen':
        return new Queen(color);
      case 'king':
        return new King(color);
      default:
        throw new Error(`Tipo de pieza desconocido: ${type}`);
    }
  }
}

// ----- MOVIMIENTO (Command Pattern) -----

class MoveCommand {
  constructor(board, fromPosition, toPosition) {
    this.board = board;
    this.fromPosition = fromPosition;
    this.toPosition = toPosition;
    this.executedMove = null;
  }
  
  execute() {
    const success = this.board.movePiece(this.fromPosition, this.toPosition);
    if (success) {
      this.executedMove = this.board.moveHistory[this.board.moveHistory.length - 1];
    }
    return success;
  }
  
  undo() {
    if (this.executedMove) {
      return this.board.undoLastMove();
    }
    return false;
  }
}

// ----- TABLERO DE AJEDREZ (Principio de Responsabilidad Única) -----

class ChessBoard {
  constructor() {
    this.board = Array(8).fill().map(() => Array(8).fill(null));
    this.moveHistory = [];
    this.capturedPieces = [];
    this.observers = []; // Para Observer Pattern
  }
  
  // Observer Pattern
  addObserver(observer) {
    this.observers.push(observer);
  }
  
  removeObserver(observer) {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }
  
  notifyObservers(event, data) {
    for (const observer of this.observers) {
      if (typeof observer.update === 'function') {
        observer.update(event, data);
      }
    }
  }
  
  initialize() {
    // Usando Factory Method para crear las piezas
    // Peones
    for (let col = 0; col < 8; col++) {
      this.placePiece(ChessPieceFactory.createPiece('pawn', 'white'), [6, col]);
      this.placePiece(ChessPieceFactory.createPiece('pawn', 'black'), [1, col]);
    }
    
    // Torres
    this.placePiece(ChessPieceFactory.createPiece('rook', 'white'), [7, 0]);
    this.placePiece(ChessPieceFactory.createPiece('rook', 'white'), [7, 7]);
    this.placePiece(ChessPieceFactory.createPiece('rook', 'black'), [0, 0]);
    this.placePiece(ChessPieceFactory.createPiece('rook', 'black'), [0, 7]);
    
    // Caballos
    this.placePiece(ChessPieceFactory.createPiece('knight', 'white'), [7, 1]);
    this.placePiece(ChessPieceFactory.createPiece('knight', 'white'), [7, 6]);
    this.placePiece(ChessPieceFactory.createPiece('knight', 'black'), [0, 1]);
    this.placePiece(ChessPieceFactory.createPiece('knight', 'black'), [0, 6]);
    
    // Alfiles
    this.placePiece(ChessPieceFactory.createPiece('bishop', 'white'), [7, 2]);
    this.placePiece(ChessPieceFactory.createPiece('bishop', 'white'), [7, 5]);
    this.placePiece(ChessPieceFactory.createPiece('bishop', 'black'), [0, 2]);
    this.placePiece(ChessPieceFactory.createPiece('bishop', 'black'), [0, 5]);
    
    // Reinas
    this.placePiece(ChessPieceFactory.createPiece('queen', 'white'), [7, 3]);
    this.placePiece(ChessPieceFactory.createPiece('queen', 'black'), [0, 3]);
    
    // Reyes
    this.placePiece(ChessPieceFactory.createPiece('king', 'white'), [7, 4]);
    this.placePiece(ChessPieceFactory.createPiece('king', 'black'), [0, 4]);
    
    // Notificar a los observadores
    this.notifyObservers('boardInitialized', { board: this });
  }
  
  placePiece(piece, position) {
    const [row, col] = position;
    this.board[row][col] = piece;
    piece.position = position;
  }
  
  getSquare(position) {
    const [row, col] = position;
    if (this.isValidPosition(position)) {
      return this.board[row][col];
    }
    return null;
  }
  
  isValidPosition(position) {
    const [row, col] = position;
    return row >= 0 && row < 8 && col >= 0 && col < 8;
  }
  
  movePiece(fromPosition, toPosition) {
    const piece = this.getSquare(fromPosition);
    if (!piece) return false;
    
    if (!piece.canMoveTo(this, toPosition)) return false;
    
    // Verificar si el movimiento deja al rey en jaque
    const simulatedBoard = this.clone();
    simulatedBoard.forceMovePiece(fromPosition, toPosition);
    
    if (simulatedBoard.isKingInCheck(piece.color)) {
      return false;
    }
    
    // Guardar el estado actual para el historial
    const capturedPiece = this.getSquare(toPosition);
    const moveData = {
      piece: piece.clone(),
      from: [...fromPosition],
      to: [...toPosition],
      captured: capturedPiece ? capturedPiece.clone() : null,
      isFirstMove: !piece.hasMoved
    };
    
    // Realizar movimiento
    if (capturedPiece) {
      this.capturedPieces.push(capturedPiece);
      this.notifyObservers('pieceCaptured', { 
        piece: capturedPiece,
        position: toPosition
      });
    }
    
    this.board[fromPosition[0]][fromPosition[1]] = null;
    this.board[toPosition[0]][toPosition[1]] = piece;
    piece.position = toPosition;
    piece.hasMoved = true;
    
    this.moveHistory.push(moveData);
    
    // Notificar a los observadores sobre el movimiento
    this.notifyObservers('pieceMoved', {
      piece: piece,
      from: fromPosition,
      to: toPosition
    });
    
    // Manejo del enroque
    if (piece.type === 'king' && Math.abs(toPosition[1] - fromPosition[1]) === 2) {
      // Enroque corto
      if (toPosition[1] > fromPosition[1]) {
        const rookPos = [fromPosition[0], 7];
        const rookNewPos = [fromPosition[0], fromPosition[1] + 1];
        this.forceMovePiece(rookPos, rookNewPos);
        this.notifyObservers('castling', { side: 'kingside', color: piece.color });
      } 
      // Enroque largo
      else {
        const rookPos = [fromPosition[0], 0];
        const rookNewPos = [fromPosition[0], fromPosition[1] - 1];
        this.forceMovePiece(rookPos, rookNewPos);
        this.notifyObservers('castling', { side: 'queenside', color: piece.color });
      }
    }
    
    // Promoción de peón
    if (piece.type === 'pawn' && (toPosition[0] === 0 || toPosition[0] === 7)) {
      // Por defecto promocionamos a reina, pero podría ser configurable
      this.board[toPosition[0]][toPosition[1]] = ChessPieceFactory.createPiece('queen', piece.color);
      this.board[toPosition[0]][toPosition[1]].position = toPosition;
      this.board[toPosition[0]][toPosition[1]].hasMoved = true;
      
      this.notifyObservers('pawnPromotion', {
        position: toPosition,
        color: piece.color,
        newPiece: 'queen'
      });
    }
    
    // Verificar jaque o jaque mate
    const opponentColor = piece.color === 'white' ? 'black' : 'white';
    
    if (this.isKingInCheck(opponentColor)) {
      this.notifyObservers('check', { color: opponentColor });
      
      if (this.isCheckmate(opponentColor)) {
        this.notifyObservers('checkmate', { winner: piece.color, loser: opponentColor });
      }
    } else if (this.isStalemate(opponentColor)) {
      this.notifyObservers('stalemate', {});
    }
    
    return true;
  }
  
  forceMovePiece(fromPosition, toPosition) {
    const piece = this.getSquare(fromPosition);
    if (!piece) return false;
    
    this.board[fromPosition[0]][fromPosition[1]] = null;
    this.board[toPosition[0]][toPosition[1]] = piece;
    piece.position = toPosition;
    
    return true;
  }
  
  undoLastMove() {
    if (this.moveHistory.length === 0) return false;
    
    const lastMove = this.moveHistory.pop();
    const { piece, from, to, captured, isFirstMove } = lastMove;
    
    // Restaurar la pieza a su posición original
    this.board[from[0]][from[1]] = this.board[to[0]][to[1]];
    this.board[from[0]][from[1]].position = from;
    this.board[from[0]][from[1]].hasMoved = !isFirstMove;
    
    // Restaurar la pieza capturada, si la hay
    if (captured) {
      this.board[to[0]][to[1]] = captured;
      this.board[to[0]][to[1]].position = to;
      this.capturedPieces.pop();
    } else {
      this.board[to[0]][to[1]] = null;
    }
    
    // Deshacer el enroque si fue realizado
    if (piece.type === 'king' && Math.abs(to[1] - from[1]) === 2) {
      // Enroque corto
      if (to[1] > from[1]) {
        const rookNewPos = [from[0], from[1] + 1];
        const rookOriginalPos = [from[0], 7];
        const rook = this.getSquare(rookNewPos);
        if (rook && rook.type === 'rook') {
          this.board[rookOriginalPos[0]][rookOriginalPos[1]] = rook;
          this.board[rookOriginalPos[0]][rookOriginalPos[1]].position = rookOriginalPos;
          this.board[rookNewPos[0]][rookNewPos[1]] = null;
          
          this.notifyObservers('castlingUndone', { side: 'kingside', color: piece.color });
        }
      } 
      // Enroque largo
      else {
        const rookNewPos = [from[0], from[1] - 1];
        const rookOriginalPos = [from[0], 0];
        const rook = this.getSquare(rookNewPos);
        if (rook && rook.type === 'rook') {
          this.board[rookOriginalPos[0]][rookOriginalPos[1]] = rook;
          this.board[rookOriginalPos[0]][rookOriginalPos[1]].position = rookOriginalPos;
          this.board[rookNewPos[0]][rookNewPos[1]] = null;
          
          this.notifyObservers('castlingUndone', { side: 'queenside', color: piece.color });
        }
      }
    }
    
    this.notifyObservers('moveUndone', {
      piece: piece,
      from: to, // Nota: from y to están invertidos para el evento de deshacer
      to: from,
      captured: captured
    });
    
    return true;
  }
  
  findKing(color) {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = this.board[row][col];
        if (piece && piece.type === 'king' && piece.color === color) {
          return [row, col];
        }
      }
    }
    return null;
  }
  
  isSquareUnderAttack(position, defendingColor) {
    const attackingColor = defendingColor === 'white' ? 'black' : 'white';
    
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = this.board[row][col];
        if (piece && piece.color === attackingColor) {
          // Para evitar recursión infinita con el rey, usamos una lógica simplificada
          if (piece.type === 'king') {
            const [kingRow, kingCol] = piece.position;
            const [targetRow, targetCol] = position;
            const rowDiff = Math.abs(targetRow - kingRow);
            const colDiff = Math.abs(targetCol - kingCol);
            
            if (rowDiff <= 1 && colDiff <= 1) {
              return true;
            }
          } 
          // Para otras piezas, usamos canMoveTo
          else if (piece.canMoveTo(this, position)) {
            return true;
          }
        }
      }
    }
    
    return false;
  }
  
  isKingInCheck(color) {
    const kingPosition = this.findKing(color);
    if (!kingPosition) return false;
    
    return this.isSquareUnderAttack(kingPosition, color);
  }
  
  isCheckmate(color) {
    if (!this.isKingInCheck(color)) return false;
    
    // Verificar si hay algún movimiento posible que saque al rey del jaque
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = this.board[row][col];
        if (piece && piece.color === color) {
          const validMoves = piece.getValidMoves(this);
          for (const move of validMoves) {
            const simulatedBoard = this.clone();
            simulatedBoard.forceMovePiece([row, col], move);
            if (!simulatedBoard.isKingInCheck(color)) {
              return false;
            }
          }
        }
      }
    }
    
    return true;
  }
  
  isStalemate(color) {
    if (this.isKingInCheck(color)) return false;
    
    // Verificar si hay algún movimiento legal para cualquier pieza
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = this.board[row][col];
        if (piece && piece.color === color) {
          const validMoves = piece.getValidMoves(this);
          for (const move of validMoves) {
            const simulatedBoard = this.clone();
            simulatedBoard.forceMovePiece([row, col], move);
            if (!simulatedBoard.isKingInCheck(color)) {
              return false;
            }
          }
        }
      }
    }
    
    return true;
  }
  
  clone() {
    const clonedBoard = new ChessBoard();
    
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = this.board[row][col];
        if (piece) {
          clonedBoard.board[row][col] = piece.clone();
        } else {
          clonedBoard.board[row][col] = null;
        }
      }
    }
    
    return clonedBoard;
  }
  
  getAllPieces() {
    const pieces = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = this.board[row][col];
        if (piece) {
          pieces.push({
            piece: piece,
            position: [row, col]
          });
        }
      }
    }
    return pieces;
  }
  
  getPiecesByColor(color) {
    return this.getAllPieces().filter(item => item.piece.color === color);
  }
  
  // Método para convertir posición [fila, columna] a notación algebraica
  positionToAlgebraic(position) {
    const [row, col] = position;
    const file = String.fromCharCode(97 + col); // a-h
    const rank = 8 - row; // 1-8
    return `${file}${rank}`;
  }
  
  // Método para convertir notación algebraica a posición [fila, columna]
  algebraicToPosition(algebraic) {
    const file = algebraic.charCodeAt(0) - 97; // a-h -> 0-7
    const rank = 8 - parseInt(algebraic.charAt(1)); // 1-8 -> 7-0
    return [rank, file];
  }
  
  // Método para obtener historial de movimientos en notación algebraica
  getMoveHistory() {
    return this.moveHistory.map(move => {
      const from = this.positionToAlgebraic(move.from);
      const to = this.positionToAlgebraic(move.to);
      return `${move.piece.getSymbol()} ${from}-${to}`;
    });
  }
}

// ----- GESTOR DEL JUEGO (Singleton Pattern) -----

class ChessGameManager {
  constructor() {
    if (ChessGameManager.instance) {
      return ChessGameManager.instance;
    }
    
    this.board = new ChessBoard();
    this.currentPlayer = 'white';
    this.gameStatus = 'not_started'; // 'not_started', 'in_progress', 'checkmate', 'stalemate', 'draw'
    this.selectedPiece = null;
    this.commandHistory = []; // Para Command Pattern
    
    // Configurar observadores
    this.board.addObserver(this);
    
    ChessGameManager.instance = this;
  }
  
  // Observer Pattern - Método llamado por el tablero
  update(event, data) {
    switch (event) {
      case 'check':
        console.log(`¡${data.color.toUpperCase()} está en jaque!`);
        break;
      case 'checkmate':
        console.log(`¡Jaque mate! ${data.winner.toUpperCase()} gana.`);
        this.gameStatus = 'checkmate';
        break;
      case 'stalemate':
        console.log('¡Tablas por ahogado!');
        this.gameStatus = 'stalemate';
        break;
      case 'pieceMoved':
        // Cambiar el turno después de cada movimiento
        this.currentPlayer = this.currentPlayer === 'white' ? 'black' : 'white';
        break;
    }
    
    // Notificar a la UI si está registrada
    if (this.uiManager) {
      this.uiManager.update(event, data);
    }
  }
  
  startNewGame() {
    this.board = new ChessBoard();
    this.board.addObserver(this);
    this.board.initialize();
    this.currentPlayer = 'white';
    this.gameStatus = 'in_progress';
    this.selectedPiece = null;
    this.commandHistory = [];
    
    console.log('¡Nuevo juego iniciado!');
    
    // Notificar a la UI
    if (this.uiManager) {
      this.uiManager.update('gameStarted', {});
    }
  }
  
  executeMove(fromPosition, toPosition) {
    if (this.gameStatus !== 'in_progress') {
      console.log('El juego no está en progreso.');
      return false;
    }
    
    const piece = this.board.getSquare(fromPosition);
    
    if (!piece) {
      console.log('No hay pieza en la posición seleccionada.');
      return false;
    }
    
    if (piece.color !== this.currentPlayer) {
      console.log(`No es el turno de ${piece.color}.`);
      return false;
    }
    
    // Usando Command Pattern
    const moveCommand = new MoveCommand(this.board, fromPosition, toPosition);
    const success = moveCommand.execute();
    
    if (success) {
      this.commandHistory.push(moveCommand);
      return true;
    }
    
    return false;
  }
  
  undoLastMove() {
    if (this.commandHistory.length === 0) {
      console.log('No hay movimientos para deshacer.');
      return false;
    }
    
    const lastCommand = this.commandHistory.pop();
    const success = lastCommand.undo();
    
    if (success) {
      // Cambiar el turno nuevamente ya que se deshizo un movimiento
      this.currentPlayer = this.currentPlayer === 'white' ? 'black' : 'white';
      return true;
    }
    
    return false;
  }
  
  isGameOver() {
    return this.gameStatus === 'checkmate' || 
           this.gameStatus === 'stalemate' || 
           this.gameStatus === 'draw';
  }
  
  registerUI(uiManager) {
    this.uiManager = uiManager;
  }
  
  // Método para obtener movimientos legales para una pieza
  getLegalMovesForPiece(position) {
    const piece = this.board.getSquare(position);
    if (!piece || piece.color !== this.currentPlayer) {
      return [];
    }
    
    const potentialMoves = piece.getValidMoves(this.board);
    const legalMoves = [];
    
    // Verificar que el movimiento no deja al rey en jaque
    for (const move of potentialMoves) {
      const simulatedBoard = this.board.clone();
      simulatedBoard.forceMovePiece(position, move);
      
      if (!simulatedBoard.isKingInCheck(piece.color)) {
        legalMoves.push(move);
      }
    }
    
    return legalMoves;
  }
  
  // Método para seleccionar una pieza
  selectPiece(position) {
    const piece = this.board.getSquare(position);
    
    if (!piece) {
      this.selectedPiece = null;
      return null;
    }
    
    if (piece.color !== this.currentPlayer) {
      console.log(`No es el turno de ${piece.color}.`);
      return null;
    }
    
    this.selectedPiece = {
      piece: piece,
      position: position,
      legalMoves: this.getLegalMovesForPiece(position)
    };
    
    return this.selectedPiece;
  }
  
  // Método para mover la pieza seleccionada
  moveSelectedPiece(toPosition) {
    if (!this.selectedPiece) {
      console.log('No hay pieza seleccionada.');
      return false;
    }
    
    const success = this.executeMove(this.selectedPiece.position, toPosition);
    
    if (success) {
      this.selectedPiece = null;
      return true;
    }
    
    return false;
  }
}

// ----- INTERFAZ DE USUARIO (Segregación de Interfaces) -----

class ChessUIManager {
  constructor(gameManager, containerId) {
    this.gameManager = gameManager;
    this.container = document.getElementById(containerId);
    this.boardElement = null;
    this.statusElement = null;
    this.historyElement = null;
    this.selectedSquare = null;
    this.highlightedSquares = [];
    
    // Registrar la interfaz con el gestor del juego
    this.gameManager.registerUI(this);
  }
  
  initialize() {
    // Crear estructura básica de la UI
    this.container.innerHTML = `
      <div class="chess-game">
        <div class="chess-board-container">
          <div id="chess-board" class="chess-board"></div>
        </div>
        <div class="chess-sidebar">
          <div id="chess-status" class="chess-status">
            <h2>Ajedrez</h2>
            <p>Turno: <span id="current-player">Blancas</span></p>
            <p id="game-status">Esperando para iniciar</p>
          </div>
          <div class="chess-controls">
            <button id="new-game-btn">Nuevo Juego</button>
            <button id="undo-btn">Deshacer Movimiento</button>
          </div>
          <div id="move-history" class="move-history">
            <h3>Historial de Movimientos</h3>
            <ol id="moves-list"></ol>
          </div>
        </div>
      </div>
    `;
    
    // Obtener referencias a los elementos del DOM
    this.boardElement = document.getElementById('chess-board');
    this.statusElement = document.getElementById('chess-status');
    this.historyElement = document.getElementById('moves-list');
    
    // Configurar controladores de eventos
    document.getElementById('new-game-btn').addEventListener('click', () => {
      this.gameManager.startNewGame();
    });
    
    document.getElementById('undo-btn').addEventListener('click', () => {
      this.gameManager.undoLastMove();
    });
    
    // Inicializar el tablero
    this.createBoardUI();
  }
  
  createBoardUI() {
    this.boardElement.innerHTML = '';
    
    // Crear casillas del tablero
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const square = document.createElement('div');
        square.className = 'chess-square';
        square.classList.add((row + col) % 2 === 0 ? 'light' : 'dark');
        square.dataset.row = row;
        square.dataset.col = col;
        
        // Añadir notación algebraica
        if (col === 0) {
          const rankLabel = document.createElement('span');
          rankLabel.className = 'rank-label';
          rankLabel.textContent = 8 - row;
          square.appendChild(rankLabel);
        }
        
        if (row === 7) {
          const fileLabel = document.createElement('span');
          fileLabel.className = 'file-label';
          fileLabel.textContent = String.fromCharCode(97 + col);
          square.appendChild(fileLabel);
        }
        
        // Manejar eventos de click
        square.addEventListener('click', () => this.handleSquareClick(row, col));
        
        this.boardElement.appendChild(square);
      }
    }
    
    // Aplicar cuadrícula CSS
    this.boardElement.style.gridTemplateRows = `repeat(8, 1fr)`;
    this.boardElement.style.gridTemplateColumns = `repeat(8, 1fr)`;
    
    // Actualizar piezas
    this.updateBoard();
  }
  
  updateBoard() {
    // Limpiar piezas existentes
    const pieceElements = this.boardElement.querySelectorAll('.chess-piece');
    pieceElements.forEach(piece => piece.remove());
    
    // Actualizar cada casilla
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = this.gameManager.board.getSquare([row, col]);
        if (piece) {
          const pieceElement = document.createElement('div');
          pieceElement.className = `chess-piece ${piece.color}`;
          pieceElement.textContent = piece.getSymbol();
          
          const square = this.getSquareElement(row, col);
          if (square) {
            square.appendChild(pieceElement);
          }
        }
      }
    }
    
    // Actualizar información de estado
    this.updateStatus();
  }
  
  getSquareElement(row, col) {
    return this.boardElement.querySelector(`.chess-square[data-row="${row}"][data-col="${col}"]`);
  }
  
  clearHighlights() {
    this.highlightedSquares.forEach(position => {
      const [row, col] = position;
      const square = this.getSquareElement(row, col);
      if (square) {
        square.classList.remove('highlighted', 'selected');
      }
    });
    
    this.highlightedSquares = [];
    this.selectedSquare = null;
  }
  
  highlightSquare(row, col, type = 'highlighted') {
    const square = this.getSquareElement(row, col);
    if (square) {
      square.classList.add(type);
      this.highlightedSquares.push([row, col]);
    }
  }
  
  handleSquareClick(row, col) {
    const position = [row, col];
    const piece = this.gameManager.board.getSquare(position);
    
    // Si ya hay una pieza seleccionada
    if (this.selectedSquare) {
      // Intentar mover la pieza seleccionada
      if (this.gameManager.moveSelectedPiece(position)) {
        this.clearHighlights();
        this.updateBoard();
      } 
      // Si hay una pieza del jugador actual en la casilla clickeada, seleccionarla
      else if (piece && piece.color === this.gameManager.currentPlayer) {
        this.clearHighlights();
        this.selectSquare(row, col);
      }
      // Si es una casilla vacía o una pieza enemiga y no es un movimiento válido
      else {
        this.clearHighlights();
      }
    } 
    // Si no hay pieza seleccionada y se hace click en una pieza del jugador actual
    else if (piece && piece.color === this.gameManager.currentPlayer) {
      this.selectSquare(row, col);
    }
  }
  
  selectSquare(row, col) {
    const selected = this.gameManager.selectPiece([row, col]);
    if (selected) {
      this.selectedSquare = [row, col];
      this.highlightSquare(row, col, 'selected');
      
      // Resaltar movimientos legales
      selected.legalMoves.forEach(move => {
        this.highlightSquare(move[0], move[1]);
      });
    }
  }
  
  updateStatus() {
    const currentPlayerElement = document.getElementById('current-player');
    const gameStatusElement = document.getElementById('game-status');
    
    if (currentPlayerElement) {
      currentPlayerElement.textContent = this.gameManager.currentPlayer === 'white' ? 'Blancas' : 'Negras';
    }
    
    if (gameStatusElement) {
      let statusText = 'En progreso';
      
      switch (this.gameManager.gameStatus) {
        case 'not_started':
          statusText = 'Esperando para iniciar';
          break;
        case 'checkmate':
          const winner = this.gameManager.currentPlayer === 'white' ? 'Negras' : 'Blancas';
          statusText = `¡Jaque mate! ${winner} ganan`;
          break;
        case 'stalemate':
          statusText = '¡Tablas por ahogado!';
          break;
        case 'draw':
          statusText = '¡Tablas!';
          break;
      }
      
      gameStatusElement.textContent = statusText;
    }
    
    // Actualizar historial de movimientos
    this.updateMoveHistory();
  }
  
  updateMoveHistory() {
    if (!this.historyElement) return;
    
    const moveHistory = this.gameManager.board.getMoveHistory();
    this.historyElement.innerHTML = '';
    
    moveHistory.forEach((moveText, index) => {
      const moveItem = document.createElement('li');
      moveItem.textContent = `${Math.floor(index/2) + 1}. ${moveText}`;
      this.historyElement.appendChild(moveItem);
    });
    
    // Desplazar al último movimiento
    this.historyElement.scrollTop = this.historyElement.scrollHeight;
  }
  
  // Observer Pattern - Método llamado por el gestor del juego
  update(event, data) {
    switch (event) {
      case 'gameStarted':
        this.clearHighlights();
        this.updateBoard();
        break;
      case 'pieceMoved':
      case 'moveUndone':
      case 'check':
      case 'checkmate':
      case 'stalemate':
        this.updateBoard();
        break;
    }
  }
}

// ----- ESTILOS CSS PARA EL AJEDREZ -----

// Función para agregar estilos CSS a la página
function addChessStyles() {
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    .chess-game {
      display: flex;
      font-family: Arial, sans-serif;
      max-width: 900px;
      margin: 0 auto;
    }
    
    .chess-board-container {
      flex: 0 0 500px;
    }
    
    .chess-board {
      display: grid;
      width: 500px;
      height: 500px;
      border: 2px solid #333;
      position: relative;
    }
    
    .chess-square {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .chess-square.light {
      background-color: #f0d9b5;
    }
    
    .chess-square.dark {
      background-color: #b58863;
    }
    
    .chess-square.highlighted {
      background-color: rgba(155, 199, 0, 0.6);
    }
    
    .chess-square.selected {
      background-color: rgba(30, 150, 200, 0.6);
    }
    
    .chess-piece {
      font-size: 40px;
      cursor: pointer;
      z-index: 10;
    }
    
    .rank-label, .file-label {
      position: absolute;
      font-size: 12px;
      color: #555;
    }
    
    .rank-label {
      left: 3px;
      top: 3px;
    }
    
    .file-label {
      right: 3px;
      bottom: 3px;
    }
    
    .chess-sidebar {
      flex: 1;
      padding: 0 20px;
    }
    
    .chess-status {
      margin-bottom: 20px;
    }
    
    .chess-controls {
      margin-bottom: 20px;
    }
    
    .chess-controls button {
      padding: 8px 16px;
      margin-right: 10px;
      background-color: #4a4a4a;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .chess-controls button:hover {
      background-color: #2c2c2c;
    }
    
    .move-history {
      border: 1px solid #ddd;
      padding: 10px;
      height: 200px;
      overflow-y: auto;
    }
  `;
  
  document.head.appendChild(styleElement);
}

// ----- INICIALIZACIÓN DEL JUEGO -----

function initChessGame(containerId) {
  // Agregar estilos CSS
  addChessStyles();
  
  // Crear instancia del gestor del juego (singleton)
  const gameManager = new ChessGameManager();
  
  // Crear interfaz de usuario
  const uiManager = new ChessUIManager(gameManager, containerId);
  uiManager.initialize();
  
  // Iniciar nuevo juego
  gameManager.startNewGame();
  
  return {
    gameManager,
    uiManager
  };
}

// ----- USO DEL JUEGO -----

// Ejemplo de uso:
// document.addEventListener('DOMContentLoaded', () => {
//   const chess = initChessGame('chess-container');
// });
