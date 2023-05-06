export interface CreateOrUpdateNews
{
  id?:number;
  titleAr: string;
  contentAr: string;
  NewsImage: File;
  keywordsIds: number[];
  categoriesIds: number[];
  title: string;
  content: string;
  date: Date;
}
export interface GetNews
{
  id:number;
  titleAr: string;
  contentAr: string;
  image: string;
  creationDate:Date;
  title: string;
  content: string;
  date: Date;
  views:number;

}
export interface GetNewsById 
{
  id: number;
  title: string;
  content: string;
  date: Date;
  titleAr: string;
  contentAr: string;
  image: string;
  creationDate: Date;
  views: number;
  newsKeywords: {
    id: number;
    title: string;
  }[];
  newsCategories: {
    id: number;
    title: string;
  }[];
}
export interface GetNewsList 
{
    totalCount:number
    items:GetNews[]
}
