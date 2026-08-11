type FlowerProps = {
  color: string;
  size: number;
  petals?: number;
  active?: boolean;
};

export function Flower({ color, size, petals = 6, active = false }: FlowerProps) {
  const petalNodes = Array.from({ length: petals }, (_, i) => (
    <ellipse
      key={i}
      cx="50"
      cy="28"
      rx="13"
      ry="21"
      fill={color}
      transform={`rotate(${(360 / petals) * i} 50 50)`}
      opacity={0.95}
    />
  ));

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-hidden="true"
      style={{
        filter: active
          ? "drop-shadow(0 6px 14px oklch(0.5 0.16 10 / 0.5))"
          : "drop-shadow(0 4px 8px oklch(0.5 0.16 10 / 0.25))",
        transition: "transform 250ms ease, filter 250ms ease",
        transform: active ? "scale(1.12)" : undefined,
      }}
    >
      {petalNodes}
      <circle cx="50" cy="50" r="12" fill="var(--petal-5)" />
      <circle cx="50" cy="50" r="6" fill="var(--ink)" opacity="0.35" />
    </svg>
  );
}