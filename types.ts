
export interface Idea {
  id: string;
  name: string;
  tagline: string;
  description: string;
  rating: number;
  feedback: string;
  votes: number;
}

export enum Screen {
  SUBMIT = 'SUBMIT',
  LIST = 'LIST',
  LEADERBOARD = 'LEADERBOARD',
}

export interface ToastMessage {
  message: string;
  type: 'success' | 'error' | 'info';
}
