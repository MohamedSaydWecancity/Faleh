export interface CreateOrUpdateVideo
{
  id?:number;
  titleAr: string;
  video: File;
  categoriesIds: number[];
  title: string;
}
export interface GetVideo
{
  id:number;
  titleAr: string;
  videoPath: string;
  creationDate:Date;
  title: string;
  views:number;

}
export interface GetVideoById 
{
  id: number;
  title: string;
  titleAr: string;
  videoPath: string;
  creationDate: Date;
  views: number;
  VideoCategories: {
    id: number;
    title: string;
  }[];
}
export interface GetVideoList 
{
    totalCount:number
    items:GetVideo[]
}
