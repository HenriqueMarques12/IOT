export interface Competition {
    id: string;
    name: string;
  }
  
  export interface Team {
    [x: string]: string | undefined;
    id: string;
    name: string;
  }
  
  export interface Match {
    id: string;
    matchday: number;
    utcDate: string;
    homeTeam: Team;
    awayTeam: Team;
  }
  