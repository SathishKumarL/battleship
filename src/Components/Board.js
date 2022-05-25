import Cell from "./Cell";
export default function Board(props) {
    return (
      <div className="board">
        {props.board.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((cell, colIndex) => (
              <Cell
                key={rowIndex + "" + colIndex}
                onCellClick={() => props.onCellClick(cell)}
                cell={cell}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }