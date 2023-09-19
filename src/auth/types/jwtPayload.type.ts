export type JwtPayload = {
    id_user: number;
    name: string;
    email: string;
    phone: string;
    birth_day: Date;
    gender: boolean;
    skill: string[];
    certification: string[];
};