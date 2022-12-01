import { IconButton } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';

export default function ({ minusHandle, disabled }: { minusHandle?: () => void; disabled?: boolean }) {
    const borderColor = disabled ? "rgba(0,0,0,0.12)" : "gray"
    const cursor = disabled ? "not-allowed" : ""
    return (
        <div style={{ cursor: cursor }}>
            <IconButton disabled={disabled} onClick={minusHandle} sx={{ border: `1px solid ${borderColor}`, height: 30, width: 30, }} >
                <RemoveIcon fontSize="small" />
            </IconButton>
        </div>
    )
}