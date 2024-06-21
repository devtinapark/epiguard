// argentMobile.d.ts
declare module 'starknetkit/argentMobile' {
  export interface ArgentMobileOptions {
    projectId: string;
    dappName?: string;
    chainId?: string;
    description?: string;
    url?: string;
    icon?: string[];
  }

  export class ArgentMobileConnector {
    constructor(options?: ArgentMobileOptions);
    // Define constructor and methods as per starknetkit's documentation
    connect(): Promise<{ wallet: any }>; // Adjust 'any' to match the actual type of 'wallet'
  }

  // Add additional types or interfaces as needed
}
