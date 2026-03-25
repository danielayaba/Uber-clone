import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { LocationService } from '../services/location.service';

@WebSocketGateway({ cors: true })
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly locationService: LocationService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    // Extract JWT from connection to map user to socket ID
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('updateLocation')
  async handleLocationUpdate(
    @MessageBody() data: { driverId: string; lat: number; lng: number },
    @ConnectedSocket() client: Socket,
  ) {
    // Process driver's real-time location from Mobile app every few seconds
    await this.locationService.updateDriverLocation(data.driverId, data.lat, data.lng);

    // Broadcast location to any interested riders on the same trip
    this.server.to(`rider_${data.driverId}`).emit('driverLocationChanged', {
      lat: data.lat,
      lng: data.lng,
    });
  }

  @SubscribeMessage('joinTripRoom')
  handleJoinTripRoom(@MessageBody() data: { tripId: string }, @ConnectedSocket() client: Socket) {
    client.join(`trip_${data.tripId}`);
  }
}
