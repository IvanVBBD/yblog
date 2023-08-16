class Response {
    status: number;
    message: string;
    data: any | null;
  
    constructor(status: number, message: string, data: any | null = null) {
      this.status = status;
      this.message = message;
      this.data = data;
    }
  }
  
  export default Response;