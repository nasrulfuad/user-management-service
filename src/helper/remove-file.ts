import fs from "fs/promises";

export function removeFile(path: string) {
  return fs.unlink(path);
}
