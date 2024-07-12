import { io, Socket } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

class SocketService {
  socket: Socket;

  constructor() {
    this.socket = io(SOCKET_URL, {
      autoConnect: false,
      transports: ["websocket"],
    });
  }

  connect() {
    if (!this.socket.connected) {
      this.socket.connect();
    }
  }

  disconnect() {
    if (this.socket.connected) {
      this.socket.disconnect();
    }
  }

  on(event: string, callback: (...args: any[]) => void) {
    this.socket.on(event, callback);
  }

  off(event: string, callback?: (...args: any[]) => void) {
    this.socket.off(event, callback);
  }

  emit(event: string, ...args: any[]) {
    this.socket.emit(event, ...args);
  }
}

const socketService = new SocketService();
export default socketService;
