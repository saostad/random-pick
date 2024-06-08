import React, { useState, useEffect } from "react";
import { useGameContext } from "../contexts/GameContext";
import CarbonView from "~icons/carbon/view";
import CarbonViewOff from "~icons/carbon/view-off";
import CarbonNextOutline from "~icons/carbon/next-outline";
import CarbonPreviousOutline from "~icons/carbon/previous-outline";
import { useSwipeable } from "react-swipeable";
import predefinedRoles from "../data/predefinedRoles";
import { CldImage } from "next-cloudinary";

const PlayerRoleCarousel: React.FC = () => {
  const { gameState } = useGameContext();
  const { players, gameRoles } = gameState;
  const [showRole, setShowRole] = useState<boolean[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setShowRole(new Array(players.length).fill(false));
  }, [players]);

  const handleToggleRole = (index: number) => {
    setShowRole((prevShowRole) => {
      const newShowRole = prevShowRole.map((val, i) =>
        i === index ? !val : false
      );
      return newShowRole;
    });
  };

  const handleNext = () => {
    setShowRole(new Array(players.length).fill(false)); // Hide all roles
    setCurrentIndex((prevIndex) => (prevIndex + 1) % players.length);
  };

  const handlePrevious = () => {
    setShowRole(new Array(players.length).fill(false)); // Hide all roles
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? players.length - 1 : prevIndex - 1
    );
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrevious,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  function getRoleName(roleId: string | undefined) {
    return (
      gameRoles.find((role) => role.id === roleId)?.name || "No role assigned"
    );
  }

  function getPersianRoleName(roleId: string | undefined) {
    return (
      gameRoles.find((role) => role.id === roleId)?.persianName ||
      "نقشی انتخاب نشده است"
    );
  }

  function getRoleImage(roleId: string | undefined) {
    const role = gameRoles.find((role) => role.id === roleId);
    if (!role) return null;
    const predefRole = predefinedRoles.find(
      (item) => item.id === role.preDefinedRoleId
    );

    return predefRole?.image;
  }

  function getRoleDescription(roleId: string | undefined) {
    const role = gameRoles.find((role) => role.id === roleId);

    if (!role) return null;
    const predefRole = predefinedRoles.find(
      (item) => item.id === role.preDefinedRoleId
    );

    return predefRole?.description;
  }

  return (
    <div
      {...swipeHandlers}
      className="carousel carousel-center w-full p-4 space-x-4 bg-neutral rounded-box"
    >
      {players.map((player, index) => (
        <div
          key={player.id}
          className={`carousel-item w-full transition-transform duration-500 transform ${
            index === currentIndex ? "block" : "hidden"
          }`}
        >
          <div className="card bg-base-100 shadow-xl mx-auto">
            <div className="card-body">
              <div className="card-title font-bold text-3xl">{player.name}</div>
              {showRole[index] ? (
                <>
                  <div className="font-bold text-xl mt-2">
                    {getRoleName(player.roleId)} -{" "}
                    {getPersianRoleName(player.roleId)}
                  </div>

                  {!getRoleImage(player.roleId) ? null : (
                    <CldImage
                      className="m-0"
                      src={getRoleImage(player.roleId) || ""}
                      alt={""}
                      width="214"
                      height="123"
                    />
                  )}

                  {!getRoleDescription(player.roleId) ? null : (
                    <div className="collapse bg-base-200">
                      <input type="checkbox" />
                      <div className="collapse-title text-xl font-medium">
                        Details
                      </div>
                      <div className="collapse-content">
                        {getRoleDescription(player.roleId)}
                      </div>
                    </div>
                  )}

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
                  className="btn btn-ghost btn-outline min-w-24 btn-secondary"
                  onClick={handlePrevious}
                >
                  Prev <CarbonPreviousOutline />
                </button>
                <button
                  className="btn btn-ghost btn-outline min-w-24 btn-secondary"
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
