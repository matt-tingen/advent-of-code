import { Room } from './buildCave';

export const findPaths = (start: Room) => search(start, new Set(), []);

const search = (room: Room, visited: Set<Room>, path: Room[]): Room[][] => {
  if (room.name === 'end') return [[...path, room]];
  if (room.size === 'sm' && visited.has(room)) return [];

  const nextPath = [...path, room];
  const nextVisited = new Set(visited.values());

  nextVisited.add(room);

  return Array.from(room.neighbors.values()).flatMap((neighbor) =>
    search(neighbor, nextVisited, nextPath),
  );
};
