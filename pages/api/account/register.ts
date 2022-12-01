import type { NextApiHandler, NextApiResponse } from 'next'
import Account, { AccountShcemaProps } from '../../../lib/model/account'
import { hash } from "bcryptjs";
import dbConnect from '../../../lib/dbConnect';
type Response = {
    result: boolean,
    datas?: string;
}

const emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

const handler: NextApiHandler = async (req, res: NextApiResponse<Response>) => {
    if (req.method === "POST") {

        const { email, lastName, firstName, birthday, password, marketing, policy, provider, providerAccountId }: AccountShcemaProps = req.body;
        if (!provider && !providerAccountId) {

            if (!email || !lastName || !firstName || !birthday || !password || !policy) {
                return res.status(500).json({ result: false, datas: "accessdenied" });
            }

            if (!emailRegExp.test(email)) {
                return res.status(500).json({ result: false, datas: "notEmail" });
            }

            try {
                await dbConnect()
                const hashed = await hash(password, 12);
                const data = await Account.create({
                    email: email,
                    lastName: lastName,
                    firstName: firstName,
                    birthday: birthday,
                    password: hashed,
                    marketing: Boolean(marketing) ? Date.now() : null,
                    policy: Boolean(policy) ? Date.now() : null
                });
                if (data) {
                    return res.json({ result: true, datas: "가입됨" })
                } else {
                    return res.json({ result: false, datas: "뭔가잘못됨" })
                }
            } catch (e: unknown) {
                if (e instanceof Error) {
                    console.log(e.message);
                    if (e.message.includes("duplicate")) {
                        return res.status(500).json({ result: false, datas: "email-duplicate" })
                    }
                }
                return res.status(500).json({ result: false })
            }
        } else if (provider && providerAccountId) {
            const data = await Account.create({
                email: email,
                lastName: lastName,
                firstName: firstName,
                birthday: birthday,
                marketing: Boolean(marketing) ? Date.now() : null,
                policy: Boolean(policy) ? Date.now() : null,
                provider: provider,
                providerAccountId: providerAccountId
            })
            if (data) {
                return res.json({ result: true, datas: "가입됨" })
            } else {
                return res.json({ result: false, datas: "뭔가잘못됨" })
            }
        } else {
            return res.status(500).json({ result: false })
        }
    }
    else {
        return res.status(500).json({ result: false })
    }
}

export default handler
