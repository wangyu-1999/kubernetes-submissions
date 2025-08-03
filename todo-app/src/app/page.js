import Image from "next/image";
export default function Home() {
  return (
    <div className="ml-2">
      <h1 className="text-5xl font-bold my-6">The project App</h1>
      <div className="my-3">
        <Image src="/api/image" alt="Random Image" width={400} height={400} />
      </div>
      <p className="text-lg">DevOps with Kubernetes 2025</p>
    </div>
  );
}
