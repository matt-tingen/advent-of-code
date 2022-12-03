export interface ProtoRoom {
  name: string;
  size: 'sm' | 'lg';
}

export interface Room extends ProtoRoom {
  neighbors: Set<Room>;
}

export type CaveEdge = [string, string];

export const buildCave = (edges: CaveEdge[]) => {
  const rooms = new Map<string, Room>();

  const getRoom = (name: string) => {
    const existingRoom = rooms.get(name);

    if (existingRoom) return existingRoom;

    const room: Room = {
      name,
      size: name === name.toLowerCase() ? 'sm' : 'lg',
      neighbors: new Set(),
    };

    rooms.set(name, room);

    return room;
  };

  edges.forEach(([a, b]) => {
    const roomA = getRoom(a);
    const roomB = getRoom(b);

    roomA.neighbors.add(roomB);
    roomB.neighbors.add(roomA);
  });

  return rooms.get('start')!;
};
