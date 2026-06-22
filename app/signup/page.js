// Customer authentication is disabled for now. The SignupPage component is kept
// for easy re-enable, but the route redirects home so it's gone from the UI.
import { redirect } from "next/navigation";

export default function Page() {
  redirect("/");
}
