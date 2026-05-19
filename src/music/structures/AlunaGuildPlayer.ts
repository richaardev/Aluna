import { formatCurrentTime } from "@/utils/formatDuration";

import { Player } from "lavalink-client";

export default class AlunaGuildPlayer extends Player {
  public currentBassBoostLevel = 0;

  async setBassboost(gain: number, level: number) {
    const bands = Array(4)
      .fill(0)
      .map((_, i) => ({ band: i, gain }));

    await this.filterManager.setEQ(bands);
    this.currentBassBoostLevel = level;

    return level;
  }

  async clearBassboost() {
    await this.filterManager.clearEQ();
    this.currentBassBoostLevel = 0;
  }

  get currentTime(): string {
    return formatCurrentTime(this.position);
  }
}
