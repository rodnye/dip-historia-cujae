import cx from 'classix';
import { getBgColorFromHash } from '../../utils/color';

export function Tag({ children }: { children: string }) {
  return (
    <div
      className={cx(
        'm-1 rounded px-2 py-1 text-sm font-bold italic text-white',
        getBgColorFromHash(children),
      )}
    >
      #{children}
    </div>
  );
}
