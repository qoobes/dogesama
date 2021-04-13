import CommandActionArguments from "./CommandActionArguments";
import CommandActionReturnInterface from "./CommandActionReturnInterface";

export default interface Command {
  name: string;
  description: string;
  action: ({
    userId,
    parameters,
    instance,
    msg,
  }: CommandActionArguments) => CommandActionReturnInterface;

  isOwnerOnly?: boolean;
}
