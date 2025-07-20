import LoginForm from "../../components/public/LoginForm";

export default function LoginPage() {
  return (
    <>
      <LoginForm
        url="http://localhost:8000/api/login"
        method="POST"
        headers={{
          "Content-Type": "application/json",
        }}
      />
    </>
  );
}
