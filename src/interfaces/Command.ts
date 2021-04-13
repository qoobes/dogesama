import CommandActionReturnInterface from "./CommandActionReturnInterface";

export default interface Command {
  name: string;
  description: string;
  action: ({
    userId,
    parameters,
  }: {
    userId: string;
    parameters: string;
  }) => CommandActionReturnInterface;

  isOwnerOnly?: boolean;
}
