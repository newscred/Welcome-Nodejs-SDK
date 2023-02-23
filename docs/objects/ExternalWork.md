# ExternalWork

**_properties:_**

| property       | type           |
| -------------- | -------------- |
| identifier     | string \| null |
| title          | string \| null |
| status         | string \| null |
| url            | string \| null |
| externalSystem | \| string      |

**_methods:_**

## `update`

**_parameters:_**

- payload: object

**_returns:_** Promise\<null\>

Sends a patch request to the server and if successful, performs an inplace update of the ExternalWork object. The `payload` parameter is an object that can have any of the following properties:

* `identifier`: `string` | `null`
* `title`: `string` | `null`
* `status`: `string` | `null`
* `url`: `string` | `null`
