### Label

The `label` module provides functionality to work with Labels in _Welcome_. The module provides the following methods.

## `getLabelGroups`

**_parameters:_**

- filter: object (optional)
- tokenGetParam: any (optional)

**_returns:_** Promise<[LabelGroupList](../objects/LabelGroupList.md)>

Fetches the available Label groups in your Welcome instance. The first parameter `filter` is an `object` to filter the label groups. The `filter` object can have any of the following properties:

* `sourceOrgType`: `'current'` | `'related'`
* `offset`: `number`
* `pageSize`: `number`
