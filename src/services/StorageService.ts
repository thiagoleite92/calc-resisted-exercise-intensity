import { SheetExercise } from '../components/Form/ExerciseForm';

export class StorageService {
  saveCalc(data: SheetExercise): void {
    this.updateExerciseHistory(data);
    this.updateExerciseSheet(data);
  }

  private updateExerciseHistory(data: SheetExercise): void {
    const historySheet = this.getHistorySheet();

    if (historySheet?.has(data.exercise)) {
      const exercise = historySheet.get(data.exercise);
      exercise.push(data);
    } else {
      historySheet.set(data.exercise, [data]);
    }

    localStorage.setItem(
      'historySheet',
      JSON.stringify(Array.from(historySheet.entries()))
    );
  }

  private updateExerciseSheet(data: SheetExercise): void {
    const sheet = this.getSheet();

    const exerciseIndex = sheet.findIndex(
      (exercise) => exercise.exercise === data.exercise
    );

    if (exerciseIndex < 0) {
      sheet.push(data);
      localStorage.setItem('sheet', JSON.stringify(sheet));
      return;
    } else {
      sheet.splice(exerciseIndex, 1, data);
      localStorage.setItem('sheet', JSON.stringify(sheet));
      return;
    }
  }

  getSheet(): SheetExercise[] | [] {
    const savedSheet = localStorage.getItem('sheet');

    return savedSheet !== null ? JSON.parse(savedSheet) : [];
  }

  getHistorySheet() {
    const historySheet = localStorage.getItem('historySheet');

    return historySheet !== null
      ? new Map(JSON.parse(historySheet))
      : new Map();
  }
}
