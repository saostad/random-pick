import { CldImage } from "next-cloudinary";

const GameMode: React.FC = () => {
  return (
    <div className="flex justify-center">
      <label className="swap swap-flip text-lg">
        {/* this hidden checkbox controls the state */}
        <input
          type="checkbox"
          onChange={(e) => {
            if (e.target.checked) {
              // set game mode to pro
              console.log(
                `File: GameMode.tsx,`,
                `Line: 13 => `,
                `Game mode set to pro`
              );
            } else {
              // set game mode to nob
              console.log(
                `File: GameMode.tsx,`,
                `Line: 17 => `,
                `Game mode set to nob`
              );
            }
          }}
        />

        <div className="swap-on">Pro 😈</div>
        <div className="swap-off">Nob 😇</div>
      </label>
    </div>
  );
};

export default GameMode;
