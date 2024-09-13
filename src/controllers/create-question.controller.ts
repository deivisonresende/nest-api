import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from "@nestjs/common";

import { CurrentUser } from "src/auth/current-user-decorator";
import { JwtAuthGuard } from "src/auth/jwt-auth-guard";
import { SubjectSchema } from "src/auth/jwt-strategy";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from "zod";

const createQuestionSchema = z.object({
  title: z.string(),
  content: z.string()
})

type CreateQuestionSchema = z.infer<typeof createQuestionSchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private prisma: PrismaService) { }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async handle(
    @CurrentUser() user: SubjectSchema,
    @Body(new ZodValidationPipe(createQuestionSchema)) body: CreateQuestionSchema
  ) {
    const slug = this.convertTitleToSlug(body.title)

    const questionWithSameSlug = await this.prisma.question.findFirst({ where: { slug } })
    if (questionWithSameSlug) throw new ConflictException('Not allowed to create a question with the same title')

    await this.prisma.question.create({
      data: {
        content: body.content,
        title: body.title,
        authorId: user.id,
        slug,
      }
    })
  }

  private convertTitleToSlug(title: string) {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')         // Remove non-alphanumeric characters except hyphen
      .replace(/\s+/g, '-')             // Replace whitespace with hyphens
  }
}
