import { describe, it, expect } from 'vitest';
import { eidGamesData } from '../client/src/data/eidGames';

describe('Eid Games Data', () => {
  it('should have at least 5 games', () => {
    expect(eidGamesData.length).toBeGreaterThanOrEqual(5);
  });

  it('should have exactly 8 games', () => {
    expect(eidGamesData.length).toBe(8);
  });

  it('each game should have required properties', () => {
    eidGamesData.forEach((game) => {
      expect(game).toHaveProperty('id');
      expect(game).toHaveProperty('name');
      expect(game).toHaveProperty('description');
      expect(game).toHaveProperty('requirements');
      expect(game).toHaveProperty('rules');
      expect(game).toHaveProperty('players');
      expect(game).toHaveProperty('duration');
      expect(game).toHaveProperty('emoji');
    });
  });

  it('each game should have non-empty name and description', () => {
    eidGamesData.forEach((game) => {
      expect(game.name).toBeTruthy();
      expect(game.name.length).toBeGreaterThan(0);
      expect(game.description).toBeTruthy();
      expect(game.description.length).toBeGreaterThan(0);
    });
  });

  it('each game should have at least 2 requirements', () => {
    eidGamesData.forEach((game) => {
      expect(game.requirements.length).toBeGreaterThanOrEqual(2);
    });
  });

  it('each game should have at least 4 rules', () => {
    eidGamesData.forEach((game) => {
      expect(game.rules.length).toBeGreaterThanOrEqual(4);
    });
  });

  it('each game should have valid players and duration info', () => {
    eidGamesData.forEach((game) => {
      expect(game.players).toBeTruthy();
      expect(game.duration).toBeTruthy();
      expect(game.players.length).toBeGreaterThan(0);
      expect(game.duration.length).toBeGreaterThan(0);
    });
  });

  it('each game should have an emoji', () => {
    eidGamesData.forEach((game) => {
      expect(game.emoji).toBeTruthy();
      expect(game.emoji.length).toBeGreaterThan(0);
    });
  });

  it('game IDs should be unique', () => {
    const ids = eidGamesData.map((game) => game.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('first game should be الحبل (الشد)', () => {
    expect(eidGamesData[0].name).toBe('الحبل (الشد)');
    expect(eidGamesData[0].emoji).toBe('🪢');
  });

  it('last game should be لعبة الرقص الموسيقي', () => {
    expect(eidGamesData[eidGamesData.length - 1].name).toBe('لعبة الرقص الموسيقي');
    expect(eidGamesData[eidGamesData.length - 1].emoji).toBe('💃');
  });
});
