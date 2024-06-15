import { useState } from "react";
import { LastActType, useGameContext } from "../contexts/GameContext";
import Animation from "./Animation";
import { useModal } from "../contexts/ModalContext";

const LastActionPlayer: React.FC = () => {
  const { gameState, setVotingStatus, updateGameState } = useGameContext();
  const { lastActions, playedLastActions } = gameState;

  const { handleClose } = useModal();

  const [randomCardVisible, setRandomCardVisible] = useState(false);
  const [animationVisible, setAnimationVisible] = useState(false);

  const [randomCard, setRandomCard] = useState<LastActType>();

  const stillInGameLastActions = lastActions.filter(
    (action) => !playedLastActions.includes(action.id)
  );

  function shuffleActions() {
    // shuffle cards and assign one
    const [randomCard] = stillInGameLastActions
      .map((el) => el)
      .sort(() => 0.5 - Math.random());

    setRandomCard(randomCard);

    setAnimationVisible(true);
    setTimeout(() => {
      setAnimationVisible(false);
      setRandomCardVisible(true);

      // remove action from available actions in game state
      updateGameState({
        playedLastActions: [...gameState.playedLastActions, randomCard.id],
      });
    }, 3000);
  }

  function performAction() {
    setAnimationVisible(false);
    setRandomCardVisible(false);
    setVotingStatus("finished");
    handleClose("LastActionPlayer");
  }

  return (
    <>
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
            {stillInGameLastActions.map((action) => (
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

      {stillInGameLastActions.length === 0 ? (
        <div className="flex flex-col gap-4">
          <span>No action card available!</span>
          <button
            className="btn btn-info btn-outline"
            onClick={() => {
              setVotingStatus("finished");
              handleClose("LastActionPlayer");
            }}
          >
            Go to next step
          </button>
        </div>
      ) : (
        <button
          className="btn btn-secondary btn-outline"
          disabled={randomCardVisible}
          onClick={shuffleActions}
        >
          Shuffle Cards
        </button>
      )}
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
            className="btn btn-primary btn-outline"
            onClick={performAction}
          >
            Action Performed!
          </button>
        </>
      )}
    </>
  );
};

export default LastActionPlayer;
