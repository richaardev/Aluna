import moment from "moment";
import "moment-duration-format";

export function formatDuration(milliseconds: number, isStream = false): string {
  if (isStream) return "∞";
  
  const duration = moment.duration(milliseconds);
  return duration.format(`${milliseconds >= 3600000 ? "hh:" : ""}mm:ss`, {
    trim: false,
  });
}

export function formatCurrentTime(milliseconds: number): string {
  return moment.duration(milliseconds).format(`${milliseconds >= 3600000 ? "hh:" : ""}mm:ss`, {
    trim: false,
  });
}
