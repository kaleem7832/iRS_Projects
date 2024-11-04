import Image from "next/image";

export default function Loading() {
  return (
    <div className="loading text-center flex justify-center items-center">
      <Image
        src="/loading.gif"
        width={100}
        height={100}
        alt="Picture of the author"
      />
    </div>
  );
}
