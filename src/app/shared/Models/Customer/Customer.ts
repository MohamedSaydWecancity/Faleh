export interface GetCustomerList 
{
    totalCount:number
    items:GetCUstomerItems[]
}
export interface GetCUstomerItems
{
  name: string;
  nameAr: string;
  mobile: string;
  birthdate: Date;
  image: string;
  email: string;

}