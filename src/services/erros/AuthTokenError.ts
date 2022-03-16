export class AuthTokenError extends Error {
  constructor() {
    super('Error na auteticação do token');
  }
}
