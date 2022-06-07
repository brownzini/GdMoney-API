import dayjs from "dayjs";
import { addRefreshToken } from "../firebase/services/Authenticate";

const generateRefreshToken = async(userId: string):Promise<string> => {
    const expiresIn = dayjs().add(3, "minutes").unix();
    const id = await addRefreshToken(userId, expiresIn);
    return id;
}

export default generateRefreshToken;