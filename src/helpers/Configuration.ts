import { DotenvParseOutput, config } from "dotenv";

export interface IConfiguration {
  get(key: string): string;
}

export class Configuration implements IConfiguration {
  private readonly _parsed?: DotenvParseOutput;

  constructor() {
    const { error, parsed } = config();

    if (error) {
      throw new Error(".env file is missing");
    }

    this._parsed = parsed;
  }

  get(key: string): string {
    const value = this._parsed?.[key];

    if (!value) {
      throw new Error(`Value with key "${key}" is not assigned`);
    }

    return value;
  }
}
