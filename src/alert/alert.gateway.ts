import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ nampespace: '/alert' })
export class AlertGateway {

  @WebSocketServer() wss: Server;

  sendToALl(msg: string) {
    this.wss.emit('alertToClient', { type: 'Alert', message: msg });
  }
}
