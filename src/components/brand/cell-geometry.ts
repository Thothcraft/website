/**
 * Thoth Cell geometry — a 64×64 viewBox shared by the favicon, app
 * icons, watch boot screen and the loader. Three sensing faces
 * (physical, signal, context) on a 3×3 lattice, nucleus where they meet.
 */
export const CELL_FACES = {
  top: '32,6 54.5,19 32,32 9.5,19',
  left: '9.5,19 32,32 32,58 9.5,45',
  right: '32,32 54.5,19 54.5,45 32,58',
} as const

export const CELL_LATTICE: Array<[number, number, number, number]> = [
  // top face
  [24.5, 10.33, 47, 23.33], [17, 14.67, 39.5, 27.67],
  [39.5, 10.33, 17, 23.33], [47, 14.67, 24.5, 27.67],
  // left face
  [9.5, 27.67, 32, 40.67], [9.5, 36.33, 32, 49.33],
  [17, 23.33, 17, 49.33], [24.5, 27.67, 24.5, 53.67],
  // right face
  [32, 40.67, 54.5, 27.67], [32, 49.33, 54.5, 36.33],
  [39.5, 27.67, 39.5, 53.67], [47, 23.33, 47, 49.33],
]
