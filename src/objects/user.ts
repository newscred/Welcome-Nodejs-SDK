interface UserData {
  id: string,
  firstName: string,
  lastName: string,
  fullName: string,
  email: string,
}

export class User {
  id!: string
  firstName!: string
  lastName!: string
  fullName!: string
  email!: string

  constructor(data: UserData) {
    Object.assign(this, data);
  }
}
