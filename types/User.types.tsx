export type UserRole = "usuario" | "admin" | "tecnico";

export type UserData = {
    id: number;
    user: {
        id: number;
        username: string;
        email: string;
        first_name: string;
        last_name: string;
    };
    address?: string | null;
    telephone?: string | null;
    role?: UserRole;
    role_input?: UserRole;
    equipos_asignados: number
    tickets_activos: number
};

export type CreateUserPayload = {
    user: {
        username: string;
        email: string;
        first_name: string;
        last_name: string;
        password: string;
    };
    telephone?: string | null;
    address?: string | null;
    role_input: UserRole;
    equipos_asignados?: number;
    tickets_activos?: number;
};

export type TecnicoData = {
    id: number;
    nombre: string;
}