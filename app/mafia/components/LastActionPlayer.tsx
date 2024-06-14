import { useState } from "react";
import { LastActType, useGameContext } from "../contexts/GameContext";
import Animation from "./Animation";
import { useModal } from "../contexts/ModalContext";

const LastActionPlayer: React.FC = () => {
  const { gameState, setVotingStatus } = useGameContext();
  const { lastActions } = gameState;

  const { handleClose } = useModal();

  const [randomCardVisible, setRandomCardVisible] = useState(false);
  const [animationVisible, setAnimationVisible] = useState(false);

  const [randomCard, setRandomCard] = useState<LastActType>();

  return (
    <>
      <p className="text-xl font-bold my-4">
        Player <span className="underline">X</span>
      </p>
      <div className="collapse bg-base-200">
        <input
          type="checkbox"
          checked={!randomCardVisible}
          onChange={() => {}}
        />
        <div className="collapse-title text-xl font-medium">
          Available Cards
        </div>
        <div className="collapse-content">
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
        disabled={randomCardVisible}
        onClick={() => {
          // shuffle cards and assign one
          const [randomCard] = lastActions
            .map((el) => el)
            .sort(() => 0.5 - Math.random());

          setRandomCard(randomCard);

          setAnimationVisible(true);
          setTimeout(() => {
            setAnimationVisible(false);
            setRandomCardVisible(true);
          }, 3000);
        }}
      >
        Shuffle Cards
      </button>
      {animationVisible && (
        <Animation
          className=""
          src="mafia/animation/random.lottie"
          loop={true}
          autoplay={true}
        />
      )}
      {randomCardVisible && (
        <>
          <div className="my-4">
            <p className="font-bold text-xl">{randomCard?.title}</p>
            <p>{randomCard?.description}</p>
          </div>

          <button
            className="btn btn-primary"
            onClick={() => {
              setVotingStatus("finished");
              handleClose("LastActionPlayer");
            }}
          >
            Action Performed!
          </button>
        </>
      )}
    </>
  );
};

export default LastActionPlayer;
