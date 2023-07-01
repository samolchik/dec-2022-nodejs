import { CronJob } from "cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { Token } from "../models";

dayjs.extend(utc);

const tokensRemover = async () => {
  const previousMonth = dayjs().utc().subtract(30, "days");

  await Token.deleteMany({
    createdAt: {
      $lte: previousMonth,
    },
  });
};

export const removeOldToken = new CronJob("* * * * *", tokensRemover);
