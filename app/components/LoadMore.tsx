import Image from "next/image";

function LoadMore() {
  return (
    <>
      <section className="flex justify-center items-center w-full">
        <div>
          <img
            src="./tube-spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </section>
    </>
  );
}

export default LoadMore;