type User = {
  id: number;
  email: string;
  full_name: string;
  picture: string;
  winned: number;
  loosed: number;
  draws: number;
  rating: number;
  is_blocked: boolean;
};

type Runtime = {
  id: number;
  code: string;
  tests_passed: number;
  tests_failed: number;
  output: string;
  finish_date: string;
  created_date: string;
  status: string;
};

type Game = {
  id: number;
  user1: User;
  user2: User;
  winner_id: number | null;
  lang_problem_id: number;
  status: "active" | "finished";
  room_uid: string;
};

type Lang = "python" | "js";
