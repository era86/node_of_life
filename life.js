var createBoard = function(attrs) {
  attrs = attrs || {};
  var dimY = attrs['dimY'] || 40;
  var dimX = attrs['dimX'] || 160;
  var dead = attrs['dead'] || ' ';
  var alive = attrs['alive'] || '.';

  var board = [];
  var fillBoard = function(c) {
    for (var y = 0; y < dimY; y += 1) {
      board[y] = [];
      for (var x = 0; x < dimX; x += 1) {
        board[y][x] = c;
      }
    }
  }

  var evalCell = function(x,y) {
    var cell = board[y][x];
    var count = 0;

    for (var i = -1; i < 2; i += 1) {
      for (var j = -1; j < 2; j += 1) {
        if (y+i !== 0 && x+j !== 0) {
          try {
            if (board[y+i][x+j] === alive) {
              count += 1;
            }
          } catch(err) {}
        }
      }
    }

    if (cell === alive) {
      if (count < 2 || count > 3) {
        return dead;
      } else if (count === 2 || count === 3) {
        return alive;
      }
    } else {
      if (count === 3) {
        return alive;
      }
    }

    return cell;
  }

  fillBoard(dead);

  return {
    showBoard: function() {
      for (var y = 0; y < board.length; y += 1) {
        console.log(board[y].join(''));
      }
    },

    liveStep: function() {
      for (var y = 0; y < dimY; y += 1) {
        for (var x = 0; x < dimX; x += 1) {
          board[y][x] = evalCell(x,y);
        }
      }
    },

    createLife: function(x,y) {
      board[y][x] = alive;
    }
  };
};

var b = createBoard();

b.createLife(13,14);
b.createLife(12,14);
b.createLife(12,15);
b.createLife(11,15);
b.createLife(11,18);
b.createLife(10,16);
b.createLife(10,18);

setInterval(function(){
  console.log('\033[2J');
  b.showBoard();
  b.liveStep();
}, 50);

