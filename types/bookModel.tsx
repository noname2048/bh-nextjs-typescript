export default interface BookModel {
  title: string;
  description: string | undefined;
  isbn13: number;
  cover: string | undefined;
  publisher: string | undefined;
  price: number | undefined;
  pub_date: string | undefined;
  author: string | undefined;
  response_id: string | undefined;
  created_at: string;
}
