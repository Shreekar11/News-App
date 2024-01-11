import Link from "next/link";

type Props = {
    category: string;
    isActive: boolean;
};

const NavLink = ({ category, isActive }: Props) => {
    return (
        <Link href={`/news/${category}`} className={`navLink ${isActive && 
        'underline decoration-red-500 underline-offset-4 font-bold text-lg rounded-full'}`}>
            {category}
        </Link>
    )
}

export default NavLink
