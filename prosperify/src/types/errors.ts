export type ErrorWithMessage = { message: string };

export function isErrorWithMessage(err: unknown): err is ErrorWithMessage {
  return typeof err === 'object' && err !== null && 'message' in err && typeof (err as any).message === 'string';
}
