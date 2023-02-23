# Campaign

The `campaign` module provides functionality to work with Campaigns in _Welcome_. The module provides the following methods.

## `getCampaignById`

**_parameters:_**

- campaignId: string
- tokenGetParam: any (optional)

**_returns:_** Promise<[Campaign](../objects/Campaign.md)>

Gets a campaign by its id.

## `getCampaignBrief`

**_parameters:_**

- campaignId: string
- tokenGetParam: any (optional)

**_returns:_** Promise<[CampaignBrief](../objects/CampaignBrief.md)>

Gets the brief of the campaign specified by the id
