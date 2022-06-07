import { NextFunction, Request, Response } from "express";


export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  //const { id } = request.user;
  //console.log(id)

/*  const user = await getUserProfile(id);

  if (!user.isAdmin) {
    throw new Error("User isn't admin");
  }
*/
  return next();
}
