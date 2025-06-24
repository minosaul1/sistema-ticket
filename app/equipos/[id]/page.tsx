"use client";

import { use, useEffect, useState } from "react"
import { EquiposData } from '@/types/EquipoTypes'
import { getEquipoId, UpdateEquipo } from '@/api/Equipos.api'
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import toast from "react-hot-toast"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Ticket, ArrowLeft, Edit, Save, Monitor, User, Calendar, Clock, Divide } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/hooks/useAuth"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select"
type Props = {
    equipoData: EquiposData,
    setEquipoData: (data: EquiposData) => void;
}

export default function EquipoDetailPage({ params }: { params: Promise<{ id: number }> }) {
    const token = useAuth()
    const { id } = use(params)
    const router = useRouter()
    const [equipoData, setEquipoData] = useState<EquiposData | null>(null)
    const [isEditing, setIsEditing] = useState(false)
    const [user, SetUser] = useState<{ role?: string }>({})
    const { register, handleSubmit, control, formState: { errors }, reset, getValues } = useForm<FormData>()

    useEffect(() => {
        const fetchEquiopo = async () => {
            try {
                const data = await getEquipoId(id)
                setEquipoData(data)
                toast.success("Equipo cargado con exito...")

            }
            catch (error) {
                toast.error("Error al cargar los equipos...")
            }
        }
        fetchEquiopo()
    }, [id])

    useEffect(() => {
        const userSrt = localStorage.getItem("user")
        if (userSrt) {
            const userData = JSON.parse(userSrt)
            SetUser(userData.user)

        }
    }, [])
    if (!equipoData) {
        return <p className="p-4">Cargando equipo...</p>;
    }
    const handleEditClick = () => {

        if (user.role !== 'admin' && user.role !== "tecnico") {
            console.log(user.role)
            router.push('/forbidden')
        }
        setIsEditing(true)
    }
    const handleSave = async () => {
        try {
            const updateData: Partial<EquiposData> = {
                marca: equipoData.marca,
                modelo: equipoData.modelo,
                tipo_equipo: equipoData.tipo_equipo,
                ram: equipoData.ram,
                disco: equipoData.disco,
                capacidad: equipoData.capacidad,
                procesador: equipoData.procesador,
                n_serial: equipoData.n_serial,
                mac: equipoData.mac,
                ubicacion: equipoData.ubicacion


            };
            const updated = await UpdateEquipo(equipoData.id, updateData);
            setEquipoData(updated);
            setIsEditing(false);
            toast.success("Estado actualizado correctamente");
            router.push("/equipos");
        }
        catch (error) {
            toast.error("Error al actualizar el equipo...")
        }


    }
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center">
                            <Ticket className="h-8 w-8 text-blue-600 mr-3" />
                            <h1 className="text-2xl font-bold text-gray-900">Equipo #{equipoData?.id}</h1>
                        </div>
                        <div className="flex gap-2">
                            <Link href="/equipos">
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
                                <Button onClick={handleEditClick}>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Editar
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </header>
            <main className="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4">
                {/** <div className="grid grid-cols-1 lg:grid-cols-3 gap-6"> */}
                {/** <div className="lg:col-span-2 space-y-6"> */}
                <Card className="w-full max-w-xl">
                    <CardHeader>
                        <div className="flex justify-between items-start">

                            <CardTitle className="flex items-center gap-2">
                                Equipo #{equipoData?.id}
                                {/*<Badge variant={getStatusColor(ticketData.estatus)}>{ticketData.estatus}</Badge>*/}
                            </CardTitle>
                            {/* <CardDescription>{equipoData?.marca}</CardDescription>*/}

                        </div>
                    </CardHeader>
                    <CardContent >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {isEditing ? (
                                <div className="space-y-2">
                                    <Label >Marca</Label>
                                    <Input
                                        value={equipoData.marca}
                                        onChange={(e) => setEquipoData({ ...equipoData, marca: e.target.value })}></Input>
                                </div>

                            ) : (
                                <div >
                                    <span className="font-medium">Marca:</span>
                                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">{equipoData.marca}</p>
                                </div>

                            )}


                            {isEditing ? (
                                <div className="space-y-2">
                                    <Label>Modelo</Label>
                                    <Input
                                        value={equipoData.modelo}
                                        onChange={(e) => setEquipoData({ ...equipoData, modelo: e.target.value })}></Input>
                                </div >
                            ) : (
                                <div>
                                    <span className="font-medium">Modelo:</span>
                                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">{equipoData.modelo}</p>
                                </div>
                            )}


                            {isEditing ? (
                                <div className="space-y-2">
                                    <Label>Tipo de Equipo</Label>
                                    <Select
                                        value={equipoData.tipo_equipo}
                                        onValueChange={(value) => setEquipoData({ ...equipoData, tipo_equipo: value })}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Tipo de Equipo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Desktop">Desktop</SelectItem>
                                            <SelectItem value="Laptop">Laptop</SelectItem>
                                            <SelectItem value="Server">Server</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div >
                            ) : (
                                <div>
                                    <span className="font-medium">Tipo de Equipo</span>
                                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">{equipoData.tipo_equipo}</p>
                                </div>

                            )}

                            {isEditing ? (
                                <div className="space-y-2">
                                    <Label>RAM</Label>
                                    <Input
                                        value={equipoData.ram}
                                        onChange={(e) => setEquipoData({ ...equipoData, ram: Number(e.target.value) })}
                                    ></Input>
                                </div >
                            ) : (
                                <div>
                                    <span className="font-medium">RAM</span>
                                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">{equipoData.ram}</p>
                                </div>

                            )}

                            {isEditing ? (
                                <div className="space-y-2">
                                    <Label>Tipo de disco</Label>
                                    <Select
                                        value={equipoData.disco}
                                        onValueChange={(value) => setEquipoData({ ...equipoData, disco: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona el tipo de disco" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="HDD">HDD</SelectItem>
                                            <SelectItem value="SSD">SSD</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            ) : (
                                <div>
                                    <span className="font-medium">Tipo de Disco</span>
                                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">{equipoData.disco}</p>
                                </div>
                            )}

                            {isEditing ? (
                                <div className="space-y-2">
                                    <Label>Capacidad</Label>
                                    <Input
                                        value={equipoData.capacidad}
                                        onChange={(e) => setEquipoData({ ...equipoData, capacidad: Number(e.target.value) })}></Input>
                                </div >
                            ) : (
                                <div>
                                    <span className="font-medium" >Capacidad (GB)</span>
                                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">{equipoData.capacidad}</p>
                                </div>

                            )}

                            {isEditing ? (
                                <div className="space-y-2">
                                    <Label>Procesador</Label>
                                    <Input
                                        value={equipoData.procesador}
                                        onChange={(e) => setEquipoData({ ...equipoData, procesador: e.target.value })}></Input>
                                </div >
                            ) : (
                                <div>
                                    <span className="font-medium">Procesador</span>
                                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">{equipoData.procesador}</p>
                                </div>

                            )}

                            {isEditing ? (
                                <div className="space-y-2">
                                    <Label>Numero de serie</Label>
                                    <Input
                                        value={equipoData.n_serial}
                                        onChange={(e) => setEquipoData({ ...equipoData, n_serial: e.target.value })}></Input>
                                </div >
                            ) : (
                                <div>
                                    <span className="font-medium">Numero de Serie</span>
                                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">{equipoData.n_serial}</p>
                                </div>

                            )}

                            {isEditing ? (
                                <div className="space-y-2">
                                    <Label>MAC</Label>
                                    <Input
                                        value={equipoData.mac}
                                        onChange={(e) => setEquipoData({ ...equipoData, mac: e.target.value })}></Input>
                                </div >
                            ) : (
                                <div>
                                    <span className="font-medium">MAC</span>
                                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">{equipoData.mac}</p>
                                </div>
                            )}

                            {isEditing ? (
                                <div className="space-y-2">
                                    <Label>Ubicacion</Label>
                                    <Input
                                        value={equipoData.ubicacion}
                                        onChange={(e) => setEquipoData({ ...equipoData, ubicacion: e.target.value })}></Input>
                                </div >
                            ) : (
                                <div>
                                    <span className="font-medium">Ubicacion</span>
                                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">{equipoData.ubicacion}</p>
                                </div>
                            )}

                        </div>
                    </CardContent>

                </Card>
                {/*  </div>* */}
                {/*</div >* */}
            </main >
        </div >
    )
}