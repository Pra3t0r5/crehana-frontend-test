export const DATASOURCE = {
  endpoint: "https://countries.trevorblades.com/",
  fetchParams: {
    headers: {
      "Content-Type": "application/json",
    },
  },
};
export enum PATH {
  ROOT = "/",
  COUNTRIES = "/countries",
  COUNTRY = "/country",
}
