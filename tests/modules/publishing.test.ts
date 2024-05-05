import { Publishing } from "../../src/modules/publishing";
import { APICaller } from "../../src/modules/api-caller";
import { Auth } from "../../src/modules/auth";
import * as nock from "nock";
import { PublishingEvent } from "../../src/objects/publishing-event";
import { PublishingMetadataForAsset } from "../../src/objects/publishing-metadata-for-asset";

describe("Publishing module", () => {
  const accessTokenMock = jest.fn().mockResolvedValue("some-access-token");
  const auth = new Auth({
    accessToken: accessTokenMock,
    refreshToken: "some-refresh-token",
  });
  const apiCaller = new APICaller(auth, true);
  const publishingModule = new Publishing(apiCaller);

  const WELCOME_API_BASE_URL = "https://api.cmp.optimizely.com/v3";
  const tokenGetParam = { user: "123" };
  console.warn = jest.fn;

  afterEach(() => {
    jest.clearAllMocks();
    nock.cleanAll();
  });

  describe("getPublishingEventById", () => {
    it("should get the publishing event by its ID", async () => {
      const publishingEventResponseFromWelcomeAPI = {
        id: "5d7f910551b00a722e0418830cee5534",
        assets: [
          {
            id: "5d7f910551b00a722e0418830cee2212",
            type: "article",
            publishing_metadata: [
              {
                id: "5e46745616s564s4564964",
                links: {
                  self: "https://api.cmp.optimizely.com/v3/publishing-events/5d7f910551b00a722e0418830cee5534/assets/5d7f910551b00a722e0418830cee2212/publishing-metadata/5e46745616s564s4564964",
                },
              },
            ],
            links: {
              self: "https://api.cmp.optimizely.com/v3/articles/5d7f910551b00a722e0418830cee2212",
            },
          },
        ],
        links: {
          self: "https://api.cmp.optimizely.com/v3/publishing-events/5d7f910551b00a722e0418830cee2212",
          publishing_metadata:
            "https://api.cmp.optimizely.com/v3/publishing-events/5d7f910551b00a722e0418830cee5534/publishing-metadata",
        },
      };

      const scope = nock(WELCOME_API_BASE_URL, {
        reqheaders: {
          authorization: "Bearer some-access-token",
        },
      })
        .get("/publishing-events/5d7f910551b00a722e0418830cee5534")
        .reply(200, publishingEventResponseFromWelcomeAPI);

      const publishingEvent = await publishingModule.getPublishingEventById(
        "5d7f910551b00a722e0418830cee5534",
        tokenGetParam
      );

      expect(scope.isDone()).toBe(true);
      expect(accessTokenMock).toBeCalledWith(tokenGetParam);
      expect(publishingEvent).toBeInstanceOf(PublishingEvent);
      expect(publishingEvent).toEqual({
        id: "5d7f910551b00a722e0418830cee5534",
        assets: [
          {
            id: "5d7f910551b00a722e0418830cee2212",
            type: "article",
            publishingMetadata: [
              {
                id: "5e46745616s564s4564964",
              },
            ],
          },
        ],
      });
    });
  });

  describe("getPublishingMetadata", () => {
    it("should get the publishing metadata for the event", async () => {
      const publishingMetadataResponseFromWelcomeAPI = {
        data: [
          {
            id: "5ebcd5644967474414564",
            asset_id: "4567m74974987479856456456",
            asset_type: "article",
            status: "published",
            status_message: "This asset is in review",
            locale: "en",
            public_url: "https://example.com/test",
            publishing_destination_updated_at: "2019-10-06T13:15:30Z",
            links: {
              self: "https://api.cmp.optimizely.com/v3/publishing-events/1d9d8aeca10811ebbc640242ac12001b/assets/1d9d8aeca10811ebbc640242ac12003c/publishing-metadata/5ebcd5644967474414564",
              publishing_event:
                "https://api.cmp.optimizely.com/v3/publishing-events/1d9d8aeca10811ebbc640242ac12001b",
              asset:
                "https://api.cmp.optimizely.com/v3/articles/4567m474974987479856456456",
            },
          },
        ],
      };

      const scope = nock(WELCOME_API_BASE_URL, {
        reqheaders: {
          authorization: "Bearer some-access-token",
        },
      })
        .get(
          "/publishing-events/5d7f910551b00a722e0418830cee5534/publishing-metadata"
        )
        .reply(200, publishingMetadataResponseFromWelcomeAPI);

      const publishingMetadata = await publishingModule.getPublishingMetadata(
        "5d7f910551b00a722e0418830cee5534",
        tokenGetParam
      );

      expect(scope.isDone()).toBe(true);
      expect(accessTokenMock).toBeCalledWith(tokenGetParam);
      expect(publishingMetadata).toHaveProperty("data");
      publishingMetadata.data.forEach((el) =>
        expect(el).toBeInstanceOf(PublishingMetadataForAsset)
      );

      expect(publishingMetadata).toEqual({
        data: [
          {
            id: "5ebcd5644967474414564",
            assetId: "4567m74974987479856456456",
            assetType: "article",
            status: "published",
            statusMessage: "This asset is in review",
            locale: "en",
            publicUrl: "https://example.com/test",
            publishingDestinationUpdatedAt: new Date("2019-10-06T13:15:30Z"),
          },
        ],
      });
    });
  });

  describe("addPublishingMetadata", () => {
    it("should add publishing metadata for an event", async () => {
      const publishingMetadataCreateResponseFromWelcomeAPI = {
        data: [
          {
            id: "5ebcd5644967474414564",
            asset_id: "4567m74974987479856456456",
            asset_type: "article",
            status: "published",
            status_message: "This asset is in review",
            locale: "en",
            public_url: "https://example.com/test",
            publishing_destination_updated_at: "2019-10-06T13:15:30Z",
            links: {
              self: "https://api.cmp.optimizely.com/v3/publishing-events/1d9d8aeca10811ebbc640242ac12001b/assets/1d9d8aeca10811ebbc640242ac12003c/publishing-metadata/5ebcd5644967474414564",
              publishing_event:
                "https://api.cmp.optimizely.com/v3/publishing-events/1d9d8aeca10811ebbc640242ac12001b",
              asset:
                "https://api.cmp.optimizely.com/v3/articles/4567m474974987479856456456",
            },
          },
        ],
        errors: [
          {
            error_code: "canonical-link-error",
            asset_id: "4567m474974987479856456457",
            locale: "en",
            message:
              "Canonical URL already exists for the task article '5e46456144645674564456'",
          },
        ],
      };
      const welcomeAPIExpectedPayload = {
        data: [
          {
            asset_id: "4567m474974987479856456457",
            status: "published",
            status_message: "This asset is in review",
            locale: "en",
            public_url: "https://example.com/test",
            publishing_destination_updated_at: "2019-10-06T13:15:30Z",
          },
        ],
      };
      const scope = nock(WELCOME_API_BASE_URL, {
        reqheaders: {
          authorization: "Bearer some-access-token",
        },
      })
        .post(
          "/publishing-events/5d7f910551b00a722e0418830cee5534/publishing-metadata",
          welcomeAPIExpectedPayload
        )
        .reply(201, publishingMetadataCreateResponseFromWelcomeAPI);

      const publishingMetadata = await publishingModule.addPublishingMetadata(
        "5d7f910551b00a722e0418830cee5534",
        {
          data: [
            {
              assetId: "4567m474974987479856456457",
              status: "published",
              statusMessage: "This asset is in review",
              locale: "en",
              publicUrl: "https://example.com/test",
              publishingDestinationUpdatedAt: "2019-10-06T13:15:30Z",
            },
          ],
        },
        tokenGetParam
      );

      expect(scope.isDone()).toBe(true);
      expect(accessTokenMock).toBeCalledWith(tokenGetParam);
      expect(publishingMetadata).toHaveProperty("data");
      expect(publishingMetadata).toHaveProperty("errors");
      publishingMetadata.data.forEach((el) =>
        expect(el).toBeInstanceOf(PublishingMetadataForAsset)
      );

      expect(publishingMetadata).toEqual({
        data: [
          {
            id: "5ebcd5644967474414564",
            assetId: "4567m74974987479856456456",
            assetType: "article",
            status: "published",
            statusMessage: "This asset is in review",
            locale: "en",
            publicUrl: "https://example.com/test",
            publishingDestinationUpdatedAt: new Date("2019-10-06T13:15:30Z"),
          },
        ],
        errors: [
          {
            errorCode: "canonical-link-error",
            assetId: "4567m474974987479856456457",
            locale: "en",
            message:
              "Canonical URL already exists for the task article '5e46456144645674564456'",
          },
        ],
      });
    });
  });

  describe("getPublishingMetadataForAsset", () => {
    it("shoult get publishing metadata for an asset", async () => {
      const publishingMetadataForAssetResponseFromWelcomeAPI = {
        id: "5ebcd5644967474414564",
        asset_id: "4567m74974987479856456456",
        asset_type: "article",
        status: "published",
        status_message: "This asset is in review",
        locale: "en",
        public_url: "https://example.com/test",
        publishing_destination_updated_at: "2019-10-06T13:15:30Z",
        links: {
          self: "https://api.cmp.optimizely.com/v3/publishing-events/1d9d8aeca10811ebbc640242ac12001b/assets/1d9d8aeca10811ebbc640242ac12003c/publishing-metadata/5ebcd5644967474414564",
          publishing_event:
            "https://api.cmp.optimizely.com/v3/publishing-events/1d9d8aeca10811ebbc640242ac12001b",
          asset:
            "https://api.cmp.optimizely.com/v3/articles/4567m474974987479856456456",
        },
      };

      const scope = nock(WELCOME_API_BASE_URL, {
        reqheaders: {
          authorization: "Bearer some-access-token",
        },
      })
        .get(
          "/publishing-events/5d7f910551b00a722e0418830cee5534/assets/4567m74974987479856456456/publishing-metadata/5ebcd5644967474414564"
        )
        .reply(200, publishingMetadataForAssetResponseFromWelcomeAPI);

      const publishingMetadataForAsset =
        await publishingModule.getPublishingMetadataForAsset(
          "5d7f910551b00a722e0418830cee5534",
          "4567m74974987479856456456",
          "5ebcd5644967474414564",
          tokenGetParam
        );

      expect(scope.isDone()).toBe(true);
      expect(accessTokenMock).toBeCalledWith(tokenGetParam);
      expect(publishingMetadataForAsset).toBeInstanceOf(
        PublishingMetadataForAsset
      );
      expect(publishingMetadataForAsset).toEqual({
        id: "5ebcd5644967474414564",
        assetId: "4567m74974987479856456456",
        assetType: "article",
        status: "published",
        statusMessage: "This asset is in review",
        locale: "en",
        publicUrl: "https://example.com/test",
        publishingDestinationUpdatedAt: new Date("2019-10-06T13:15:30Z"),
      });
    });
  });
});
