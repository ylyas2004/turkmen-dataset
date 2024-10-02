declare module 'react-notifications' {
    import { Component } from 'react';
  
    export class NotificationContainer extends Component<any, any> {}
  
    export class NotificationManager {
      static info(message: string, title?: string, timeOut?: number, callback?: () => void, priority?: boolean): void;
      static success(message: string, title?: string, timeOut?: number, callback?: () => void, priority?: boolean): void;
      static warning(message: string, title?: string, timeOut?: number, callback?: () => void, priority?: boolean): void;
      static error(message: string, title?: string, timeOut?: number, callback?: () => void, priority?: boolean): void;
    }
  }