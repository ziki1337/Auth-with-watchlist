import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class UserLoginDTO {
    @ApiProperty() //ApiProperty используется для api документации
    @IsString()
    email: string

    @ApiProperty()
    @IsString()
    password: string
}