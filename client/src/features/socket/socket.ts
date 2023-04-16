import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const initSocket = (path: string) => (socket = io(path));
export const getSocket = () => socket;
