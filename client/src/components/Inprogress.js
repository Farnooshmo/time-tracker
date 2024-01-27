import InputTodo from "./InputTodo";
import TaskStartTimer from "./TaskStartTimer";
import playerPlay from "../assets/playerPlay.svg";
import StopTimer from "./StopTimer";

const Inprogress = () => {
  const inProgressDuration = "01:12:45";
  return (
    <div className="in-progress">
      <div>
        <img src={playerPlay} alt="Player Logo" />
        <p>in progress:</p>
        <h3>{inProgressDuration}</h3>
      </div>
      <p>Time tracker</p>
      <TaskStartTimer />
      <StopTimer />
      <InputTodo />
    </div>
  );
};

export default Inprogress;
