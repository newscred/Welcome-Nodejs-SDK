# Errors

There are a few cases when Welcome API server is expected to return error response. The SDK provides custom Error classes for these cases so that you can logically handle them.

The Custom Error classes extends the JS built-in Error class with the following additional properties,

- `code`: HTTP Error code returned from _Welcome_ API server
- `responseBody`: The JSON response returned from _Welcome_ API server. This object contains a `message` field and optionally additional information about the error.

The SDK provides the following Error classes,

- `BadRequest` (_400_)
- `Unauthorized` (_401_)
- `Forbidden` (_403_)
- `NotFound` (_404_)
- `UnprocessableEntity` (_422_)

You can import these classes from "welcome-sdk/errors".

Example,

```js
import { BadRequest, Unauthorized, Forbidden, NotFound, UnprocessableEntity } from "welcome-sdk/lib/errors";

const updateWelcomeTask = async (taskId, payload) => {
  try {
    const updatedTask = await welcomeClient.task.updateTask(taskId, payload);
    return { response: updatedTask, code: 200, message: "successfully updated the task" };
  } catch (err) {
    if (err instanceof BadRequest) {
      // your payload contains unsupported argument
      // do your custom logic
    }
    if (err instanceof Unauthorized) {
      // your access token is invalid.
      // If "enableAutoRetry" is set to true, then your refresh token is also invalid
      // do your custom logic
    }
    if (err instanceof Forbidden) {
      // you do not have permission to do the operation
      // do your custom logic
    }
    if (err instanceof NotFound) {
      // the resource is not found
      // do your custom logic
    }
    if (err instanceof UnprocessableEntity) {
      // the request is not processable
      // do your custom logic
    }

    return { response: err.responseBody, code: err.code, message: err.message }
  }
}

```