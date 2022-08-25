import crypto from "crypto";

const random = async (stringLen: number) => {
  let rand = await crypto.randomBytes(stringLen);
  const randString: any = rand.toString("hex");

  return randString;
};

export default random;
