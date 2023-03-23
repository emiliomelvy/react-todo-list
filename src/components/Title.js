import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
const Title = () => {
  return (
    <div className="flex justify-center gap-5 pt-10">
      <FontAwesomeIcon
        icon={faCheckCircle}
        className="text-cyan-500 text-5xl my-auto"
      />
      <h1 className="text-cyan-500 text-5xl">My Todo-s</h1>
    </div>
  );
};

export default Title;
