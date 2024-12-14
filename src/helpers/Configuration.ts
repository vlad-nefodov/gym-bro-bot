import { DotenvParseOutput, config } from "dotenv";

export interface IConfiguration {
  get(key: string): string;
}

interface ProcessEnv {
  [key: string]: string | undefined;
}

export class Configuration implements IConfiguration {
  private readonly env: ProcessEnv;

  constructor() {
    this.env =
      process.env.NODE_ENV === "production" ? process.env : this.getDevEnv();
  }

  private getDevEnv(): ProcessEnv {
    const { error, parsed } = config();

    if (error) {
      throw new Error(".env file is missing");
    }

    return parsed as ProcessEnv;
  }

  public get(key: string): string {
    const value = this.env?.[key];

    if (!value) {
      throw new Error(`Value with key "${key}" is not assigned`);
    }

    return value;
  }
}
