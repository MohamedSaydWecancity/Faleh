export interface CreateOrUpdateCategory
{
  id?:number;
  titleAr: string;
  title: string;
}
export interface GetCategory
{
  id:number;
  titleAr: string;
  title: string;

}
export interface GetCategoryById 
{
    id:number;
    titleAr: string;
    title: string;
}
export interface GetCategoryList 
{
    totalCount:number
    items:GetCategory[]
}
