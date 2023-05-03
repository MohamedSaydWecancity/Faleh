export interface CreateOrUpdateArticle
{
  id?:number;
  titleAr: string;
  contentAr: string;
  articleVideo: File;
  keywordsIds: number[];
  categoriesIds: number[];
  title: string;
  content: string;
  date: Date;
}
export interface GetArticle
{
  id:number;
  titleAr: string;
  contentAr: string;
  video: string;
  creationDate:Date;
  title: string;
  content: string;
  date: Date;
  views:number;
  reactions:number;

}
export interface GetArticleById 
{
  id: number;
  title: string;
  content: string;
  date: Date;
  titleAr: string;
  contentAr: string;
  video: string;
  creationDate: Date;
  views: number;
  reactions: number;
  articleKeywords: {
    id: number;
    title: string;
  }[];
  articleCategories: {
    id: number;
    title: string;
  }[];
}
export interface GetArticleList 
{
    totalCount:number
    items:GetArticle[]
}
