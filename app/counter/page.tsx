// app/counter/page.tsx
"use client"; // Redux state interactions must happen in client components

import { decrement, increment } from "@/lib/features/counterSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export default function CounterPage() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-4xl font-bold">Counter: {count}</h1>
      <div className="flex gap-4">
        <button
          onClick={() => dispatch(decrement())}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Decrement
        </button>
        <button
          onClick={() => dispatch(increment())}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Increment
        </button>
      </div>
    </div>
  );
}
