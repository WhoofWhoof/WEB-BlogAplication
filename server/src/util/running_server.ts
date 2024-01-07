export enum ServerEnum {
  main,
}

class RunningServer {

  private readonly servers: {[key in ServerEnum]: string} = {
    [ServerEnum.main]: "MAIN",
  };

  private runningServer: ServerEnum;
  setRunningServer(server: ServerEnum) {
    this.runningServer = server;
  }

  getRunningServer() {
    return this.runningServer;
  }

  getRunningServerName() {
    return this.servers[this.runningServer] ?? "NOT_SET";
  }

  getServerName(server: ServerEnum) {
    return this.servers[server] ?? "NOT_SET";
  }

}

export const runningServer = new RunningServer();
