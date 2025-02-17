import { Cell } from '../grid.model';

export function rebuildAlg(res: Cell | null) {
  if (!res) return;
  const step = () => {
    if (!res || !res.previous) return;
    if (res.isStart) return;
    if (!res.isEnd) {
      res.isPath = true;
    }
    res = res.previous!;
    setTimeout(step, 0);
  };
  step();
}
