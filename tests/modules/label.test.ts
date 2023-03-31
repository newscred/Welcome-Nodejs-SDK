import { Label } from "../../src/modules/label";
import { APICaller } from "../../src/modules/api-caller";
import { Auth } from "../../src/modules/auth";
import { LabelGroupList } from "../../src/objects/label-group-list";
import * as nock from "nock";

describe("Label module", () => {
  const accessTokenMock = jest.fn().mockResolvedValue("some-access-token");
  const auth = new Auth({
    accessToken: accessTokenMock,
    refreshToken: "some-refresh-token",
  });
  const apiCaller = new APICaller(auth, true);
  const labelModule = new Label(apiCaller);

  const WELCOME_API_BASE_URL = "https://api.welcomesoftware.com/v3";
  const tokenGetParam = { user: "123" };

  const labelGroups = [
    {
      id: "9b2cbeedf0d4e6f8a13ae445ae041fd2",
      name: "Campaign Pillars",
      source_org_type: "current",
      values: [
        {
          id: "9f247e009cc4ce65ee517072a0c1532a",
          name: "Life",
        },
        {
          id: "b98cb3b2b95923d55eadf03d43376732",
          name: "Style",
        },
        {
          id: "8b62040264204107d76bf0d6aee5b0bb",
          name: "Trending",
        },
      ],
    },
    {
      id: "5d934148296b98fc1facd6838c32a5d1",
      name: "Content Format",
      source_org_type: "current",
      values: [
        {
          id: "6d6dbfa6971c56a2f603e017e9d3eade",
          name: "Photography",
        },
        {
          id: "157b3f28d8996ff22c882208e475b1e5",
          name: "Video",
        },
      ],
    },
    {
      id: "6f77c5351dce6133faa3f25779dc52bd",
      name: "Content Pillar",
      source_org_type: "current",
      values: [
        {
          id: "bdb9461f2d11f7521c21055e97e5033a",
          name: "Style",
        },
        {
          id: "58744713fd3c3ef9905e6a47d649343d",
          name: "How-To",
        },
      ],
    },
    {
      id: "1a848fdf2b9dbc62ec813ea5bec84cef",
      name: "Customer Segment",
      source_org_type: "current",
      values: [
        {
          id: "2e6cce9bd341bdf55b00d7bc03e77836",
          name: "SMB medium",
        },
        {
          id: "132dfad562ec3dd1f8f8711bf68e93a0",
          name: "SMB small",
        },
      ],
    },
    {
      id: "8d0a062430d911ecadce3e9de803b3dc",
      name: "Distribution Channel",
      source_org_type: "current",
      values: [
        {
          id: "8d0aeddc30d911ecadce3e9de803b3dc",
          name: "3rd Party Website",
        },
        {
          id: "8d0c6cc030d911ecadce3e9de803b3dc",
          name: "Email",
        },
      ],
    },
    {
      id: "b8ea59924ed8e3e348368ccb7076984a",
      name: "Distribution Media Channel",
      source_org_type: "current",
      values: [
        {
          id: "81c2d85696d796a79f1e67b1fadf1b8c",
          name: "Organic Search",
        },
        {
          id: "db88258ea0c93162a95a187cbc31bb20",
          name: "Paid Search",
        },
      ],
    },
    {
      id: "8893d5bb0a59057db1e2e56dcda06b2d",
      name: "Journey Stage",
      source_org_type: "current",
      values: [
        {
          id: "b32c03aad9c811ec839ea2de04797e30",
          name: "Begin",
        },
      ],
    },
    {
      id: "6b6ddd216bb0e58988ac74f2f592b37c",
      name: "Legacy Campaigns",
      source_org_type: "current",
      values: [
        {
          id: "dedbf67c35590dc0c7884b630e2edf6f",
          name: "Hello campaign",
        },
      ],
    },
    {
      id: "116782a2bff011ec95ba9e257a1bec33",
      name: "Primary",
      source_org_type: "current",
      values: [
        {
          id: "116c2334bff011ec95ba9e257a1bec33",
          name: "Yes",
        },
        {
          id: "1178ac12bff011ec95ba9e257a1bec33",
          name: "No",
        },
      ],
    },
    {
      id: "487f1214433de9736b11207be2322625",
      name: "Publishing Destination",
      source_org_type: "current",
      values: [
        {
          id: "99b3b8ebd707f8a58c71ce9dc2407828",
          name: "Prosper and Thrive",
        },
        {
          id: "76aceaa75d1f423362f2c218232f946f",
          name: "Business Banking",
        },
        {
          id: "531ea758fa47cfce8a9fbce3d319bcef",
          name: "Feed",
        },
      ],
    },
  ];

  afterEach(() => {
    jest.clearAllMocks();
    nock.cleanAll();
  });

  it("should get the label groups without needing any filters", async () => {
    const scope = nock(WELCOME_API_BASE_URL, {
      reqheaders: {
        authorization: "Bearer some-access-token",
      },
    })
      .get("/label-groups")
      .reply(200, {
        data: labelGroups,
        pagination: {
          next: "https://api.welcomesoftware.com/v3/label-groups?offset=10&page_size=10",
          previous: null,
        },
      });

    const labelGroup = await labelModule.getLabelGroups(
      undefined,
      tokenGetParam
    );

    const expectedData = labelGroups.map((label) => {
      const { source_org_type, ...rest } = label;
      return { ...rest, sourceOrgType: source_org_type };
    });

    expect(scope.isDone()).toBe(true);
    expect(accessTokenMock).toBeCalledWith(tokenGetParam);
    expect(labelGroup).toBeInstanceOf(LabelGroupList);
    expect(labelGroup).toEqual({ data: expectedData });
  });

  it("should get all the label groups filtered by sourceOrgType", async () => {
    const scope = nock(WELCOME_API_BASE_URL, {
      reqheaders: {
        authorization: "Bearer some-access-token",
      },
    })
      .get("/label-groups")
      .query({ source_org_type: "current" })
      .reply(200, {
        data: labelGroups,
        pagination: {
          next: "https://api.welcomesoftware.com/v3/label-groups?offset=10&page_size=10",
          previous: null,
        },
      });

    const labelGroup = await labelModule.getLabelGroups(
      { sourceOrgType: "current" },
      tokenGetParam
    );

    const expectedData = labelGroups.map((label) => {
      const { source_org_type, ...rest } = label;
      return { ...rest, sourceOrgType: source_org_type };
    });

    expect(scope.isDone()).toBe(true);
    expect(accessTokenMock).toBeCalledWith(tokenGetParam);
    expect(labelGroup).toBeInstanceOf(LabelGroupList);
    expect(labelGroup).toEqual({ data: expectedData });
  });

  it("should get all the label groups with correct pagination passed", async () => {
    const scope = nock(WELCOME_API_BASE_URL, {
      reqheaders: {
        authorization: "Bearer some-access-token",
      },
    })
      .get("/label-groups")
      .query({ offset: 3, page_size: 3 })
      .reply(200, {
        data: labelGroups.slice(3, 6),
        pagination: {
          next: "https://api.welcomesoftware.com/v3/label-groups?offset=6&page_size=3",
          previous:
            "https://api.welcomesoftware.com/v3/label-groups?offset=0&page_size=3",
        },
      });

    const labelGroup = await labelModule.getLabelGroups(
      { offset: 3, pageSize: 3 },
      tokenGetParam
    );

    const expectedData = labelGroups.slice(3, 6).map((label) => {
      const { source_org_type, ...rest } = label;
      return { ...rest, sourceOrgType: source_org_type };
    });

    expect(scope.isDone()).toBe(true);
    expect(accessTokenMock).toBeCalledWith(tokenGetParam);
    expect(labelGroup).toBeInstanceOf(LabelGroupList);
    expect(labelGroup).toEqual({ data: expectedData });
  });
});
