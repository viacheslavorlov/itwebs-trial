import Image from "next/image";
import { H } from "../ui/typography";
import { Character } from "@/types/api";

export const CharacterCard = ({ character }: { character: Character }) => {
    return (
        <div className="flex flex-col gap-5 items-center justify-center">
            <Image src={character.image} width={400} height={400} alt="" className="rounded-xl -skew-3 rounded-tl-[100px] rounded-br-[100px] object-cover h-[320px]" />
            <H level={'h3'}>{character.name}</H>
        </div>
    )
}