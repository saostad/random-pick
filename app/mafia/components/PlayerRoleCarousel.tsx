import React, { useState, useEffect } from "react";
import { useGameContext } from "../contexts/GameContext";
import CarbonView from "~icons/carbon/view";
import CarbonViewOff from "~icons/carbon/view-off";
import CarbonNextOutline from "~icons/carbon/next-outline";
import CarbonPreviousOutline from "~icons/carbon/previous-outline";

const PlayerRoleCarousel: React.FC = () => {
  const { gameState } = useGameContext();
  const [showRole, setShowRole] = useState<boolean[]>(
    new Array(gameState.players.length).fill(false)
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleToggleRole = (index: number) => {
    setShowRole((prevShowRole) => {
      const newShowRole = prevShowRole.map((val, i) =>
        i === index ? !val : false
      );
      return newShowRole;
    });
  };

  const handleNext = () => {
    setShowRole(new Array(gameState.players.length).fill(false)); // Hide all roles
    setCurrentIndex((prevIndex) => (prevIndex + 1) % gameState.players.length);
  };

  const handlePrevious = () => {
    setShowRole(new Array(gameState.players.length).fill(false)); // Hide all roles
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? gameState.players.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="carousel carousel-center w-full p-4 space-x-4 bg-neutral rounded-box">
      {gameState.players.map((player, index) => (
        <div
          key={player.id}
          className={`carousel-item w-full ${
            index === currentIndex ? "block" : "hidden"
          }`}
        >
          <div className="card bg-base-100 shadow-xl mx-auto">
            <div className="card-body">
              <h2 className="card-title">{player.name}</h2>
              {showRole[index] ? (
                <>
                  <p className="font-bold underline">
                    {player.roleId
                      ? gameState.gameRoles.find(
                          (role) => role.id === player.roleId
                        )?.name
                      : "No role assigned"}
                  </p>
                  <button
                    className="btn btn-ghost btn-outline btn-primary mt-4"
                    onClick={() => handleToggleRole(index)}
                  >
                    Got it! <CarbonViewOff />
                  </button>
                </>
              ) : (
                <>
                  <div className="skeleton w-full h-8 mb-4"></div>
                  <button
                    className="btn btn-ghost btn-outline btn-primary mt-4"
                    onClick={() => handleToggleRole(index)}
                  >
                    Show Role <CarbonView />
                  </button>
                </>
              )}
              <div className="card-actions justify-between mt-4">
                <button
                  className="btn btn-ghost btn-outline btn-sm btn-secondary"
                  onClick={handlePrevious}
                >
                  Previous <CarbonPreviousOutline />
                </button>
                <button
                  className="btn btn-ghost btn-outline btn-sm btn-secondary"
                  onClick={handleNext}
                >
                  Next <CarbonNextOutline />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayerRoleCarousel;
