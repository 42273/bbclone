import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import * as React from 'react';
import { Divider } from '@mui/material';
import { LocationInfoStateProps } from '../../../pages/become-a-host/[itemId]/location';
interface LocationInputProps {
    values: LocationInfoStateProps;
    setValues: React.Dispatch<React.SetStateAction<LocationInfoStateProps>>;
}
interface ErrorModeProps {
    country: boolean,
    administrative_area_level_1: boolean,
    administrative_area_level_2: boolean,
    postal_code: boolean,
    sublocality_level_4: boolean,
    sublocality_level_1: boolean,
}

export default function LocationInput({ values, setValues }: LocationInputProps) {

    const [errMode, setErrMode] = React.useState<ErrorModeProps>({
        country: false,
        administrative_area_level_1: false,
        administrative_area_level_2: false,
        postal_code: false,
        sublocality_level_4: false,
        sublocality_level_1: false
    })

    const handleChange =
        (prop: keyof LocationInfoStateProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues({ ...values, [prop]: event.target.value });
            if (errMode[prop]) {
                setErrMode(current => ({ ...current, [prop]: false }))
            }
        };
    return (
        <>
            <Box px={2} py={4}>
                <TextField
                    margin="none"
                    id="route"
                    label="도로명"
                    type="text"
                    fullWidth
                    error={errMode.administrative_area_level_1}
                    onChange={handleChange('administrative_area_level_1')}
                    defaultValue={values.administrative_area_level_1}
                />
                <TextField
                    sx={{ mt: 1 }}
                    margin="none"
                    id="administrative_area_level_2"
                    label="아파트 이름,동호수 등(선택사항)"
                    type="text"
                    fullWidth
                    defaultValue={values.administrative_area_level_2}
                    onChange={handleChange('administrative_area_level_2')}
                />
                <TextField
                    sx={{ mt: 1 }}
                    margin="none"
                    id="postal_code"
                    label="우편번호"
                    type="text"
                    fullWidth
                    error={errMode.postal_code}
                    defaultValue={values.postal_code}
                    onChange={handleChange('postal_code')}
                />
                <TextField
                    sx={{ mt: 1 }}
                    margin="none"
                    id="sublocality_level_4"
                    label="도로 "
                    type="text"
                    fullWidth
                    error={errMode.sublocality_level_4}
                    defaultValue={values.sublocality_level_4}
                    onChange={handleChange('sublocality_level_4')}
                />
                <TextField
                    sx={{ mt: 1 }}
                    margin="none"
                    id="sublocality_level_1"
                    label="주/도 "
                    type="text"
                    fullWidth
                    error={errMode.sublocality_level_1}
                    defaultValue={values.sublocality_level_1}
                    onChange={handleChange('sublocality_level_1')}
                />
                <TextField
                    sx={{ mt: 1 }}
                    margin="none"
                    id="country"
                    label="국가/지역"
                    type="text"
                    fullWidth
                    error={errMode.country}
                    defaultValue={values.country}
                    onChange={handleChange('country')}
                />
                <Divider sx={{ my: 1.5 }} />
            </Box>
        </>
    )
}