'use client'

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { H, P } from "@/components/ui/typography";
import { useEffect, useState } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { ModalForm } from "@/components/ui/modal-form";
import { DialogTitle } from "@/components/ui/dialog";
import Link from "next/link";
import { ChevronDown } from "lucide-react";


const formSchema = z.object({
    email: z.string().email("Email должен быть валидным"),
    file: z.any()

})

export default function ContactsPage() {
    const [response, setResponse] = useState<undefined | { success: boolean, message: string, email: string }>(undefined)
    const [isPending, setIsPending] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            file: ''
        },
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!isPending) {
            setIsPending(true)
            try {
                const formData = new FormData();
                formData.append('email', values.email);
                formData.append('file', values.file[0]);

                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error('Ошибка при отправке файла');
                }

                const result = await response.json();
                console.log('Success:', result);
                setResponse(result)
                if (result.success) {
                    form.reset();
                }

            } catch (error) {
                setResponse({ success: false, message: 'Отправка формы не удалась', email: values.email })
            }
            setIsPending(false)
        }
    }

    useEffect(() => {
    }, []);
    return (
        <Section className="animate-appear h-full">
            <Container className="flex items-center justify-center flex-col gap -6">
                <H level={'h1'} as="h1" className="text-center">Контакты</H>

                <Button asChild variant={'link'}>
                    <Link href={'mailto:viacheslavorlov@gmail.com'}>
                        <P size={'lg'}>
                            Email: viacheslavorlov@gmail.com
                        </P>
                    </Link>
                </Button>

                <Button asChild variant={'link'}>
                    <Link href={'tel:+7123123123123'}>
                        <P size={'lg'}>
                            Позвонить: +7123123123123
                        </P>
                    </Link>
                </Button>
                <div>
                    <ChevronDown size={60} className="stroke-3 text-green-600 animate-bounce" />
                </div>

                <ModalForm>
                    <DialogTitle>
                        Отправить сообщение
                    </DialogTitle>
                    <P>{'Эта форма будет отправлена успешно только в половине случаев отправки, отправляйте пока не отправится)))'}</P>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-8 border p-6 rounded-2xl", response?.success === true && 'border-green-600', response?.success === false && 'border-destructive')}>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="example@mail.ru" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Введите email.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="file"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="image.png" {...field} type="file" />
                                        </FormControl>
                                        <FormDescription>
                                            Выберите файл для отправки.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button className="w-full" disabled={isPending} type="submit">Отправить</Button>

                        </form>
                    </Form>
                    {response && (
                        <P

                            size={'lg'}
                            className={cn('font-bold', response?.success ? 'text-green-700' : 'text-destructive')}
                        >
                            {response?.message}
                        </P>)}
                </ModalForm>


            </Container>
        </Section >
    );
}