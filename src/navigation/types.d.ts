export interface JwtResponse {
  access_token: string;
  refresh_token: string;
}

export interface RoleDTO {
  idRole: number;
  name: string;
  description: string;
}

export interface UserDTO {
  idUser: number;
  username: string;
  email: string;
  password: string;
  ldap: boolean;
  enabled: boolean;
  roles: RoleDTO[];
}

export interface ReportStatusDTO {
  idReportStatus: number;
  name: string;
  description: string;
}

export interface ReportTypeDTO {
  idReportType: number;
  name: string;
  description: string;
}

export interface ReportDTO {
  idReport: number;
  name: string;
  description: string;
  url?: string;
  reportType: ReportTypeDTO;
  reportStatus: ReportStatusDTO;
  module: ModuleDTO;
  active: boolean;
}

export interface ModuleDTO {
  idModule: number;
  name: string;
  description: string;
  active: boolean;
  reports: ReportDTO[]; // Añadir esta línea
}