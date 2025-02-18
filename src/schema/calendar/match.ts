import { z } from 'zod';
import { transformableDateSchema } from '../generics/datetime';
import { transformableMatchStatusSchema } from '../generics/match-status';
import { transformableTeamCalendarSchema } from './team';

export const transformableMatchCalendarSchema = z
  .object({
    id: z.coerce.number(),
    estado_partido: transformableMatchStatusSchema.innerType(),
    fecha: transformableDateSchema.innerType(),
    jornada: z.coerce.number(),
    url_streaming: z.string().url().nullable().default(null),

    nombre_local: z.string(),
    url_escudo_local: z.string().url(),
    resultado_local: z.coerce.number().nullable(),

    nombre_visitante: z.string(),
    url_escudo_visitante: z.string().url(),
    resultado_visitante: z.coerce.number().nullable(),

    equipo_local: transformableTeamCalendarSchema.innerType(),
    equipo_visitante: transformableTeamCalendarSchema.innerType(),
  })
  .transform((result) => {
    const fecha = transformableDateSchema.safeParse(result.fecha).data ?? {
      date: null,
      time: null,
    };
    return {
      id: result.id,
      status: transformableMatchStatusSchema.safeParse(result.estado_partido).data ?? 'UNKNOWN',
      week: result.jornada,
      urlStreaming: result.url_streaming,
      date: fecha.date,
      time: fecha.time,
      localTeam: {
        id: result.equipo_local.id,
        name: result.nombre_local,
        shieldUrl: result.url_escudo_local,
        score: result.resultado_local,
      },
      visitorTeam: {
        id: result.equipo_visitante.id,
        name: result.nombre_visitante,
        shieldUrl: result.url_escudo_visitante,
        score: result.resultado_visitante,
      },
    };
  });
