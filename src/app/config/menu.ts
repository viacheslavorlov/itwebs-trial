import { Home, List, PhoneCall } from "lucide-react"

export const menu = [
    {
        label: 'Главная', href: '/', icon: Home
    },
    {
        label: 'Продукты', href: '/products', icon: List
    },
    {
        label: 'Контакты', href: '/contacts', icon: PhoneCall
    },
]

export const footerMenu = [
    {
        label: 'Политика конфиденциальности', href: '/privacy'
    },
    {
        label: 'Пользовательское соглашение', href: '/terms'
    },
]

export const socialMenu = [
    {
        label: 'Telegram', href: 'https://t.me/itwebs'
    },
    {
        label: 'GitHub', href: 'https://github.com/viacheslavorlov'
    }
]

export const PHONE_NUMBER = '+7 (999) 999-99-99'
export const EMAIL = 'mail@mail.ru'
export const ADDRESS = 'г. Москва, ул. Московская, д. 1, офис 101'
export const COMPANY_NAME = 'ITWEBS'