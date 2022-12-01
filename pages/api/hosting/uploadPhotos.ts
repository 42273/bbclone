import formidable from "formidable";
import { NextApiRequest, NextApiResponse, NextConfig } from "next";
import { ref, getStorage, getDownloadURL, uploadBytes } from "firebase/storage";
/*
multipart / form-data parser는 기본 내장이 안되어 있어서 추가 설정
(multer같은..)
formidable 이란 multipart/ parsing 라이브러리를 활용
npm i formidable @types/formidable
*/

import { initializeApp } from "firebase/app";
import { readFileSync } from "fs";
import room from "../../../lib/model/room";
import dbConnect from "../../../lib/dbConnect";

const firebaseConfig = {
    apiKey: "AIzaSyAOcTh7fVQ63ugz-bJlLtDkPxshyLBmwMY",
    authDomain: "airbnb-clone-6a913.firebaseapp.com",
    projectId: "airbnb-clone-6a913",
    storageBucket: "airbnb-clone-6a913.appspot.com",
    messagingSenderId: "775891900050",
    appId: "1:775891900050:web:e692aba3d80032dc21384b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    console.log("photo in");
    const storage = getStorage(app);
    const form = formidable({ multiples: true });
    try {

        /*
                form.parse(req, async (err, fields, files) => {
                    if (err) {
                        return console.log(err, "EEEEEEEERRRRRRRRRRRRR");
                    }
                    const dirRef = ref(storage, "hosting/" + fields.itemId);
                    const uploadsda = async (files: formidable.File[], urls: Array<string> = []): Promise<Array<string>> => {
                        if (files.length === 0) return urls
                        let fileRef = ref(dirRef, files[0].newFilename);
                        const file = readFileSync(files[0].filepath);
                        const rst = await uploadBytes(fileRef, file, { contentType: files[0].mimetype! })
                        const url = await getDownloadURL(fileRef);
                        const rest = files.slice(1);
                        urls.push(url)
                        return await uploadsda(rest, urls)!;
                    }
                    const url: Array<string> = await uploadsda(files.photos as formidable.File[]);
                    await dbConnect()
                    const update = await room.findOneAndUpdate({
                        roomId: parsedFunc.itemId, email: parsedFunc.email
                    }, {
                        photo: urls, phase: parsedFunc.phase
                    }, { returnDocument: 'after' });
                    if (update) {
                        return res.status(200).json({ result: true, datas: 'goToNext' });
                    }
                })
        */
        const parsedFunc: { email: string; phase: string; itemId: string; photos: formidable.File[] } =
            await new Promise((resolve, reject) => {
                form.parse(req, (err, fields, files) => {
                    resolve({
                        email: fields.email as string,
                        phase: fields.phase as string,
                        itemId: fields.itemId as string,
                        photos: files.photos as formidable.File[],
                    });
                });
            });
        const dirRef = ref(storage, "hosting/" + parsedFunc.itemId);

        const urls: Array<string> = await Promise.all(parsedFunc.photos.map(async one => {
            const file = readFileSync(one.filepath);
            let fileRef = ref(dirRef, one.newFilename);
            await uploadBytes(fileRef, file, { contentType: one.mimetype! })
            return await getDownloadURL(fileRef);
        }))
        //위의 주석걸린 재귀함수 코드에서 업로드 시간 최적화를 위해 promise all로 리팩토링
        await dbConnect()
        const update = await room.findOneAndUpdate({
            roomId: parsedFunc.itemId, email: parsedFunc.email
        }, {
            photo: urls, phase: parsedFunc.phase
        }, { returnDocument: 'after' });
        console.log('out')

        return res.status(200).json({ result: true, datas: 'goToNext' });
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.log(e.message);
            return res.status(500).json({ result: false });
        } else {
            return res.status(500).json({ result: false });
        }
    }
}

export const config: NextConfig = {
    api: {
        bodyParser: false,
    }
}
export default handler

