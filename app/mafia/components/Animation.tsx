import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React, { HTMLAttributes } from "react";

// Props
interface AnimationProps extends HTMLAttributes<HTMLElement> {
  src: string;
  loop?: boolean;
  autoplay?: boolean;
}

const Animation: React.FC<AnimationProps> = (props) => {
  return <DotLottieReact {...props} />;
};

export default Animation;
