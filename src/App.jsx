import Hero from "./components/Hero";
import Timeline from "./components/Timeline";
import Future from "./components/Future";
import DriftWall from "./components/DriftWall";

export default function App() {
  return (
    <div className="site-shell">
      <div className="site-background" aria-hidden="true" inert="">
        <DriftWall
          columns={8}
          tileWidth={190}
          tileHeight={126}
          gap={18}
          speed={7}
          tilt={9}
          turn={-8}
          depth={150}
          parallax={0}
          dim={0.62}
          overlayColor="#06111c"
          fade={0}
        />
      </div>

      <div className="site-content">
        <Hero />
        <Timeline />
        <Future />
        <footer>
        
        </footer>
      </div>
    </div>
  );
}
