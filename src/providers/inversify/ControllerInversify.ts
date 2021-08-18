import { FindAllPlayersController } from './../../useCases/player/findAll/FindAllPlayersController';
import { CreatePlayerController } from "@useCases/player/create/CreatePlayer.Controller";
import { ContainerModule, interfaces } from "inversify";
import { RouterController } from "router";
import { FindPlayerController } from '@useCases/player/findOne/FindPlayerController';
import { DeletePlayerController } from '@useCases/player/delete/DeletePlayerController';
import { UpdatePlayerController } from '@useCases/player/update/UpdatePlayerController';
import { JsonWebTokenService } from 'services/jsonWebTokens.service';
import { FetchLoggedUserMiddleware } from 'middlewares/fetchLoggedUser.middleware';
import { CreateJwtController } from '@useCases/jwt/create/CreateJwt.Controller';
import { CreateUserController } from '@useCases/user/create/CreateUser.Controller';
import { TYPES } from '@providers/types/types.core';

export const serverControllerContainer = new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind) => {
    bind<RouterController>(TYPES.RouterController).to(RouterController);
});

export const playerControllerContainer = new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind) => {
    bind<CreatePlayerController>(TYPES.CreatePlayerController).to(CreatePlayerController);
    bind<FindAllPlayersController>(TYPES.FindAllPlayersController).to(FindAllPlayersController);
    bind<FindPlayerController>(TYPES.FindPlayerController).to(FindPlayerController);
    bind<DeletePlayerController>(TYPES.DeletePlayerController).to(DeletePlayerController);
    bind<UpdatePlayerController>(TYPES.UpdatePlayerController).to(UpdatePlayerController);
});

export const jwtControllerContainer = new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind) => {
    bind<JsonWebTokenService>(TYPES.JsonWebTokenService).to(JsonWebTokenService);
    bind<FetchLoggedUserMiddleware>(TYPES.FetchLoggedUserMiddleware).to(FetchLoggedUserMiddleware);
    bind<CreateJwtController>(TYPES.CreateJwtController).to(CreateJwtController);
    bind<CreateUserController>(TYPES.CreateUserController).to(CreateUserController);
});