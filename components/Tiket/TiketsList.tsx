import { useEffect, useState } from 'react';
import { TiketsData } from '@/types/tikets.types'
import { obtenerTickets } from '@/api/Tikets.api';
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TiketsCard } from './TiketCard';

export function TiketsList() {
    const [Tikets, setTikets] = useState<TiketsData[]>([]);

    useEffect(() => {
        obtenerTickets()
            .then(setTikets)
            .catch((Error) => console.log('Error al cargar Tikets', Error));
    }, [])

    return (
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Tickets Recientes</CardTitle>
                <CardDescription>Últimos tickets reportados en el sistema</CardDescription>
            </CardHeader>
            {Tikets.map((tiket) => (
                <TiketsCard key={tiket.id} tiket={tiket} />
            ))}
        </Card>

    );
}


