// import { APICaller } from "../modules/api-caller";
// import { AssetBase, AssetBaseData } from "./base-asset";

// export interface LibraryAssetData extends AssetBaseData {
//   folderId: string;
//   fileLocation: string;
//   ownerOrganizationId: string;
//   type: "article" | "image" | "video" | "raw_file" | "structured_content";
//   links: {
//     self: string;
//   };
// }

// export class LibraryAsset extends AssetBase {
//   #apiCaller: APICaller;
//   #tokenGetParam: any;
//   #folderId: string;
//   #fileLocation: string;
//   #ownerOrganizationId: string;
//   #type: "article" | "image" | "video" | "raw_file" | "structured_content";
//   #links: {
//     self: string;
//   };

//   constructor(
//     data: LibraryAssetData,
//     apiCaller: APICaller,
//     tokenGetParam?: any
//   ) {
//     super(data);
//     this.#apiCaller = apiCaller;
//     this.#tokenGetParam = tokenGetParam;
//     this.#fileLocation = data.fileLocation;
//     this.#folderId = data.folderId;
//     this.#ownerOrganizationId = data.ownerOrganizationId;
//     this.#type = data.type;
//     this.#links = data.links;
//   }
//   get folderId() {
//     return this.#folderId;
//   }
//   get fileLocation() {
//     return this.#fileLocation;
//   }
//   get ownerOrganizationId() {
//     return this.#ownerOrganizationId;
//   }
//   get type() {
//     return this.#type;
//   }

//   toJSON() {
//     return {
//       ...super.toJSON(),
//       folderId: this.#folderId,
//       fileLocation: this.#fileLocation,
//       ownerOrganizationId: this.#ownerOrganizationId,
//       links: this.#links,
//     };
//   }

//   async addVersion() {}
// }
