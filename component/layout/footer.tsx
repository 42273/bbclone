import { Box } from '@mui/material';


export default function Footer({ className }: { className: string }) {
    return (
        <Box className={className} sx={{ minWidth: '100%' }}>
            <span>2022 A / I / R B&B Clone Project <b style={{
                textShadow: "0.8px 0.8px 0.8px rgb(230,30,77)"
            }}>Created by Han.</b></span>
            <span>Next.js(Vercel) 을 통해 빌드&배포&호스팅됨</span>
        </Box>
    )
}