# CustomField

**_properties:_**

| property | type                                                                                                                                                                                       |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| id       | string                                                                                                                                                                                     |
| name     | string                                                                                                                                                                                     |
| type     | one of: `"text_field"`, `"multi_line_text_field"`, `"checkboxes"`, `"dropdown"`, `"multi_select_dropdown"`, `"multiple_choice"`, `"date_field"`, `"image"`, `"video"`, `"rich_text_field"` |
| values   | { name; string; value: string }[]                                                                                                                                                          |

**_methods:_**

## `getChoices`

**_parameters:_**

- option: object

**_returns:_** Promise\<object\>

Gets the possible choices for the field. The `option` parameter is an object which can have any of the following properties,

* `pageSize`: `number`
* `offset`: `number`
