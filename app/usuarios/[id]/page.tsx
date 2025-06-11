"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { Label } from "@/components/ui/label"

import { UserData, UserRole } from '@/types/User.types'
import { use, useEffect, useState } from "react"
import { getUser, UpdateUser } from '@/api/Usuarios.api'
import toast from 'react-hot-toast';
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { User2, ArrowLeft, Edit, Save, Monitor, User, Calendar, Clock, Route } from "lucide-react"
type Props = {
    user: UserData;
    setUser: (data: UserData) => void;
};

export default function UserDetailPage({ params }: { params: Promise<{ id: number }> }) {
    const router = useRouter()
    const { id } = use(params)
    const [userData, setUserData] = useState<UserData | null>(null)
    const [isEditing, setIsEditing] = useState(false)
    const [selectedRole, setSelectedRole] = useState<UserRole>("usuario");

    //obtener usuario por id
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getUser(id)
                setUserData(data);
                setSelectedRole(data.role ?? "usuario");
                toast.success("Usuario cargado con exito");
            }
            catch (error) {
                toast.error("Error al cargar el Usuario...")
            }
        }
        fetchUser()
    }, [id])

    if (!userData) {
        <div className="min-h-screen flex items-center justify-center text-gray-500">
            Obteniendo usuario....
        </div>
    }

    //editar usuario por id
    const handleSave = async () => {
        if (!userData) return;
        try {
            const updateData: Partial<UserData> = {
                user: {
                    ...userData.user,
                    first_name: userData.user.first_name,
                    last_name: userData.user.last_name,
                    email: userData.user.email,
                },
                address: userData.address,
                telephone: userData.telephone,
                role_input: selectedRole

            };
            const updated = await UpdateUser(userData.id, updateData);
            setUserData(updated);
            console.log(updated)
            setIsEditing(false);
            toast.success("Usuario actualizado correctamente");
            router.push("/usuarios")
        }
        catch (error) {
            toast.error("Error al actualizar el Usuario...")
        }


    }
    return (
        <div className="min-h-screen bg-gray-50" >
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center">
                            <User2 className="h-8 w-8 text-blue-600 mr-3" />
                            <h1 className="text-2xl font-bold text-gray-900">Nombre: {userData?.user.first_name}</h1>
                        </div>
                        <div className="flex gap-2">
                            <Link href="/usuarios">
                                <Button variant="outline">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Volver
                                </Button>
                            </Link>
                            {isEditing ? (
                                <Button onClick={handleSave}>
                                    <Save className="h-4 w-4 mr-2" />
                                    Guardar
                                </Button>
                            ) : (
                                <Button onClick={() => setIsEditing(true)}>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Editar
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </header>
            <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
                    <h2 className="text-2xl font-bold mb-2">Formulario de Edición</h2>
                    <p className="text-gray-600 text-sm mb-6">Actualiza la información del usuario</p>

                    <div className="space-y-6">
                        {/* Nombre */}
                        <div>
                            <Label className="block font-semibold mb-1">Nombre:</Label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={userData?.user.first_name}
                                    onChange={e =>
                                        setUserData(prev =>
                                            prev
                                                ? { ...prev, user: { ...prev.user, first_name: e.target.value } }
                                                : prev
                                        )
                                    }
                                    className="mt-1 block w-full rounded border px-3 py-2 text-sm"
                                />
                            ) : (
                                <p className="mt-1 text-gray-700">{userData?.user.first_name}</p>
                            )}
                        </div>

                        {/* Apellido */}
                        <div>
                            <Label className="block font-semibold mb-1">Apellido:</Label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={userData?.user.last_name}
                                    onChange={e =>
                                        setUserData(prev =>
                                            prev
                                                ? { ...prev, user: { ...prev.user, last_name: e.target.value } }
                                                : prev
                                        )
                                    }
                                    className="mt-1 block w-full rounded border px-3 py-2 text-sm"
                                />
                            ) : (
                                <p className="mt-1 text-gray-700">{userData?.user.last_name}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <Label className="block font-semibold mb-1">Correo:</Label>
                            {isEditing ? (
                                <input
                                    type="email"
                                    value={userData?.user.email}
                                    onChange={e =>
                                        setUserData(prev =>
                                            prev
                                                ? { ...prev, user: { ...prev.user, email: e.target.value } }
                                                : prev
                                        )
                                    }
                                    className="mt-1 block w-full rounded border px-3 py-2 text-sm"
                                />
                            ) : (
                                <p className="mt-1 text-gray-700">{userData?.user.email}</p>
                            )}
                        </div>

                        {/* Dirección */}
                        <div>
                            <Label className="block font-semibold mb-1">Dirección:</Label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={userData?.address ?? ""}
                                    onChange={e =>
                                        setUserData(prev => (prev ? { ...prev, address: e.target.value } : prev))
                                    }
                                    className="mt-1 block w-full rounded border px-3 py-2 text-sm"
                                />
                            ) : (
                                <p className="mt-1 text-gray-700">{userData?.address ?? "—"}</p>
                            )}
                        </div>

                        {/* Teléfono */}
                        <div>
                            <Label className="block font-semibold mb-1">Teléfono:</Label>
                            {isEditing ? (
                                <input
                                    type="tel"
                                    value={userData?.telephone ?? ""}
                                    onChange={e =>
                                        setUserData(prev =>
                                            prev ? { ...prev, telephone: e.target.value } : prev
                                        )
                                    }
                                    className="mt-1 block w-full rounded border px-3 py-2 text-sm"
                                />
                            ) : (
                                <p className="mt-1 text-gray-700">{userData?.telephone ?? "—"}</p>
                            )}
                        </div>

                        {/* Rol */}
                        <div>
                            <Label className="block font-semibold mb-1">Rol:</Label>
                            {isEditing ? (
                                <Select
                                    value={userData?.role || ""}
                                    onValueChange={value =>
                                        setUserData(prev =>
                                            prev ? { ...prev, role: value as "usuario" | "admin" | "tecnico" } : prev
                                        )
                                    }
                                >
                                    <SelectTrigger className="w-full py-3">
                                        <SelectValue placeholder="Selecciona un rol" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Usuario">Usuario</SelectItem>
                                        <SelectItem value="Admin">Administrador</SelectItem>
                                        <SelectItem value="Tecnico">Técnico</SelectItem>
                                    </SelectContent>
                                </Select>
                            ) : (
                                <p className="mt-1 text-gray-700">{userData?.role}</p>
                            )}
                        </div>
                    </div>
                </div>
            </main>

        </div >
    )
}