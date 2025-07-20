import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Loader() {
  return (
    <div className="loader__section">
      <div className="loader__wrapper">
         <DotLottieReact
      src="https://lottie.host/c8af7019-c66f-462c-b4bc-77d2768699bc/pBd9RJFP0U.lottie"
      loop
      autoplay
    />
      </div>
    </div>
  );
}
