import { Service, signal } from '@angular/core';
import { FeedbackConfig } from '../../models/feedback';

@Service()
export class FeedbackService {
  feedback: FeedbackConfig = {
    positivo: false,
    aperto: false,
    messaggio: 'Errore',
  };
  setFeedback = signal<FeedbackConfig>(this.feedback);
  getFeedback = this.setFeedback.asReadonly();
}
