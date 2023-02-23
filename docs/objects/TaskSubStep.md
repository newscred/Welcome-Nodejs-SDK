# TaskSubStep

| property     | type           |
| ------------ | -------------- |
| id           | string         |
| title        | string         |
| assigneeId   | string \| null |
| isCompleted  | boolean        |
| isInProgress | boolean        |
| isSkipped    | boolean        |
| isExternal   | boolean        |

**_methods:_**

## `update`

**_parameters:_**

- payload: object

**_returns:_** Promise\<void\>

Sends a patch request to Welcome, and if successful, performs a in-place update of the substep. The `payload` parameter is an object that can have one of the following properties:

`assigneeId: string | null; isCompleted: true; isInProgress: true;`

## `getExternalWork`

**_parameters:_** (None)

**_returns:_** Promise<[ExternalWork](./ExternalWork.md) | null>

Gets the ExternalWork for the substep if the substep is an external substep else returns a `null` promise.

## `getAssignee`

**_parameters:_** (None)

**_returns:_** Promise<[User](./User.md) | null>

Gets the user who is assigned to the substep. If no one is assigned to the step, it will return a `null` promise.
