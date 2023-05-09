import { Library } from "../../src/modules/library";
import { APICaller } from "../../src/modules/api-caller";
import { Auth } from "../../src/modules/auth";
import * as nock from "nock";
import {
  Folder,
  FolderList,
  LibraryArticle,
  LibraryAsset,
  LibraryAssetList,
  LibraryAssetVersion,
  LibraryImage,
  LibraryRawFile,
  LibraryVideo,
} from "../../src/objects/libray-objects";
import { UploadedFile } from "../../src/objects/uploaded-file";

describe("Library module", () => {
  const accessTokenMock = jest.fn().mockResolvedValue("some-access-token");
  const auth = new Auth({
    accessToken: accessTokenMock,
    refreshToken: "some-refresh-token",
  });
  const apiCaller = new APICaller(auth, true);
  const libraryModule = new Library(apiCaller);

  const WELCOME_API_BASE_URL = "https://api.welcomesoftware.com/v3";
  const tokenGetParam = { user: "123" };

  afterEach(() => {
    jest.clearAllMocks();
    nock.cleanAll();
  });

  describe("getFolders", () => {
    const folders = [
      {
        id: "5d7f910551b00a722e0418830cee6632",
        name: "icons",
        parent_folder_id: "1d9d8aeca10811ebbc640242ac12001b",
        path: "/images/icons",
        created_at: "2019-10-06T13:15:30Z",
        modified_at: "2019-10-07T13:15:30Z",
        links: {
          self: "https://api.welcomesoftware.com/v3/folders/5d7f910551b00a722e0418830cee6632",
          parent_folder:
            "https://api.welcomesoftware.com/v3/folders/1d9d8aeca10811ebbc640242ac12001b",
          child_folders:
            "https://api.welcomesoftware.com/v3/folders?parent_folder_id=5d7f910551b00a722e0418830cee6632",
          assets:
            "https://api.welcomesoftware.com/v3/assets?folder_id=5d7f910551b00a722e0418830cee6632&include_subfolder_assets=false",
        },
      },
    ];

    const expectedData = [
      {
        id: "5d7f910551b00a722e0418830cee6632",
        name: "icons",
        parentFolderId: "1d9d8aeca10811ebbc640242ac12001b",
        path: "/images/icons",
        createdAt: new Date("2019-10-06T13:15:30Z"),
        modifiedAt: new Date("2019-10-07T13:15:30Z"),
      },
    ];

    it("sould get all the folder", async () => {
      const scope = nock(WELCOME_API_BASE_URL, {
        reqheaders: {
          authorization: "Bearer some-access-token",
        },
      })
        .get("/folders")
        .reply(200, {
          data: folders,
          pagination: {
            next: "https://api.welcomesoftware.com/v3/folders?offset=10&page_size=10",
            previous: null,
          },
        });

      const folderList = await libraryModule.getFolders(
        undefined,
        tokenGetParam
      );

      expect(scope.isDone()).toBe(true);
      expect(accessTokenMock).toBeCalledWith(tokenGetParam);
      expect(folderList).toBeInstanceOf(FolderList);
      expect(folderList).toEqual({ data: expectedData });
    });

    it("should get folders under a parent folder", async () => {
      const scope = nock(WELCOME_API_BASE_URL, {
        reqheaders: {
          authorization: "Bearer some-access-token",
        },
      })
        .get("/folders")
        .query({ parent_folder_id: "1d9d8aeca10811ebbc640242ac12001b" })
        .reply(200, {
          data: folders,
          pagination: {
            next: "https://api.welcomesoftware.com/v3/folders?offset=10&page_size=10&parent_folder_id=1d9d8aeca10811ebbc640242ac12001b",
            previous: null,
          },
        });

      const folderList = await libraryModule.getFolders(
        { parentFolderId: "1d9d8aeca10811ebbc640242ac12001b" },
        tokenGetParam
      );

      expect(scope.isDone()).toBe(true);
      expect(accessTokenMock).toBeCalledWith(tokenGetParam);
      expect(folderList).toBeInstanceOf(FolderList);
      expect(folderList).toEqual({ data: expectedData });
    });

    it("should get folders with right pagination", async () => {
      const scope = nock(WELCOME_API_BASE_URL, {
        reqheaders: {
          authorization: "Bearer some-access-token",
        },
      })
        .get("/folders")
        .query({ offset: 3, page_size: 3 })
        .reply(200, {
          data: folders,
          pagination: {
            next: "https://api.welcomesoftware.com/v3/folders?offset=6&page_size=3",
            previous:
              "https://api.welcomesoftware.com/v3/folders?offset=0&page_size=3",
          },
        });

      const folderList = await libraryModule.getFolders(
        { offset: 3, pageSize: 3 },
        tokenGetParam
      );

      expect(scope.isDone()).toBe(true);
      expect(accessTokenMock).toBeCalledWith(tokenGetParam);
      expect(folderList).toBeInstanceOf(FolderList);
      expect(folderList).toEqual({ data: expectedData });
    });
  });

  describe("getFolderById", () => {
    const folder = {
      id: "5d7f910551b00a722e0418830cee6632",
      name: "icons",
      parent_folder_id: "1d9d8aeca10811ebbc640242ac12001b",
      path: "/images/icons",
      created_at: "2019-10-06T13:15:30Z",
      modified_at: "2019-10-07T13:15:30Z",
      links: {
        self: "https://api.welcomesoftware.com/v3/folders/5d7f910551b00a722e0418830cee6632",
        parent_folder:
          "https://api.welcomesoftware.com/v3/folders/1d9d8aeca10811ebbc640242ac12001b",
        child_folders:
          "https://api.welcomesoftware.com/v3/folders?parent_folder_id=5d7f910551b00a722e0418830cee6632",
        assets:
          "https://api.welcomesoftware.com/v3/assets?folder_id=5d7f910551b00a722e0418830cee6632&include_subfolder_assets=false",
      },
    };

    const expectedFolderData = {
      id: "5d7f910551b00a722e0418830cee6632",
      name: "icons",
      parentFolderId: "1d9d8aeca10811ebbc640242ac12001b",
      path: "/images/icons",
      createdAt: new Date("2019-10-06T13:15:30Z"),
      modifiedAt: new Date("2019-10-07T13:15:30Z"),
    };

    it("should get the folder by id", async () => {
      const scope = nock(WELCOME_API_BASE_URL, {
        reqheaders: {
          authorization: "Bearer some-access-token",
        },
      })
        .get("/folders/5d7f910551b00a722e0418830cee6632")
        .reply(200, folder);

      const folderObject = await libraryModule.getFolderById(
        "5d7f910551b00a722e0418830cee6632",
        tokenGetParam
      );

      expect(scope.isDone()).toBe(true);
      expect(accessTokenMock).toBeCalledWith(tokenGetParam);
      expect(folderObject).toBeInstanceOf(Folder);
      expect(folderObject).toEqual(expectedFolderData);
    });
  });

  describe("getAssets", () => {
    const assets = [
      {
        id: "5d7f910551b00a722e0418830cee6631",
        title: "sample_image.png",
        type: "image",
        mime_type: "image/png",
        file_extension: "png",
        created_at: "2019-10-06T13:15:30Z",
        modified_at: "2019-10-07T13:15:30Z",
        folder_id: "6bb8db20a5b611ebae319b7c541b1a5a",
        file_location: "/all assets/important assets",
        content: {
          type: "url",
          value:
            "http://images.welcomesoftware.com/Zz0xODQ3NDU3Y2Y2YmYzOTlmNjkyOTgyZDY3Y2I3YWM2OA==S",
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
          self: "https://api.welcomesoftware.com/v3/images/5d7f910551bw0a722e0418830cee6631",
        },
        owner_organization_id: "5108c3a9becac35915111191",
        thumbnail_url:
          "https://images1.welcomesoftware.com/Pz1kYmI9Z2FkYTJtZWI5VGI1WZq4MTZkNTdmGHjM5OGRmYq==",
      },
    ];
    const expectedAssetData = [
      {
        id: "5d7f910551b00a722e0418830cee6631",
        title: "sample_image.png",
        type: "image",
        mimeType: "image/png",
        fileExtension: "png",
        createdAt: new Date("2019-10-06T13:15:30Z"),
        modifiedAt: new Date("2019-10-07T13:15:30Z"),
        folderId: "6bb8db20a5b611ebae319b7c541b1a5a",
        fileLocation: "/all assets/important assets",
        content: {
          type: "url",
          value:
            "http://images.welcomesoftware.com/Zz0xODQ3NDU3Y2Y2YmYzOTlmNjkyOTgyZDY3Y2I3YWM2OA==S",
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
        ownerOrganizationId: "5108c3a9becac35915111191",
        thumbnailUrl:
          "https://images1.welcomesoftware.com/Pz1kYmI9Z2FkYTJtZWI5VGI1WZq4MTZkNTdmGHjM5OGRmYq==",
      },
    ];

    it("should get assets without any filter", async () => {
      const scope = nock(WELCOME_API_BASE_URL, {
        reqheaders: {
          authorization: "Bearer some-access-token",
        },
      })
        .get("/assets")
        .reply(200, {
          data: assets,
          pagination: {
            next: "https://api.welcomesoftware.com/v3/assets?offset=10&page_size=10",
            previous: null,
          },
        });

      const assetList = await libraryModule.getAssets(undefined, tokenGetParam);
      expect(scope.isDone()).toBe(true);
      expect(accessTokenMock).toBeCalledWith(tokenGetParam);
      expect(assetList).toBeInstanceOf(LibraryAssetList);
      expect(assetList).toEqual({ data: expectedAssetData });
    });

    it("should get assets with filters", async () => {
      const scope = nock(WELCOME_API_BASE_URL, {
        reqheaders: {
          authorization: "Bearer some-access-token",
        },
      })
        .get("/assets")
        .query({
          type: ["image", "video"],
          created_at__from: "2018-11-30T13:32:44Z",
          created_at__to: "2018-11-30T13:32:44Z",
          modified_at__from: "2018-11-30T13:32:44Z",
          modified_at__to: "2018-11-30T13:32:44Z",
          folder_id: "6bb8db20a5b611ebae319b7c541b1a7f",
          include_subfolder_assets: false,
          search_text: "Cute Cat",
        })
        .reply(200, {
          data: assets,
          pagination: {
            next: "https://api.welcomesoftware.com/v3/assets?type=image&type=video&created_at__from=2018-11-30T13:32:44Z&created_at__to=2018-11-30T13:32:44Z&modified_at__from=2018-11-30T13:32:44Z&modified_at__to=2018-11-30T13:32:44Z&folder_id=6bb8db20a5b611ebae319b7c541b1a7f&include_subfolder_assets=false&search_text=Cute%20Cat&offset=10&page_size=10",
            previous: null,
          },
        });

      const assetList = await libraryModule.getAssets(
        {
          type: ["image", "video"],
          createdAt_From: "2018-11-30T13:32:44Z",
          createdAt_To: "2018-11-30T13:32:44Z",
          modifiedAt_From: "2018-11-30T13:32:44Z",
          modifiedAt_To: "2018-11-30T13:32:44Z",
          folderId: "6bb8db20a5b611ebae319b7c541b1a7f",
          includeSubfolderAssets: false,
          searchText: "Cute Cat",
        },
        tokenGetParam
      );
      expect(scope.isDone()).toBe(true);
      expect(accessTokenMock).toBeCalledWith(tokenGetParam);
      expect(assetList).toBeInstanceOf(LibraryAssetList);
      expect(assetList).toEqual({ data: expectedAssetData });
    });

    it("should get assets with proper pagination", async () => {
      const scope = nock(WELCOME_API_BASE_URL, {
        reqheaders: {
          authorization: "Bearer some-access-token",
        },
      })
        .get("/assets")
        .query({
          offset: 3,
          page_size: 3,
        })
        .reply(200, {
          data: assets,
          pagination: {
            next: "https://api.welcomesoftware.com/v3/assets?offset=6&page_size=3",
            previous:
              "https://api.welcomesoftware.com/v3/assets?offset=0&page_size=3",
          },
        });

      const assetList = await libraryModule.getAssets(
        {
          offset: 3,
          pageSize: 3,
        },
        tokenGetParam
      );
      expect(scope.isDone()).toBe(true);
      expect(accessTokenMock).toBeCalledWith(tokenGetParam);
      expect(assetList).toBeInstanceOf(LibraryAssetList);
      expect(assetList).toEqual({ data: expectedAssetData });
    });
  });

  describe("addAsset", () => {
    const asset = {
      id: "5d7f910551b00a722e0418830cee6631",
      title: "sample_image.png",
      type: "image",
      mime_type: "image/png",
      file_extension: "png",
      created_at: "2019-10-06T13:15:30Z",
      modified_at: "2019-10-07T13:15:30Z",
      folder_id: "6bb8db20a5b611ebae319b7c541b1a5a",
      file_location: "/all assets/important assets",
      content: {
        type: "url",
        value:
          "http://images.welcomesoftware.com/Zz0xODQ3NDU3Y2Y2YmYzOTlmNjkyOTgyZDY3Y2I3YWM2OA==S",
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
        self: "https://api.welcomesoftware.com/v3/images/5d7f910551bw0a722e0418830cee6631",
      },
      owner_organization_id: "5108c3a9becac35915111191",
      thumbnail_url:
        "https://images1.welcomesoftware.com/Pz1kYmI9Z2FkYTJtZWI5VGI1WZq4MTZkNTdmGHjM5OGRmYq==",
    };

    const expectedAssetData = {
      id: "5d7f910551b00a722e0418830cee6631",
      title: "sample_image.png",
      type: "image",
      mimeType: "image/png",
      fileExtension: "png",
      createdAt: new Date("2019-10-06T13:15:30Z"),
      modifiedAt: new Date("2019-10-07T13:15:30Z"),
      folderId: "6bb8db20a5b611ebae319b7c541b1a5a",
      fileLocation: "/all assets/important assets",
      content: {
        type: "url",
        value:
          "http://images.welcomesoftware.com/Zz0xODQ3NDU3Y2Y2YmYzOTlmNjkyOTgyZDY3Y2I3YWM2OA==S",
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
      ownerOrganizationId: "5108c3a9becac35915111191",
      thumbnailUrl:
        "https://images1.welcomesoftware.com/Pz1kYmI9Z2FkYTJtZWI5VGI1WZq4MTZkNTdmGHjM5OGRmYq==",
    };
    it("should add a new asset in the library", async () => {
      const scope = nock(WELCOME_API_BASE_URL, {
        reqheaders: {
          authorization: "Bearer some-access-token",
        },
      })
        .post("/assets", {
          key: "some-key",
          title: "sample_image.png",
        })
        .reply(201, asset);

      const uploadedFile = new UploadedFile(
        { key: "some-key", title: "sample_image.png" },
        apiCaller,
        tokenGetParam
      );

      const addedAsset = await libraryModule.addAsset(
        uploadedFile,
        tokenGetParam
      );

      expect(scope.isDone()).toBe(true);
      expect(accessTokenMock).toBeCalledWith(tokenGetParam);
      expect(addedAsset).toBeInstanceOf(LibraryAsset);
      expect(addedAsset).toEqual(expectedAssetData);
    });
  });

  describe("addAssetVersion", () => {
    const assetVersion = {
      version_number: 2,
      asset_id: "5d7f910551b00a722e0418830cee6631",
      title: "sample_image.png",
      type: "image",
      mime_type: "image/png",
      created_at: "2019-10-06T13:15:30Z",
      content: {
        type: "url",
        value:
          "http://images.welcomesoftware.com/Zz0xODQ3NDU3Y2Y2YmYzOTlmNjkyOTgyZDY3Y2I3YWM2OA==S",
      },
      links: {
        asset:
          "https://api.welcomesoftware.com/v3/images/5d7f910551b00a722e0418830cee6631",
      },
    };

    const expectedAssetVersionData = {
      versionNumber: 2,
      assetId: "5d7f910551b00a722e0418830cee6631",
      title: "sample_image.png",
      type: "image",
      mimeType: "image/png",
      createdAt: new Date("2019-10-06T13:15:30Z"),
      content: {
        type: "url",
        value:
          "http://images.welcomesoftware.com/Zz0xODQ3NDU3Y2Y2YmYzOTlmNjkyOTgyZDY3Y2I3YWM2OA==S",
      },
    };

    it("should add a new version to an asset", async () => {
      const scope = nock(WELCOME_API_BASE_URL, {
        reqheaders: {
          authorization: "Bearer some-access-token",
        },
      })
        .post("/assets/5d7f910551b00a722e0418830cee6631/versions", {
          key: "some-key",
          title: "sample_image.png",
        })
        .reply(201, assetVersion);

      const uploadedFile = new UploadedFile(
        { key: "some-key", title: "sample_image.png" },
        apiCaller,
        tokenGetParam
      );

      const addedAssetVersion = await libraryModule.addAssetVersion(
        "5d7f910551b00a722e0418830cee6631",
        uploadedFile,
        tokenGetParam
      );

      expect(scope.isDone()).toBe(true);
      expect(accessTokenMock).toBeCalledWith(tokenGetParam);
      expect(addedAssetVersion).toBeInstanceOf(LibraryAssetVersion);
      expect(addedAssetVersion).toEqual(expectedAssetVersionData);
    });
  });

  describe("getArticle", () => {
    const article = {
      id: "5d7f910551b00a722e0418830cee6631",
      title: "3 Ways Influencer Marketing Will Further Mature in 2020",
      created_at: "2019-10-06T13:15:30Z",
      modified_at: "2019-10-07T13:15:30Z",
      html_body: "<p>Article text</p>",
      folder_id: "6bb8db20a5b611ebae319b7c541b1a5a",
      file_location: "/all assets/",
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
      group_id: "7949c82ce3ae11eba378dbacdf18f20c",
      meta_title: "3 Ways Influencer Marketing Will Further Mature in 2020",
      meta_description: "Article text",
      meta_url: "/",
      meta_keywords: ["key", "word", "keyword"],
      source_article: "https://source-vendor.com/sample-article",
      source_name: "Optimizely CMP",
      url: "https://welcomesoftware.com/sample-article",
      authors: [
        {
          name: "John Doe",
        },
      ],
      lang_code: "eng",
      pixel_key:
        "https://pixel.welcomesoftware.com/px.gif?key=YXJ0aWNsZT0zZmJjN2Y5NmUzYzcxMWViOGVmNTAyNDJhYzEyMDAxOA==",
      images: [
        {
          attribution_text: "This is a sample attribution text",
          caption: "This is a sample caption",
          description: "This is a sample description",
          mime_type: "image/jpeg",
          source: {
            name: "Reuters",
          },
          url: "https://images-cdn.welcomesoftware.com/sample.jpeg",
          height: 400,
          width: 700,
          thumbnail:
            "https://images-cdn.welcomesoftware.com/Zz01Y2FkOWFjZWQ5OTMxMWViYjY3OTEzNDMzOWM3ZDNhNA==?width=75&height=75",
        },
      ],
      owner_organization_id: "5108c3a9becac35915111191",
      expires_at: "2019-10-07T13:15:30Z",
      thumbnail_url:
        "http://images.welcomesoftware.com/Zz0xODQ3NDU3Y2Y2YmYzOTlmNjkyOTgyZDY3Y2I3YWM2OA==",
      version_number: 2,
    };

    const expectedArticleData = {
      id: "5d7f910551b00a722e0418830cee6631",
      title: "3 Ways Influencer Marketing Will Further Mature in 2020",
      createdAt: new Date("2019-10-06T13:15:30Z"),
      modifiedAt: new Date("2019-10-07T13:15:30Z"),
      htmlBody: "<p>Article text</p>",
      folderId: "6bb8db20a5b611ebae319b7c541b1a5a",
      fileLocation: "/all assets/",
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
      groupId: "7949c82ce3ae11eba378dbacdf18f20c",
      metaTitle: "3 Ways Influencer Marketing Will Further Mature in 2020",
      metaDescription: "Article text",
      metaUrl: "/",
      metaKeywords: ["key", "word", "keyword"],
      sourceArticle: "https://source-vendor.com/sample-article",
      sourceName: "Optimizely CMP",
      url: "https://welcomesoftware.com/sample-article",
      authors: [
        {
          name: "John Doe",
        },
      ],
      langCode: "eng",
      pixelKey:
        "https://pixel.welcomesoftware.com/px.gif?key=YXJ0aWNsZT0zZmJjN2Y5NmUzYzcxMWViOGVmNTAyNDJhYzEyMDAxOA==",
      images: [
        {
          attributionText: "This is a sample attribution text",
          caption: "This is a sample caption",
          description: "This is a sample description",
          mimeType: "image/jpeg",
          source: {
            name: "Reuters",
          },
          url: "https://images-cdn.welcomesoftware.com/sample.jpeg",
          height: 400,
          width: 700,
          thumbnail:
            "https://images-cdn.welcomesoftware.com/Zz01Y2FkOWFjZWQ5OTMxMWViYjY3OTEzNDMzOWM3ZDNhNA==?width=75&height=75",
        },
      ],
      ownerOrganizationId: "5108c3a9becac35915111191",
      expiresAt: new Date("2019-10-07T13:15:30Z"),
      thumbnailUrl:
        "http://images.welcomesoftware.com/Zz0xODQ3NDU3Y2Y2YmYzOTlmNjkyOTgyZDY3Y2I3YWM2OA==",
      versionNumber: 2,
    };
    it("should get an article by id", async () => {
      const scope = nock(WELCOME_API_BASE_URL, {
        reqheaders: {
          authorization: "Bearer some-access-token",
        },
      })
        .get("/articles/5d7f910551b00a722e0418830cee6631")
        .reply(200, article);

      const articleObj = await libraryModule.getArticle(
        "5d7f910551b00a722e0418830cee6631",
        tokenGetParam
      );

      expect(scope.isDone()).toBe(true);
      expect(accessTokenMock).toBeCalledWith(tokenGetParam);
      expect(articleObj).toBeInstanceOf(LibraryArticle);
      expect(articleObj).toEqual(expectedArticleData);
    });
  });

  describe("getImage", () => {
    const image = {
      id: "5d7f910551b00a722e0418830cee6632",
      title: "cat.jpeg",
      description: "Very important image",
      mime_type: "image/jpeg",
      file_extension: "jpg",
      created_at: "2019-10-06T13:15:30Z",
      modified_at: "2019-10-07T13:15:30Z",
      file_size: 11244,
      image_resolution: {
        height: 800,
        width: 700,
      },
      folder_id: "6bb8db20a5b611ebae319b7c541b1a5a",
      file_location: "/images/",
      is_public: true,
      url: "http://images.welcomesoftware.com/Zz0xODQ3NDU3Y2Y2YmYzOTlmNjkyOTgyZDY3Y2I3YWM2OA==",
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
      owner_organization_id: "5108c3a9becac35915111191",
      expires_at: "2019-10-07T13:15:30Z",
      thumbnail_url:
        "http://images.welcomesoftware.com/Zz0xODQ3NDU3Y2Y2YmYzOTlmNjkyOTgyZDY3Y2I3YWM2OA==",
      version_number: 2,
      alt_text: "image title",
    };

    const expectedImageData = {
      id: "5d7f910551b00a722e0418830cee6632",
      title: "cat.jpeg",
      description: "Very important image",
      mimeType: "image/jpeg",
      fileExtension: "jpg",
      createdAt: new Date("2019-10-06T13:15:30Z"),
      modifiedAt: new Date("2019-10-07T13:15:30Z"),
      fileSize: 11244,
      imageResolution: {
        height: 800,
        width: 700,
      },
      folderId: "6bb8db20a5b611ebae319b7c541b1a5a",
      fileLocation: "/images/",
      isPublic: true,
      url: "http://images.welcomesoftware.com/Zz0xODQ3NDU3Y2Y2YmYzOTlmNjkyOTgyZDY3Y2I3YWM2OA==",
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
      ownerOrganizationId: "5108c3a9becac35915111191",
      expiresAt: new Date("2019-10-07T13:15:30Z"),
      thumbnailUrl:
        "http://images.welcomesoftware.com/Zz0xODQ3NDU3Y2Y2YmYzOTlmNjkyOTgyZDY3Y2I3YWM2OA==",
      versionNumber: 2,
      altText: "image title",
    };
    it("should get an image by id", async () => {
      const scope = nock(WELCOME_API_BASE_URL, {
        reqheaders: {
          authorization: "Bearer some-access-token",
        },
      })
        .get("/images/5d7f910551b00a722e0418830cee6632")
        .reply(200, image);

      const imageObj = await libraryModule.getImage(
        "5d7f910551b00a722e0418830cee6632",
        tokenGetParam
      );

      expect(scope.isDone()).toBe(true);
      expect(accessTokenMock).toBeCalledWith(tokenGetParam);
      expect(imageObj).toBeInstanceOf(LibraryImage);
      expect(imageObj).toEqual(expectedImageData);
    });
  });

  describe("updateImage", () => {
    const image = {
      id: "5d7f910551b00a722e0418830cee6632",
      title: "cat.jpeg",
      description: "Very important image",
      mime_type: "image/jpeg",
      file_extension: "jpg",
      created_at: "2019-10-06T13:15:30Z",
      modified_at: "2019-10-07T13:15:30Z",
      file_size: 11244,
      image_resolution: {
        height: 800,
        width: 700,
      },
      folder_id: "6bb8db20a5b611ebae319b7c541b1a5a",
      file_location: "/images/",
      is_public: true,
      url: "http://images.welcomesoftware.com/Zz0xODQ3NDU3Y2Y2YmYzOTlmNjkyOTgyZDY3Y2I3YWM2OA==",
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
      owner_organization_id: "5108c3a9becac35915111191",
      expires_at: "2019-10-07T13:15:30Z",
      thumbnail_url:
        "http://images.welcomesoftware.com/Zz0xODQ3NDU3Y2Y2YmYzOTlmNjkyOTgyZDY3Y2I3YWM2OA==",
      version_number: 2,
      alt_text: "image title",
    };

    const expectedImageData = {
      id: "5d7f910551b00a722e0418830cee6632",
      title: "cat.jpeg",
      description: "Very important image",
      mimeType: "image/jpeg",
      fileExtension: "jpg",
      createdAt: new Date("2019-10-06T13:15:30Z"),
      modifiedAt: new Date("2019-10-07T13:15:30Z"),
      fileSize: 11244,
      imageResolution: {
        height: 800,
        width: 700,
      },
      folderId: "6bb8db20a5b611ebae319b7c541b1a5a",
      fileLocation: "/images/",
      isPublic: true,
      url: "http://images.welcomesoftware.com/Zz0xODQ3NDU3Y2Y2YmYzOTlmNjkyOTgyZDY3Y2I3YWM2OA==",
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
      ownerOrganizationId: "5108c3a9becac35915111191",
      expiresAt: new Date("2019-10-07T13:15:30Z"),
      thumbnailUrl:
        "http://images.welcomesoftware.com/Zz0xODQ3NDU3Y2Y2YmYzOTlmNjkyOTgyZDY3Y2I3YWM2OA==",
      versionNumber: 2,
      altText: "image title",
    };

    const patchPayload = {
      title: "cat.jpeg",
      is_public: true,
      expires_at: "2019-10-07T13:15:30Z",
      labels: [
        {
          group: "2467e583a60e23fda2b89db81a453cd2",
          values: ["71c378f3fee3d822759d1bdc2aab628c"],
        },
      ],
    };

    it("should update an image by id", async () => {
      const scope = nock(WELCOME_API_BASE_URL, {
        reqheaders: {
          authorization: "Bearer some-access-token",
        },
      })
        .patch("/images/5d7f910551b00a722e0418830cee6632", patchPayload)
        .reply(200, image);

      const updatedImageObj = await libraryModule.updateImage(
        "5d7f910551b00a722e0418830cee6632",
        {
          title: "cat.jpeg",
          isPublic: true,
          expiresAt: "2019-10-07T13:15:30Z",
          labels: [
            {
              group: "2467e583a60e23fda2b89db81a453cd2",
              values: ["71c378f3fee3d822759d1bdc2aab628c"],
            },
          ],
        },
        tokenGetParam
      );

      expect(scope.isDone()).toBe(true);
      expect(accessTokenMock).toBeCalledWith(tokenGetParam);
      expect(updatedImageObj).toBeInstanceOf(LibraryImage);
      expect(updatedImageObj).toEqual(expectedImageData);
    });
  });

  describe("deleteImage", () => {
    it("should delete an image by id", async () => {
      const scope = nock(WELCOME_API_BASE_URL, {
        reqheaders: {
          authorization: "Bearer some-access-token",
        },
      })
        .delete("/images/5d7f910551b00a722e0418830cee6632")
        .reply(204);

      const res = await libraryModule.deleteImage(
        "5d7f910551b00a722e0418830cee6632",
        tokenGetParam
      );

      expect(scope.isDone()).toBe(true);
      expect(accessTokenMock).toBeCalledWith(tokenGetParam);
      expect(res).toBeUndefined();
    });
  });

  describe("getVideo", () => {
    const video = {
      id: "5d7f910551b00a722e0418830cee6633",
      title: "product.mp4",
      description: "Very important video",
      mime_type: "video/mp4",
      file_extension: "mp4",
      created_at: "2019-10-06T13:15:30Z",
      modified_at: "2019-10-07T13:15:30Z",
      file_size: 11244,
      folder_id: "6bb8db20a5b611ebae319b7c541b1a5a",
      file_location: "/example/",
      is_public: true,
      url: "https://s3.amazonaws.com/videos.welcomesoftware.com/03a747babe81ceb55763fa085bqa20dc",
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
      owner_organization_id: "5108c3a9becac35915111191",
      expires_at: "2019-10-07T13:15:30Z",
      thumbnail_url:
        "http://images.welcomesoftware.com/Zz0xODQ3NDU3Y2Y2YmYzOTlmNjkyOTgyZDY3Y2I3YWM2OA==",
      version_number: 2,
      alt_text: "video title",
    };

    const expectedVideoData = {
      id: "5d7f910551b00a722e0418830cee6633",
      title: "product.mp4",
      description: "Very important video",
      mimeType: "video/mp4",
      fileExtension: "mp4",
      createdAt: new Date("2019-10-06T13:15:30Z"),
      modifiedAt: new Date("2019-10-07T13:15:30Z"),
      fileSize: 11244,
      folderId: "6bb8db20a5b611ebae319b7c541b1a5a",
      fileLocation: "/example/",
      isPublic: true,
      url: "https://s3.amazonaws.com/videos.welcomesoftware.com/03a747babe81ceb55763fa085bqa20dc",
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
      ownerOrganizationId: "5108c3a9becac35915111191",
      expiresAt: new Date("2019-10-07T13:15:30Z"),
      thumbnailUrl:
        "http://images.welcomesoftware.com/Zz0xODQ3NDU3Y2Y2YmYzOTlmNjkyOTgyZDY3Y2I3YWM2OA==",
      versionNumber: 2,
      altText: "video title",
    };
    it("should get a video by id", async () => {
      const scope = nock(WELCOME_API_BASE_URL, {
        reqheaders: {
          authorization: "Bearer some-access-token",
        },
      })
        .get("/videos/5d7f910551b00a722e0418830cee6633")
        .reply(200, video);

      const videoObj = await libraryModule.getVideo(
        "5d7f910551b00a722e0418830cee6633",
        tokenGetParam
      );

      expect(scope.isDone()).toBe(true);
      expect(accessTokenMock).toBeCalledWith(tokenGetParam);
      expect(videoObj).toBeInstanceOf(LibraryVideo);
      expect(videoObj).toEqual(expectedVideoData);
    });
  });

  describe("updateVideo", () => {
    const video = {
      id: "5d7f910551b00a722e0418830cee6633",
      title: "product.mp4",
      description: "Very important video",
      mime_type: "video/mp4",
      file_extension: "mp4",
      created_at: "2019-10-06T13:15:30Z",
      modified_at: "2019-10-07T13:15:30Z",
      file_size: 11244,
      folder_id: "6bb8db20a5b611ebae319b7c541b1a5a",
      file_location: "/example/",
      is_public: true,
      url: "https://s3.amazonaws.com/videos.welcomesoftware.com/03a747babe81ceb55763fa085bqa20dc",
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
      owner_organization_id: "5108c3a9becac35915111191",
      expires_at: "2019-10-07T13:15:30Z",
      thumbnail_url:
        "http://images.welcomesoftware.com/Zz0xODQ3NDU3Y2Y2YmYzOTlmNjkyOTgyZDY3Y2I3YWM2OA==",
      version_number: 2,
      alt_text: "video title",
    };

    const expectedVideoData = {
      id: "5d7f910551b00a722e0418830cee6633",
      title: "product.mp4",
      description: "Very important video",
      mimeType: "video/mp4",
      fileExtension: "mp4",
      createdAt: new Date("2019-10-06T13:15:30Z"),
      modifiedAt: new Date("2019-10-07T13:15:30Z"),
      fileSize: 11244,
      folderId: "6bb8db20a5b611ebae319b7c541b1a5a",
      fileLocation: "/example/",
      isPublic: true,
      url: "https://s3.amazonaws.com/videos.welcomesoftware.com/03a747babe81ceb55763fa085bqa20dc",
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
      ownerOrganizationId: "5108c3a9becac35915111191",
      expiresAt: new Date("2019-10-07T13:15:30Z"),
      thumbnailUrl:
        "http://images.welcomesoftware.com/Zz0xODQ3NDU3Y2Y2YmYzOTlmNjkyOTgyZDY3Y2I3YWM2OA==",
      versionNumber: 2,
      altText: "video title",
    };

    const patchPayload = {
      title: "product.mp4",
      is_public: true,
      expires_at: "2019-10-07T13:15:30Z",
      labels: [
        {
          group: "2467e583a60e23fda2b89db81a453cd2",
          values: ["71c378f3fee3d822759d1bdc2aab628c"],
        },
      ],
    };
    it("should update a video by id", async () => {
      const scope = nock(WELCOME_API_BASE_URL, {
        reqheaders: {
          authorization: "Bearer some-access-token",
        },
      })
        .patch("/videos/5d7f910551b00a722e0418830cee6633", patchPayload)
        .reply(200, video);

      const updatedVideoObj = await libraryModule.updateVideo(
        "5d7f910551b00a722e0418830cee6633",
        {
          title: "product.mp4",
          isPublic: true,
          expiresAt: "2019-10-07T13:15:30Z",
          labels: [
            {
              group: "2467e583a60e23fda2b89db81a453cd2",
              values: ["71c378f3fee3d822759d1bdc2aab628c"],
            },
          ],
        },
        tokenGetParam
      );

      expect(scope.isDone()).toBe(true);
      expect(accessTokenMock).toBeCalledWith(tokenGetParam);
      expect(updatedVideoObj).toBeInstanceOf(LibraryVideo);
      expect(updatedVideoObj).toEqual(expectedVideoData);
    });
  });

  describe("deleteVideo", () => {
    it("should delete a video by id", async () => {
      const scope = nock(WELCOME_API_BASE_URL, {
        reqheaders: {
          authorization: "Bearer some-access-token",
        },
      })
        .delete("/videos/5d7f910551b00a722e0418830cee6633")
        .reply(204);

      const res = await libraryModule.deleteVideo(
        "5d7f910551b00a722e0418830cee6633",
        tokenGetParam
      );

      expect(scope.isDone()).toBe(true);
      expect(accessTokenMock).toBeCalledWith(tokenGetParam);
      expect(res).toBeUndefined();
    });
  });

  describe("getRawFile", () => {
    const rawFile = {
      id: "5d7f910551b00a722e0418830cee6634",
      title: "documents.zip",
      description: "Very important file",
      mime_type: "application/zip",
      file_extension: "zip",
      created_at: "2019-10-06T13:15:30Z",
      modified_at: "2019-10-07T13:15:30Z",
      file_size: 11244,
      folder_id: "6bb8db20a5b611ebae319b7c541b1a5a",
      file_location: "/all files/",
      is_public: true,
      url: "https://s3.amazonaws.com/files.welcomesoftware.com/171451644651701b96f1122009f026bc",
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
      owner_organization_id: "5108c3a9becac35915111191",
      expires_at: "2019-10-07T13:15:30Z",
      thumbnail_url:
        "http://images.welcomesoftware.com/Zz0xODQ3NDU3Y2Y2YmYzOTlmNjkyOTgyZDY3Y2I3YWM2OA==",
      version_number: 2,
    };

    const expectedRawFileData = {
      id: "5d7f910551b00a722e0418830cee6634",
      title: "documents.zip",
      description: "Very important file",
      mimeType: "application/zip",
      fileExtension: "zip",
      createdAt: new Date("2019-10-06T13:15:30Z"),
      modifiedAt: new Date("2019-10-07T13:15:30Z"),
      fileSize: 11244,
      folderId: "6bb8db20a5b611ebae319b7c541b1a5a",
      fileLocation: "/all files/",
      isPublic: true,
      url: "https://s3.amazonaws.com/files.welcomesoftware.com/171451644651701b96f1122009f026bc",
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
      ownerOrganizationId: "5108c3a9becac35915111191",
      expiresAt: new Date("2019-10-07T13:15:30Z"),
      thumbnailUrl:
        "http://images.welcomesoftware.com/Zz0xODQ3NDU3Y2Y2YmYzOTlmNjkyOTgyZDY3Y2I3YWM2OA==",
      versionNumber: 2,
    };
    it("should get a raw file by id", async () => {
      const scope = nock(WELCOME_API_BASE_URL, {
        reqheaders: {
          authorization: "Bearer some-access-token",
        },
      })
        .get("/raw-files/5d7f910551b00a722e0418830cee6634")
        .reply(200, rawFile);

      const rawFileObj = await libraryModule.getRawFile(
        "5d7f910551b00a722e0418830cee6634",
        tokenGetParam
      );

      expect(scope.isDone()).toBe(true);
      expect(accessTokenMock).toBeCalledWith(tokenGetParam);
      expect(rawFileObj).toBeInstanceOf(LibraryRawFile);
      expect(rawFileObj).toEqual(expectedRawFileData);
    });
  });

  describe("updateRawFile", () => {
    const rawFile = {
      id: "5d7f910551b00a722e0418830cee6634",
      title: "documents.zip",
      description: "Very important file",
      mime_type: "application/zip",
      file_extension: "zip",
      created_at: "2019-10-06T13:15:30Z",
      modified_at: "2019-10-07T13:15:30Z",
      file_size: 11244,
      folder_id: "6bb8db20a5b611ebae319b7c541b1a5a",
      file_location: "/all files/",
      is_public: true,
      url: "https://s3.amazonaws.com/files.welcomesoftware.com/171451644651701b96f1122009f026bc",
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
      owner_organization_id: "5108c3a9becac35915111191",
      expires_at: "2019-10-07T13:15:30Z",
      thumbnail_url:
        "http://images.welcomesoftware.com/Zz0xODQ3NDU3Y2Y2YmYzOTlmNjkyOTgyZDY3Y2I3YWM2OA==",
      version_number: 2,
    };

    const expectedRawFileData = {
      id: "5d7f910551b00a722e0418830cee6634",
      title: "documents.zip",
      description: "Very important file",
      mimeType: "application/zip",
      fileExtension: "zip",
      createdAt: new Date("2019-10-06T13:15:30Z"),
      modifiedAt: new Date("2019-10-07T13:15:30Z"),
      fileSize: 11244,
      folderId: "6bb8db20a5b611ebae319b7c541b1a5a",
      fileLocation: "/all files/",
      isPublic: true,
      url: "https://s3.amazonaws.com/files.welcomesoftware.com/171451644651701b96f1122009f026bc",
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
      ownerOrganizationId: "5108c3a9becac35915111191",
      expiresAt: new Date("2019-10-07T13:15:30Z"),
      thumbnailUrl:
        "http://images.welcomesoftware.com/Zz0xODQ3NDU3Y2Y2YmYzOTlmNjkyOTgyZDY3Y2I3YWM2OA==",
      versionNumber: 2,
    };

    const patchPayload = {
      title: "documents.zip",
      is_public: true,
      expires_at: "2019-10-07T13:15:30Z",
      labels: [
        {
          group: "2467e583a60e23fda2b89db81a453cd2",
          values: ["71c378f3fee3d822759d1bdc2aab628c"],
        },
      ],
    };

    it("should update a raw file by id", async () => {
      const scope = nock(WELCOME_API_BASE_URL, {
        reqheaders: {
          authorization: "Bearer some-access-token",
        },
      })
        .patch("/raw-files/5d7f910551b00a722e0418830cee6634", patchPayload)
        .reply(200, rawFile);

      const updatedRawFileObj = await libraryModule.updateRawFile(
        "5d7f910551b00a722e0418830cee6634",
        {
          title: "documents.zip",
          isPublic: true,
          expiresAt: "2019-10-07T13:15:30Z",
          labels: [
            {
              group: "2467e583a60e23fda2b89db81a453cd2",
              values: ["71c378f3fee3d822759d1bdc2aab628c"],
            },
          ],
        },
        tokenGetParam
      );

      expect(scope.isDone()).toBe(true);
      expect(accessTokenMock).toBeCalledWith(tokenGetParam);
      expect(updatedRawFileObj).toBeInstanceOf(LibraryRawFile);
      expect(updatedRawFileObj).toEqual(expectedRawFileData);
    });
  });

  describe("deleteRawFile", () => {
    it("should delete a raw file by id", async () => {
      const scope = nock(WELCOME_API_BASE_URL, {
        reqheaders: {
          authorization: "Bearer some-access-token",
        },
      })
        .delete("/raw-files/5d7f910551b00a722e0418830cee6634")
        .reply(204);

      const res = await libraryModule.deleteRawFile(
        "5d7f910551b00a722e0418830cee6634",
        tokenGetParam
      );

      expect(scope.isDone()).toBe(true);
      expect(accessTokenMock).toBeCalledWith(tokenGetParam);
      expect(res).toBeUndefined();
    });
  });
});
