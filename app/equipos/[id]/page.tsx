"use client";

import {
    Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select"
import { use, useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Ticket, ArrowLeft, Edit, Save, Monitor, User, Calendar, Clock } from "lucide-react"
import { getTikect, UpdateTiket } from '@/api/Tikets.api'
import { TiketsData } from '@/types/tikets.types'
import { EquiposData } from '@/types/EquipoTypes'
import { TecnicoData, UserData } from '@/types/User.types'
import { getTecnicos } from '@/api/Usuarios.api'
import { getEquipoId } from '@/api/Equipos.api'
import toast from "react-hot-toast"
import { useForm, Controller } from "react-hook-form";

export default function EquipoDetailPage() {




    return (
        <h1>Hola</h1>
    )
}