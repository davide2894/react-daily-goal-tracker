export interface User {
  user?: object;
}

export interface LoginUserData {
  email: string;
  uid: string;
  userDocId: string;
}

export interface GoalFormData {
  show: boolean;
  goalTitle: string;
  goalScore: string;
}

export interface Goal {
  title: string;
  score: {
    max: number;
    min: number;
    actual: number;
  };
  isComplete: boolean;
  id: any;
}
