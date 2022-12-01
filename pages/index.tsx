import { Grid } from '@mui/material';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head'
import GridPlaceItem from '../component/body/gridPlaceItem';
import dbConnect from '../lib/dbConnect';
import room, { RoomShcemaProps } from '../lib/model/room';
import * as React from 'react';
import { Ctx } from '../context/context';

export default function Home(prop: { roomList: RoomShcemaProps[] }) {

  const [roomList, setRoomList] = React.useState<Array<RoomShcemaProps>>(prop.roomList.sort((a, b) => b.complete?.Date! - a.complete?.Date!))
  const ctx = React.useContext(Ctx);
  React.useEffect(() => {
    if (ctx?.categoryFilter?.length! > 0) {
      setRoomList(prop.roomList.filter(i => i.amenities?.includes(ctx?.categoryFilter!)))
    } else {
      setRoomList(prop.roomList)
    }
  }, [ctx?.categoryFilter])
  return (
    <>
      <Head>
        <title>
          여행은 살아보는 거야
        </title>
      </Head>
      <Grid container spacing={3} pt={3}>
        {roomList.map(i => {
          return (
            <GridPlaceItem key={i.roomId + i.email} item={i} />
          )
        })}
      </Grid>
    </>
  )
}

export async function getServerSideProps(props: GetServerSidePropsContext) {
  let roomList = null;
  try {
    await dbConnect()
    roomList = await room.find({ 'complete.complete': true }, { _id: 0 }).lean();
  } catch (e: unknown) {
    if (e instanceof Error) console.log(e.message);
    console.log(e)
  }
  return {
    props: {
      roomList: roomList
    }
  }
}