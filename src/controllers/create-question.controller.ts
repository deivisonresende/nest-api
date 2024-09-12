import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards
} from "@nestjs/common";

import { CurrentUser } from "src/auth/current-user-decorator";
import { JwtAuthGuard } from "src/auth/jwt-auth-guard";
import { TokenPayloadSchema } from "src/auth/jwt-strategy";
import { z } from "zod";

const createQuestionSchema = z.object({})

type CreateQuestionSchema = z.infer<typeof createQuestionSchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async handle(
    @CurrentUser() user: TokenPayloadSchema,
    @Body() body: CreateQuestionSchema
  ) {
    return {}
  }
}