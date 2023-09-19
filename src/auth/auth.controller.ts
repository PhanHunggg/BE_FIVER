import { Body, Controller, Get, Post, Response, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginInterFace, SignUpInterface } from './interface';
import { failCode } from 'src/config/response';
import { Tokens } from './types';
import { GetCurrentUser, GetCurrentUserId, Public } from '../common/decorators';
import { AtGuard, RtGuard } from '../common/guards';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }


    @UseGuards(AtGuard)
    @Get('/profile')
    profile(@GetCurrentUserId() userId: number, @Response() res: any): Promise<void> {
        return this.authService.profile(res, userId);
    }

    @Public()
    @Post("/login")
    login(@Response() res: any, @Body() body: LoginInterFace): Promise<Tokens> {
        try {
            return this.authService.login(res, body)
        } catch (error) {
            failCode(res, error.message)
        }
    }

    @Public()
    @Post("/sign-up")
    signUp(@Response() res: any, @Body() body: SignUpInterface): Promise<Tokens> {
        try {
            return this.authService.signUp(res, body)
        } catch (error) {
            failCode(res, error.message)
        }
    }
    
    @UseGuards(AtGuard)
    @Post('/logout')
    logout(@GetCurrentUserId() userId: number, @Response() res: any): Promise<void> {
        return this.authService.logout(res, userId);
    }

  
    @Public()
    @UseGuards(RtGuard)
    @Post('/refresh')
    refreshTokens(
        @GetCurrentUserId() userId: number,
        @GetCurrentUser('refreshToken') refreshToken: string,
        @Response() res: any
    ): Promise<Tokens> {
        return this.authService.refreshTokens(res, userId, refreshToken);
    }

    
}

