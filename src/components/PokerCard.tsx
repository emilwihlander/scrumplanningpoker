export default function PokerCard(props: {
  card: string;
  small?: boolean;
  onClick?: () => void;
}) {
  const width = props.small ? 38 : 76;
  const height = props.small ? 53 : 106;

  const fontSize = props.card.length > 2 ? 80 : 96;

  return (
    <svg
      className="poker-card drop-shadow transition-all hover:drop-shadow-md transform hover:-translate-y-1"
      width={width}
      height={height}
      viewBox="0,0,190,265"
      onClick={props.onClick}
    >
      <g style={{ cursor: "pointer" }}>
        <path
          className="card-bg"
          d="M13.17039,264.5c-6.99766,0 -12.67039,-4.808 -12.67039,-10.73898v-242.52203c0,-5.93098 5.67272,-10.73898 12.67039,-10.73898h163.65922c6.99766,0 12.67039,4.808 12.67039,10.73898v242.52203c0,5.93098 -5.67272,10.73898 -12.67039,10.73898z"
          id="Path 1"
          fill="#f8fafc"
          stroke="#64748b"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path d="M49.5,32.5v-16h124v196h-16v-180z" fill="#cbd5e1" />
        <path d="M140.5,232.5v16h-124v-196h16v180z" fill="#cbd5e1" />
        <text
          x="24"
          y="36"
          fill="#cbd5e1"
          className="card-font"
          font-size="24"
          text-anchor="middle"
        >
          {props.card}
        </text>
        <text
          x="166"
          y="246"
          fill="#cbd5e1"
          className="card-font"
          font-size="24"
          text-anchor="middle"
        >
          {props.card}
        </text>
        <text
          x="50%"
          y="52%"
          fill="#475569"
          className="card-font"
          font-size={fontSize}
          text-anchor="middle"
          dominantBaseline="middle"
        >
          {props.card}
        </text>
      </g>
    </svg>
  );
}
