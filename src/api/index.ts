import axios from 'axios'

const KEY = '5cf5ceed6b6500af31bf861ca6040fa9'
const createKakaoRequest = async (img: BinaryData): Promise<any> => {
    const d = await axios.post(`/api`, {
        body: {
            img
        },
        headers: {
            'x-api-key': KEY,
            'Content-Type': 'multipart/form-data',
            "Access-Control-Allow-Origin": '*',
            'Access-Control-Allow-Credentials':"true",
        } 
    })

    console.log(d)
}

export default createKakaoRequest