import { Box, FormControl, MenuItem, Modal, Select } from '@mui/material';
import ColorBtn from './menuModal.tsx/colorBtn';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ({ langModalOpen, setLanguageOpen }: {
    setLanguageOpen: () => void,
    langModalOpen: boolean
}) {

    return <>

        <Modal
            open={langModalOpen}
            onClose={setLanguageOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Box sx={{ minWidth: 120 }}>
                    <h2 style={{ textAlign: "center" }}>
                        언어설정
                    </h2>
                    <FormControl fullWidth>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={10}
                            onChange={() => { }}
                            defaultValue={10}
                        >
                            <MenuItem value={10}>한국어(KR/￦)</MenuItem>
                        </Select>
                    </FormControl>
                    <Box sx={{ width: "100%", textAlign: "center", mt: '30px' }} onClick={setLanguageOpen} >
                        <ColorBtn color='rgb(230,30,77)' style={{ width: '100px', color: 'white' }} >확인</ColorBtn>
                    </Box>
                </Box>
            </Box>
        </Modal>
    </>
}