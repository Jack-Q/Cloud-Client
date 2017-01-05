export type UiFileState = "Remote" | "Local";
export type UiFileIcon = "Doc" | "Music" | "Video" | "Zip" | "Txt";

export class UiFile {
    name: string;
    size: number;
    path: string;
    uploadId: number;
    pieceCount: number;
    state: UiFileState;
    icon: UiFileIcon;


    constructor(name: string) {
        this.name = name;
    }


}