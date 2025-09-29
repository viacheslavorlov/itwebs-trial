'use client'

import { ReactNode } from "react"
import { Button } from "./button"
import { Dialog, DialogContent, DialogTrigger } from "./dialog"

export const ModalForm = ({ children }: { children: ReactNode }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Отправь меня</Button>
            </DialogTrigger>
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    )
}