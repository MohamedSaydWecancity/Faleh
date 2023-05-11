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
  order:number;
  image:string;
  parentId:string;

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
export interface GetCategoryAllForList
{
    id:number;
    title: string;
    order:number;
    parentId:number
}
export interface GetCategories {
  id: number;
  title: string;
  titleAr: string;
  categoryImage: string;
  parentId: number;
  order:number;
}