export class MissingPersonAlreadyRegisteredError extends Error {
  constructor() {
    super('Missing Person already registered.')
  }
}
