import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth-guard";
import { z } from "zod";

const createQuestionSchema = z.object({})

type CreateQuestionSchema = z.infer<typeof createQuestionSchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async handle(@Body() body: CreateQuestionSchema) {
    return
  }
}