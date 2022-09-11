/** Generic custom error class meant to be extended */
class CustomError extends Error {
  code: number;

  constructor(message: string, className = 'CustomError', code = -1) {
    super(message);
    this.name = className;
    this.stack = this.cleanStacktrace(this.stack || '');
    this.code = code;
  }
  
  /**
   * Scrubs references to node_modules from stacktrace to make it more readable
   */
  private cleanStacktrace(stack: string) {
    const newStack = stack.split(/\n/g).filter((line, i) => i == 0 || !line.match(/node_modules/));
    return newStack.join('\n');
  }
}

export class MessengerError extends CustomError {
  constructor(message: string, code?: number) {
    super(message, 'MessengerError', code);
  }
}