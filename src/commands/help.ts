/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import fs from "fs";
import path from "path";
import Command from "src/interfaces/Command";
import CommandActionArguments from "src/interfaces/CommandActionArguments";
import CommandActionReturnInterface from "../interfaces/CommandActionReturnInterface";

const action = ({
  parameters,
}: CommandActionArguments): CommandActionReturnInterface => {
  const files = fs.readdirSync(__dirname);

  if (!files) return { success: true, message: "no commands" };
  if (!parameters) {
    const commands = files.map((file: string) => {
      if (!file.endsWith(".ts")) return;

      const command = require(path.join(__dirname, file));
      return command.default;
    });

    const message = `My commands are: ${commands.map(
      command => " " + command.name
    )}`;

    return { success: true, message };
  }

  const commandName = files.find(file => file === parameters + ".ts");
  if (!commandName) return { success: false, message: "Command not found" };

  const command: Command = require(path.join(__dirname, commandName)).default;

  return { success: true, message: `${command.name}: ${command.description}` };
};

const name = "help";
const description = "A list of avialable commands";

export default {
  action,
  name,
  description,
};
