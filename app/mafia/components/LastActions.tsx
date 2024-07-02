import { useState } from "react";
import { LastActType, useGameContext } from "../contexts/GameContext";
import PredefinedLastActions from "./PredefinedLastActions";
import LastActionsSuggestion from "./LastActionsSuggestion";
import { useTranslations } from "next-intl";

interface LastActCardsProps extends React.HTMLAttributes<HTMLDivElement> {}

const LastActCards: React.FC<LastActCardsProps> = (props) => {
  const { gameState, updateGameState } = useGameContext();
  const { lastActions, lastActionsActive } = gameState;
  const [newLastAct, setNewLastAct] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "addItem" | "predefinedItems" | "suggestItems"
  >("suggestItems");

  const handleAddLastAct = () => {
    if (!newLastAct) {
      setError("Please enter a last act");
      return;
    }

    updateGameState({
      lastActions: [
        ...lastActions,
        {
          title: newLastAct,
          description: "",
          descriptionFa: "",
          id: Date.now().toString(),
          titleFa: "",
        },
      ],
    });

    setNewLastAct("");
  };

  const handleRemove = (lastAct: LastActType) => {
    updateGameState({
      lastActions: lastActions.filter((act) => act.id !== lastAct.id),
    });
  };

  function handleUpdate(lastAct: LastActType, value: string): void {
    const updatedLastAct = { ...lastAct, title: value };
    const updatedLastActCards = lastActions.map((act) =>
      act.id === lastAct.id ? updatedLastAct : act
    );
    updateGameState({ lastActions: updatedLastActCards });
  }

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateGameState({
      lastActionsActive: event.target.checked,
    });
  };

  const t = useTranslations("Mafia");

  return (
    <div {...props}>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">{t("lastActionsCards")}</span>
          <input
            type="checkbox"
            checked={lastActionsActive}
            onChange={handleToggle}
            className="checkbox checkbox-primary"
          />
        </label>
      </div>
      {lastActionsActive && (
        <>
          <div className="flex justify-center">
            <div className="join mb-4">
              <input
                className={`join-item btn ${
                  activeTab === "addItem" ? "btn-active btn-primary" : ""
                }`}
                type="radio"
                name="options"
                aria-label="Add Action"
                checked={activeTab === "addItem"}
                onChange={() => setActiveTab("addItem")}
              />
              <input
                className={`join-item btn ${
                  activeTab === "suggestItems" ? "btn-active btn-primary" : ""
                }`}
                type="radio"
                name="options"
                aria-label="Suggest"
                checked={activeTab === "suggestItems"}
                onChange={() => setActiveTab("suggestItems")}
              />
              <input
                className={`join-item btn ${
                  activeTab === "predefinedItems"
                    ? "btn-active btn-primary"
                    : ""
                }`}
                type="radio"
                name="options"
                aria-label="Predefined"
                checked={activeTab === "predefinedItems"}
                onChange={() => setActiveTab("predefinedItems")}
              />
            </div>
          </div>

          {activeTab === "addItem" && (
            <div>
              <input
                type="text"
                className="input input-bordered input-primary w-full max-w-xs mb-2"
                value={newLastAct}
                onChange={(e) => setNewLastAct(e.target.value)}
              />
              <button
                className="btn btn-primary btn-outline"
                onClick={handleAddLastAct}
              >
                {t("addAction")}
              </button>
              {error && <p className="text-error">{error}</p>}
            </div>
          )}

          {activeTab === "predefinedItems" && <PredefinedLastActions />}

          {activeTab === "suggestItems" && <LastActionsSuggestion />}

          <div className="divider"></div>

          {lastActions.map((lastAct, index) => (
            <div key={lastAct.id}>
              <div className="flex justify-between my-2">
                <input
                  type="text"
                  className="input input-bordered w-full max-w-sm mr-4"
                  value={lastAct.title}
                  onChange={(e) => handleUpdate(lastAct, e.target.value)}
                  placeholder="Tag name"
                />

                <button
                  onClick={() => handleRemove(lastAct)}
                  className="btn btn-circle btn-outline btn-error"
                >
                  &#x2715;
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default LastActCards;
