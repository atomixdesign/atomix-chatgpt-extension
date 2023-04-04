export type OpenAIStream = (
  stream: ReadableStream<Uint8Array>,
) => ReadableStream<Uint8Array>;
