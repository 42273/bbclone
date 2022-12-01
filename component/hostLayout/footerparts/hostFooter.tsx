import ColorBtn from "../../layout/headparts/menuModal.tsx/colorBtn";
interface HostFooterProps {
    backFunction: () => void;
    nextFunction: (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => Promise<void>;
}
export default function HostFooter({ backFunction, nextFunction }: HostFooterProps) {
    return (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: 20 }} >
            <div onClick={backFunction} style={{ cursor: "pointer" }}>
                <ColorBtn style={{ color: "black", width: "80px", mt: 1.5, py: 1.5 }}
                    color={"rgb(250,250,250)"} >뒤로 </ColorBtn>
            </div>
            <div onClick={(evt) => nextFunction(evt)}>
                <ColorBtn style={{ color: "white", width: "130px", mt: 1.5, py: 1.5 }}
                    color={"rgb(0,0,0)"} >다음 </ColorBtn>
            </div>
        </div>
    )
}