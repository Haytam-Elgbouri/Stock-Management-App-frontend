import { Article } from "./articles.model";

export interface LigneArticle  extends Article {
  quantity: number;
  color: string;
}
