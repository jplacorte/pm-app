import { Input, TextButton } from "@/components/ui";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login submitted:", { email, password });
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4 select-none w-80">
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email address"
      />

      <Input
        value={email}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
      />

      <div className="flex flex-col pt-2">
        <TextButton type="submit" label="Log In" />
      </div>
    </form>
  );
}
