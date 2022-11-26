export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string | null;
  links: {
    self: string;
  };
}

export interface User extends UserData {}
export class User {
  #links: UserData['links'];

  constructor(data: UserData) {
    const { links, ...other } = data;
    this.#links = links;
    Object.assign(this, other);
  }

  getRelatedLinks() {
    return this.#links;
  }
}
