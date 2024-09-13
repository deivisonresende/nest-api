import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { TokenPayloadSchema } from "./jwt-strategy";

export const CurrentUser = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()

    const tokenPayload = request.user as TokenPayloadSchema
    return tokenPayload.sub
  }
)