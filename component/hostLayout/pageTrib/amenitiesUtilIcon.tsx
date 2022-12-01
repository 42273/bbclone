import WifiIcon from '@mui/icons-material/Wifi';
import { Box, Typography } from "@mui/material"
import { SxProps } from '@mui/system';
import { styled } from '@mui/material'
import TvIcon from '@mui/icons-material/Tv';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import ElectricMeterIcon from '@mui/icons-material/ElectricMeter';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import CountertopsIcon from '@mui/icons-material/Countertops';
import PoolIcon from '@mui/icons-material/Pool';
import HotTubIcon from '@mui/icons-material/HotTub';
import DeckIcon from '@mui/icons-material/Deck';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill';
import FireplaceIcon from '@mui/icons-material/Fireplace';
import ToggleButton from '@mui/material/ToggleButton';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import PianoIcon from '@mui/icons-material/Piano';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import KitesurfingIcon from '@mui/icons-material/Kitesurfing';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import DownhillSkiingIcon from '@mui/icons-material/DownhillSkiing';
import ShowerIcon from '@mui/icons-material/Shower';
import FireExtinguisherIcon from '@mui/icons-material/FireExtinguisher';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import WifiTetheringErrorIcon from '@mui/icons-material/WifiTetheringError';

const iconsStyle: SxProps = {
    borderRadius: "8px", m: "2px",
    ":hover": { border: "3px solid", m: "2px", borderColor: "black" },
    color: "black", borderColor: "gray",
    border: 1,
    width: "30%",
    height: 80, display: "flex", flexDirection: "column"
}

type AmenitiesUtilIconProps = {
    handleChange: (prop: string) => void;
    utils: Array<string>
}

type objType = {
    [key: string]: {
        title: string;
        icon: JSX.Element;
    }
}

