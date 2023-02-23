# Campaign

**_properties:_**

| property    | type                        |
| ----------- | --------------------------- |
| id          | string                      |
| title       | string                      |
| description | string \| null              |
| startDate   | Date \| null                |
| endDate     | Date \| null                |
| isHidden    | boolean                     |
| referenceId | string                      |
| budget      | [Budget](./Budget.md) \| null   |
| labels      | [Label](./Label.md)[] \| null |

**_methods:_**

## `getBrief`

**_parameteres:_** _(None)_

**_returns:_** Promise<[CampaignBrief](./CampaignBrief.md) | null>

Gets the campaigns brief if it has one.

## `getOwner`

**_parameteres:_** _(None)_

**_returns:_** Promise<[User](./User.md) | null>

Gets the campaigns owner. If the campaign has no owner, it will return `null` promise.

## `getChildCampaigns`

**_parameteres:_** _(None)_

**_returns:_** Promise<[Campaign](#campaign)[]>

Gets the child campaigns of the campaign.

## `getParentCampaign`

**_parameteres:_** _(None)_

**_returns:_** Promise<[Campaign](#campaign) | null>

Gets the parent campaign of the campaign.
