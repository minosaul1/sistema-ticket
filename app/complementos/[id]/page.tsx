"use client"

import type { ComplementosData } from '@/types/ComplementoTypes'
import Link from 'next/link'
import { use, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useForm } from "react-hook-form";
import ProtectedRoute from "@/components/ProtectedRoute"
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Ticket, ArrowLeft, Edit, Save } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getComplementoId, updateComplemento } from '@/api/Complementos.api'


type Props = {
    complementoData: ComplementosData,
    setComplementoData: (data: ComplementosData) => void;
}

export default function ComponenteDetailPage({ params }: { params: Promise<{ id: number }> }) {
    const token = useAuth()
    const router = useRouter()
    const { id } = use(params)
    const [complementoData, setComplemento] = useState<ComplementosData | null>(null)
    const [isEditing, setIsEditing] = useState(false)
    const { register, handleSubmit, control, formState: { errors }, reset, getValues } = useForm<FormData>()

    useEffect(() => {
        const fetchComponente = async () => {
            try {
                const data = await getComplementoId(id)
                setComplemento(data)
                toast.success("Complemento cargado con exito..")
            } catch (error) {
                toast.error("hubo un problema favor de intentarlo mas tarde...")
            }
        }
        fetchComponente()

    }, [id])

    if (!complementoData) {
        return <p className="p-4">Cargando Complemento...</p>
    }

    const handleEditClick = () => {
        setIsEditing(true)
    }

    const handleSave = async () => {
        try {
            const updateData: Partial<ComplementosData> = {
                tipo: complementoData.tipo,
                marca: complementoData.marca,
                modelo: complementoData.modelo,
                n_serial: complementoData.n_serial,
                ubicacion: complementoData.ubicacion,
            }
            const update = await updateComplemento(complementoData.id, updateData)
            setComplemento(update)
            setIsEditing(false)
            toast.success("Complemento actualizado con exito...")
            router.push("/complementos")


        } catch (error) {
            toast.error('error al actualizar el componente')
        }
    }

    return (
        <ProtectedRoute allowedRoles={["admin", "tecnico"]}>
            <div className="min-h-screen bg-gray-50">
                <header className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-6">
                            <div className="flex items-center">
                                <Ticket className="h-8 w-8 text-blue-600 mr-3" />
                                <h1 className="text-2xl font-bold text-gray-900">Componente #{complementoData?.id}</h1>
                            </div>
                            <div className="flex gap-2">
                                <Link href="/complementos">
                                    <Button variant="outline">
                                        <ArrowLeft className="h-4 w-4 mr-2" />
                                        Volver
                                    </Button>
                                </Link>
                                {isEditing ? (<Button onClick={handleSave}>
                                    <Save className="h-4 w-4 mr-2" />
                                    Guardar
                                </Button>) : (
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
                    <Card className="w-full max-w-xl">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <CardTitle className="flex items-center gap-2">
                                    Complemento #{complementoData?.id}
                                </CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {isEditing ? (
                                    <div className="space-y-2">
                                        <Label >Tipo</Label>
                                        <Input
                                            value={complementoData.tipo || ''}
                                            onChange={(e) => setComplemento({ ...complementoData, tipo: e.target.value })}
                                        />
                                    </div>
                                ) : (
                                    <div >
                                        <span className="font-medium">Tipo:</span>
                                        <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">{complementoData.tipo}</p>
                                    </div>
                                )}
                                {isEditing ? (
                                    <div className="space-y-2">
                                        <Label >Marca</Label>
                                        <Input
                                            value={complementoData.marca || ''}
                                            onChange={(e) => setComplemento({ ...complementoData, marca: e.target.value })}
                                        />
                                    </div>
                                ) : (
                                    <div >
                                        <span className="font-medium">Marca:</span>
                                        <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">{complementoData.marca}</p>
                                    </div>
                                )}
                                {isEditing ? (
                                    <div className="space-y-2">
                                        <Label >Modelo</Label>
                                        <Input
                                            value={complementoData.modelo || ''}
                                            onChange={(e) => setComplemento({ ...complementoData, modelo: e.target.value })}
                                        />
                                    </div>
                                ) : (
                                    <div >
                                        <span className="font-medium">Modelo:</span>
                                        <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">{complementoData.modelo}</p>
                                    </div>
                                )}
                                {isEditing ? (
                                    <div className="space-y-2">
                                        <Label >numero de serie</Label>
                                        <Input
                                            value={complementoData.n_serial || ''}
                                            onChange={(e) => setComplemento({ ...complementoData, n_serial: e.target.value })}
                                        />
                                    </div>
                                ) : (
                                    <div >
                                        <span className="font-medium">numero de serie:</span>
                                        <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">{complementoData.n_serial}</p>
                                    </div>
                                )}
                                {isEditing ? (
                                    <div className="space-y-2">
                                        <Label >Ubicacion</Label>
                                        <Input
                                            value={complementoData.ubicacion || ''}
                                            onChange={(e) => setComplemento({ ...complementoData, ubicacion: e.target.value })}
                                        />
                                    </div>
                                ) : (
                                    <div >
                                        <span className="font-medium">Ubicacion:</span>
                                        <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">{complementoData.ubicacion}</p>
                                    </div>
                                )}
                                {isEditing ? (
                                    <div className="space-y-2">
                                        <Label >Equipo</Label>
                                        <Input
                                            value={complementoData.fk_equipo || ''}
                                            onChange={(e) => setComplemento({ ...complementoData, fk_equipo: Number(e.target.value) })}
                                        />
                                    </div>
                                ) : (
                                    <div >
                                        <span className="font-medium">Equipo:</span>
                                        <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">{complementoData.fk_equipo}</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </ProtectedRoute >

    )
}