import { ReturnUserDto } from "src/modules/users/dto/return-user.dto";

export interface ReturnLoginDto {
    user: ReturnUserDto;
    acessToken: string;
}