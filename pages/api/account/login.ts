import type { NextApiHandler, NextApiResponse } from 'next'
import Account, { AccountShcemaProps } from '../../../lib/model/account'
import { compare } from "bcryptjs";
import dbConnect from '../../../lib/dbConnect';

export type Response = {
    result: boolean,
    message?: string,
    data?: AccountShcemaProps
}

const handler: NextApiHandler = async (req, res: NextApiResponse<Response>) => {
    if (req.method === "POST") {
        const { email, password } = req.body as { email: string; password: string };
        if (!password || !email) {
            return res.status(500).json({ result: false, message: "accessDenied" })
        }
        try {
            await dbConnect()
            const data = await Account.findOne({ email: email }).lean();
            if (!data) {
                return res.status(200).json({ result: false, message: "뭔가잘못됨" })
            } else {
                if (await compare(password, data.password as string)) {
                    return res.status(200).json({ result: true, data: data })
                }
                return res.status(401).json({ result: false, message: "비번틀림" })
            }
        } catch (e) {
            return res.status(500).json({ result: false })
        }
    }
    else {
        return res.status(500).json({ result: false })
    }
}

export default handler
