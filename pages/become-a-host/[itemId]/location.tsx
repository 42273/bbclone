declare var google: any;
import Grid from '@mui/material/Grid';
import TextGrid from '../../../component/hostLayout/textGrid';
import * as React from 'react';
import { SxProps } from '@mui/system';
import { Box } from "@mui/material"
import ColorBtn from '../../../component/layout/headparts/menuModal.tsx/colorBtn';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Script from 'next/script';
import LocationModal from '../../../component/hostLayout/locationModal';
import HelpBtn from '../../../component/hostLayout/headparts/helpBtn';
import ExitBtn from '../../../component/hostLayout/headparts/exitBtn';
import SearchBar from '../../../component/hostLayout/searchBar';
import MapPinDetail from '../../../component/hostLayout/locationDetail/MapPinDetail';
import { GetServerSidePropsContext } from 'next';
import { getYourSpaceUpdate } from '../../../util/utils';
import { useSession } from 'next-auth/react';
export const topGrid: SxProps = { display: "flex", flexDirection: "column", height: "100vh" }
export const boxStyle: SxProps = { display: "flex", justifyContent: "center" }
export const contentDivStyle: React.CSSProperties = { position: "relative", width: "100%", height: "100%" }

export interface LocationInfoStateProps {
    country: string;
    administrative_area_level_1: string; //시도
    administrative_area_level_2: string;
    postal_code: string;
    sublocality_level_4: string; //도로명
    sublocality_level_1: string;
}

