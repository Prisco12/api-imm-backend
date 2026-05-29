import mongoose from "mongoose";
import { UserDocument } from "src/modules/users/schema/user.schema";

export class LoginPayload {
    _id: mongoose.Types.ObjectId;
    role: string;

    constructor(userEntity: UserDocument) {
        this._id = userEntity._id;
        this.role = userEntity.role;
    }   
} 