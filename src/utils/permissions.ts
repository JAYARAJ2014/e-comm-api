import { BadRequestError, UnAuthorizedError } from "../custom-errors";
import { UserRoleEnum } from "../models/user";

export class Permissions{

    public static verify(requestUser: {userId: string, name: string, role: string} | null, resourceUserId: string) :boolean {
        if (!requestUser) {
           throw new BadRequestError('Request is invalid')
        }
        if (requestUser.role === UserRoleEnum.ADMIN) return true;
        if (requestUser.userId === resourceUserId ) return true; 

        throw new UnAuthorizedError('Not authorized to access this route')
    }
}