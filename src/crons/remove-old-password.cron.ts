import { CronJob } from "cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { OldPassword } from "../models";

dayjs.extend(utc);

const passwordsRemover = async () => {
  const previousYear = dayjs().utc().subtract(1, "year");

  await OldPassword.deleteMany({
    createdAt: {
      $lte: previousYear,
    },
  });
};

export const removeOldPassword = new CronJob("0 0 * * *", passwordsRemover); //один раз на добу
