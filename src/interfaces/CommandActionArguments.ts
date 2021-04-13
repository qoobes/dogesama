import { Message } from "@dogehouse/kebab";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Instance = any;

export default interface CommandActionArguments {
  userId: string;
  parameters: string;
  instance: Instance;
  msg: Message;
}
