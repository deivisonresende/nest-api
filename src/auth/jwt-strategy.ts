import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Env } from "src/env";
import { z } from "zod";

const subjectSchema = z.object({
  id: z.string().uuid()
})

const tokenPayloadSchema = z.object({
  sub: subjectSchema
})

export type TokenPayloadSchema = z.infer<typeof tokenPayloadSchema>
export type SubjectSchema = z.infer<typeof subjectSchema>

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private config: ConfigService<Env, true>) {
    const publicKey = config.get('JWT_PUBLIC_KEY', { infer: true })

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Buffer.from(publicKey, 'base64'),
      algorithm: ['RS256']
    })
  }

  validate(payload: TokenPayloadSchema) {
    return tokenPayloadSchema.parse(payload)
  }
}