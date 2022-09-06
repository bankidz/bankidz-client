export interface INoticeDTO {
  id: number;
  title: string;
  createdAt: string;
  body: string;
}

export type TNoticesDTO = Pick<INoticeDTO, 'id' | 'title' | 'createdAt'>[];
