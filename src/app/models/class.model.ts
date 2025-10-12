export interface ClassRoom {
  id: number;
  name: string;       // e.g., "10-A"
  section?: string;   // e.g., "A"
  room?: string;      // e.g., "Room 204"
  capacity?: number;
  teacherId?: number;
  subject?: string;   // optional, for display
}
