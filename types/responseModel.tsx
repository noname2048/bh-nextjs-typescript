export default interface ResponseModel {
  isbn13: number;
  created_at: string;
  request_id: string;

  success: boolean | undefined;
  detail: any;
  id: string;
}
