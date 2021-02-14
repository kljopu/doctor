import { User } from "../../../../domains/dist/domains";

export interface BoardEntity {
    id?: number;
    title?: string;
    contents?: string,
    user?: User
}