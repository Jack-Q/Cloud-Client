import {remote} from "electron"

console.log(remote.getGlobal("PORT"));
export const API_PORT = remote.getGlobal("PORT");