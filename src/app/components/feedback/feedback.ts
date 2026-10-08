import { Component, inject, OnInit, Signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FeedbackConfig } from '../../models/feedback';
import { FeedbackService } from '../../services/feedback/feedback.service';

@Component({
  imports: [MatIconModule],
  selector: 'app-feedback',
  styleUrl: './feedback.css',
  templateUrl: './feedback.html',
})
export class Feedback implements OnInit {
  feedbackService = inject(FeedbackService);
  feedback!: Signal<FeedbackConfig>;

  ngOnInit(): void {
    this.feedback = this.feedbackService.getFeedback;
  }
}
