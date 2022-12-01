import PreviewBox from "./previewBox";

export interface FillProps {
    dropHandle: React.DragEventHandler;
    fileSelectHandle: React.ChangeEventHandler<HTMLInputElement>;
    files: File[];
    filesDeleteHandle: (idx: number) => void;
}

export default function Fill(props: FillProps) {

    return <>
        <PreviewBox filesDeleteHandle={props.filesDeleteHandle} dropHandle={props.dropHandle} fileSelectHandle={props.fileSelectHandle} files={props.files} />
    </>
}