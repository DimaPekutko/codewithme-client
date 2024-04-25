export function formatLocation(location: any): string {
  return (
    {
      ["/management"]: "management",
      ["/top"]: "players.top ( )",
      ["/auth/signin"]: "login",
      ["/auth/signup"]: "registration",
      ["/"]: "",
    }[location?.pathname] ?? location?.pathname
  );
}
