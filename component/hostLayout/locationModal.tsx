import Paper from '@mui/material/Paper';
import { Box } from "@mui/material"
import { SxProps } from '@mui/system';
import LocationInput from './locationDetail/locationInput';
import ColorBtn from '../layout/headparts/menuModal.tsx/colorBtn';
import { LocationInfoStateProps } from '../../pages/become-a-host/[itemId]/location';
import LocationDetailHeader from './locationDetail/locationDetailHeader';

interface LocationModalProps {
    backHandle: () => void;
    info: LocationInfoStateProps;
    setInfo: React.Dispatch<React.SetStateAction<LocationInfoStateProps>>;
    getLocationHandle: () => void
}

const bodyStyled: SxProps = {
    position: "relative",
    borderRadius: 5,
    mt: "5%",
    pt: 3,
    px: 2,
    pb: 5,
}

export default function LocationModal({ getLocationHandle, backHandle, info, setInfo }: LocationModalProps) {

    return (
        <>
            <Paper
                component="form"
                sx={bodyStyled}
                elevation={4}>
                <LocationDetailHeader backHandle={backHandle} />
                <Box>
                    <LocationInput setValues={setInfo} values={info} />
                </Box>
                <Box onClick={getLocationHandle}>
                    <ColorBtn color='rgb(22,22,22)' style={{ color: "white" }} > 확인</ColorBtn>
                </Box>
            </Paper>
        </>
    )
}