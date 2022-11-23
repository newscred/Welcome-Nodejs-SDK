export interface UserData {
  id: string,
  firstName: string,
  lastName: string,
  fullName: string,
  email: string | null,
}

export class User {
  id!: string
  firstName!: string
  lastName!: string
  fullName!: string
  email!: string | null

  constructor(data: UserData) {
    // TODO
    Object.assign(this, data);
  }
}
