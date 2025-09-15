export type AnyRecord = Record<string, unknown>;

export type GenericHandler<T = AnyRecord> = (data: T) => void;

export type PdfHandlerData = {
  url: string;
  name?: string;
} | AnyRecord;
