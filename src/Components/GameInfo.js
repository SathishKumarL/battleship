export default function GameInfo(props) {
    return (
      <div className="game-info col-sm-12 col-lg-4">
        <p>Sink all ships by clicking on grid</p>
        <div className="ship-info">
          {props.ships.map((ship, index) => (
            <div className="ship-item" key={index}>
              {ship.points.map((cell, cellIndex) => (
                <div key={cellIndex}
                  className={
                    "ship-block " + (cell.isRevealed ? "revealed " : "")
                  }
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }