import inspect from "object-inspect";

export class Logger {
  log(...data: any[]): void {
    console.log(data);
  }

  error(...data: any[]): void {
    console.error(inspect(data));
  }
}

export const logger = new Logger();
