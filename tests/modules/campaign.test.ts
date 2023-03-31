import { Campaign } from "../../src/modules/campaign";
import { Campaign as CampaignObject } from "../../src/objects/campaign";
import { CampaignBrief } from "../../src/objects/campaign-brief";
import { APICaller } from "../../src/modules/api-caller";
import { Auth } from "../../src/modules/auth";
import * as nock from "nock";

describe("Campaign module", () => {
  const accessTokenMock = jest.fn().mockResolvedValue("some-access-token");
  const auth = new Auth({
    accessToken: accessTokenMock,
    refreshToken: "some-refresh-token",
  });
  const apiCaller = new APICaller(auth, true);
  const campaignModule = new Campaign(apiCaller);

  const WELCOME_API_BASE_URL = "https://api.welcomesoftware.com/v3";
  const tokenGetParam = { user: "123" };

  afterEach(() => {
    jest.clearAllMocks();
    nock.cleanAll();
  });

  it("should get the campaign by its ID", async () => {
    const campaignResponseFromWelcomeAPI = {
      id: "8q7f910551b00a722e0418830cee6612",
      title: "The awesome campaign",
      description: "The awesome campaign's description",
      start_date: "2019-10-06",
      end_date: "2019-10-16",
      is_hidden: false,
      status: "On Track",
      reference_id: "CPN-1589",
      budget: {
        currency_code: "USD",
        budgeted_amount: "1000.50",
      },
      labels: [
        {
          group: {
            id: "2467e583a60e23fda2b89db81a453cd2",
            name: "Content Format",
          },
          values: [
            {
              id: "71c378f3fee3d822759d1bdc2aab628c",
              name: "Photos",
            },
          ],
        },
      ],
      links: {
        self: "https://api.welcomesoftware.com/v3/campaigns/8q7f910551b00a722e0418830cee6612",
        brief:
          "https://api.welcomesoftware.com/v3/campaigns/8q7f910551b00a722e0418830cee6612/brief",
        owner: "https://api.newscred.com/v3/users/6ea1bf781398c3147393arr1",
        parent_campaign:
          "https://api.welcomesoftware.com/v3/campaigns/7u7f910551b00a722e0418830cee6643",
        child_campaigns: [
          "https://api.newscred.com/v3/campaigns/6fb21acf987094513ecb4b58",
        ],
      },
    };
    const scope = nock(WELCOME_API_BASE_URL, {
      reqheaders: {
        authorization: "Bearer some-access-token",
      },
    })
      .get("/campaigns/8q7f910551b00a722e0418830cee6612")
      .reply(200, campaignResponseFromWelcomeAPI);

    const campaign = await campaignModule.getCampaignById(
      "8q7f910551b00a722e0418830cee6612",
      tokenGetParam
    );

    expect(scope.isDone()).toBe(true);
    expect(accessTokenMock).toBeCalledWith(tokenGetParam);
    expect(campaign).toBeInstanceOf(CampaignObject);
    expect(campaign).toEqual({
      id: "8q7f910551b00a722e0418830cee6612",
      title: "The awesome campaign",
      description: "The awesome campaign's description",
      startDate: new Date("2019-10-06"),
      endDate: new Date("2019-10-16"),
      isHidden: false,
      status: "On Track",
      referenceId: "CPN-1589",
      budget: {
        currencyCode: "USD",
        budgetedAmount: "1000.50",
      },
      labels: [
        {
          group: {
            id: "2467e583a60e23fda2b89db81a453cd2",
            name: "Content Format",
          },
          values: [
            {
              id: "71c378f3fee3d822759d1bdc2aab628c",
              name: "Photos",
            },
          ],
        },
      ],
    });
  });

  it("should get the brief of a campaign by campaign ID", async () => {
    const campaignBriefResponseFromWelcomeAPI = {
      type: "template",
      title: "Awesome Campaign Brief",
      template: {
        id: "9nu8ue9wf8u9nusd9f",
        name: "My Template",
      },
      fields: [
        {
          name: "My Dropdown",
          value: ["option 1"],
        },
      ],
      links: {
        self: "https://api.welcomesoftware.com/v3/campaigns/5f857f30e1c4a2038d6179e9/brief",
        campaign:
          "https://api.welcomesoftware.com/v3/campaigns/5f857f30e1c4a2038d6179e9",
      },
    };

    const scope = nock(WELCOME_API_BASE_URL, {
      reqheaders: {
        authorization: "Bearer some-access-token",
      },
    })
      .get("/campaigns/8q7f910551b00a722e0418830cee6612/brief")
      .reply(200, campaignBriefResponseFromWelcomeAPI);

    const campaignBrief = await campaignModule.getCampaignBrief(
      "8q7f910551b00a722e0418830cee6612",
      tokenGetParam
    );

    expect(scope.isDone()).toBe(true);
    expect(accessTokenMock).toBeCalledWith(tokenGetParam);
    expect(campaignBrief).toBeInstanceOf(CampaignBrief);
    expect(campaignBrief).toEqual({
      type: "template",
      title: "Awesome Campaign Brief",
      template: {
        id: "9nu8ue9wf8u9nusd9f",
        name: "My Template",
      },
      fields: [
        {
          name: "My Dropdown",
          value: ["option 1"],
        },
      ],
    });
  });
});
