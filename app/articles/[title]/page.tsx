'use client';
import { Toaster, toast } from "sonner";
import Link from "next/link";
import { auth } from "@/app/firebase/firebaseApp";
import { useSearchParams } from "next/navigation"
import { useAuthState } from "react-firebase-hooks/auth";
import { db } from "@/app/firebase/firebaseApp";
import { doc, collection, addDoc } from "firebase/firestore";
import Image from "next/image";

async function addDataToFireStore(image: string | null, title: string | null, description: string | null) {
    try {
        const docRef = await addDoc(collection(db, 'message'), {
            urlToImage: image,
            title: title,
            description: description,
        });
        console.log("Document written with ID :", docRef.id);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

export default function Page() {

    const searchParams = useSearchParams();

    const image = searchParams.get("urlToImage");
    const title = searchParams.get("title");
    const description = searchParams.get("description");

    const handleSubmit = async () => {
        // e.preventDefault();
        const added = await addDataToFireStore(image, title, description);
        if (added) {
            toast.success('News Saved Successfully');
        }
    };

    const [user] = useAuthState(auth);

    return (
        <div className="flex ">
            <article className="m-14 w-3/4">
                <nav>
                    <h1 className="text-2xl sm:text-3xl mb-3 font-bold">{searchParams.get("title")}</h1>
                    <p className="text-slate-500 mb-4"> {searchParams.get("description")}</p>
                </nav>
                <div>
                    {searchParams.get("urlToImage") ? (
                        <img
                            src={searchParams.get("urlToImage") ?? ""}
                            className="h-82 w-full object-cover relative rounded-md"
                            alt='no-image'
                        />
                    ) : (
                        <img
                            className="h-80 w-full object-cover relative"
                            src='./no-image-14596.svg'
                            alt='no-image'
                        />
                    )}
                    <div className="gap-10">
                        {/* <h1 className="text-3xl m-4 font-bold">{searchParams.get("title")}</h1> */}
                        {user &&
                            <button
                                onClick={handleSubmit}
                                className="p-3 mt-5 text-xl font-semibold ring ring-slate-300 rounded-md hover:bg-slate-100 ">
                                Save News
                                <Toaster richColors position="top-center" />
                            </button>
                        }
                        {/* {user && <button
                            onClick={handleDelete}
                            className="p-3 mt-5 mx-5 text-xl font-semibold ring ring-slate-300 rounded-md hover:bg-slate-100 ">
                            Unsave News
                            <Toaster richColors />
                        </button>
                        } */}

                        <p className="text-slate-500 mt-4">Published at : {searchParams.get("publishedAt")}</p>
                        <h1 className="font-medium text-2xl mt-4">By {searchParams.get("author")}</h1>
                        <p className=" text-base sm:text-xl mt-5">{searchParams.get("content")}</p>
                        <Link href={searchParams.get("url") ?? "#"} target="_blank" className="text-red-500 hover:text-black mt-5">
                            Show more
                        </Link>
                    </div>
                </div>

            </article>
        </div>
    )
}