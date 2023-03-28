export interface ChatByUserId {
  id: number;
  text: string;
  date: string;
  userId: number | null;
  files: File[];
}
