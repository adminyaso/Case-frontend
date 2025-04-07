
import { HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';

export abstract class BaseService {

  protected handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Bilinmeyen bir hata oluştu.';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Bir hata oluştu: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 0:
          errorMessage = 'Sunucuya ulaşılamıyor.';
          break;
        case 400:
          errorMessage = 'Geçersiz istek.';
          break;
        case 401:
          errorMessage = 'Yetkisiz erişim.';
          break;
        case 403:
          errorMessage = 'Erişim engellendi.';
          break;
        case 404:
          errorMessage = 'İstenen kaynak bulunamadı.';
          break;
        case 500:
          errorMessage = 'Sunucu hatası.';
          break;
        default:
          errorMessage = `Hata ${error.status}: ${error.message}`;
          break;
      }
    }

    console.error('HTTP Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
