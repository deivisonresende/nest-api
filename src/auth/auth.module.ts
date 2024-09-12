import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { Env } from "src/env";

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      global: true,
      inject: [ ConfigService ],
      useFactory(config: ConfigService<Env>) {
        const getEnvOpt = { infer: true }

        const privateKey = config.get('JWT_PRIVATE_KEY', getEnvOpt)
        const publicKey = config.get('JWT_PUBLIC_KEY', getEnvOpt)

        const base64Decoder = (str: string) => Buffer.from(str, 'base64')

        return {
          signOptions: { algorithm: 'RS256' },
          privateKey: base64Decoder(privateKey),
          publicKey: base64Decoder(publicKey),
        }
      }
    })
  ]
})

export class AuthModule {
}