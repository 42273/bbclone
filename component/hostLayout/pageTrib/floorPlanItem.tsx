import { ReactNode } from "react";
import MinusIcon from "./minusIcon";
import PlusIcon from "./plusIcon";
import { SxProps } from '@mui/system';
import { Box, Typography } from "@mui/material"
import { SelectedState } from "../../../pages/become-a-host/[itemId]/floor-plan";
interface FloorPlanItemProps {
    children: ReactNode;
    selected: number;
    plusHandle: (prop: keyof SelectedState) => void;
    minusHandle: (prop: keyof SelectedState) => void;
    type: keyof SelectedState;
}

const typoStyle: SxProps = {
    fontSize: 26,
    lineHeight: "30px",
    fontWeight: 600,
    mr: "auto",
    alignItems: 'center',
    display: 'flex',
}

export default ({ selected, children, plusHandle, minusHandle, type }: FloorPlanItemProps) => {
    const setMinus = () => {
        minusHandle(type)
    }
    const setPlus = () => {
        plusHandle(type)
    }
    return (
        <Box display="flex" mb={3}>
            <Typography sx={typoStyle} >
                {children}
            </Typography>
            <Box justifyContent={"right"} sx={{ display: 'flex', alignItems: "center" }}>
                <MinusIcon minusHandle={setMinus} />
                <span style={{ margin: 15 }}>
                    {selected}
                </span>
                <PlusIcon plusHandle={setPlus} />
            </Box>
        </Box>

    )
}