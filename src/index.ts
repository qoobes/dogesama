/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { raw, stringToToken, tokensToString, wrap } from "@dogehouse/kebab";
import dotenv from "dotenv";
import { speak } from "./commands/tts";
import CompileCommands from "./CompileCommands";

dotenv.config();

const commandRegex = /^\/([^ ]+) ?(.*)$/;
const main = async () => {
  try {
    const instance = wrap(
      await raw.connect(
        process.env.DOGEHOUSE_TOKEN!,
        process.env.DOGEHOUSE_REFRESH_TOKEN!,
        {
          onConnectionTaken: () => {
            console.error(
              "\n \n existing connection... retrying in 10 seconds"
            );
            process.exit();
          },
        }
      )
    );

    const commands = await CompileCommands();

    const audio = speak();
    console.log(audio);

    console.info(
      `commands: \n ${commands.map(command =>
        command ? " " + command.name : null
      )}`
    );

    instance.subscribe.newChatMsg(async ({ userId, msg }) => {
      console.info(`=> ${msg.username} said ${tokensToString(msg.tokens)}`);

      const text = tokensToString(msg.tokens);

      if (userId === instance.connection.user.id) return;

      const [, command, parameters] = commandRegex.exec(text) ?? ["", ""];

      const commandToRun = commands.find(comm => comm && comm.name === command);
      if (!commandToRun || !commandToRun.action) return;

      const result = commandToRun.action({ userId, parameters, instance, msg });

      console.info(`=> ${msg.username} used /${command}`);

      await instance.mutation.sendRoomChatMsg(stringToToken(result.message));
    });

    console.info(`=> joining your default room`);
    await instance.query.joinRoomAndGetInfo(process.env.DEFAULT_ROOM ?? "");
  } catch (e) {
    if (e.code === 4001) console.error("invalid token!");
    console.error(e);
  }
};

main();
