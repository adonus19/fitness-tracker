import { Exercise } from './exercise.model';
import { Subject } from 'rxjs/Subject';

export class TrainingService {
  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 60, calories: 10 },
    { id: 'burpees', name: 'Burpees', duration: 3, calories: 8 },
    { id: 'lunges', name: 'Lunges', duration: 2, calories: 12 },
    { id: 'skaters', name: 'Skaters', duration: 5, calories: 9 },
  ];

  private runningExercise: Exercise;
  exerciseChanged = new Subject<Exercise>();
  private exercises: Exercise[] = [];

  getAvailableExercises() {
    return this.availableExercises.slice();
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  completedExercise() {
    this.exercises.push({ ...this.runningExercise, date: new Date(), state: 'completed' });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }
  cancelExercise(progress: number) {
    this.exercises.push({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  getCompletedOrCancelledExercies() {
    return this.exercises.slice();
  }
}
