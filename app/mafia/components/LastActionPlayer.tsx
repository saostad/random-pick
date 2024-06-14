import { useState } from "react";
import { LastActType, useGameContext } from "../contexts/GameContext";
import Animation from "./Animation";

const LastActionPlayer: React.FC = () => {
  const { gameState } = useGameContext();
  const { lastActions } = gameState;

  const [randomCard, setRandomCard] = useState<LastActType>();
  return (
    <>
      <p>Last Action for Player X</p>
      <div className="collapse bg-base-200">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">
          Click me to show/hide content
        </div>
        <div className="collapse-content">
          cards in the game:
          <ul>
            {lastActions.map((action) => (
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
        </div>
      </div>

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
      <Animation
        className=""
        src="mafia/animation/random.lottie"
        loop={true}
        autoplay={true}
      />
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
