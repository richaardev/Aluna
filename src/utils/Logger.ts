import {
  bgBlueBright,
  bgGreenBright,
  bgRed,
  bgYellowBright,
  black,
  blueBright,
  greenBright,
  red,
  yellow,
  yellowBright,
} from "chalk";
import moment from "moment";

export default class Logger {
  static get currentTime() {
    return `${yellow(moment(Date.now()).format("[[]DD/MM/YYYY hh:mm:ss[]]"))}`;
  }

  static generateLog(logType: string, message: any) {
    console.log(`${Logger.currentTime} ${logType}: ${message}`);
  }

  static warn(message: any): void {
    Logger.generateLog(bgYellowBright(black("[WARN]")), yellowBright(message));
  }

  static error(message: any, isFatal?: boolean) {
    Logger.generateLog(bgRed(black(isFatal ? "[FATAL ERROR]" : "[ERROR]")), red(message));
  }

  static debug(message: any) {
    if (process.env.production === "true") return;
    Logger.generateLog(bgBlueBright(black("[DEBUG]")), blueBright(message));
  }

  static info(message: any) {
    Logger.generateLog(bgGreenBright(black("[INFO]")), greenBright(message));
  }
}
