import { Photo } from "@/types/api";
import Image from "next/image";
import { H } from "../ui/typography";

export const PhotoCard = ({ photo }: { photo: Photo }) => {
    return (
        <div className="flex flex-col gap-5 items-center justify-center">
            <Image src={photo.url} width={400} height={400} alt="" className="rounded-xl -skew-3 rounded-tl-[100px] rounded-br-[100px] object-cover h-[320px]" />
            <H level={'h3'}>{photo.title}</H>
        </div>
    )
}