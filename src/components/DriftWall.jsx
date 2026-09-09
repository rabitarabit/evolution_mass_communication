import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import './DriftWall.css';

const ARCHIVE_SUBJECTS = [
  ["Cave paintings", "cave,painting"], ["Oral storytelling", "campfire,storytelling"], ["Ancient symbols", "ancient,symbols"], ["Ritual gathering", "people,fire"],
  ["Papyrus scroll", "papyrus,scroll"], ["Stone inscription", "ancient,inscription"], ["Calligraphy", "calligraphy,manuscript"], ["Handwritten letter", "handwritten,letter"],
  ["Illuminated manuscript", "illuminated,manuscript"], ["Library archive", "old,library"], ["Bound books", "antique,books"], ["Printing press", "printing,press"],
  ["Movable type", "letterpress,type"], ["Newspaper press", "newspaper,print"], ["Magazine archive", "vintage,magazine"], ["Book binding", "bookbinding,books"],
  ["Telegraph key", "telegraph,morse"], ["Telephone handset", "vintage,telephone"], ["Radio receiver", "vintage,radio"], ["Radio tower", "radio,tower"],
  ["Broadcast microphone", "broadcast,microphone"], ["Television set", "vintage,television"], ["Film broadcast", "film,projector"], ["Newsroom", "newsroom,journalism"],
  ["Desktop computer", "desktop,computer"], ["Computer keyboard", "computer,keyboard"], ["Circuit board", "circuit,board"], ["Server room", "server,room"],
  ["Early internet", "internet,cable"], ["Digital code", "computer,code"], ["Computer network", "network,technology"], ["Data center", "data,center"],
  ["Smartphone", "smartphone,screen"], ["Messaging", "mobile,messaging"], ["Social network", "social,media"], ["Video call", "video,call"],
  ["Satellite communication", "satellite,space"], ["Digital display", "digital,display"], ["Connected devices", "connected,devices"], ["Virtual reality", "virtual,reality"],
  ["Artificial intelligence", "artificial,intelligence"], ["Fiber optics", "fiber,optics"], ["Network map", "network,map"], ["Communication signals", "communication,signals"],
  ["Modern collaboration", "modern,collaboration"], ["Mobile devices", "mobile,devices"], ["Digital culture", "digital,culture"], ["Future interface", "futuristic,interface"]
];

const ARCHIVE_IMAGE_IDS = [
  "photo-1455390582262-044cdead277a", "photo-1507842217343-583bb7270b66", "photo-1456324504439-367cee3b3c32", "photo-1495446815901-a7297e633e8d",
  "photo-1524995997946-a1c2e315a42f", "photo-1544947950-fa07a98d237f", "photo-1543002588-bfa74002ed7e", "photo-1519682337058-a94d519337bc",
  "photo-1521587760476-6c12a4b040da", "photo-1460518451285-97b6aa326961", "photo-1509027572446-af8401acfdc3", "photo-1498243691581-b145c3f54a5a",
  "photo-1504711434969-e33886168f5c", "photo-1485846234645-a62644f84728", "photo-1512758017271-d7b84c2113f1", "photo-1505238680356-667803448bb6",
  "photo-1535905557558-afc4877a26fc", "photo-1504384308090-c894fdcc538d", "photo-1516321318423-f06f85e504b3", "photo-1516321165247-4aa89a48be28",
  "photo-1518770660439-4636190af475", "photo-1498050108023-c5249f4df085", "photo-1461749280684-dccba630e2f6", "photo-1515879218367-8466d910aaa4",
  "photo-1531297484001-80022131f5a1", "photo-1488590528505-98d2b5aba04b", "photo-1496181133206-80ce9b88a853", "photo-1527430253228-e93688616381",
  "photo-1550751827-4bd374c3f58b", "photo-1558494949-ef010cbdcc31", "photo-1517245386807-bb43f82c33c4", "photo-1517180102446-f3ece451e9d8",
  "photo-1484417894907-623942c8ee29", "photo-1497366754035-f200968a6e72", "photo-1504639725590-34d0984388bd", "photo-1451187580459-43490279c0fa",
  "photo-1535223289827-42f1e9919769", "photo-1516116216624-53e697fedbea", "photo-1526374965328-7f61d4dc18c5", "photo-1542744173-8e7e53415bb0",
  "photo-1519389950473-47ba0277781c", "photo-1531482615713-2afd69097998", "photo-1556761175-b413da4baf72", "photo-1516321310764-8d1f2202b6b1",
  "photo-1517292987719-0369a794ec0f", "photo-1535223289827-42f1e9919760", "photo-1531403009284-440f080d1e12", "photo-1532619187608-e5375cab36a9"
];

