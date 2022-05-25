import React from "react";
import GameUtil from "../Utility/GameUtil";
import GameInfo from "./GameInfo";
import Board from "./Board";
import GameOver from "./GameOver";

 class Game extends React.Component {
    constructor(props) {
      super(props);
      this.gameInitialize();
    }

    gameInitialize() {
      const gameUtil = new GameUtil(this.props.size);
      const gameBoard = gameUtil.GenerateBoard();
      this.state = {
        board: gameBoard,
        ships: gameUtil.ships,
        shipBlocksRevealed: 0,
        totalShipBlocks: gameUtil.totalShipBlocks,
        totalShootCount: 0,
        gameOver: false,
      };
    }

    handleCellClick(cell) {
      if (cell.isSelected) {
        return;
      }

      let selectedItem = { ...cell };
      selectedItem.isSelected = true;

      let board = [...this.state.board];
      board[cell.coordinates.x][cell.coordinates.y] = selectedItem;

      let totalShootCount = this.state.totalShootCount;
      totalShootCount += 1;

      let shipBlocksRevealed = this.state.shipBlocksRevealed;
      let ships = this.state.ships;

      if (selectedItem.isShip) {
        shipBlocksRevealed += 1;

        for (let ship of ships) {
          let isBreak = false;
          for (let shipCell of ship.points) {
            if (
              shipCell.x === cell.coordinates.x &&
              shipCell.y === cell.coordinates.y
            ) {
              shipCell.isRevealed = true;
              isBreak = true;
              break;
            }
          }
          if (isBreak) {
            break;
          }
        }
      }

      this.setState({
        ships: ships,
        board: board,
        shipBlocksRevealed: shipBlocksRevealed,
        totalShootCount: totalShootCount,
      });

      if (shipBlocksRevealed === this.state.totalShipBlocks) {
        this.setState({
          gameOver: true,
        });
      }
    }

    handlePlayAgain() {
      this.gameInitialize();

      this.setState(this.state);
    }

    render() {
      return (
        <div className="game">
          <div className="heading">
            <h1>Battleship</h1>
          </div>
          <div className="container">
            <div className="row row-reverse">
              <div className="game-board col-sm-12 col-lg-8">
                <Board
                  board={this.state.board}
                  onCellClick={(cell) => this.handleCellClick(cell)}
                />
              </div>
              <GameInfo ships={this.state.ships} />
            </div>
          </div>
          {this.state.gameOver && (
            <GameOver
              game={this.state}
              onPlayAgain={() => this.handlePlayAgain()}
            />
          )}
        </div>
      );
    }
  }


  export default Game;
