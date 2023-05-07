export interface CreateOrUpdateKeyword
{
  id?:number;
  titleAr: string;
  title: string;
}
export interface GetKeyword
{
  id:number;
  titleAr: string;
  title: string;

}
export interface GetKeywordById 
{
    id:number;
    titleAr: string;
    title: string;
}
export interface GetKeywordList 
{
    totalCount:number
    items:GetKeyword[]
}
export interface GetKeywordAllForList 
{
    id:number;
    title: string;
}