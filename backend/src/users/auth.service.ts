import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto'; // randomBytes creates the salt and scrypt(async) is the hashing function
import { promisify } from 'util'; // to use scrypt as a promisse instead a callback

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string, name: string) {
    // 1 - See if email is in use
    const users = await this.usersService.find(email);
    if (users.length) throw new BadRequestException('Email in use');

    // 2 - Hash the users password
    // 2.1 - Generate a salt
    const salt = randomBytes(8).toString('hex');
    // 2.2 - Hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    // 2.3 - Join the hashed result and the salt together
    const result = salt + '.' + hash.toString('hex');

    // 3 - Create a new user and save it
    const user = await this.usersService.create(email, result, name);

    // 4 - return the user
    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);
    if (!user) throw new NotFoundException('User not found');

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex'))
      throw new BadRequestException('Wrong password');
    return user;
  }
}
