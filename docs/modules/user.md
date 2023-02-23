# User

The `user` module provides functionality to fetch a _Welcome_ user. The module provides the following methods.

## `getUserById`

**_parameters:_**

- userId: string
- tokenGetParam: any (optional)

**_returns:_** Promise<[User](../objects/User.md)>

Gets the user by the id

## `getUserByEmail`

**_parameters:_**

- email: string
- tokenGetParam: any (optional)

**_returns:_** Promise<[User](../objects/User.md)>

Gets the user with the matching email address
