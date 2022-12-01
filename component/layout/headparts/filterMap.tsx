import Tabs, { tabsClasses } from '@mui/material/Tabs';
import { Tab, Typography } from '@mui/material/';
import RightFilter from './rightFilter';
import * as React from 'react';
import { objIcon } from '../../hostLayout/pageTrib/amenitiesUtilIcon';
import { Ctx } from '../../../context/context';

type FilterMapProps = {
    coordinate: number;
    handleMove: (event: React.SyntheticEvent, newValue: number) => void;
}

export default function FilterMap({ coordinate, handleMove }: FilterMapProps) {
    const ctx = React.useContext(Ctx);
    return (
        <>
            <Tabs
                value={coordinate}
                onChange={handleMove}
                variant="scrollable"
                style={{ border: 2 }}
                scrollButtons
                sx={{
                    [`& .${tabsClasses.scrollButtons}`]: {
                        '&.Mui-disabled': { opacity: 0 },
                    }, borderRadius: 3, ml: -3, minWidth: '630px'
                }}
            >
                {
                    Object.keys(objIcon).map((section) => (
                        <Tab key={section} onClick={() => ctx?.setCatetoryFilter(section)} label={
                            <Typography>
                                <>
                                    {objIcon[section].icon} <br />
                                    {objIcon[section].title}
                                </>
                            </Typography>
                        } />
                    ))}
            </Tabs>
            <RightFilter />
        </>
    )
}