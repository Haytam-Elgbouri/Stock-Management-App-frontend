import { Article } from "./articles.model";

export interface DisplayArticle extends Article {
  quantity: number;
  color: string;
}
