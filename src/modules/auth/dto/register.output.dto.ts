import { Exclude, Expose } from "class-transformer";

@Exclude()
export class RegisterOutputDto {
    @Expose()
    id: string;

    @Expose()
    name: string;

    age: string;
}