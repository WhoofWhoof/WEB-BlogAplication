import { isPlatformServer } from "@angular/common";

export function getBaseUrl(platformId) {
    let url = "";
    if (isPlatformServer(platformId)) {
        url = "http://localhost:4000/";
    } 
    return url;
  }

  export function addIconUrl(platformId, iconPath: string) {
    const url = getBaseUrl(platformId);
    return url + iconPath;
  }