export type UiFileState = "Remote" | "Local";

export class UiFile {
    name: string;
    size: number;
    path: string;
    uploadId: number;
    pieceCount: number;
    state: UiFileState;


    constructor(name: string) {
        this.name = name;
    }
}