import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
// import { UserSchema } from './schemas/users.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../user/schemas/user.schema';
import { UserModule } from '../user/user.module';
import { UserSchema } from '../user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });

@Module({
  imports: [
    ConfigModule.forRoot(),
    passportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get<string | number>('JWT_EXPIRES'),
          },
        };
      },
    }),
    // UserModule,
    forwardRef(() => UserModule), // Use forwardRef to handle circular dependency
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService],
  exports: [passportModule],
})
export class AuthModule {}
