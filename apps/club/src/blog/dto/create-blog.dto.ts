export class CreateBlogDto {
  title: string;
  description: string;
  content: string;
  image: string;
  category: string;
  tags: string[];
  userId: string;
  clubId: string;
}
