export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly API_TOKEN: string
    }
  }
}
