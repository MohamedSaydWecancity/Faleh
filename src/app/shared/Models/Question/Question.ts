export interface GetQuestionList 
{
    totalCount:number
    items:GetQuestion[]
}
export interface GetQuestion
{
    title: string;
    content: string;
    categoryId: number;
    id: number;
    customerId: number;
    customerName: string;
    reply: string;
    repliedById: number;
    repliedByName: string;
    repliedAt: Date;
    questionStatusId: number;
    questionStatusTitle: string;
    creationDate: Date;
    categoryTitle: string;

}