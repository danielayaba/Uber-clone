import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { LocationService } from '../services/location.service';
export declare class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly locationService;
    server: Server;
    constructor(locationService: LocationService);
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleLocationUpdate(data: {
        driverId: string;
        lat: number;
        lng: number;
    }, client: Socket): Promise<void>;
    handleJoinTripRoom(data: {
        tripId: string;
    }, client: Socket): void;
}
