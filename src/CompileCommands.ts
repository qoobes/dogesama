/* eslint-disable @typescript-eslint/no-var-requires */
import fs from "fs/promises";
import path from "path";
import Command from "./interfaces/Command";

const CompileCommands = async (): Promise<Array<Command>> => {
  const files = await fs.readdir(path.join("src", "commands"));

  const commands = files.map((file) => {
    if (!file.endsWith(".ts")) return;

    const command = require(path.join(__dirname, "commands", file));
    return command.default;
  });

  return commands;
};

export default CompileCommands;
