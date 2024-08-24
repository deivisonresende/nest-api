import { ArgumentMetadata, BadRequestException, PipeTransform, HttpStatus } from '@nestjs/common'
import { STATUS_CODES } from 'http'
import { ZodError, ZodSchema } from 'zod'
import { fromZodError } from 'zod-validation-error'

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) { }

  transform(value: any, metadata: ArgumentMetadata) {
    try {
      this.schema.parse(value)
    } catch (error) {
      if (error instanceof ZodError) throw new BadRequestException({
        message: 'Validation error',
        statusCode: HttpStatus.BAD_REQUEST,
        errors: fromZodError(error)
      })

      throw new BadRequestException('Validation failed')
    }

    return value
  }
}