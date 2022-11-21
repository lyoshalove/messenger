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

@WebSocketGateway(5000, { cors: '*' })
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
    console.log('Connect: ', client);
  }

  handleDisconnect(client: Socket) {
    console.log('Disconnect: ', client);
  }
}