export default function LocationPage({ itemId }: { itemId: number }) {
    const router = useRouter();
    const [keyword, setKeyword] = useState<string>("")
    var geocoder: google.maps.Geocoder;
    const [size, setSize] = useState<{ width: string, height: string }>({ width: "640", height: "640" })
    const [location, setLocation] = useState<{ lng: string, lat: string }>({ lng: "126.8936", lat: "35.1629" })
    const [searchPrid, setSearchPrid] = useState<[{ description?: string }]>([{}]);
    const [bottomOpen, setBottomOpen] = useState<boolean>(false)
    const session = useSession()
    const [phase, setPhase] = useState<string>("searchBar")
    const [newLocation, setNewLocation] = useState({ lat: 0, lng: 0 })
    const [locationInfo, setLocationInfo] = useState<LocationInfoStateProps>(
        {
            country: "",
            administrative_area_level_1: '',
            administrative_area_level_2: '',
            postal_code: '',
            sublocality_level_4: '',
            //도로
            sublocality_level_1: '',
            //구
        }
    )
    var timerForResizeLocationStaticMap: any;
    useEffect(() => {
        function handleResize() {
            clearTimeout(timerForResizeLocationStaticMap)
            return timerForResizeLocationStaticMap = setTimeout(() => {
                let newHeight: string | number = (Math.floor(window.innerHeight - 80));
                newHeight = newHeight > 640 ? 640 : newHeight;
                let newWidth: string | number = (Math.floor(window.innerWidth / 2));
                newWidth = newWidth > 640 ? 640 : newWidth;
                newHeight = newHeight < 400 ? 400 :
                    newHeight < 520 ? 520 : 640;
                newWidth = newWidth < 400 ? 400 :
                    newWidth < 520 ? 520 : 640
                if (newHeight === Number(size.height) && newWidth === Number(size.width)) {
                    return;
                }
                if (newHeight.toString() === size.height && newWidth.toString() === size.width) {
                    return;
                }
                setSize({
                    width: newWidth.toString(),
                    height: newHeight.toString()
                })
            }, 1000)
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    })

    useEffect(() => {
        const timer = setTimeout(
            async () => {
                if (keyword.length === 0) return;
                const cmpasv = new google.maps.places.AutocompleteService();
                const list = await cmpasv.getPlacePredictions(
                    { input: keyword, fields: ["formatted_address", "geometry", "name"] }
                );
                setSearchPrid(list.predictions)
            }, 1000);
        return () => {
            clearTimeout(timer)
        }
    }, [keyword])
    const initialize: ((e: any) => void) | undefined = () => {

    }
    const nextStepHandle = async (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (phase !== "locationPin") {
            evt.preventDefault();
            return;
        }
        try {
            const rst = await getYourSpaceUpdate("location",
                session.data?.user?.email as string,
                itemId, { info: locationInfo, coordinate: newLocation })
            if (rst.result) {
                router.push("/become-a-host/" + itemId + "/floor-plan");
            }
            else {
                alert("Error")
            }
        } catch (e: any) {
            alert("error : " + e.message)
            console.log(e.message)
        }
    }
    const searchHandle = (evt: React.FormEvent<HTMLFormElement> | string,) => {
        let address;
        if (typeof evt === "string") {
            address = evt
        } else {
            address = keyword;
            evt?.preventDefault();
        }
        geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': address }, function (results: google.maps.GeocoderResult[] | null, status: google.maps.GeocoderStatus) {
            if (status == 'OK') {
                // console.log(results![0].address_components)
                results![0].address_components.forEach(info => {
                    info.types.some(i => {
                        if (Object.keys(locationInfo).includes(i)) {
                            // console.log(typeof info.long_name)
                            setLocationInfo(current => ({
                                ...current, [i]: info.long_name
                            }))
                        }
                    })
                })
                setLocation(
                    {
                        lat: results![0].geometry.location.lat().toFixed(4),
                        lng: results![0].geometry.location.lng().toFixed(4)
                    })
                setPhase("detailLocation")
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }
    const backHandle = () => {
        setLocationInfo({
            country: "",
            administrative_area_level_1: '',
            administrative_area_level_2: '',
            postal_code: '',
            sublocality_level_4: '',
            sublocality_level_1: '',
        })
        setPhase("searchBar")
    }

    const nowPositionHandle = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            if (position.coords.latitude && position.coords.longitude) {
                setLocation({ lat: (position.coords.latitude)?.toString(), lng: (position.coords.longitude)?.toString() })
                setPhase("detailLocation")
            }
        })
    }
    const bottomShowFalseHandle = (evt: any) => {
        // React.MouseEvent<HTMLDivElement, MouseEvent>
        if (evt.nativeEvent?.path.some((i: any) => {
            return i.className && i.className?.length && i.className.includes("preventd") ? true : false
        })) { return; }
        setBottomOpen(false)
    }
    const clickListHandle = (keyword: string | undefined) => {
        if (!(typeof keyword)) return;
        searchHandle(keyword!)
    }
    const getLocationPinHandle: () => void = () => {
        setPhase("locationPin");
    }
    return (
        <>
            <Script async
                src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBDVRixpcidj74WqDcnU7xS2BnWlTwm93s&libraries=places"
                onLoad={initialize}
            >
            </Script>
            <Grid
                onClick={(evt) => bottomShowFalseHandle(evt)}
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                textAlign="center"
            >
                {(phase === "locationPin") ?
                    <TextGrid> 핀이 놓인 위치가 정확한가요?</TextGrid>
                    :
                    <TextGrid>숙소 위치는 어디인가요?                    </TextGrid>
                }
                <Grid sx={topGrid} item xs={6}>
                    <Box flex={1} sx={boxStyle} >
                        {
                            (phase === "locationPin") ? <>
                                <MapPinDetail
                                    location={location}
                                    setNewLocation={setNewLocation}
                                />
                            </>
                                :
                                <div style={contentDivStyle}>
                                    <Image draggable={false} src={
                                        `https://maps.googleapis.com/maps/api/staticmap?&zoom=13&center=${location.lat},${location.lng}&size=${size.width}x${size.height}&maptype=roadmap&key=AIzaSyBDVRixpcidj74WqDcnU7xS2BnWlTwm93s&language=ko`}
                                        priority={true} alt='roomLocation' fill sizes='100vw' />
                                    <Box onClick={() => router.push("/")} style={{ position: "fixed", right: 50, top: 30 }}>
                                        <HelpBtn />
                                        <ExitBtn />
                                    </Box>
                                    <Box sx={{ width: "75%", margin: "0 auto", }}>
                                        {
                                            (phase === "searchBar") &&
                                            <SearchBar
                                                open={bottomOpen} setOpen={setBottomOpen} searchHandle={searchHandle}
                                                keyword={keyword} setKeyword={setKeyword}
                                                nowPositionHandle={nowPositionHandle} searchPrid={searchPrid} clickListHandle={clickListHandle}
                                            />
                                        }
                                        {
                                            (phase === "detailLocation") &&
                                            <LocationModal getLocationHandle={getLocationPinHandle} setInfo={setLocationInfo} info={locationInfo} backHandle={backHandle} />
                                        }
                                    </Box>
                                </div>
                        }
                    </Box>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: 10 }} >
                        <div onClick={() => router.back()} style={{ cursor: "pointer" }}>
                            <ColorBtn style={{ color: "black", width: "80px", mt: 1.5, py: 1.5 }}
                                color={"rgb(250,250,250)"} >뒤로 </ColorBtn>
                        </div>
                        <div onClick={(evt) => nextStepHandle(evt)}>
                            <ColorBtn disable={phase !== "locationPin" ? true : false} style={{ color: "white", width: "130px", mt: 1.5, py: 1.5 }}
                                color={"rgb(0,0,0)"} >다음 </ColorBtn>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </>
    )
}

LocationPage.layout = "host";


export async function getServerSideProps(props: GetServerSidePropsContext) {
    const itemId = props.query.itemId;
    return {
        props: {
            itemId: itemId
        }
    }
}