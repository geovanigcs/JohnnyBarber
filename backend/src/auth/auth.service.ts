import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(data: { name: string; email: string; password: string }) {
    const existingUser = await this.usersService.findByEmail(data.email);
    if (existingUser) {
      throw new ConflictException('Email já cadastrado');
    }

    const user = await this.usersService.create(data);
    const token = this.generateToken(user);

    return {
      user,
      token,
    };
  }

  async login(email: string, password: string) {
    const user = await this.usersService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const token = this.generateToken(user);

    return {
      user,
      token,
    };
  }

  async googleLogin(profile: any) {
    let user = await this.usersService.findByGoogleId(profile.id);

    if (!user) {
      user = await this.usersService.findByEmail(profile.emails[0].value);

      if (!user) {
        const newUser = await this.usersService.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
          image: profile.photos[0]?.value,
        });
        // Fetch the complete user data after creation
        user = await this.usersService.findByEmail(newUser.email);
      }
    }

    const token = this.generateToken(user);

    return {
      user,
      token,
    };
  }

  generateToken(user: any) {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }

  async validateToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
