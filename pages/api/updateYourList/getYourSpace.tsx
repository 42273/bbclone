import type { NextApiHandler, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt';
import Room, { RoomShcemaProps } from '../../../lib/model/room';
import { Response } from '../account/auth-flow';

interface dataType {
    phase: string;
    data: string | object;
    email: string;
    roomId: number;
}

const handler: NextApiHandler = async (req, res: NextApiResponse<Response>) => {
    const token = await getToken({ req });
    // if(!token?.email)return res.status(401)
    // vercel 서버가 너무 느려서 일단 보류
    const { phase, data, email, roomId }: dataType = req.body;
    if (req.method === "POST" && (phase && data && email && roomId)) {
        try {
            if (data === "index") {
                await Room.create({
                    roomId: roomId,
                    email: email,
                })
                return res.json({ result: true, datas: "createComplete" })
            }
            if (phase === 'receipt') {
                await Room.findOneAndUpdate({
                    roomId: roomId, email: email
                }, {
                    phase: phase,
                    complete: { complete: true, Date: Date.now() }
                })
                return res.json({ result: true, datas: 'receiptComplete' })
            }
            await Room.findOneAndUpdate({
                roomId: roomId, email: email
            }, {
                [phase]: data,
                phase: phase
            });
            return res.json({ result: true, datas: "goToNext" })
        } catch (e) {
            return res.status(500).json({ result: false, datas: "null" })
        }
    }
    return res.status(500).json({ result: false })
}

export default handler
