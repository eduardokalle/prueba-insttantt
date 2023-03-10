import { Injectable } from '@angular/core';
import {io} from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private socket: any;

  constructor() { }

  connect() {
    this.socket = io('http://localhost:4500'); 
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

  on(eventName: string, callback: any) {
    this.socket.on(eventName, callback);
  }

  disconnect() {
    this.socket.disconnect();
  }

}
