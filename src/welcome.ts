import { Auth } from "./modules/auth";
import { APICaller } from "./modules/api-caller";
import { Campaign } from "./modules/campaign";

interface WelcomeClientConstructorParam {
  accessToken: string | ((tokenGetParam?: any) => string | Promise<string>);
  refreshToken: string | ((tokenGetParam?: any) => string | Promise<string>);
  clientId?: string;
  clientSecret?: string;
  redirectUri?: string;
  onAuthSuccess?: (
    accessToken: string,
    refreshToken: string,
    tokenGetParam?: any
  ) => any;
  onAuthFailure?: (error: string) => any;
  tokenChangeCallback?: (
    accessToken: string,
    refreshToken: string,
    tokenGetParam?: any
  ) => any;
  enableAutoRetry?: boolean;
}

export class WelcomeClient {
  auth: Auth;
  campaign: Campaign;

  constructor(param: WelcomeClientConstructorParam) {
    this.auth = new Auth({
      accessToken: param.accessToken,
      refreshToken: param.refreshToken,
      clientId: param.clientId,
      clientSecret: param.clientSecret,
      redirectUri: param.redirectUri,
      onAuthFailure: param.onAuthFailure,
      onAuthSuccess: param.onAuthSuccess,
      tokenChangeCallback: param.tokenChangeCallback,
    });

    const apiCaller = new APICaller(this.auth, param.enableAutoRetry || false);
    this.campaign = new Campaign(apiCaller)
  }
}
