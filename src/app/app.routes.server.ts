import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: "car-detail/:id",
    renderMode: RenderMode.Server
  },

  {
    path: "new-order/:id",
    renderMode: RenderMode.Server
  },
  
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
  
];
