import { ApiError } from "../errors/api-error";
import { ITokenPayload } from "../interfaces/token.interface";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getList(): Promise<IUser[]> {
    return await userRepository.getList();
  }

  // public async create(dto: Partial<IUser>): Promise<IUser> {
  //   await this.isEmailExistOrThrow(dto.email);
  //   const password = await passwordService.hashPassword(dto.password);
  //   return await userRepository.create({ ...dto, password });
  // }

  public async getById(userId: string): Promise<IUser> {
    const user = await userRepository.getById(userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  }

  public async getMe(jwtPayload: ITokenPayload): Promise<IUser> {
    const user = await userRepository.getById(jwtPayload.userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  }

  public async updateMe(jwtPayload: ITokenPayload, dto: IUser): Promise<IUser> {
    return await userRepository.updateById(jwtPayload.userId, dto);
  }

  public async deleteMe(jwtPayload: ITokenPayload): Promise<void> {
    return   await userRepository.deleteById(jwtPayload.userId);
  }

  // public async updateMe(userId: string, dto: IUser): Promise<IUser> {
  //   return await userRepository.updateById(userId, dto);
  // }

  // public async deleteMe(userId: string): Promise<void> {
  //   return await userRepository.deleteById(userId);
  // }

  // private async isEmailExistOrThrow(email: string): Promise<void> {
  //   const user = await userRepository.getByEmail(email);
  //   if (user) {
  //     throw new ApiError("Email already exists", 409);
  //   }
  // }
}

export const userService = new UserService();
