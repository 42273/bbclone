import { format } from 'date-fns';
import type { NextApiHandler, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt';
import dbConnect from '../../../lib/dbConnect';
import booking from '../../../lib/model/booking';
import Room, { RoomShcemaProps } from '../../../lib/model/room';
import { Response } from '../account/auth-flow';

interface dataType {
    roomId: number, data: { orderID: string, payerID: string }, guest: { adult: number, children: number, infants: number }
    , book: { checkin: string, checkout: string }, cost: number, option: boolean, userEmail: string
}

const handler: NextApiHandler = async (req, res: NextApiResponse<Response>) => {
    const token = await getToken({ req });
    // if(!token?.email)return res.status(401)
    const { roomId, data, guest, book, cost, option, userEmail }: dataType = req.body;
    if (req.method === "POST" && (data.orderID && data.payerID && roomId && guest && book.checkin && book.checkout && cost && userEmail)) {
        try {
            const start = format(new Date(book.checkin), "yyyyMMdd");
            const end = format(new Date(book.checkout), "yyyyMMdd");
            dbConnect();
            const finded = await booking.find({ productId: roomId, checkin: { $lt: end }, checkout: { $gt: start } })
            if (finded.length === 0) {
                await booking.create({
                    checkin: start,
                    checkout: end,
                    productId: roomId,
                    numberOfAdults: guest.adult,
                    numberOfChildren: guest.children,
                    numberOfInfants: guest.infants,
                    partial: option,
                    price: cost,
                    approve: {
                        orderID: data.orderID,
                        payerID: data.payerID
                    },
                    userEmail: userEmail
                })
                return res.status(200).json({ result: true, datas: "goToNext" })
            } else {
                return res.status(500).json({ result: false, datas: "null" })
            }
        } catch (e) {
            console.log(e)
            return res.status(500).json({ result: false, datas: "null" })
        }
    }
    return res.status(500).json({ result: false })
}

export default handler
