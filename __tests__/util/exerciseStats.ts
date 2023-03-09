import { ConsumableExerciseItem } from '../../src/types';
import {
  calculateMaxWeight,
  calculateMaxIntensity,
  calculateTotalVolume,
} from '../../src/utils/exerciseStats';

const exercises: ConsumableExerciseItem[] = [
  {
    data: {
      reps: '4',
      weight: '50',
      bodyweight: false,
    },
    ref: {
      id: 0,
      warmup: false,
      reps: '3',
      rpe: '6',
      orm: '12',
    },
  },
  {
    ref: {
      id: 0,
      text: 'test note',
    },
  },
  {
    data: {
      reps: '12',
      weight: '60',
      bodyweight: false,
    },
    ref: {
      id: 0,
      warmup: false,
      reps: '10',
      rpe: '7',
      orm: '13',
    },
  },
  {
    ref: {
      id: 0,
      minutes: '1',
      seconds: '30',
    },
  },
  {
    data: {
      reps: '15',
      weight: '60',
      bodyweight: true,
    },
    ref: {
      id: 0,
      warmup: false,
      reps: '10',
      rpe: '7',
      orm: '13',
    },
  },
];

describe('getMaxLbs', () => {
  it('Test on sample exercises', () => {
    expect(calculateMaxWeight(exercises.slice(0, 1))).toBe(50);
    expect(calculateMaxWeight(exercises.slice(0, 3))).toBe(60);
    expect(calculateMaxWeight(exercises)).toBe(60);
  });
  it('Test on bodyweight exercise', () => {
    expect(calculateMaxWeight([exercises[4]])).toBe(-1);
  });
  it('Test on empty exercises', () => {
    expect(calculateMaxWeight([])).toBe(0);
  });
});

describe('getMaxIntensity', () => {
  it('Test on sample exercises', () => {
    expect(calculateMaxIntensity(exercises.slice(0, 1))).toBe(55);
    expect(calculateMaxIntensity(exercises.slice(0, 3))).toBe(86);
    expect(calculateMaxIntensity(exercises)).toBe(86);
  });
  it('Test on bodyweight exercise', () => {
    expect(calculateMaxIntensity([exercises[4]])).toBe(-1);
  });
  it('Test on empty exercises', () => {
    expect(calculateMaxIntensity([])).toBe(0);
  });
});

describe('getTotalVolume', () => {
  it('Test on sample exercises', () => {
    expect(calculateTotalVolume(exercises.slice(0, 1))).toBe(200);
    expect(calculateTotalVolume(exercises.slice(0, 3))).toBe(920);
    expect(calculateTotalVolume(exercises)).toBe(920);
  });
  it('Test on bodyweight exercise', () => {
    expect(calculateTotalVolume([exercises[4]])).toBe(-1);
  });
  it('Test on empty exercises', () => {
    expect(calculateTotalVolume([])).toBe(0);
  });
});
