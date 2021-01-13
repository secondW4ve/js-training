export interface Exercise {
  id: string;
  name: string;
  complexity: number;
  tasks: Task[];
}

export interface Task {
  id: string;
  name: string;
  solutionParts: SolutionPart[];
  solutionSize: number;
}

export interface SolutionPart {
  id: number;
  content: string;
}