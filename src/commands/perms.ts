import CommandActionArguments from "src/interfaces/CommandActionArguments";
import CommandActionReturnInterface from "../interfaces/CommandActionReturnInterface";

const action = ({
  instance,
  parameters,
}: CommandActionArguments): CommandActionReturnInterface => {
  instance.mutation.askToSpeak();

  switch (parameters) {
    case "check":
      break;
  }

  return {
    success: true,
    message: "Please accept the speak request",
  };
};

export default {
  action,
  name: "perms",
  description: "The bot asks for permission to speak",
};
