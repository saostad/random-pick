import { useState } from "react";
import { LastActType, useGameContext } from "../contexts/GameContext";

const LastActionPlayer: React.FC = () => {
  const { gameState } = useGameContext();
  const { lastActions } = gameState;

  const [randomCard, setRandomCard] = useState<LastActType>();
  return (
    <>
      <p>Last Action for Player X</p>
      cards in the game:
      <ul>
        {lastActions.map((action, index) => (
          <li key={action.id}>
            <div
              className="tooltip tooltip-right"
              data-tip={action.description}
            >
              {action.title}
            </div>
          </li>
        ))}
      </ul>
      <div className="divider"></div>
      <button
        className="btn btn-secondary btn-outline"
        onClick={() => {
          // shuffle cards and assign one
          const [randomCard] = lastActions
            .map((el) => el)
            .sort(() => 0.5 - Math.random());

          setRandomCard(randomCard);
        }}
      >
        Shuffle cards and assign one
      </button>
      {randomCard && (
        <div className="my-4">
          <p className="font-bold text-xl">{randomCard.title}</p>
          <p>{randomCard.description}</p>
        </div>
      )}
    </>
  );
};

export default LastActionPlayer;
