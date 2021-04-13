import CommandActionArguments from "src/interfaces/CommandActionArguments";
import CommandActionReturnInterface from "../interfaces/CommandActionReturnInterface";

const action = ({
  parameters,
  instance,
  msg,
}: CommandActionArguments): CommandActionReturnInterface => {
  console.log(process.env.OWNER_USERNAME);
  if (msg.username !== process.env.OWNER_USERNAME)
    return { success: false, message: "Insufficient Permissions" };

  try {
    if (!parameters) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      instance.query.getTopPublicRooms().then((rooms: any) => {
        console.log(rooms);
        if (!rooms.rooms[0]) return;
        instance.query.joinRoomAndGetInfo(rooms.rooms[0].id);
      });
    } else {
      instance.query.joinRoomAndGetInfo(parameters);
    }
  } catch (e) {
    console.error(e);
    return { success: false, message: "An error has occured" };
  }

  return {
    success: true,
    message: "im goin places honey",
  };
};

export default {
  action,
  name: "goto",
  description: "going somewhere",
};
