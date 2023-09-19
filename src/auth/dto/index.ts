import { ApiProperty } from "@nestjs/swagger";

export interface UserDto {
    id_user: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    birth_day: Date;
    gender: Boolean;
    role?: string;
    skill: string[];
    certification: string[];
    accessToken?: string;
    refreshToken?: string;
}

export interface UserSignUpDto {
    id_user: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    birth_day: Date;
    gender: boolean;
    role: string;
    skill: string[];
    certification: string[];
    hash: string;
    hashedRt: string;
}

export class FileUploadDto {
    @ApiProperty({ type: 'string', format: 'binary' })
    fileUpload: any;
}