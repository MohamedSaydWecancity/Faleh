import { Component, OnInit } from '@angular/core';
import{QuestionApiService}from '../../../../shared/API-Service/Question/question-api.service'
import { PaginationComponent } from 'src/app/shared/Models/PaginationModel/PagintationModel';

@Component({
  selector: 'app-list-question',
  templateUrl: './list-question.component.html',
  styleUrls: ['./list-question.component.css']
})
export class ListQuestionComponent extends PaginationComponent implements OnInit {
  response: any[];
  questionList:any[];
  questionDetails:any;
  constructor(private questionApiService: QuestionApiService) {super() }

  ngOnInit(): void {
    this.getquestion();
  }
  // getquestion()
  // {
  //   this.questionApiService.getAllPaged(this.pager).subscribe(
  //     (response: any) => {
  //       this.response = response.data;
  //       this.questionList = response.data.items;
  //       this.totalCount = response.totalCount
  //     }
  //   )
  // }
  getquestion() {
    this.questionApiService.getAllPaged(this.pager).subscribe(
      (response: any) => {
        this.response = response.data;
        this.questionList = response.data.items.map(view => ({
          ...view,
          questionId: view.id // add questionId property to view object
        }));
        this.totalCount = response.totalCount
      }
    )
  }
  acceptAnswerReply(questionId :number)
  {
    this.questionApiService.AcceptQuestionReply(questionId).subscribe(
      (response: any) => {
        this.questionDetails = response.data;
        this.getquestion();
      }
    )
  }
  rejectAnswerReply(questionId :number)
  {
    this.questionApiService.RejectQuestionReply(questionId).subscribe(
      (response: any) => {
        this.questionDetails = response.data;
        this.getquestion();
      }
    )
  }
  pageChanged(event: any) {
    this.pageNumber = event.page;// -1 * pageSize;
    this.pager.skipCount = (this.pageNumber - 1) * this.pager.maxResultCount;
    this.getquestion();
}
}