const DEFAULT_ITEMS = ARCHIVE_SUBJECTS.map(([title, subject], index) => ({
  image: "https://images.unsplash.com/" + ARCHIVE_IMAGE_IDS[index] + "?auto=format&fit=crop&w=960&q=80",
  title
}));

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const columnFactor = (index, variance) => {
  const pseudo = ((index * 0.6180339887 + 0.35) % 1) * 2 - 1;
  return 1 + variance * pseudo;
};

const DriftWall = ({
  items = DEFAULT_ITEMS,
  columns = 5,
  tileWidth = 200,
  tileHeight = 132,
  gap = 18,
  radius = 14,
  tilt = 16,
  turn = -14,
  roll = 0,
  perspective = 1200,
  depth = 120,
  speed = 42,
  direction = 'up',
  variance = 0.45,
  parallax = 0.6,
  pauseOnHover = false,
  lift = 64,
  fade = 0.6,
  dim = 0.55,
  grayscale = false,
  overlayColor = '#060010',
  className = '',
  style
}) => {
  const containerRef = useRef(null);
  const planeRef = useRef(null);
  const trackRefs = useRef([]);
  const rafRef = useRef(null);

  const offsetsRef = useRef([]);
  const velocitiesRef = useRef([]);
  const hoveredColRef = useRef(-1);
  const wallHoveredRef = useRef(false);
  const pointerRef = useRef({ x: 0, y: 0 });
  const pointerDampedRef = useRef({ x: 0, y: 0 });
  const lastTsRef = useRef(null);

  const [containerHeight, setContainerHeight] = useState(600);
  const [activeId, setActiveId] = useState(null);
  const activeIdRef = useRef(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(prefersReducedMotion());
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = e => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const columnItems = useMemo(() => {
    const cols = Array.from({ length: columns }, () => []);
    items.forEach((item, i) => cols[i % columns].push(item));
    return cols.map(col => (col.length ? col : items.slice(0, 1)));
  }, [items, columns]);

  const columnMeta = useMemo(() => {
    const unit = tileHeight + gap;
    return columnItems.map(col => {
      const copyHeight = Math.max(unit, col.length * unit);
      const copies = Math.max(2, Math.ceil((containerHeight * 1.6) / copyHeight) + 1);
      return { copyHeight, copies };
    });
  }, [columnItems, tileHeight, gap, containerHeight]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setContainerHeight(entry.contentRect.height || 600);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const baseVelocities = useMemo(() => {
    const dirSign = direction === 'up' ? 1 : -1;
    return columnItems.map((_, c) => {
      const altSign = c % 2 === 0 ? 1 : -1;
      return speed * columnFactor(c, variance) * dirSign * altSign;
    });
  }, [columnItems, speed, direction, variance]);

  useEffect(() => {
    offsetsRef.current = columnMeta.map((meta, c) => meta.copyHeight * ((c * 0.37) % 1));
    velocitiesRef.current = columnItems.map(() => 0);
  }, [columnMeta, columnItems]);

  const applyPlaneTransform = useCallback(
    (px, py) => {
      const plane = planeRef.current;
      if (!plane) return;
      plane.style.transform =
        `translate(-50%, -50%) scale(1.18) ` +
        `rotateX(${tilt + py}deg) rotateY(${turn + px}deg) rotateZ(${roll}deg) ` +
        `translateZ(${-depth}px)`;
    },
    [tilt, turn, roll, depth]
  );

  useEffect(() => {
    if (reduced || speed === 0) {
      applyPlaneTransform(0, 0);
      return undefined;
    }

    const animate = ts => {
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt = Math.min(0.05, Math.max(0, ts - lastTsRef.current) / 1000);
      lastTsRef.current = ts;

      const maxTilt = parallax * 8;
      const targetX = pointerRef.current.x * maxTilt;
      const targetY = -pointerRef.current.y * maxTilt;
      const damp = 1 - Math.exp(-dt / 0.12);
      pointerDampedRef.current.x += (targetX - pointerDampedRef.current.x) * damp;
      pointerDampedRef.current.y += (targetY - pointerDampedRef.current.y) * damp;
      applyPlaneTransform(pointerDampedRef.current.x, pointerDampedRef.current.y);

      if (!reduced) {
        for (let c = 0; c < trackRefs.current.length; c++) {
          const meta = columnMeta[c];
          if (!meta) continue;
          const paused = wallHoveredRef.current && pauseOnHover;
          const factor = paused || hoveredColRef.current === c ? 0 : 1;
          const target = baseVelocities[c] * factor;

          const ease = 1 - Math.exp(-dt / (target === 0 ? 0.16 : 0.28));
          velocitiesRef.current[c] += (target - velocitiesRef.current[c]) * ease;
          let next = (offsetsRef.current[c] ?? 0) + velocitiesRef.current[c] * dt;
          next = ((next % meta.copyHeight) + meta.copyHeight) % meta.copyHeight;
          offsetsRef.current[c] = next;

          const el = trackRefs.current[c];
          if (el) el.style.transform = `translate3d(0, ${-next}px, 0)`;
        }
      } else {
        for (let c = 0; c < trackRefs.current.length; c++) {
          const el = trackRefs.current[c];
          const meta = columnMeta[c];
          if (el && meta) el.style.transform = `translate3d(0, ${-(offsetsRef.current[c] ?? 0)}px, 0)`;
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
    };
  }, [baseVelocities, columnMeta, pauseOnHover, parallax, reduced, applyPlaneTransform]);

  const activate = useCallback((id, index) => {
    activeIdRef.current = id;
    hoveredColRef.current = index;
    setActiveId(id);
  }, []);
  const release = useCallback(() => {
    activeIdRef.current = null;
    hoveredColRef.current = -1;
    setActiveId(null);
  }, []);

  const handlePointerMove = useCallback(
    e => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      if (parallax > 0 && !reduced) {
        pointerRef.current = {
          x: (e.clientX - rect.left) / rect.width - 0.5,
          y: (e.clientY - rect.top) / rect.height - 0.5
        };
      }
      const hit = document.elementFromPoint(e.clientX, e.clientY);
      const tile = hit && hit.closest ? hit.closest('[data-tile-id]') : null;
      if (!tile) return;
      const id = tile.dataset.tileId;
      if (id === activeIdRef.current) return;
      activeIdRef.current = id;
      hoveredColRef.current = Number(tile.dataset.col);
      setActiveId(id);
    },
    [parallax, reduced]
  );

  const handlePointerLeaveWall = useCallback(() => {
    wallHoveredRef.current = false;
    pointerRef.current = { x: 0, y: 0 };
    release();
  }, [release]);

  const cssVars = useMemo(
    () => ({
      '--dw-tile-w': `${tileWidth}px`,
      '--dw-tile-h': `${tileHeight}px`,
      '--dw-gap': `${gap}px`,
      '--dw-radius': `${radius}px`,
      '--dw-perspective': `${perspective}px`,
      '--dw-lift': `${lift}px`,
      '--dw-dim': dim,
      '--dw-gray': grayscale ? 1 : 0,
      '--dw-overlay': overlayColor,
      '--dw-edge': `${Math.max(0, (1 - fade) * 100)}%`,
      ...style
    }),
    [tileWidth, tileHeight, gap, radius, perspective, lift, dim, grayscale, overlayColor, fade, style]
  );

  const renderTile = (item, id, colIndex) => {
    const inner = (
      <span className="drift-wall__inner">
        <img src={item.image} alt={item.title ?? ''} loading="lazy" decoding="async" draggable={false} />
        <span className="drift-wall__overlay" aria-hidden="true" />
      </span>
    );
    const commonProps = {
      className: `drift-wall__tile${activeId === id ? ' is-active' : ''}`,
      'data-tile-id': id,
      'data-col': colIndex,
      onFocus: () => activate(id, colIndex),
      onBlur: release
    };
    if (item.href) {
      return (
        <a key={id} href={item.href} target="_blank" rel="noreferrer noopener" {...commonProps}>
          {inner}
        </a>
      );
    }
    return (
      <div key={id} tabIndex={0} role="button" aria-label={item.title ?? 'tile'} {...commonProps}>
        {inner}
      </div>
    );
  };

  const rootClass = ['drift-wall', reduced ? 'drift-wall--reduced' : '', className].filter(Boolean).join(' ');

  return (
    <div
      ref={containerRef}
      className={rootClass}
      style={cssVars}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => {
        wallHoveredRef.current = true;
      }}
      onPointerLeave={handlePointerLeaveWall}
      role="group"
      aria-label="Drifting wall of tiles"
    >
      <div ref={planeRef} className="drift-wall__plane">
        {columnItems.map((col, c) => (
          <div className="drift-wall__col" key={"col-" + c}>
            <div className="drift-wall__track" ref={el => (trackRefs.current[c] = el)}>
              {col.map((item, itemIndex) => renderTile(item, c + "-" + itemIndex, c))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DriftWall;
