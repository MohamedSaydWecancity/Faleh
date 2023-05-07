export interface PagintationModel
{
    maxResultCount?: number,
    skipCount ?:number
}
export class PaginationComponent {
    firstPage = { page: 1 };
    totalCount = 0;
    pageNumber = 1;
    pager: any = {
      maxResultCount: 50,
      skipCount: 0
    };
}
  