export const objIcon: objType = {
    '무선 인터넷': { icon: <WifiIcon />, title: '무선 인터넷' },
    'Tv': { icon: <TvIcon />, title: 'Tv' },
    '주방': { icon: <SoupKitchenIcon />, title: '주방' },
    '세탁기': { icon: <LocalLaundryServiceIcon />, title: '세탁기' },
    '건물 내 무료주차': { icon: <DirectionsCarFilledIcon />, title: '건물 내 무료주차' },
    '건물 내 유료주차': { icon: <ElectricMeterIcon />, title: '건물 내 유료주차' },
    '에어컨': { icon: <AcUnitIcon />, title: '에어컨' },
    '업무 전용 공간': { icon: <CountertopsIcon />, title: '업무 전용 공간' },
    '수영장': { icon: <PoolIcon />, title: '수영장' },
    '온수 욕조': { icon: <HotTubIcon />, title: '온수 욕조' },
    '파티오': { icon: <EmojiNatureIcon />, title: '파티오' },
    '바비큐 그릴': { icon: <OutdoorGrillIcon />, title: '바비큐 그릴' },
    '야외 식사 공간': { icon: <DeckIcon />, title: '야외 식사 공간' },
    '화로': { icon: < WhatshotIcon />, title: '화로' },
    '당구대': { icon: <VideogameAssetIcon />, title: '당구대' },
    '실내 벽난로': { icon: <FireplaceIcon />, title: '실내 벽난로' },
    '피아노': { icon: <PianoIcon />, title: '피아노' },
    '운동 기구': { icon: <FitnessCenterIcon />, title: '운동 기구' },
    '호수로 연결됨': { icon: <KitesurfingIcon />, title: '호수로 연결됨' },
    '해변과 인접': { icon: <BeachAccessIcon />, title: '해변과 인접' },
    '스키를 탄 채로 출입 가능': { icon: <DownhillSkiingIcon />, title: '스키를 탄 채로 출입 가능' },
    '야외 샤워 시설': { icon: <ShowerIcon />, title: '야외 샤워 시설' },
    '화재 경보기': { icon: <CrisisAlertIcon />, title: '화재 경보기' },
    '구급 상자': { icon: <MedicalServicesIcon />, title: '구급 상자' },
    '소화기': { icon: <FireExtinguisherIcon />, title: '소화기' },
    '이산화탄소 경보기': { icon: <WifiTetheringErrorIcon />, title: '이산화탄소 경보기' },
}
export default function AmenitiesUtilIcon({ handleChange, utils }: AmenitiesUtilIconProps) {
    const CustomToggle = styled(ToggleButton)({
        "&.Mui-selected, &.Mui-selected:hover": {
            border: "3px solid black", margin: "2px"
        },
        borderRadius: "8px", m: "2px", border: 1, color: "black", borderColor: "gray"
    })
    return (
        <Box sx={{}}>
            <Box sx={{ display: 'flex', flexDirection: "row", flexWrap: "wrap", width: '100%' }}>
                <CustomToggle value={"무선 인터넷"} onSelect={(select) => select} selected={utils.includes("무선 인터넷") ? true : false} onChange={() => handleChange("무선 인터넷")} disableRipple sx={iconsStyle} >
                    <WifiIcon />
                    무선 인터넷
                </CustomToggle>
                <CustomToggle value={"Tv"} onSelect={(select) => select} selected={utils.includes("Tv") ? true : false} onChange={() => handleChange("Tv")} disableRipple sx={iconsStyle} >
                    <TvIcon />
                    Tv
                </CustomToggle>
                <CustomToggle value={"주방"} onSelect={(select) => select} selected={utils.includes("주방") ? true : false} onChange={() => handleChange("주방")} disableRipple sx={iconsStyle} >
                    <SoupKitchenIcon />
                    주방
                </CustomToggle>
                <CustomToggle value={"세탁기"} onSelect={(select) => select} selected={utils.includes("세탁기") ? true : false} onChange={() => handleChange("세탁기")} disableRipple sx={iconsStyle} >
                    <LocalLaundryServiceIcon />
                    세탁기
                </CustomToggle>
                <CustomToggle value={"건물 내 무료주차"} onSelect={(select) => select} selected={utils.includes("건물 내 무료주차") ? true : false} onChange={() => handleChange("건물 내 무료주차")} disableRipple sx={iconsStyle} >
                    <DirectionsCarFilledIcon />
                    건물 내 무료주차
                </CustomToggle>
                <CustomToggle value={"건물 내 유료주차"} onSelect={(select) => select} selected={utils.includes("건물 내 유료주차") ? true : false} onChange={() => handleChange("건물 내 유료주차")} disableRipple sx={iconsStyle} >
                    <ElectricMeterIcon />
                    건물 내 유료주차
                </CustomToggle>
                <CustomToggle value={"에어컨"} onSelect={(select) => select} selected={utils.includes("에어컨") ? true : false} onChange={() => handleChange("에어컨")} disableRipple sx={iconsStyle} >
                    <AcUnitIcon />
                    에어컨
                </CustomToggle>
                <CustomToggle value={"업무 전용 공간"} onSelect={(select) => select} selected={utils.includes("업무 전용 공간") ? true : false} onChange={() => handleChange("업무 전용 공간")} disableRipple sx={iconsStyle} >
                    <CountertopsIcon />
                    업무 전용 공간
                </CustomToggle>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: "row", flexWrap: "wrap", width: '100%' }}>
                <CustomToggle value={"수영장"} onSelect={(select) => select} selected={utils.includes("수영장") ? true : false} onChange={() => handleChange("수영장")} disableRipple sx={iconsStyle} >
                    <PoolIcon />
                    수영장
                </CustomToggle>
                <CustomToggle value={"온수 욕조"} onSelect={(select) => select} selected={utils.includes("온수 욕조") ? true : false} onChange={() => handleChange("온수 욕조")} disableRipple sx={iconsStyle} >
                    <HotTubIcon />
                    온수 욕조
                </CustomToggle>
                <CustomToggle value={"파티오"} onSelect={(select) => select} selected={utils.includes("파티오") ? true : false} onChange={() => handleChange("파티오")} disableRipple sx={iconsStyle} >
                    <EmojiNatureIcon />
                    파티오
                </CustomToggle>
                <CustomToggle value={"바비큐 그릴"} onSelect={(select) => select} selected={utils.includes("바비큐 그릴") ? true : false} onChange={() => handleChange("바비큐 그릴")} disableRipple sx={iconsStyle} >
                    <OutdoorGrillIcon />
                    바비큐 그릴
                </CustomToggle>
                <CustomToggle value={"야외 식사 공간"} onSelect={(select) => select} selected={utils.includes("야외 식사 공간") ? true : false} onChange={() => handleChange("야외 식사 공간")} disableRipple sx={iconsStyle} >
                    <DeckIcon />
                    야외 식사 공간
                </CustomToggle>
                <CustomToggle value={"화로"} onSelect={(select) => select} selected={utils.includes("화로") ? true : false} onChange={() => handleChange("화로")} disableRipple sx={iconsStyle} >
                    < WhatshotIcon />
                    화로
                </CustomToggle>
                <CustomToggle value={"당구대"} onSelect={(select) => select} selected={utils.includes("당구대") ? true : false} onChange={() => handleChange("당구대")} disableRipple sx={iconsStyle} >
                    <VideogameAssetIcon />
                    당구대
                </CustomToggle>
                <CustomToggle value={"실내 벽난로"} onSelect={(select) => select} selected={utils.includes("실내 벽난로") ? true : false} onChange={() => handleChange("실내 벽난로")} disableRipple sx={iconsStyle} >
                    <FireplaceIcon />
                    실내 벽난로
                </CustomToggle>
                <CustomToggle value={"피아노"} onSelect={(select) => select} selected={utils.includes("피아노") ? true : false} onChange={() => handleChange("피아노")} disableRipple sx={iconsStyle} >
                    <PianoIcon />
                    피아노
                </CustomToggle>
                <CustomToggle value={"운동 기구"} onSelect={(select) => select} selected={utils.includes("운동 기구") ? true : false} onChange={() => handleChange("운동 기구")} disableRipple sx={iconsStyle} >
                    <FitnessCenterIcon />
                    운동 기구
                </CustomToggle>
                <CustomToggle value={"호수로 연결됨"} onSelect={(select) => select} selected={utils.includes("호수로 연결됨") ? true : false} onChange={() => handleChange("호수로 연결됨")} disableRipple sx={iconsStyle} >
                    <KitesurfingIcon />
                    호수로 연결됨
                </CustomToggle>
                <CustomToggle value={"해변과 인접"} onSelect={(select) => select} selected={utils.includes("해변과 인접") ? true : false} onChange={() => handleChange("해변과 인접")} disableRipple sx={iconsStyle} >
                    <BeachAccessIcon />
                    해변과 인접
                </CustomToggle>
                <CustomToggle value={"스키를 탄 채로 출입 가능"} onSelect={(select) => select} selected={utils.includes("스키를 탄 채로 출입 가능") ? true : false} onChange={() => handleChange("스키를 탄 채로 출입 가능")} disableRipple sx={iconsStyle} >
                    <DownhillSkiingIcon />
                    스키를 탄 채로 출입 가능
                </CustomToggle>
                <CustomToggle value={"야외 샤워 시설"} onSelect={(select) => select} selected={utils.includes("야외 샤워 시설") ? true : false} onChange={() => handleChange("야외 샤워 시설")} disableRipple sx={iconsStyle} >
                    <ShowerIcon />
                    야외 샤워 시설
                </CustomToggle>
            </Box>
            <Typography variant="h5">
                다음과 같은 안전 관련 물품이 있나요?
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: "row", flexWrap: "wrap", width: '100%' }}>
                <CustomToggle value={"화재 경보기"} onSelect={(select) => select} selected={utils.includes("화재 경보기") ? true : false} onChange={() => handleChange("화재 경보기")} disableRipple sx={iconsStyle} >
                    <CrisisAlertIcon />
                    화재 경보기
                </CustomToggle>
                <CustomToggle value={"구급 상자"} onSelect={(select) => select} selected={utils.includes("구급 상자") ? true : false} onChange={() => handleChange("구급 상자")} disableRipple sx={iconsStyle} >
                    <MedicalServicesIcon />
                    구급 상자
                </CustomToggle>
                <CustomToggle value={"소화기"} onSelect={(select) => select} selected={utils.includes("소화기") ? true : false} onChange={() => handleChange("소화기")} disableRipple sx={iconsStyle} >
                    <FireExtinguisherIcon />
                    소화기
                </CustomToggle>
                <CustomToggle value={"이산화탄소 경보기"} onSelect={(select) => select} selected={utils.includes("이산화탄소 경보기") ? true : false} onChange={() => handleChange("이산화탄소 경보기")} disableRipple sx={iconsStyle} >
                    <WifiTetheringErrorIcon />
                    이산화탄소 경보기
                </CustomToggle>
            </Box>
        </Box>
    )
}