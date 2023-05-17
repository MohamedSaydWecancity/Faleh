export interface CreateUser
{
    name:string;
    nameAr:string;
    username:string;
    roleId:number;
    password:string;
    categoriesIds? :number[];
}
export interface GetUser
{
    id: number;
    name: string;
    nameAr: string;
    username: Date;
    roleId: number;
    creationDate: Date;

}

export interface GetUserList 
{
    totalCount:number
    items:GetUser[]
}
export interface ChangePassword
{
    currentPassword:string;
    newPassword :string;
}
export interface GetMyProfile
{
    id: number;
    name: string;
    nameAr: string;
    username: Date;
    roleId: number;
    creationDate: Date;
    expertCategories: {
        id: number;
        title: string;
      }[];
}

export interface UpdateUser
{
    name:string;
    nameAr:string;
    username:string;
    roleId:number;
    id:number;
    categoriesIds :number[];
}
export interface GetRoles
{
    id:number;
    title;
}
