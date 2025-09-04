import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useId, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Simulate the login validation
    if (email === "admin000@gmail.com" && password === "superadmin") {
      login("token_blablabla_windah_batubara");
      navigate("/dashboard");
    } else {
      setError("Username or password is invalid");
    }
  };

  return (
    <div className="w-full flex justify-center items-center">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Card className="w-md">
          <CardHeader>
            <CardTitle>
              <h1 className="text-2xl">Login</h1>
            </CardTitle>
            <CardDescription>
              Enter your credentials to access your dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div className="grid gap-2">
                <Label htmlFor={useId()}>Email</Label>
                <Input
                  id={useId()}
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor={useId()}>Password</Label>
                </div>
                <Input
                  id={useId()}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};
