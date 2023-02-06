import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { UsersService } from './users.service';
import { Socket, Server } from 'socket.io';
import { pubsub } from 'src/pubsub/pubsub';

@WebSocketGateway(5000, { cors: true })
export class UsersGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;
  private logger: Logger = new Logger('UsersGateway');
  constructor(private userService: UsersService) {}

  afterInit() {
    this.logger.log('Init');
  }

  handleConnection(client: Socket) {
    const userId = client.request.url.split('userId=')[1].split('&')[0];
    this.userService.setOnlineStatus(true, userId);
    pubsub.publish('userOnline', { userOnline: { id: userId, online: true } });
    this.logger.log(`Client connected: ${userId}`);
    console.log(`Client connected: ${userId}`);
  }

  handleDisconnect(client: Socket) {
    const userId = client.request.url.split('userId=')[1].split('&')[0];
    this.userService.setOnlineStatus(false, userId);
    pubsub.publish('userOnline', { userOnline: { id: userId, online: false } });
    this.logger.log(`Client disconnected: ${userId}`);
    console.log(`Client disconnected: ${userId}`);
  }
}
