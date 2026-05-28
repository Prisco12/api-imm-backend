import mongoose from "mongoose";
import { User, UserDocument } from "../schema/user.schema";
import { EnumRoleUser } from "../enum/user-role";

export class ReturnUserDto {

    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    role: EnumRoleUser;
    active: boolean;
    
    constructor(user: UserDocument) {
        this._id = user._id;
        this.name = user.name;
        this.email = user.email;
        this.role = user.role;
        this.active = user.active;
    }
}