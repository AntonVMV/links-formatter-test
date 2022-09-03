import { IAuthError } from "../types";

export function isAuthError(data: unknown): data is IAuthError {
  return typeof data === "object" && data != null && "detail" in data;
}
