import IExercise from "./IExercise";

interface ISessionData {
  exercises: IExercise[];
  selectedExerciseId?: number
}

export default ISessionData;