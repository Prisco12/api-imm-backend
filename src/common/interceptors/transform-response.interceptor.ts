import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  status: string;
  message: string;
  header?: any;
  body: T;
}

@Injectable()
export class TransformResponseInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        // Se a resposta já está no formato padrão, retorna como está
        if (data && typeof data === 'object' && 'status' in data) {
          return data;
        }

        // Extrai informações de paginação se existirem
        const header: any = {};
        let body = data;

        if (data && typeof data === 'object') {
          // Se tem estrutura de paginação
          if ('data' in data && 'total' in data) {
            header.total = data.total;
            header.page = data.page || 1;
            header.limit = data.limit || 10;
            header.totalPages = data.totalPages || Math.ceil(data.total / (data.limit || 10));
            body = data.data;
          }
        }

        // Retorna no formato padrão
        return {
          status: 'success',
          message: 'Operação realizada com sucesso',
          ...(Object.keys(header).length > 0 && { header }),
          body: body || {},
        };
      }),
    );
  }
}
