import Button from "@/components/Button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-2">
      <h1 className="text-9xl">404</h1>
      <p>Page Not Found</p>
      <Button href="/">Go Home</Button>
    </div>
  );
}
