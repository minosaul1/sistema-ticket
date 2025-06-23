export default function Error403() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-4xl font-bold text-red-600">403 - Acceso Restringido</h1>
            <p className="mt-4 text-lg text-gray-600">No tienes permisos para ver esta página.</p>
        </div>
    )
}