import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        const email = formData.get('email') as string;
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'Файл не найден' }, { status: 400 });
        }
        const transporter = nodemailer.createTransport({
            host: "smtp.yandex.ru", // Use your email provider
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports - 587
            auth: {
                user: process.env.EMAIL_LOGIN, // Your email
                pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
            },
        });

        try {

            if (email && file) {
                const mailOptions = {
                    from: process.env.EMAIL_LOGIN, // sender address
                    to: email, // list of receivers
                    subject: "Сообщение с моего сайта портфолио ", // Subject line
                    html: `<h2>Email: ${email}</h2> Отправлено с тестового сайта для itwebs`, // html email
                    text: `Email: ${email} \n ${file.name}`, // plain text body
                    // attachments: [
                    //     { filename: 'image', content: await file.arrayBuffer() }
                    // ]
                };

                const info = await transporter.sendMail(mailOptions);
                console.log({
                    message: "Email sent: " + info.response,
                });

            }
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
        }

        const acident = Math.random()
        if (acident > 0.5) {

            return NextResponse.json({
                success: true,
                message: 'Файл успешно загружен',
                email: email,
                // fileName: fileName
            });
        } else {
            return NextResponse.json({
                success: false,
                message: 'Ошибка, отправка файла не удалась',
                email: email,
                // fileName: fileName
            });
        }

    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: 'Ошибка при загрузке файла' },
            { status: 500 }
        );
    }
}