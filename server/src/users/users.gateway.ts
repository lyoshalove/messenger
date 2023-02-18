// import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { UsersService } from './users.service';
import { Socket, Server } from 'socket.io';
import { pubsub } from 'src/pubsub/pubsub';

@WebSocketGateway(5000, { cors: true })
export class UsersGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  constructor(private userService: UsersService) {}

  handleConnection(client: Socket) {
    const userId = client.request.url.split('userId=')[1].split('&')[0];
    this.userService.setOnlineStatus(true, userId);
    pubsub.publish('userOnline', { userOnline: { id: userId, online: true } });
    console.log(`Client connected: ${userId}`);
  }

  handleDisconnect(client: Socket) {
    const userId = client.request.url.split('userId=')[1].split('&')[0];
    this.userService.setOnlineStatus(false, userId);
    pubsub.publish('userOnline', { userOnline: { id: userId, online: false } });
    console.log(`Client disconnected: ${userId}`);
  }
}
