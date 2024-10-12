import { Controller, Get, Query, UseGuards, UsePipes } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth-guard";
import { PaginationPipe } from "src/pipes/pagination-pipe";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from "zod";

const queryParamSchema = z.object({
  take: z.number(),
  skip: z.number(),
})

const queryValidationPipe = new ZodValidationPipe(queryParamSchema)

type QueryParamSchema = z.infer<typeof queryParamSchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class ShowRecentQuestionsController {
  constructor(private readonly prisma: PrismaService) { }

  @Get()
  @UsePipes(PaginationPipe)
  async handle(@Query(queryValidationPipe) query: QueryParamSchema) {
    const { skip, take } = query
    
    const questions = await this.prisma.question.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      take,
      skip
    })

    return { questions }
  }
}