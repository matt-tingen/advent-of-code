import { Room } from './buildCave';

export const findPaths = (start: Room, revisitsAllowed = 0) =>
  search(start, revisitsAllowed, new Set(), []);

const search = (
  room: Room,
  revisitsAllowed: number,
  visited: Set<Room>,
  path: Room[],
): Room[][] => {
  if (room.name === 'end') return [[...path, room]];

  const isRevisit = room.size === 'sm' && visited.has(room);
  if (isRevisit && (!revisitsAllowed || room.name === 'start')) return [];

  const nextRevisitsAllowed = isRevisit
    ? Math.max(0, revisitsAllowed - 1)
    : revisitsAllowed;
  const nextPath = [...path, room];
  const nextVisited = new Set(visited.values());

  nextVisited.add(room);

  return Array.from(room.neighbors.values()).flatMap((neighbor) =>
    search(neighbor, nextRevisitsAllowed, nextVisited, nextPath),
  );
};
