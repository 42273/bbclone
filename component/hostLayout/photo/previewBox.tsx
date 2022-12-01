import AddBox from "./addBox";
import PreviewPhoto from "./previewPhoto";
import Grid from '@mui/material/Grid';
import { FillProps } from "./fill";
import * as React from 'react';


export default function PreviewBox(props: FillProps) {
    const [qun, setQun] = React.useState<number>(1)
    React.useEffect(() => {
        setQun((5 - props.files.length) > 0 ? 5 - props.files.length : 1);
    }, [props.files.length])
    return <>
        <Grid item xs={12}
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            textAlign="center"
            onDragOver={(evt) => {
                evt.preventDefault();
                evt.stopPropagation();
            }}
        >
            {props.files.map((i, index) => <PreviewPhoto
                dropHandle={props.dropHandle} index={index} key={i.name} target={i}
                filesDeleteHandle={props.filesDeleteHandle}
            />)}
            {
                [...Array(qun)].map((n, index) => {
                    return <AddBox key={index} dropHandle={props.dropHandle} fileSelectHandle={props.fileSelectHandle} />
                })
            }
        </Grid>
    </>
}