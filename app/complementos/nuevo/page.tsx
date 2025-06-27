"use client"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { CreateComplemento } from "@/api/Complementos.api"
import { ComplementosData } from "@/types/ComplementoTypes"
import toast from "react-hot-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"
import ProtectedRoute from "@/components/ProtectedRoute"


export default function ComplementoNuevoPage() {
    const token = useAuth()
    const router = useRouter()
    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<Omit<ComplementosData, "id">>()
    const onSubmit = async (data: Omit<ComplementosData, "id">) => {
        try {
            await CreateComplemento(data)
            toast.success("Complemento guardado correctamente")
            router.push("/complementos")
        } catch (error) {
            toast.error("error al crear el componente")
        }

    }
    return (
        <ProtectedRoute allowedRoles={["admin", "tecnico"]}>
            <div className="min-h-screen bg-gray-50">
                <header className="bg-white border-b shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
                        <h1 className="text-2xl font-bold">Agregar Nuevo Complemento</h1>
                        <Link href="/complementos">
                            <Button variant="outline" disabled={isSubmitting}>Volver</Button>
                        </Link>
                    </div>
                </header>
                <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Formulario de Nuevo Complemento</CardTitle>
                            <CardDescription>Completa los datos para agregar un complemento nuevo</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="tipo">tipo</Label>
                                        <Input id="tipo" {...register("tipo", { required: "el tipo es obligatorio" })} />
                                        {errors.tipo && <p className="text-sm text-red-600">{errors.tipo.message}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="marca">marca</Label>
                                        <Input id="marca" {...register("marca", { required: "el marca es obligatorio" })} />
                                        {errors.marca && <p className="text-sm text-red-600">{errors.marca.message}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="modelo">modelo</Label>
                                        <Input id="modelo" {...register("modelo", { required: "el modelo es obligatorio" })} />
                                        {errors.modelo && <p className="text-sm text-red-600">{errors.modelo.message}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="n_serial">numero de Serie</Label>
                                        <Input id="n_serial" {...register("n_serial", { required: "el Serie es obligatorio" })} />
                                        {errors.n_serial && <p className="text-sm text-red-600">{errors.n_serial.message}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="ubicacion">ubicacion</Label>
                                        <Input id="ubicacion" {...register("ubicacion", { required: "la ubicacion es obligatorio" })} />
                                        {errors.ubicacion && <p className="text-sm text-red-600">{errors.ubicacion.message}</p>}
                                    </div>

                                </div>
                                <div className="pt-6">
                                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                                        {isSubmitting ? "Guardando..." : "Guardar Complemento"}
                                    </Button>

                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </main>

            </div>
        </ProtectedRoute>
    )
}