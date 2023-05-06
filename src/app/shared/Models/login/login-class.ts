export interface LoginDto {
    username:string,
    password:string
    //  roleId:number
}


export class ChangePassword {
    id:number;
    currentPassword: string;
    newPassword: string
}
