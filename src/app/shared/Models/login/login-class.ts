export interface LoginDto {
    username:string,
    password:string
    //  roleId:number
}


export interface ChangePassword {
    currentPassword: string;
    newPassword: string
}


export class LoginResponse {
    message: string;
    data:{
        id:number,    
        username: string,
        token: string,
        name: string,
        roleId: number,
        roleTitle:number


    }
    
    success: boolean;
 
}
 

 