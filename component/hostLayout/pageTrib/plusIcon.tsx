import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function ({ plusHandle, disabled }: { plusHandle?: () => void; disabled?: boolean }) {
    const borderColor = disabled ? "rgba(0,0,0,0.12)" : "gray"
    const cursor = disabled ? "not-allowed" : ""
    return (
        <div style={{ cursor: cursor }}>
            <IconButton disabled={disabled} onClick={plusHandle} sx={{ border: `1px solid ${borderColor}`, height: 30, width: 30 }} >
                <AddIcon fontSize="small" />
            </IconButton>
        </div>
    )
}