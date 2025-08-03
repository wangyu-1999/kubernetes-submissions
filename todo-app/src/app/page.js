import Image from "next/image";

const todos = ["Todo 1", "Todo 2", "Todo 3"];
export default function Home() {
  return (
    <div className="ml-2">
      <h1 className="text-5xl font-bold my-6">The project App</h1>
      <div className="my-3">
        <Image src="/api/image" alt="Random Image" width={400} height={400} />
      </div>
      <div className="text-lg my-3">
        <div className="flex items-center space-x-2 my-4">
          <input
            type="text"
            placeholder="New todo"
            maxLength={140}
            className="border-2 px-2 py-1"
          />
          <button className="bg-blue-400 hover:bg-blue-500 text-white px-2 py-1">
            Create Todo
          </button>
        </div>
        <ul className="list-disc list-inside ml-5">
          {todos.map((todo, index) => (
            <li key={index} className="text-lg my-1">
              {todo}
            </li>
          ))}
        </ul>
      </div>
      <div className="text-lg my-3">DevOps with Kubernetes 2025</div>
    </div>
  );
}
