import { cn } from "@/lib/utils"

export const Aurora = ({ className }: { className?: string }) => {
    return (
        <div className={cn("h-[calc(100vh_/_3)] top-1/3 bottom-0 right-0 left-0 flex items-center justify-center absolute opacity-40 scale-3d animate-aurora-1", className)}>
            <div className="relative w-full top-0 bottom-0 right-0 left-0">
                <div className="absolute w-full h-32 bg-gradient-to-r from-green-400 to-teal-400 blur-xl animate-aurora-1"></div>
                <div className="absolute w-full h-32 bg-gradient-to-r from-purple-500 to-blue-400 blur-xl animate-aurora-2 mt-8"></div>
                <div className="absolute w-full h-32 bg-gradient-to-r from-cyan-400 to-blue-500 blur-xl animate-aurora-3 mt-16"></div>
                <div className="absolute w-full h-32 bg-gradient-to-r from-green-300 to-emerald-400 blur-xl animate-aurora-4 mt-24"></div>
                <div className="absolute w-full h-32 bg-gradient-to-r  from-purple-500 to-emerald-400 blur-xl animate-aurora-5 mt-32"></div>
            </div>
        </div>
    )
}