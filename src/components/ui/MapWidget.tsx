"use client";

import React from "react";

interface MapWidgetProps {
  query: string;
  className?: string;
  height?: number;
}

/**
 * Небольшой виджет карты (Yandex Maps Embed)
 * Адрес можно обновить позже через проп `query`.
 */
export const MapWidget: React.FC<MapWidgetProps> = ({
  query,
  className,
  height = 240,
}) => {
  const url = `https://yandex.ru/map-widget/v1/?um=constructor%3A&ll=43.999%2C56.326&z=12&text=${encodeURIComponent(
    query || "Нижний Новгород"
  )}`;

  return (
    <div
      className={
        "rounded-xl overflow-hidden border border-gray-200 bg-white " +
        (className || "")
      }
      style={{ height }}
    >
      <iframe
        title="Карта офиса"
        src={url}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};
