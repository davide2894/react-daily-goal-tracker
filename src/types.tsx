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

export interface NewGoal {
  title: string;
  score: {
    max: number;
    min: number;
    actual: number;
  };
  isComplete: boolean;
  id: any;
}
