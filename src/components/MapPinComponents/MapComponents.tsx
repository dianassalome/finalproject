import dynamic from 'next/dynamic';
import { forwardRef } from 'react';

export const LazyMapContainer = dynamic(
  () => import('./MapLazyComponents').then((m) => m.MapContainer),
  {
    ssr: false,
    loading: () => (<div style={{ height: '400px' }} />),
  }
);
export const MapContainer = forwardRef((props, ref) => (
  <LazyMapContainer {...props} forwardedRef={ref} />
));

// direct import from 'react-leaflet'
export const TileLayer = dynamic(
  () => import('react-leaflet').then((m) => m.TileLayer),
  { ssr: false }
);
export const ZoomControl = dynamic(
  () => import('react-leaflet').then((m) => m.ZoomControl),
  { ssr: false }
);